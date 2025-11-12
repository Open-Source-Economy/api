# `@open-source-economy/api-types`

This package serves as the single source of truth for all shared TypeScript types used across the Open Source Economy platform's frontend and backend services.

By centralizing these types, we ensure a consistent and type-safe data contract, reducing errors and improving the developer experience.

## Installation

To install this package in your project, run the following command:

```bash
npm install @open-source-economy/api-types
# or
yarn add @open-source-economy/api-types
```

## Usage

You can import any of the shared interfaces and types directly from the package.

```typescript
import { User, Post, Issue } from '@open-source-economy/api-types';

// Example on the frontend
const fetchUser = async (userId: string): Promise<User> => {
  // ...
};

// Example on the backend
const createUser = async (userData: User): Promise<User> => {
  // ...
};
```

-----

## Making Changes and Publishing a New Version

The types in this package are a shared contract. **Any changes here will affect all dependent projects.** Follow these steps to ensure a smooth update process for everyone.

### 1\. Versioning

This project follows [Semantic Versioning (SemVer)](https://semver.org/).

* **Patch Release (`1.0.1`)**: For bug fixes, minor additions, or non-breaking documentation changes.
* **Minor Release (`1.1.0`)**: For new, backwards-compatible features (e.g., adding a new field to an interface).
* **Major Release (`2.0.0`)**: For breaking changes (e.g., removing a field, changing a type, or renaming an interface).

### 2\. The Release Process

To propose a change, submit a Pull Request to the `main` branch. Once your changes are merged, a new version can be published.

**1. Make sure your changes are tested and documented.**
Ensure that any changes to types are reflected in the documentation and that you have added or updated tests as necessary.

```shell
npm run build 
npm run fmt
```

**1. Update the Version**
Before publishing, you must increment the version number in the `package.json` file. Use the `npm version` command for this.

```bash

npm version patch

# For a minor, backwards-compatible change
npm version minor

# For a major, breaking change
npm version major
```

This command automatically updates the version number in `package.json` and creates a Git tag.

**2. Publish to npm**
After updating the version, run the publish command. The `prepublishOnly` script will automatically run the build process before publishing.

```bash
npm publish
```

This command will:

1.  Run the `build` script (`tsc`) to compile your TypeScript and generate `.d.ts` files.
2.  Package and upload the `dist` folder to the npm registry.

**3. Notify Dependent Projects**
After publishing a new version, **you must communicate the change** to the teams or projects using this package.

* **For a breaking change (Major version)**: Provide a detailed list of changes in the Pull Request and release notes to help other teams update their code.
* **For all changes**: A new version of the package will need to be installed in the dependent projects (`npm install @open-source-economy/api-types@latest`).

-----

## Development

To get started on the package, clone the repository and install the dependencies:

```bash
git clone <your-repo-url>
cd api-types
npm install
```

To build the package locally:

```bash
npm run build
```

## Testing Changes Locally

### What is this for?

`npm link` creates a symbolic link between your local development version of `@open-source-economy/api-types` and projects that depend on it (like `web2-backend` or `frontend`). This allows you to:

- **Test type changes** before publishing to npm
- **Develop across multiple packages** simultaneously without publish/install cycles
- **Catch integration issues early** by testing in real dependent projects
- **Iterate quickly** on API contracts that affect multiple repositories

### When should you use this?

Use `npm link` when you need to:

- ✅ Add or modify types/interfaces/DTOs that will be used by backend or frontend
- ✅ Test breaking changes before releasing a major version
- ✅ Verify that your changes work end-to-end across the stack
- ✅ Debug type-related issues in dependent projects
- ✅ Work on features that require coordinated changes across api-types and consuming projects

**Don't use it for:**

- ❌ Simple documentation changes (just publish directly)
- ❌ Long-term development (link can cause confusion; remember to unlink when done)
- ❌ Changes you're not planning to test locally

### Setting up Local Development

**1. Link the api-types package globally:**
```bash
cd /path/to/api
npm link
```

This registers `@open-source-economy/api-types` globally on your machine, making it available for linking.

**2. Link the package in your dependent project:**
```bash
cd /path/to/web2-backend
npm link @open-source-economy/api-types
```

This replaces the npm-installed version with a symlink to your local development version.

**3. Verify the link is working:**
```bash
ls -la node_modules/@open-source-economy/api-types
```
You should see it's a symbolic link pointing to your local api folder.

### Development Workflow

1. **Make changes** to the types/DTOs in the api folder
2. **Build the package** to compile TypeScript changes:
   ```bash
   cd /path/to/api
   npm run build
   ```
   💡 **Tip:** The build outputs to the `dist/` folder, which is what consuming projects actually import.

3. **Test in dependent projects** - changes in `dist/` are immediately available in linked projects
   - Restart your TypeScript server in VSCode if types don't update
   - Restart your backend/frontend dev server if needed

4. **Iterate** - make changes, rebuild, test - repeat as needed

5. **When ready to publish**, follow the [Making Changes and Publishing](#making-changes-and-publishing-a-new-version) process

### Unlinking (when done with local development)

⚠️ **Important:** Always unlink when you're done to avoid confusion later!

To stop using the local version and return to the published npm version:

```bash
cd /path/to/web2-backend
npm unlink @open-source-economy/api-types
npm install @open-source-economy/api-types
```

To unlink globally (optional cleanup):
```bash
cd /path/to/api
npm unlink
```


### Patch publish example

```shell
npm run build 
npm run fmt
git add .
git commit -m "No time to understand why it was not published"
git push origin
npm version patch
npm publish
rm -f -rm dist
```

### beta publish example

```shell
npm run build 
npm run fmt
git add .
git commit -m "Update GetProjectDetailsResponse"
git push origin
npm version prerelease --preid=alpha
npm publish --tag alpha
rm -f -rm dist
```

### beta publish example

```shell
npm run build 
npm run fmt
git add .
git commit -m "Fix: GetDeveloperProfile"
git push origin
npm version prerelease --preid=beta
npm publish --tag beta
rm -f -rm dist
```


### Latest publish example

```shell
npm run build 
npm run fmt
git add .
git commit -m "Implement VerificationStatus for DeveloperProfile and DeveloperProjectItem"
git push origin
npm version 2.1.9
npm publish --tag
rm -f -rm dist
```

