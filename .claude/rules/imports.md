# Imports

## Always Absolute with `src/`

```typescript
// CORRECT
import { Owner, OwnerSchema } from "src/models";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";

// WRONG
import { Owner } from "../../models/github/owner.model";
import { Owner } from "../models";
```

## Common Import Patterns

### Endpoint File

```typescript
import { z } from "zod";
import { type Owner, OwnerSchema } from "src/models";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";
```

### Model File

```typescript
import { z } from "zod";
import { type UserId, UserIdSchema } from "src/types/uuid";
import { Currency, currencySchema } from "src/models/shared";
```

### Contract File

```typescript
import { initContract } from "@ts-rest/core";
import { getProjectsEndpoint, fundIssueEndpoint } from "src/endpoints";
```

## Type vs Value Imports

```typescript
// Import type only (for interfaces)
import type { GetEndpointDefinition } from "src/types/endpoint.types";

// Import value (for schemas, enums)
import { OwnerSchema } from "src/models";
import { Currency } from "src/models/shared";
```

## Barrel Imports

```typescript
// CORRECT - import from barrel
import { Owner, OwnerSchema, Currency } from "src/models";

// AVOID - direct file import
import { Owner } from "src/models/github/owner.model";
```

## Rules

- Always use `src/` prefix
- Never use relative paths (`../`, `./`)
- Use `type` keyword for type-only imports
- Import from barrel when available
