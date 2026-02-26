# Breaking Changes

## When to Stop and Ask

BEFORE making changes, assess if they break consumers (backend/frontend):

### Breaking Changes (ASK FIRST)

- Removing fields from response
- Removing endpoints
- Renaming fields
- Changing field types
- Making optional fields required
- Changing URL paths
- Changing request body structure

### Non-Breaking Changes (SAFE)

- Adding new optional fields to response
- Adding new endpoints
- Adding new optional query params
- Making required fields optional
- Adding new enum values

## How to Ask

Template:

```
This change may break backend/frontend:

**Change**: [describe the change]

**Impact**:
- Backend: [what needs to change]
- Frontend: [what needs to change]

**Migration**:
1. [step 1]
2. [step 2]

Should I proceed? This will require:
- api-contracts version bump
- Backend update
- Frontend update
```

## Example

```
This change may break backend/frontend:

**Change**: Rename `FundIssueBody.creditAmount` to `FundIssueBody.amount`

**Impact**:
- Backend: Update controller to read `body.amount`
- Frontend: Update service to send `{ amount }`

**Migration**:
1. Update api-contracts with new structure
2. Bump version to 3.1.0
3. Update backend controller
4. Update frontend service

Should I proceed?
```

## After Approval

1. Make change in api-contracts
2. Run `npm run build` to verify
3. Bump version in package.json
4. Commit with clear message
5. Update backend (new version + code changes)
6. Update frontend (new version + code changes)

## Version Bumping

- Breaking change: Major version (3.0.0 → 4.0.0)
- New feature: Minor version (3.0.0 → 3.1.0)
- Bug fix: Patch version (3.0.0 → 3.0.1)

## Rules

- NEVER make breaking changes without asking
- ALWAYS list impacted consumers
- ALWAYS provide migration steps
- ALWAYS bump version after changes
- Coordinate updates across all repos
