# Validation Rules

## Purpose

`ValidationRule<T>` is a shared mechanism for conditional field validation. Define a rule once in api-contracts — it automatically drives both **Zod validation** (backend) and **field visibility** (frontend).

## File Locations

```
src/validation/
├── types.ts                  # ValidationRule<T> interface
├── apply-rules.ts            # applyRules() — Zod superRefine callback
├── evaluate-rules.ts         # evaluateRules() — frontend field visibility
├── rules/
│   ├── <domain>.rules.ts     # Domain-specific rules
│   └── index.ts              # Barrel
└── index.ts                  # Barrel
```

## ValidationRule<T> Interface

```typescript
interface ValidationRule<TData> {
  description: string; // Human-readable (docs/debugging)
  targetField: keyof TData; // Field that becomes required when condition is met
  condition: (data: TData) => boolean; // When true, targetField is required
  message: string; // Error message when field is missing
}
```

## Defining Rules

Group rules by the schema/model they apply to:

```typescript
// src/validation/rules/developer-profile.rules.ts
import { StrictDeveloperProfileSchema, type StrictDeveloperProfile } from "src/models/onboarding/developer-profile.model";
import type { ValidationRule } from "src/validation/types";
import { applyRules } from "src/validation/apply-rules";

export const developerProfileRules: ValidationRule<StrictDeveloperProfile>[] = [
  {
    description: "Company name required for company profiles",
    targetField: "companyName",
    condition: (data) => data.profileType === "company",
    message: "Company name is required for company profiles",
  },
];

export const ValidatedStrictDeveloperProfileSchema = StrictDeveloperProfileSchema.superRefine(applyRules(developerProfileRules));
```

## Backend Usage (applyRules)

`applyRules()` returns a Zod `superRefine` callback. Use it on strict schemas to create validated schemas:

```typescript
export const ValidatedSchema = StrictSchema.superRefine(applyRules(myRules));
```

- `superRefine` does NOT change the output type — `z.infer<typeof ValidatedSchema>` === original type
- Endpoint body schemas use the validated schema instead of the strict schema

## Frontend Usage (evaluateRules)

`evaluateRules()` is a pure function (no React dependency) that returns field visibility:

```typescript
import { evaluateRules, developerProfileRules } from "@open-source-economy/api-types";

const profileType = form.watch("profileType");
const visibility = evaluateRules(developerProfileRules, { profileType });
// visibility.companyName === true when profileType === "company"
```

Use with `useEffect` to reset hidden fields:

```typescript
useEffect(() => {
  if (!visibility.companyName) {
    form.setValue("companyName", undefined);
  }
}, [visibility.companyName, form]);
```

## How It Fits the 4-Layer Model

| Layer                | Schema                                    | Purpose                                                              |
| -------------------- | ----------------------------------------- | -------------------------------------------------------------------- |
| Layer 1 — Flexible   | `DeveloperProfileSchema`                  | All fields optional (sync data)                                      |
| Layer 2 — Strict     | `StrictDeveloperProfileSchema`            | Required fields enforced at compile-time                             |
| Layer 3 — Validated  | `ValidatedStrictDeveloperProfileSchema`   | Conditional rules based on **same-step** data                        |
| Layer 4 — Contextual | `*Context` + context rules                | Cross-step conditions + derived values (see `cross-step-context.md`) |

### Layer 3 vs Layer 4

- **Layer 3** (`ValidationRule<T>`): Condition only sees fields within the same model. Use when the condition and target field are in the same step.
- **Layer 4** (`ContextualValidationRule<T, C>`): Condition sees both step data AND a backend-computed context from prior steps. Use when the condition depends on data from other steps, or when a value is derived from prior steps.

## Naming Convention

- Rules array: `<domain>Rules` (e.g., `developerProfileRules`)
- Validated schema: `Validated<StrictSchemaName>` (e.g., `ValidatedStrictDeveloperProfileSchema`)
- Rules file: `src/validation/rules/<domain>.rules.ts`

## Rules

- Define rules in `src/validation/rules/<domain>.rules.ts`
- Export both the rules array AND the validated schema
- Validated schema = `StrictSchema.superRefine(applyRules(rules))`
- Endpoint body schemas use validated schemas (not strict schemas) when rules exist
- Frontend uses `evaluateRules()` for visibility, `useEffect` to reset hidden fields
- Never duplicate condition logic between backend and frontend — use the same rules array
- Always barrel-export from `src/validation/rules/index.ts` and `src/validation/index.ts`
- **Layer 3 is same-step only** — if a condition needs data from another step, use Layer 4 (`cross-step-context.md`)
