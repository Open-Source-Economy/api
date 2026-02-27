# Domain Model Flexibility

## Architecture: 4-Layer Validation

| Layer                | Where                            | Purpose                                                                          |
| -------------------- | -------------------------------- | -------------------------------------------------------------------------------- |
| Layer 1 — Flexible   | Model schemas                    | All fields optional (supports partial data from GitHub sync)                     |
| Layer 2 — Strict     | `Strict*` schemas                | Required fields enforced at compile-time (user-facing forms)                     |
| Layer 3 — Validated  | `Validated*` schemas             | Runtime conditional rules via `ValidationRule<T>` (see `validation-rules.md`)    |
| Layer 4 — Contextual | `*Context` types + context rules | Cross-step validation via backend-computed context (see `cross-step-context.md`) |

### When to Use Each Layer

| Situation                                                    | Layer                              |
| ------------------------------------------------------------ | ---------------------------------- |
| Field is always optional (sync data from GitHub)             | 1                                  |
| Field is always required for user-facing forms               | 2                                  |
| Field is conditionally required based on **same-step** data  | 3                                  |
| Field is conditionally required based on **other-step** data | 4                                  |
| Field value is **derived** from other-step data              | 4 (computed in context, not asked) |

## Layer 1 — Flexible Base Schema

Fields that may come from external sync (GitHub API, etc.) are `.optional()`:

```typescript
export interface Owner {
  id: OwnerId;
  type: OwnerType;
  htmlUrl: string;
  avatarUrl?: string;       // Optional — may not come from GitHub
  followers?: number;
  name?: string;
}

export const OwnerSchema = z.object({
  id: ownerIdSchema,
  type: ownerTypeSchema,
  htmlUrl: z.string(),
  avatarUrl: z.string().optional(),
  followers: z.number().int().optional(),
  name: z.string().optional(),
}) satisfies z.ZodType<Owner>;
```

## Layer 2 — Strict Schema (derived, not duplicated)

Use `.required({ ... })` to derive strict schemas from flexible ones:

```typescript
export const StrictDeveloperProfileSchema = DeveloperProfileSchema.required({
  displayName: true,
  bio: true,
  hourlyRate: true,
});

export type StrictDeveloperProfile = z.infer<typeof StrictDeveloperProfileSchema>;
```

## Layer 3 — Validated Schema (same-step conditional)

See `validation-rules.md` for full details. Rules can only reference fields within the same model:

```typescript
// condition only sees DeveloperProfile fields
{
  targetField: "companyName",
  condition: (data) => data.profileType === "company",
}
```

## Layer 4 — Contextual Validation (cross-step)

See `cross-step-context.md` for full details. Solves two problems:

1. **Cross-step conditions** — "field X in step B is required based on data from step A"
2. **Derived values** — "total funding amount is computed from prior steps, not asked again"

The backend computes a typed **context** from accumulated data and provides it to both:

- **Frontend** (via GET response) — for field visibility and pre-fill
- **Backend** (at validation time) — for contextual rule evaluation

## Rules

- **Never duplicate fields** — derive strict from flexible via `.required(mask)`
- **Use `z.infer<typeof StrictSchema>`** for strict types — no manual interface
- **Flexible schema gets `satisfies z.ZodType<Interface>`** — strict does not (it's derived)
- **Endpoint body schemas use strict schemas** for user-facing write endpoints
- **GET responses use flexible schemas** — data may be incomplete
- **Only fields from external providers are optional** — core identifiers stay required
- **Export both** `Schema` + `StrictSchema` and `Type` + `StrictType` from barrel
- **Cross-step conditions use Layer 4** — never add fields to a step model just to hold data from another step
- **Derived values live in context** — if computable from prior steps, compute in backend context, don't ask the user
