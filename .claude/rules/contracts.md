# Contracts

## File Location

`src/contracts/<resource>.contract.ts`

## Pattern

```typescript
import { initContract } from "@ts-rest/core";
import {
  getProjectsEndpoint,
  getProjectEndpoint,
  fundIssueEndpoint,
} from "src/endpoints";

const c = initContract();

export const projectsContract = c.router({
  getProjects: getProjectsEndpoint,
  getProject: getProjectEndpoint,
  fundIssue: fundIssueEndpoint,
});
```

## Naming Convention

- File: `<resource>.contract.ts`
- Export: `<resource>Contract`
- Handler names: descriptive action (e.g., `getProjects`, `fundIssue`)

## Register in Main Contract

```typescript
// src/index.ts
import { initContract } from "@ts-rest/core";
import { projectsContract, authContract } from "./contracts";

const c = initContract();

export const contract = c.router({
  projects: projectsContract,
  auth: authContract,
});
```

## Barrel Export

```typescript
// src/contracts/index.ts
export * from "./projects.contract";
export * from "./auth.contract";
```

## Usage by Consumers

```typescript
// Backend
import { contract } from "@open-source-economy/api-types";

@TsRestHandler(contract.projects)
handler() { ... }

// Frontend
apiClient.projects.getProjects({ ... })
apiClient.auth.login({ ... })
```

## Rules

- One contract per resource
- Import endpoints from barrel (`src/endpoints`)
- Use `initContract()` from `@ts-rest/core`
- Register in main `contract` in `src/index.ts`
