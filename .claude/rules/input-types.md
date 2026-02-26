# Input Types

## When to Use

When creating/updating entities, omit server-generated fields (id, createdAt, etc.)

## Pattern

```typescript
/** Model input data (without server-generated fields) */
export type ModelInput = Omit<Model, "id" | "createdAt">;
export const ModelInputSchema = ModelSchema.omit({ id: true, createdAt: true });
```

## Location

Define inline in the endpoint file, NOT in the model file.

## Full Example

```typescript
// In endpoints/onboarding/create-profile.endpoint.ts

import { z } from "zod";
import { type DeveloperProfile, DeveloperProfileSchema } from "src/models";

// ============================================
// POST /onboarding/profile
// ============================================

/** Profile input data (without server-generated fields) */
export type ProfileInput = Omit<DeveloperProfile, "id" | "userId">;
export const ProfileInputSchema = DeveloperProfileSchema.omit({ id: true, userId: true });

export interface CreateProfileBody {
  profile: ProfileInput;
}

const CreateProfileBodySchema = z.object({
  profile: ProfileInputSchema,
}) satisfies z.ZodType<CreateProfileBody>;
```

## For Nested Objects

```typescript
/** Owner input data (without server-generated IDs) */
export type OwnerInput = Omit<Owner, "id">;
export const OwnerInputSchema = OwnerSchema.omit({ id: true });

/** Repository input data (without server-generated IDs) */
export type RepositoryInput = Omit<Repository, "id">;
export const RepositoryInputSchema = RepositorySchema.omit({ id: true });

export interface CreateProjectBody {
  owner?: OwnerInput;
  repositories?: RepositoryInput[];
}
```

## For Partial Updates (PUT/PATCH)

```typescript
export type UpdateProfileInput = Partial<Omit<DeveloperProfile, "id" | "userId">>;
export const UpdateProfileInputSchema = DeveloperProfileSchema.omit({ id: true, userId: true }).partial();
```

## Rules

- Always define in endpoint file, not model file
- Type: `Omit<Model, "id" | "...">`
- Schema: `ModelSchema.omit({ id: true, ... })`
- Add JSDoc comment explaining what's omitted
- Wrap in body interface: `{ profile: ProfileInput }`
