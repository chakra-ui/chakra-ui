---
---

## Simplify Workflow

- Added Changeset CLI to the monorepo root
- Installed Changsetbot to Chakra UI org
- Update the version number of `@chakra-ui/theme` in `packages/toast`, thanks to
  changeset for catching this 😄.
- Fix many dependency errors surfaced by `manypkg`, done automatically by
  running `manypkg fix`.

## Cleanup Package alias

Added `@manypkg/cli` to replace all the `yarn workspace @chakra-ui/<pkg>`
aliases in the root `package.json`

```sh
# before
yarn accordion build

# after
yarn pkg accordion build
```

This uses `manypkg run` under the hood to run specific scripts in the workspace
directories `packages`, `tooling`, etc.

## Update Github workflow

The publish workflow has been updated to include only `yarn release` in favor of
adding a `prerelease` script to the `package.json`.

The release script is managed by `changeset`, not `lerna`, so we run
`changeset publish` now
