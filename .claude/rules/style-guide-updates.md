# Style Guide Updates

## When User Requests Style Guide Change

When the user asks to change a coding convention or style rule:

### 1. Update BOTH Locations

| File                 | Purpose                               |
| -------------------- | ------------------------------------- |
| `STYLE_GUIDE.md`     | Human-readable, detailed explanations |
| `.claude/rules/*.md` | AI-readable, compact rules            |

### 2. Update Steps

1. **Update STYLE_GUIDE.md** (human docs)
   - Add/modify the rule with full explanation
   - Include examples and reasoning
   - Add to table of contents if new section

2. **Update .claude/rules/\*.md** (AI docs)
   - Find the relevant file in `.claude/rules/`
   - Add/modify the compact rule
   - Update code patterns if needed
   - Update CLAUDE.md if new file created

3. **Verify consistency**
   - Rules match between both locations
   - No contradictions

### 3. File Mapping

| Topic          | STYLE_GUIDE.md Section  | .claude/rules/ File     |
| -------------- | ----------------------- | ----------------------- |
| File structure | File Structure          | models.md, endpoints.md |
| Enums          | Native Enums            | enums.md                |
| Imports        | Import Style            | imports.md              |
| Endpoints      | Endpoint File Structure | endpoints.md            |
| Interfaces     | Interface Definitions   | endpoints.md            |
| Body wrapping  | Request Body Interfaces | input-types.md          |
| Schemas        | Schema Definitions      | schemas.md              |
| Contracts      | Contract Definitions    | contracts.md            |
| Exports        | Barrel Exports          | exports.md              |
| Branded types  | Branded Types           | schemas.md              |

### 4. Example

User asks: "Add a rule that all schemas must have a JSDoc comment"

**Update STYLE_GUIDE.md:**

```markdown
## Schema Documentation

All exported schemas must have a JSDoc comment describing what they validate:

\`\`\`typescript
/** Schema for validating profile creation input */
export const ProfileInputSchema = z.object({
  name: z.string().min(1),
});
\`\`\`
```

**Update .claude/rules/schemas.md:**

```markdown
## Documentation

- All exported schemas need JSDoc: `/** Description */`
```

## Rules

- ALWAYS update both human and AI docs
- Keep AI docs compact (rules only, no explanations)
- Keep human docs detailed (with reasoning)
- Verify no contradictions between the two
