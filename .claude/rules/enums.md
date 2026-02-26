# Enums

## Always Use Native Enums

```typescript
// CORRECT - native enum
export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

// WRONG - string union
export type UserRole = "ADMIN" | "USER";
```

## File Location

`src/models/shared/<enum-name>.type.ts`

## Pattern

```typescript
// src/models/shared/currency.type.ts
import { z } from "zod";

export enum Currency {
  USD = "usd",
  EUR = "eur",
  GBP = "gbp",
  CHF = "chf",
}

export const currencySchema = z.nativeEnum(Currency);
```

## Usage in Model Schemas

```typescript
import { Currency, currencySchema } from "src/models/shared";

export const StripePriceSchema = z.object({
  currency: currencySchema,
}) satisfies z.ZodType<StripePrice>;
```

## Optional Enum Field

```typescript
// Use .optional() where needed, not separate export
currency: currencySchema.optional();
```

## Barrel Export

```typescript
// src/models/shared/index.ts
export * from "./currency.type";

// src/models/index.ts
export * from "./shared";
```

## Why Native Enums?

- Runtime values (can iterate, reverse map)
- Works with `z.nativeEnum()`
- Shared between frontend/backend
- Better type narrowing in switch statements

## Rules

- Never use string unions
- Always use `export enum Name { ... }`
- Always assign string values: `Value = "value"`
- Export both enum and schema
- Use `z.nativeEnum(EnumName)` in schemas
