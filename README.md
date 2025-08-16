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

**1. Update the Version**
Before publishing, you must increment the version number in the `package.json` file. Use the `npm version` command for this.

```bash
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