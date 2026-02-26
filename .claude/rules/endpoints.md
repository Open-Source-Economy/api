# Endpoints

## File Location

`src/endpoints/<resource>/<action>-<resource>.endpoint.ts`

## Required Imports

```typescript
import { z } from "zod";
import { type Model, ModelSchema } from "src/models";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { <Method>EndpointDefinition } from "src/types/endpoint.types";
```

## Structure Order

```typescript
// ============================================
// <METHOD> /<path>
// ============================================

// 1. Input types (if needed)
export type ModelInput = Omit<Model, "id" | "createdAt">;
export const ModelInputSchema = ModelSchema.omit({ id: true, createdAt: true });

// 2. Interfaces (always define, even if empty)
export interface <Action><Resource>Params {}
export interface <Action><Resource>Query {}
export interface <Action><Resource>Body { <field>: ModelInput; }
export interface <Action><Resource>Response { <field>: Model; }

// 3. Schemas (always define, even if empty)
const <Action><Resource>ParamsSchema = z.object({}) satisfies z.ZodType<<Action><Resource>Params>;
const <Action><Resource>QuerySchema = z.object({}) satisfies z.ZodType<<Action><Resource>Query>;
const <Action><Resource>BodySchema = z.object({
  <field>: ModelInputSchema,
}) satisfies z.ZodType<<Action><Resource>Body>;
const <Action><Resource>ResponseSchema = z.object({
  <field>: ModelSchema,
}) satisfies z.ZodType<<Action><Resource>Response>;

// 4. Endpoint definition
export const <action><Resource>Endpoint = {
  method: "<METHOD>",
  path: "/<resource>",
  pathParams: <Action><Resource>ParamsSchema,
  query: <Action><Resource>QuerySchema,
  body: <Action><Resource>BodySchema,  // POST/PATCH/PUT only
  responses: {
    <code>: <Action><Resource>ResponseSchema,
    400: ProblemDetailsSchema,
  },
  summary: "<Description>",
} as const satisfies <Method>EndpointDefinition;
```

## Status Codes by Method

| Method | Definition Type          | Success Code |
| ------ | ------------------------ | ------------ |
| GET    | GetEndpointDefinition    | 200          |
| POST   | PostEndpointDefinition   | 201          |
| PATCH  | PatchEndpointDefinition  | 200          |
| PUT    | PutEndpointDefinition    | 200          |
| DELETE | DeleteEndpointDefinition | 204          |

## Rules

- Always define Params/Query interfaces even if empty
- Always wrap body content in named property: `{ company: ... }`
- Always use `satisfies z.ZodType<Interface>`
- Always use `as const satisfies <Method>EndpointDefinition`
- Always use `ProblemDetailsSchema` for errors (RFC 7807)
- Use literal status codes (200, 201), not enums
