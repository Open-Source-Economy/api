# API Contracts AI Instructions

## IMPORTANT: Before Making Changes

**If a change might affect backend or frontend:**

1. STOP and consider impact
2. Read `.claude/rules/breaking-changes.md`
3. ASK the user before proceeding
4. Changes require version bump + sync to consumers

## Quick Reference

| Task                   | Guide                                  |
| ---------------------- | -------------------------------------- |
| Breaking change risk   | `.claude/rules/breaking-changes.md`    |
| Create endpoint        | `.claude/rules/endpoints.md`           |
| Create model           | `.claude/rules/models.md`              |
| Create input type      | `.claude/rules/input-types.md`         |
| Create schema          | `.claude/rules/schemas.md`             |
| Create enum            | `.claude/rules/enums.md`               |
| Create contract        | `.claude/rules/contracts.md`           |
| Fix import issues      | `.claude/rules/imports.md`             |
| Fix export issues      | `.claude/rules/exports.md`             |
| Update style guide     | `.claude/rules/style-guide-updates.md` |

## Critical Rules

- Never use string unions → use native `enum`
- Never use `as` casts for branded types → use schema `.parse()`
- Never use relative imports → use `src/` absolute paths
- Never use model directly as body → wrap in named property
- Always use `satisfies z.ZodType<Interface>` for schemas
- Always use `as const satisfies <Method>EndpointDefinition`
- Always use `ProblemDetailsSchema` for error responses
- Always use `Omit<Model, "id" | "createdAt">` for input types
- Breaking changes require user approval first
