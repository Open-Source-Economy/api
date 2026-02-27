# Cross-Step Context (Layer 4)

## Problem

Layer 3 (`ValidationRule<T>`) is step-scoped: conditions can only see fields within the same model. But real business rules often depend on data from other steps:

| Rule                                              | Step data                    | Needs from other steps                       |
| ------------------------------------------------- | ---------------------------- | -------------------------------------------- |
| Show funding breakdown for managed issues         | Funding step fields          | Issue data, project configuration            |
| Require company details for company sponsors      | Sponsor profile fields       | User registration type                       |
| Show developer service options based on skills    | Service selection fields     | Developer profile skills                     |

Additionally, some values are **derivable** from prior steps and should not be asked again (data duplication).

## Solution: Backend-Computed Step Context

The backend already has all accumulated data in the database. When the frontend opens a step, the backend computes a typed **context** from prior steps and serves it alongside the step data.

### Flow

```
1. Frontend opens Step B
2. GET /steps/B → backend reads accumulated data (prior steps)
3. Backend computes StepBContext from accumulated data
4. Response: { stepData: StepB, context: StepBContext }
5. Frontend uses context for visibility, pre-fill, and display
6. POST /steps/B → backend recomputes context and validates with it
```

## Context Type (api-contracts)

Each step that needs cross-step data defines a context interface:

```typescript
// src/models/onboarding/developer-onboarding-context.type.ts
export interface DeveloperOnboardingContext {
  /** From profile step: developer's selected skills */
  selectedSkills: string[];
  /** From profile step: whether developer selected company profile */
  isCompanyProfile: boolean;
  /** Computed: number of project items already configured */
  configuredProjectItemCount: number;
}
```

### What Goes in Context vs What Stays as a Field

| In context (derived, not asked)                                    | In step model (user input)                       |
| ------------------------------------------------------------------ | ------------------------------------------------ |
| `configuredProjectItemCount` — computed from prior steps           | `hourlyRate` — developer must set                |
| `isCompanyProfile` — computed from profile step                    | `serviceDescription` — developer must provide    |
| `selectedSkills` — from profile step                               | `availability` — developer must choose           |

**Rule of thumb**: If the data already exists in a prior step, compute it in the context. Only add a field to the step model when the user must provide genuinely new information.

## ContextualValidationRule (api-contracts)

Extends `ValidationRule<T>` with a context parameter:

```typescript
// src/validation/types.ts
interface ContextualValidationRule<TData, TContext> {
  description: string;
  targetField: keyof TData;
  condition: (data: TData, context: TContext) => boolean;
  message: string;
}
```

Example rules:

```typescript
const developerServiceContextRules: ContextualValidationRule<DeveloperService, DeveloperOnboardingContext>[] = [
  {
    description: "Company name required for company profiles",
    targetField: "companyName",
    condition: (_data, ctx) => ctx.isCompanyProfile,
    message: "Please provide the company name",
  },
  {
    description: "Skill description required when skills are selected",
    targetField: "skillDescription",
    condition: (_data, ctx) => ctx.selectedSkills.length > 0,
    message: "Please describe your experience with the selected skills",
  },
];
```

## Backend: Computing Context

A pure function computes the context from accumulated data:

```typescript
// backend: developer-onboarding-context.compute.ts
function computeDeveloperOnboardingContext(accumulated: AccumulatedOnboardingData): DeveloperOnboardingContext {
  return {
    selectedSkills: accumulated.profile?.skills ?? [],
    isCompanyProfile: accumulated.profile?.profileType === "company",
    configuredProjectItemCount: accumulated.projectItems?.length ?? 0,
  };
}
```

Used in two places:

1. **GET handler** — compute context and include in response
2. **POST handler** — recompute context and pass to `applyContextRules()` for validation

## Frontend: Using Context

```typescript
// Frontend receives context from GET response
const { stepData, context } = getStepDataResponse;

// Use context for visibility (no need to ask project item count — it's derived)
const showAdvancedOptions = context.configuredProjectItemCount > 0;

// Display derived values as read-only info
<InfoField label="Configured items" value={context.configuredProjectItemCount} />
```

## applyContextRules / evaluateContextRules

Analogous to Layer 3's `applyRules()` and `evaluateRules()`, but with context:

```typescript
// api-contracts
export function applyContextRules<T, C>(rules: ContextualValidationRule<T, C>[], context: C) {
  return (data: T, ctx: z.RefinementCtx) => {
    for (const rule of rules) {
      if (rule.condition(data, context) && data[rule.targetField] == null) {
        ctx.addIssue({ code: "custom", message: rule.message, path: [rule.targetField as string] });
      }
    }
  };
}

export function evaluateContextRules<T, C>(rules: ContextualValidationRule<T, C>[], data: Partial<T>, context: C) {
  // returns { [field]: boolean } visibility map
}
```

Backend uses it at validation time:

```typescript
// backend POST handler
const context = computeDeveloperOnboardingContext(accumulated);
const schema = StepSchema.superRefine(applyContextRules(contextRules, context));
schema.parse(body);
```

## File Locations

```
api-contracts/src/
├── validation/
│   ├── types.ts                            # ValidationRule<T> + ContextualValidationRule<T, C>
│   ├── apply-rules.ts                      # applyRules() (Layer 3)
│   ├── apply-context-rules.ts              # applyContextRules() (Layer 4)
│   ├── evaluate-rules.ts                   # evaluateRules() (Layer 3)
│   ├── evaluate-context-rules.ts           # evaluateContextRules() (Layer 4)
│   └── rules/
│       ├── <domain>.rules.ts               # Layer 3 same-step rules
│       └── <domain>.context-rules.ts       # Layer 4 cross-step rules
├── models/onboarding/
│   └── <step>-context.type.ts              # Context interface + schema

backend/src/
├── context/
│   └── <step>-context.compute.ts           # compute<Step>Context()
```

## Naming Conventions

| Concept                  | Naming                                                 |
| ------------------------ | ------------------------------------------------------ |
| Context type             | `<Step>Context` (e.g., `DeveloperOnboardingContext`)   |
| Context rules            | `<step>ContextRules` (e.g., `developerServiceContextRules`) |
| Context compute function | `compute<Step>Context` (e.g., `computeDeveloperOnboardingContext`) |
| Context rules file       | `<step>.context-rules.ts`                              |
| Apply function           | `applyContextRules(rules, context)`                    |
| Evaluate function        | `evaluateContextRules(rules, data, context)`           |

## Rules

- **Context types live in api-contracts** — shared between frontend and backend
- **Context computation lives in backend** — only the backend has access to accumulated data
- **GET responses include context** — frontend never computes cross-step context itself
- **POST validation recomputes context** — never trust frontend-provided context
- **Derived values are read-only** — displayed to the user, not asked as input
- **One context type per step** that needs cross-step data — not every step needs one
- **Context is flat** — pre-computed values, not raw data from other steps
- **Layer 3 stays for same-step rules** — don't move everything to Layer 4
