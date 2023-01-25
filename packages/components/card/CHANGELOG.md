# @chakra-ui/card

## 2.1.6

### Patch Changes

- [#7248](https://github.com/chakra-ui/chakra-ui/pull/7248)
  [`c57b00f80`](https://github.com/chakra-ui/chakra-ui/commit/c57b00f80f177c2a165dc3e879e30e362b0806fb)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Improved JS Doc
  comments to include default values
  - Fixed regression in exported components

## 2.1.5

### Patch Changes

- [`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages

- Updated dependencies
  [[`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)]:
  - @chakra-ui/shared-utils@2.0.5

## 2.1.4

### Patch Changes

- [#7154](https://github.com/chakra-ui/chakra-ui/pull/7154)
  [`2d7398a01`](https://github.com/chakra-ui/chakra-ui/commit/2d7398a0142b5bdd3f68ce05bd159fc824cda5ef)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - ## All components

  Improved the bundling setup for all components.

  - Switched to the `.mjs` file extension for correct ESM behavior
  - Switched to the latest `tsup` will uses automatic JSX runtime detection
    removing the need for manually inject classic `React` import
  - Moved `tsup` config to `package.json` since it's very minimal
  - Removed `clean-package.config.json` in favor of the `package.json` property
  - Fixed issue where Storybook addon (dark mode and RTL) was not working

- Updated dependencies
  [[`2d7398a01`](https://github.com/chakra-ui/chakra-ui/commit/2d7398a0142b5bdd3f68ce05bd159fc824cda5ef)]:
  - @chakra-ui/shared-utils@2.0.4

## 2.1.3

### Patch Changes

- [#7114](https://github.com/chakra-ui/chakra-ui/pull/7114)
  [`0b8c2cf65`](https://github.com/chakra-ui/chakra-ui/commit/0b8c2cf658d3ab5a9feecd8ceb891208ca0fe4ac)
  Thanks [@anubra266](https://github.com/anubra266)! - Fix theme being overriden

## 2.1.2

### Patch Changes

- [`43aba8ac8`](https://github.com/chakra-ui/chakra-ui/commit/43aba8ac88dc729b17ae7474b42f82642fe5a15f)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Refactor style
  context to use `createStylesContext` from `@chakra-ui/system`

## 2.1.1

### Patch Changes

- [`33e039e2e`](https://github.com/chakra-ui/chakra-ui/commit/33e039e2e0f52bfef20eddd13005534812ccb654)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix
  `React is not defined` issue when importing `Card` component.

## 2.1.0

### Minor Changes

- [#6947](https://github.com/chakra-ui/chakra-ui/pull/6947)
  [`2a86d6c35`](https://github.com/chakra-ui/chakra-ui/commit/2a86d6c353e88d86b46030a53130a062433f30b2)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Added `Card`
  component

  ```jsx live="false"
  export const Basic = () => (
    <Card>
      <CardHeader>
        <Heading size="md"> Customer dashboard</Heading>
      </CardHeader>
      <CardBody>
        <Text>View a summary of all your customers over the last month.</Text>
      </CardBody>
      <CardFooter>
        <Button>View here</Button>
      </CardFooter>
    </Card>
  )
  ```

### Patch Changes

- Updated dependencies
  [[`75eaba929`](https://github.com/chakra-ui/chakra-ui/commit/75eaba9293e2c7d5bd6aed2037df05128f335930)]:
  - @chakra-ui/react-context@2.0.5
