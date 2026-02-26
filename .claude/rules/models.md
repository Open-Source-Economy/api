# Models

## File Location

`src/models/<domain>/<model-name>.model.ts`

## Folder Structure

```
src/models/
├── github/             # GitHub entities
│   ├── owner.model.ts
│   ├── repository.model.ts
│   ├── issue.model.ts
│   └── index.ts
├── user/               # User models
├── company/            # Company & Address
├── funding/            # Financial models
├── stripe/             # Stripe models
├── project/            # Project models
├── onboarding/         # Developer onboarding
├── permissions/        # Permission tokens
├── shared/             # Enums and value objects
└── index.ts            # Main barrel
```

## Model File Pattern

```typescript
import { z } from "zod";
import { type UserId, UserIdSchema } from "src/types/uuid";
import { UserRole, userRoleSchema } from "src/models/shared";

// ============================================
// User
// ============================================

export interface User {
  id: UserId;
  name: string | null;
  role: UserRole;
}

export const UserSchema = z.object({
  id: UserIdSchema,
  name: z.string().nullable(),
  role: userRoleSchema,
}) satisfies z.ZodType<User>;
```

## Branded ID Types

```typescript
// In src/types/uuid.ts
export type UserId = UUID<"User">;
export const UserIdSchema = uuidSchema<UserId>();

// Non-UUID branded types
export type OwnerId = string & { readonly __brand: "Owner" };
export const OwnerIdSchema = z.string().min(1) as z.ZodType<OwnerId>;
```

## Barrel Export

```typescript
// src/models/<domain>/index.ts
export * from "./user.model";
export * from "./local-user.model";

// src/models/index.ts
export * from "./user";
export * from "./github";
```

## Rules

- Interface first, then Schema
- Use `satisfies z.ZodType<Interface>` always
- Export both interface and schema
- Use branded types for IDs
- Define enums in separate files in shared/, import here
- No factory methods (fromBackend, fromGithubApi) — those are backend concerns
- No utility functions — those are consumer concerns
- Use `number` for financial fields, not Decimal
