# UI Kit Repo Migration Guide (for AI Dev)

This document assumes the new GitHub repo is created and you have copied
`packages/ui-kit/` into the new repo root.

## Goals

- The package is published as `@nine4/ui-kit`.
- Consumers can install via npm (or GitHub Packages if chosen).
- No `@minimum-standards` naming remains in the UI kit repo.
- Build output is generated on publish (not committed).

## Checklist

### 1) Sanity check repo contents

- Repo root contains:
  - `src/`
  - `tsconfig.json`
  - `package.json`
- Remove any monorepo-only files or references.

### 2) Update `package.json`

Ensure:

- `"name": "@nine4/ui-kit"`
- `"main": "dist/index.js"`
- `"types": "dist/index.d.ts"`
- `"files": ["dist", "src", "README.md"]` (optional but recommended)
- Scripts:
  - `"build": "tsc -p tsconfig.json"`
  - `"prepublishOnly": "npm run build"`

If publishing to npm:

- `"publishConfig": { "access": "public" }`

If publishing to GitHub Packages:

- `"publishConfig": { "registry": "https://npm.pkg.github.com/" }`

### 3) Add `.gitignore`

Recommended entries:

```
node_modules
dist
.DS_Store
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

### 4) Add a README

Include:

- Install: `npm install @nine4/ui-kit`
- Usage examples (tokens, helpers).
- How to run build locally.

### 5) Build and verify

From the UI kit repo root:

```
npm install
npm run build
```

Confirm `dist/` is created.

### 6) Publish

For npm:

```
npm publish
```

For GitHub Packages, ensure your npm config has the right registry and auth,
then:

```
npm publish --registry https://npm.pkg.github.com/
```

### 7) Update consuming apps

In each app repo:

- Replace local dependency:
  - From: `"@nine4/ui-kit": "file:../../packages/ui-kit"`
  - To: `"@nine4/ui-kit": "^0.1.0"` (or whatever version you published)
- Run `npm install`.

### 8) Verify imports

Run a search for old package names:

- `@minimum-standards/ui-kit` should not exist.
- `@your-org/ui-kit` should not exist.

### 9) Optional: release hygiene

- Add `CHANGELOG.md`.
- Add GitHub Actions for publish on tag (optional).
- Add `LICENSE` if needed.

## Notes / Constraints

- The UI kit does **not** export `useTheme()`; each app should provide its own.
- The package is pure tokens + helpers; avoid app-specific hooks or stores.

