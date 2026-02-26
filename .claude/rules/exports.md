# Barrel Exports

## Required Barrels

| Folder                      | Has index.ts | Reason                    |
| --------------------------- | ------------ | ------------------------- |
| `src/`                      | Yes          | Main package entry        |
| `src/models/`               | Yes          | All domain models         |
| `src/models/<domain>/`      | Yes          | Groups related models     |
| `src/endpoints/`            | Yes          | All endpoints             |
| `src/endpoints/<resource>/` | Yes          | Groups resource endpoints |
| `src/contracts/`            | Yes          | All contracts             |
| `src/types/`                | Yes          | Utility types             |
| `src/schemas/`              | No           | Small, import directly    |

## Pattern

```typescript
// src/endpoints/projects/index.ts
export * from "./get-projects.endpoint";
export * from "./get-project.endpoint";
export * from "./fund-issue.endpoint";
```

## Main Entry Point

```typescript
// src/index.ts
import { initContract } from "@ts-rest/core";

export * from "./types";
export * from "./models";
export * from "./schemas/problem-details.schema";
export * from "./schemas/pagination.schema";
export * from "./endpoints";
export * from "./contracts";

import { authContract, projectsContract, ... } from "./contracts";

const c = initContract();

export const contract = c.router({
  auth: authContract,
  projects: projectsContract,
  ...
});
```

## When Adding New Resource

1. Create `src/endpoints/<resource>/index.ts`
2. Add `export * from "./<resource>";` to `src/endpoints/index.ts`
3. Create `src/contracts/<resource>.contract.ts`
4. Add to `src/contracts/index.ts`
5. Add to main `contract` in `src/index.ts`

## Consumer Usage

```typescript
// CORRECT - import from package
import { Owner, OwnerSchema, contract } from "@open-source-economy/api-types";

// WRONG - internal path
import { Owner } from "@open-source-economy/api-types/src/models/github/owner.model";
```

## Rules

- Every folder with multiple files needs index.ts
- Export everything that consumers need
- Re-export from parent barrels
- Main contract defined in src/index.ts
