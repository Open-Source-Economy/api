# API Contracts Style Guide

This document defines the code style and patterns for the `@open-source-economy/api-types` package.

## File Structure

```
src/
├── models/             # Domain models and shared value objects
│   ├── github/         # GitHub entities (Owner, Repository, Issue)
│   ├── user/           # User models (User, LocalUser, ThirdPartyUser)
│   ├── company/        # Company and Address
│   ├── funding/        # Financial models (IssueFunding, ManagedIssue)
│   ├── stripe/         # Stripe models (Price, Product, Invoice)
│   ├── project/        # Project models (Project, ProjectItem, Service)
│   ├── onboarding/     # Developer onboarding models
│   ├── permissions/    # Permission tokens
│   └── shared/         # Shared value objects (enums, date types)
├── types/              # Infrastructure types (not domain models)
│   ├── endpoint.types.ts   # Endpoint definition types
│   └── uuid.ts             # Branded UUID types
├── schemas/            # API-level schemas (not domain models)
│   ├── problem-details.schema.ts  # RFC 7807 error responses
│   └── pagination.schema.ts       # Pagination helpers
├── endpoints/          # Endpoint definitions with DTOs
│   ├── auth/
│   ├── users/
│   ├── projects/
│   ├── github/
│   ├── stripe/
│   ├── onboarding/
│   ├── admin/
│   └── misc/
├── contracts/          # ts-rest router definitions grouping endpoints
│   ├── auth.contract.ts
│   ├── users.contract.ts
│   ├── projects.contract.ts
│   ├── github.contract.ts
│   ├── stripe.contract.ts
│   ├── onboarding.contract.ts
│   ├── admin.contract.ts
│   └── misc.contract.ts
└── index.ts            # Main package exports + combined contract
```

### Folder Purposes

| Folder                    | Purpose                                         | Examples                                       |
| ------------------------- | ----------------------------------------------- | ---------------------------------------------- |
| `models/`                 | Domain models and business entities             | Owner, Repository, Issue, User, Project        |
| `models/shared/`          | Reusable value objects used by models            | Currency, IssueState, ProductType, ServiceType |
| `types/`                  | Infrastructure/utility types (pure TS, no Zod)   | Endpoint definitions, branded UUIDs            |
| `schemas/`                | API-level schemas (not domain concepts)          | ProblemDetails (RFC 7807), Pagination          |
| `endpoints/`              | Endpoint definitions with request/response DTOs  | GET /projects, POST /stripe/checkout           |
| `contracts/`              | ts-rest routers grouping related endpoints       | authContract, projectsContract                 |

## Native Enums Over String Unions

**Always use native TypeScript enums** instead of string union types for categorical values.

### The Pattern

```typescript
// Good - native enum
export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

// Bad - string union
export type UserRole = "ADMIN" | "USER";
```

### Why Native Enums?

1. **Runtime values** - Enums exist at runtime, enabling iteration and reverse mapping
2. **Zod integration** - Use `z.nativeEnum()` for schema validation
3. **Shared contracts** - Same enum used by frontend and backend
4. **Type narrowing** - Works better with switch statements and exhaustive checks

### Zod Schema Integration

```typescript
import { z } from "zod";

export enum Currency {
  USD = "usd",
  EUR = "eur",
  GBP = "gbp",
  CHF = "chf",
}

export const currencySchema = z.nativeEnum(Currency);
```

## Import Style

Use absolute imports with `src/` prefix:

```typescript
// Good
import { Owner, OwnerSchema } from "src/models";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";

// Bad
import { Owner } from "../../models/github/owner.model";
```

## Endpoint File Structure

Each endpoint should be in its own file following this pattern:

```typescript
import { z } from "zod";
import { type Owner, OwnerSchema } from "src/models";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";

// ============================================
// GET /github/owners/:owner
// ============================================

// 1. Define interfaces for all DTOs (even if empty)
export interface GetOwnerParams {
  owner: string;
}

export interface GetOwnerQuery {}

export interface GetOwnerResponse {
  owner: Owner;
}

// 2. Define Zod schemas using `satisfies z.ZodType<Interface>` (even if empty)
const GetOwnerParamsSchema = z.object({
  owner: z.string(),
}) satisfies z.ZodType<GetOwnerParams>;

const GetOwnerQuerySchema = z.object({}) satisfies z.ZodType<GetOwnerQuery>;

const GetOwnerResponseSchema = z.object({
  owner: OwnerSchema,
}) satisfies z.ZodType<GetOwnerResponse>;

// 3. Export endpoint definition using `as const satisfies EndpointDefinition`
export const getOwnerEndpoint = {
  method: "GET",
  path: "/github/owners/:owner",
  pathParams: GetOwnerParamsSchema,
  query: GetOwnerQuerySchema,
  responses: {
    200: GetOwnerResponseSchema,
    404: ProblemDetailsSchema,
  },
  summary: "Get a GitHub owner by login",
} as const satisfies GetEndpointDefinition;
```

## Interface Definitions

Always define explicit interfaces for all DTOs, even if empty:

```typescript
export interface GetProjectsParams {}
export interface GetProjectsQuery {}
export interface GetProjectsResponse {
  projects: Project[];
}
```

### Request Body Interfaces

Always wrap model types in a named property. Never use a model type directly as the body:

```typescript
// Good - wrap in named property
export interface FundIssueBody {
  creditAmount: number;
}

// Bad - don't use model type directly
export type FundIssueBody = IssueFunding; // Don't do this
```

## Schema Definitions

Always define Zod schemas for all DTOs, even if empty. Use `satisfies z.ZodType<Interface>` to ensure schema matches interface.

### Schema Pattern

```typescript
// Always define schemas, even when empty
const GetProjectsParamsSchema = z.object({}) satisfies z.ZodType<GetProjectsParams>;
const GetProjectsQuerySchema = z.object({}) satisfies z.ZodType<GetProjectsQuery>;
```

### Date and DateTime Fields

Always use the proper typed date aliases instead of raw `string` for date fields:

```typescript
import { ISODateString, isoDateSchema, ISODateTimeString, isoDateTimeSchema } from "src/models/shared";

export interface Issue {
  createdAt: ISODateTimeString;
  closedAt: ISODateTimeString | null;
}

const IssueSchema = z.object({
  createdAt: isoDateTimeSchema,
  closedAt: isoDateTimeSchema.nullable(),
}) satisfies z.ZodType<Issue>;
```

| Use Case                    | Type                | Schema              | Format Example             |
| --------------------------- | ------------------- | ------------------- | -------------------------- |
| Dates (birthday, startDate) | `ISODateString`     | `isoDateSchema`     | `2025-01-15`               |
| Timestamps (createdAt)      | `ISODateTimeString` | `isoDateTimeSchema` | `2025-01-15T10:30:00.000Z` |

### Strict Validation

Always prefer strict validation over permissive validation:

```typescript
// Good - strict validation with enum
currency: currencySchema,

// Bad - permissive validation
currency: z.string(),
```

## Endpoint Definitions

Use the appropriate endpoint definition type based on HTTP method:

| Method | Definition Type            | Success Status |
| ------ | -------------------------- | -------------- |
| GET    | `GetEndpointDefinition`    | 200            |
| POST   | `PostEndpointDefinition`   | 201            |
| PATCH  | `PatchEndpointDefinition`  | 200            |
| PUT    | `PutEndpointDefinition`    | 200            |
| DELETE | `DeleteEndpointDefinition` | 204            |

## Error Responses (RFC 7807)

All error responses MUST use `ProblemDetailsSchema` following RFC 7807 "Problem Details for HTTP APIs". Custom error schemas are not allowed.

```typescript
// Good - uses ProblemDetailsSchema
responses: {
  200: GetProjectResponseSchema,
  404: ProblemDetailsSchema,
}

// Bad - custom error schema
responses: {
  200: GetProjectResponseSchema,
  404: z.object({ error: z.string() }),
}
```

## Barrel Exports

Each directory should have an `index.ts` for cleaner imports:

| Folder                      | Has index? | Reason                    |
| --------------------------- | ---------- | ------------------------- |
| `src/`                      | Yes        | Main package entry point  |
| `src/models/`               | Yes        | Exports all domain models |
| `src/models/<domain>/`      | Yes        | Groups related models     |
| `src/endpoints/`            | Yes        | Exports all endpoints     |
| `src/endpoints/<resource>/` | Yes        | Groups resource endpoints |
| `src/contracts/`            | Yes        | Exports all contracts     |
| `src/types/`                | Yes        | Exports utility types     |
| `src/schemas/`              | No         | Small, import directly    |

## Contract Definitions

Group related endpoints in contract files:

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

## Naming Conventions

- **Enum files**: `<enum-name>.type.ts` (e.g., `currency.type.ts`)
- **Model files**: `<model-name>.model.ts` (e.g., `owner.model.ts`)
- **Endpoint files**: `<action>-<resource>.endpoint.ts` (e.g., `get-projects.endpoint.ts`)
- **Contract files**: `<resource>.contract.ts` (e.g., `projects.contract.ts`)
- **Interfaces**: `<Action><Resource><Type>` (e.g., `GetProjectsResponse`, `FundIssueBody`)
- **Schemas**: `<Action><Resource><Type>Schema` (e.g., `GetProjectsResponseSchema`)
- **Endpoints**: `<action><Resource>Endpoint` (e.g., `getProjectsEndpoint`)
- **Contracts**: `<resource>Contract` (e.g., `projectsContract`)

## Branded Types - Never Use `as` Casts

Branded types (like `UserId`, `OwnerId`) provide compile-time safety. **Never use `as` casts** to convert strings to branded types:

```typescript
// Good - validates the string is a valid UUID
const id = UserIdSchema.parse(userId);

// Bad - bypasses validation
const id = userId as UserId;
```

## Status Codes

Use literal numbers for status codes (not `StatusCodes` enum):

```typescript
// Good
responses: {
  200: GetProjectResponseSchema,
  404: ProblemDetailsSchema,
}

// Bad
responses: {
  [StatusCodes.OK]: GetProjectResponseSchema,
}
```

## Consumer Usage

Consumers import from the package, not internal paths:

```typescript
// Good - import from package
import type { Owner, UserId } from "@open-source-economy/api-types";
import { contract } from "@open-source-economy/api-types";

// Avoid - internal path imports
import { Owner } from "@open-source-economy/api-types/src/models/github/owner.model";
```
