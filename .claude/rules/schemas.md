# Schemas

## Core Pattern

```typescript
const MySchema = z.object({
  field: z.string(),
}) satisfies z.ZodType<MyInterface>;
```

## Always Use `satisfies`

```typescript
// CORRECT
const Schema = z.object({...}) satisfies z.ZodType<Interface>;

// WRONG - no type checking
const Schema = z.object({...});
```

## Empty Schemas

```typescript
// Still define them, still use satisfies
const GetProjectParamsSchema = z.object({}) satisfies z.ZodType<GetProjectParams>;
const GetProjectQuerySchema = z.object({}) satisfies z.ZodType<GetProjectQuery>;
```

## Common Zod Methods

### Primitives

```typescript
z.string();
z.string().min(1).max(255);
z.string().email();
z.string().uuid();
z.string().datetime();
z.number();
z.number().int().min(0);
z.boolean();
```

### Optional/Nullable

```typescript
z.string().optional();           // string | undefined
z.string().nullable();           // string | null
z.string().nullish();            // string | null | undefined
z.string().optional().default("value");
```

### Arrays

```typescript
z.array(ItemSchema);
z.array(ItemSchema).min(1);
z.array(ItemSchema).max(10);
```

### Enums

```typescript
z.nativeEnum(MyEnum);            // Use native enum
z.enum(["a", "b", "c"]);        // Avoid - use native enum
```

### Objects

```typescript
z.object({ ... })
z.object({ ... }).extend({ more: z.string() })
z.object({ ... }).omit({ field: true })
z.object({ ... }).pick({ field: true })
z.object({ ... }).partial()     // All fields optional
```

### Coercion (for query params)

```typescript
z.coerce.number();               // "10" → 10
z.coerce.boolean();              // "true" → true
z.coerce.number().optional().default(10);
```

### Branded Types

```typescript
z.string().uuid().brand<"User">();
```

## Do NOT Use

```typescript
// Don't create optional schema exports
export const optionalCurrency = currencySchema.optional(); // ❌

// Instead, use .optional() where needed
currency: currencySchema.optional(); // ✓
```

## Strict Validation

Always prefer strict validation over permissive validation:

```typescript
// CORRECT - use specific enum for known values
currency: currencySchema;         // ✓ Only allows known currencies

// WRONG - allows any string
currency: z.string();             // ❌ No validation
```

When a field has a known set of valid values:

- Define a native enum for those values
- Create a schema with `z.nativeEnum()`
- Use the strict schema instead of `z.string()`

This catches invalid data at the API boundary rather than later in processing.

## Date and DateTime Fields

Always use typed date schemas:

```typescript
import { ISODateString, isoDateSchema, ISODateTimeString, isoDateTimeSchema } from "src/models/shared";

export interface MyModel {
  birthday: ISODateString;        // For dates (YYYY-MM-DD)
  createdAt: ISODateTimeString;   // For timestamps
}

const MyModelSchema = z.object({
  birthday: isoDateSchema,
  createdAt: isoDateTimeSchema,
}) satisfies z.ZodType<MyModel>;
```

| Type        | Interface           | Schema              | Format                     |
| ----------- | ------------------- | ------------------- | -------------------------- |
| Date only   | `ISODateString`     | `isoDateSchema`     | `YYYY-MM-DD`               |
| Date + time | `ISODateTimeString` | `isoDateTimeSchema` | `YYYY-MM-DDTHH:mm:ss.sssZ` |

## Default Values

Default values for query parameters belong in the **schema**, not in backend code:

```typescript
// CORRECT - default in schema
limit: z.coerce.number().optional().default(20),

// Backend uses the value directly (no ?? fallback needed)
const documents = await repo.list({ limit: query.limit });
```

**Interface vs Schema mismatch:** When a schema has `.optional().default()`, the input is optional but the output is required. The interface should reflect the **output type** (what the backend sees after validation):

```typescript
// Interface shows what backend receives (after schema applies default)
export interface PaginationQuery {
  limit: number; // Always defined after validation
}

// Schema allows omitting (applies default)
const schema = z.object({
  limit: z.coerce.number().optional().default(20),
});
```

Add a TODO comment when using this pattern, as it's a workaround for Zod's input/output type difference.

## Rules

- Always `satisfies z.ZodType<Interface>`
- Define schema even if empty
- Use `z.nativeEnum()` for enums
- Use `z.coerce` for query parameters
- Never create separate "optional" schema exports
- **Prefer strict validation** - use enums/specific schemas over generic `z.string()`
- **Use typed date fields** - `ISODateString`/`ISODateTimeString` instead of `string`
- **Default values in schema** - Use `.optional().default()` in schema, not `??` in backend
