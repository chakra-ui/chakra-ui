# Change Log

## 2.1.9

### Patch Changes

- [#7315](https://github.com/chakra-ui/chakra-ui/pull/7315)
  [`403513380`](https://github.com/chakra-ui/chakra-ui/commit/4035133801cdcf66487f73feb73a6bfd02a063f4)
  Thanks [@mantariksh](https://github.com/mantariksh)! - Fix issue where `Menu`
  schedules focus too frequently and leads to infinite rerenders.
- Updated dependencies []:
  - @chakra-ui/descendant@3.0.13
  - @chakra-ui/popper@3.0.13
  - @chakra-ui/transition@2.0.15
  - @chakra-ui/clickable@2.0.14

## 2.1.8

### Patch Changes

- [#7248](https://github.com/chakra-ui/chakra-ui/pull/7248)
  [`c57b00f80`](https://github.com/chakra-ui/chakra-ui/commit/c57b00f80f177c2a165dc3e879e30e362b0806fb)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Improved JS Doc
  comments to include default values
  - Fixed regression in exported components
- Updated dependencies
  [[`c57b00f80`](https://github.com/chakra-ui/chakra-ui/commit/c57b00f80f177c2a165dc3e879e30e362b0806fb)]:
  - @chakra-ui/clickable@2.0.14
  - @chakra-ui/popper@3.0.13
  - @chakra-ui/transition@2.0.15

## 2.1.7

### Patch Changes

- [`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages

- Updated dependencies
  [[`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)]:
  - @chakra-ui/clickable@2.0.13
  - @chakra-ui/descendant@3.0.13
  - @chakra-ui/popper@3.0.12
  - @chakra-ui/transition@2.0.14
  - @chakra-ui/react-context@2.0.7
  - @chakra-ui/react-use-animation-state@2.0.8
  - @chakra-ui/react-use-controllable-state@2.0.8
  - @chakra-ui/react-use-disclosure@2.0.8
  - @chakra-ui/react-use-focus-effect@2.0.9
  - @chakra-ui/react-use-merge-refs@2.0.7
  - @chakra-ui/react-use-outside-click@2.0.7
  - @chakra-ui/react-use-update-effect@2.0.7
  - @chakra-ui/lazy-utils@2.0.5
  - @chakra-ui/react-children-utils@2.0.6
  - @chakra-ui/shared-utils@2.0.5

## 2.1.6

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
  [[`b374879fe`](https://github.com/chakra-ui/chakra-ui/commit/b374879fe0c72362575d86161d3093cd73b12caf),
  [`2d7398a01`](https://github.com/chakra-ui/chakra-ui/commit/2d7398a0142b5bdd3f68ce05bd159fc824cda5ef)]:
  - @chakra-ui/popper@3.0.11
  - @chakra-ui/clickable@2.0.12
  - @chakra-ui/descendant@3.0.12
  - @chakra-ui/transition@2.0.13
  - @chakra-ui/react-context@2.0.6
  - @chakra-ui/react-use-animation-state@2.0.7
  - @chakra-ui/react-use-controllable-state@2.0.7
  - @chakra-ui/react-use-disclosure@2.0.7
  - @chakra-ui/react-use-focus-effect@2.0.8
  - @chakra-ui/react-use-merge-refs@2.0.6
  - @chakra-ui/react-use-outside-click@2.0.6
  - @chakra-ui/react-use-update-effect@2.0.6
  - @chakra-ui/lazy-utils@2.0.4
  - @chakra-ui/react-children-utils@2.0.5
  - @chakra-ui/shared-utils@2.0.4

## 2.1.5

### Patch Changes

- [#7032](https://github.com/chakra-ui/chakra-ui/pull/7032)
  [`f84891b10`](https://github.com/chakra-ui/chakra-ui/commit/f84891b103c1b666f660018442fd92151e3ea868)
  Thanks [@anubra266](https://github.com/anubra266)! - Add support for setting
  the initially focused menu programmatically

  ```jsx live=false
  const Example = () => {
    const itemRef = useRef(null)
    return (
      <Menu initialFocusRef={itemRef}>
        <MenuButton>Welcome</MenuButton>
        <MenuList>
          <MenuItem>Menu 1</MenuItem>
          <MenuItem ref={itemRef}>Menu 2</MenuItem>
          <MenuItem>Menu 3</MenuItem>
        </MenuList>
      </Menu>
    )
  }
  ```

- Updated dependencies []:
  - @chakra-ui/popper@3.0.10
  - @chakra-ui/clickable@2.0.11
  - @chakra-ui/descendant@3.0.11

## 2.1.4

### Patch Changes

- [#6945](https://github.com/chakra-ui/chakra-ui/pull/6945)
  [`75eaba929`](https://github.com/chakra-ui/chakra-ui/commit/75eaba9293e2c7d5bd6aed2037df05128f335930)
  Thanks [@anddoutoi](https://github.com/anddoutoi)! - Fix issue where using
  `@chakra-ui/react` in a TypeScript project with `"type": "module"` in
  `package.json` and `"moduleResolution": "Node16"` in `tsconfig.json` cannot
  find the types.
- Updated dependencies
  [[`75eaba929`](https://github.com/chakra-ui/chakra-ui/commit/75eaba9293e2c7d5bd6aed2037df05128f335930)]:
  - @chakra-ui/clickable@2.0.11
  - @chakra-ui/descendant@3.0.11
  - @chakra-ui/popper@3.0.9
  - @chakra-ui/transition@2.0.12
  - @chakra-ui/react-context@2.0.5
  - @chakra-ui/react-use-animation-state@2.0.6
  - @chakra-ui/react-use-controllable-state@2.0.6
  - @chakra-ui/react-use-disclosure@2.0.6
  - @chakra-ui/react-use-focus-effect@2.0.7
  - @chakra-ui/react-use-merge-refs@2.0.5
  - @chakra-ui/react-use-outside-click@2.0.5
  - @chakra-ui/react-use-update-effect@2.0.5
  - @chakra-ui/lazy-utils@2.0.3
  - @chakra-ui/react-children-utils@2.0.4

## 2.1.3

### Patch Changes

- Updated dependencies
  [[`49dc149cc`](https://github.com/chakra-ui/chakra-ui/commit/49dc149cc600af83dcde4fa9b6a34a6b14dca837)]:
  - @chakra-ui/react-use-focus-effect@2.0.6
  - @chakra-ui/descendant@3.0.10
  - @chakra-ui/popper@3.0.8
  - @chakra-ui/transition@2.0.11
  - @chakra-ui/clickable@2.0.10

## 2.1.2

### Patch Changes

- Updated dependencies
  [[`182080e4b`](https://github.com/chakra-ui/chakra-ui/commit/182080e4b2148cfc0a0699d02012ffbfc1f4274c),
  [`b06b3cca6`](https://github.com/chakra-ui/chakra-ui/commit/b06b3cca679cc7083826b8629add6db6b8218928)]:
  - @chakra-ui/transition@2.0.11
  - @chakra-ui/react-children-utils@2.0.3
  - @chakra-ui/descendant@3.0.10
  - @chakra-ui/popper@3.0.8
  - @chakra-ui/clickable@2.0.10

## 2.1.1

### Patch Changes

- [#6648](https://github.com/chakra-ui/chakra-ui/pull/6648)
  [`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Declare package exports
  @see https://webpack.js.org/guides/package-exports/

- Updated dependencies
  [[`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290)]:
  - @chakra-ui/clickable@2.0.10
  - @chakra-ui/descendant@3.0.10
  - @chakra-ui/popper@3.0.8
  - @chakra-ui/transition@2.0.10
  - @chakra-ui/react-context@2.0.4
  - @chakra-ui/react-use-animation-state@2.0.5
  - @chakra-ui/react-use-controllable-state@2.0.5
  - @chakra-ui/react-use-disclosure@2.0.5
  - @chakra-ui/react-use-focus-effect@2.0.5
  - @chakra-ui/react-use-merge-refs@2.0.4
  - @chakra-ui/react-use-outside-click@2.0.4
  - @chakra-ui/react-use-update-effect@2.0.4
  - @chakra-ui/lazy-utils@2.0.2
  - @chakra-ui/react-children-utils@2.0.2

## 2.1.0

### Minor Changes

- [#6679](https://github.com/chakra-ui/chakra-ui/pull/6679)
  [`1b89467f6`](https://github.com/chakra-ui/chakra-ui/commit/1b89467f6a1dae072e16884431d898497fa2e571)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Allow control of
  `framer-motion` elements via the `motionProps` prop.

### Patch Changes

- [#6562](https://github.com/chakra-ui/chakra-ui/pull/6562)
  [`11afae67a`](https://github.com/chakra-ui/chakra-ui/commit/11afae67ae7d17013b08988bbb7f4bf8b072c5de)
  Thanks [@iansjk](https://github.com/iansjk)! - Remove redundant ARIA roles

* [#6666](https://github.com/chakra-ui/chakra-ui/pull/6666)
  [`3e1b3f6b6`](https://github.com/chakra-ui/chakra-ui/commit/3e1b3f6b6a7398b71ac08339110f075695fbae94)
  Thanks [@TylerAPfledderer](https://github.com/TylerAPfledderer)! - Add missing
  component/function docs and relative docsite links.

  Ensures that all Components, functions, and hooks that have detailed pages on
  the Chakra site have corresponding JSDocs and links back to the docsite via
  IDE intellisense.

  Includes adding or fixing links within these docs to related WAI-ARIA
  patterns.

* Updated dependencies
  [[`a4df8b70c`](https://github.com/chakra-ui/chakra-ui/commit/a4df8b70c9ade7c331ba6b8d1b422e74b5b8e8c1),
  [`3e1b3f6b6`](https://github.com/chakra-ui/chakra-ui/commit/3e1b3f6b6a7398b71ac08339110f075695fbae94)]:
  - @chakra-ui/react-use-controllable-state@2.0.4
  - @chakra-ui/react-use-disclosure@2.0.4
  - @chakra-ui/react-use-animation-state@2.0.4
  - @chakra-ui/react-use-focus-effect@2.0.4
  - @chakra-ui/clickable@2.0.9
  - @chakra-ui/descendant@3.0.9
  - @chakra-ui/popper@3.0.7
  - @chakra-ui/transition@2.0.9

## 2.0.13

### Patch Changes

- [`732195d17`](https://github.com/chakra-ui/chakra-ui/commit/732195d17154e07bc6f4e29ac686b3d2c9140338)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix regression in
  use menu group state

- Updated dependencies []:
  - @chakra-ui/clickable@2.0.9
  - @chakra-ui/descendant@3.0.9

## 2.0.12

### Patch Changes

- Updated dependencies
  [[`260076e2a`](https://github.com/chakra-ui/chakra-ui/commit/260076e2ac6165c8079c800475b9d7a9ca0f29a2)]:
  - @chakra-ui/descendant@3.0.9
  - @chakra-ui/clickable@2.0.9

## 2.0.11

### Patch Changes

- [#6508](https://github.com/chakra-ui/chakra-ui/pull/6508)
  [`445661955`](https://github.com/chakra-ui/chakra-ui/commit/445661955dff1329156b535ef50c7cf27b8663a9)
  Thanks [@anubra266](https://github.com/anubra266)! - - Initial release of
  react hooks
  - Refactor all packages to reduce bundle size
  - Refactor code for proper prop doc generatation
- Updated dependencies
  [[`445661955`](https://github.com/chakra-ui/chakra-ui/commit/445661955dff1329156b535ef50c7cf27b8663a9)]:
  - @chakra-ui/react-context@2.0.3
  - @chakra-ui/react-use-animation-state@2.0.3
  - @chakra-ui/react-use-controllable-state@2.0.3
  - @chakra-ui/react-use-disclosure@2.0.3
  - @chakra-ui/react-use-focus-effect@2.0.3
  - @chakra-ui/react-use-merge-refs@2.0.3
  - @chakra-ui/react-use-outside-click@2.0.3
  - @chakra-ui/react-use-update-effect@2.0.3
  - @chakra-ui/clickable@2.0.9
  - @chakra-ui/descendant@3.0.8
  - @chakra-ui/popper@3.0.7
  - @chakra-ui/transition@2.0.9
  - @chakra-ui/lazy-utils@2.0.1
  - @chakra-ui/react-children-utils@2.0.1

## 2.0.10

### Patch Changes

- Force release

- Updated dependencies []:
  - @chakra-ui/clickable@2.0.8
  - @chakra-ui/descendant@3.0.7
  - @chakra-ui/hooks@2.0.8
  - @chakra-ui/popper@3.0.6
  - @chakra-ui/react-utils@2.0.5
  - @chakra-ui/transition@2.0.8
  - @chakra-ui/utils@2.0.8

## 2.0.9

### Patch Changes

- Updated dependencies
  [[`dffc18b17`](https://github.com/chakra-ui/chakra-ui/commit/dffc18b1739ad148922fe98e4335457b298c8862),
  [`04ff824ac`](https://github.com/chakra-ui/chakra-ui/commit/04ff824ac2f69aaa82d08bf2905ad4667327db12),
  [`99af1e29f`](https://github.com/chakra-ui/chakra-ui/commit/99af1e29fa7b8c8b0bee217227d05f695a0acb47)]:
  - @chakra-ui/utils@2.0.7
  - @chakra-ui/hooks@2.0.7
  - @chakra-ui/clickable@2.0.7
  - @chakra-ui/react-utils@2.0.4
  - @chakra-ui/transition@2.0.7
  - @chakra-ui/descendant@3.0.6
  - @chakra-ui/popper@3.0.5

## 2.0.8

### Patch Changes

- Force new release

- Updated dependencies []:
  - @chakra-ui/clickable@2.0.6
  - @chakra-ui/descendant@3.0.5
  - @chakra-ui/hooks@2.0.6
  - @chakra-ui/popper@3.0.4
  - @chakra-ui/react-utils@2.0.3
  - @chakra-ui/transition@2.0.6
  - @chakra-ui/utils@2.0.6

## 2.0.7

### Patch Changes

- [#6356](https://github.com/chakra-ui/chakra-ui/pull/6356)
  [`1839e22eb`](https://github.com/chakra-ui/chakra-ui/commit/1839e22ebad1c2a52795eac5fd0b3eb38ae03f9c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Force release due
  to change in build configuration
  - Update package `main` and `module` entries
- Updated dependencies
  [[`1839e22eb`](https://github.com/chakra-ui/chakra-ui/commit/1839e22ebad1c2a52795eac5fd0b3eb38ae03f9c)]:
  - @chakra-ui/clickable@2.0.5
  - @chakra-ui/descendant@3.0.4
  - @chakra-ui/hooks@2.0.5
  - @chakra-ui/popper@3.0.3
  - @chakra-ui/react-utils@2.0.2
  - @chakra-ui/transition@2.0.5
  - @chakra-ui/utils@2.0.5

## 2.0.6

### Patch Changes

- Updated dependencies
  [[`c11743b47`](https://github.com/chakra-ui/chakra-ui/commit/c11743b47f38f8f38a21b120add3a9cf765b81ee)]:
  - @chakra-ui/utils@2.0.4
  - @chakra-ui/clickable@2.0.4
  - @chakra-ui/hooks@2.0.4
  - @chakra-ui/transition@2.0.4

## 2.0.5

### Patch Changes

- [#6281](https://github.com/chakra-ui/chakra-ui/pull/6281)
  [`8bfeefbb5`](https://github.com/chakra-ui/chakra-ui/commit/8bfeefbb562fc5ada4757309db6b951c421342ad)
  Thanks [@ShumRain](https://github.com/ShumRain)! - Export `useStyles`
  equivalent for multipart component styles. Accordion exports
  `useAccordionStyles`, Alert exports `useAlertStyles`, and so on.
- Updated dependencies
  [[`36ef37d58`](https://github.com/chakra-ui/chakra-ui/commit/36ef37d58220dffc4b8e35c31fdcc57042e9a859),
  [`b6aa32a4b`](https://github.com/chakra-ui/chakra-ui/commit/b6aa32a4b4af82e42d98a9afa427174ab4cb4ab7),
  [`6c15ec2c2`](https://github.com/chakra-ui/chakra-ui/commit/6c15ec2c2a32a36ecc2d169308379a6825619543)]:
  - @chakra-ui/utils@2.0.3
  - @chakra-ui/transition@2.0.3
  - @chakra-ui/clickable@2.0.3
  - @chakra-ui/hooks@2.0.3

## 2.0.4

### Patch Changes

- Updated dependencies
  [[`7d96e0466`](https://github.com/chakra-ui/chakra-ui/commit/7d96e0466fbe1b2d45e95e12e466feb304397eda)]:
  - @chakra-ui/descendant@3.0.3

## 2.0.3

### Patch Changes

- [`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages
  to resolve deps issues

* [#6137](https://github.com/chakra-ui/chakra-ui/pull/6137)
  [`7de782f04`](https://github.com/chakra-ui/chakra-ui/commit/7de782f0485656a6d10099339da509084cb3ee88)
  Thanks [@Patrick-Ullrich](https://github.com/Patrick-Ullrich)! - Improve error
  messaging around style provider factory by creating a custom
  `createStylesContext` function.
* Updated dependencies
  [[`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1)]:
  - @chakra-ui/clickable@2.0.2
  - @chakra-ui/descendant@3.0.2
  - @chakra-ui/hooks@2.0.2
  - @chakra-ui/popper@3.0.2
  - @chakra-ui/react-utils@2.0.1
  - @chakra-ui/transition@2.0.2
  - @chakra-ui/utils@2.0.2

## 2.0.2

### Patch Changes

- Updated dependencies
  [[`f77e3c98f`](https://github.com/chakra-ui/chakra-ui/commit/f77e3c98f72fa17353e9fdad4c51810e83d9cb1c),
  [`703ff594f`](https://github.com/chakra-ui/chakra-ui/commit/703ff594f826207a7b3d37663caaad365212b23e)]:
  - @chakra-ui/utils@2.0.1
  - @chakra-ui/popper@3.0.1
  - @chakra-ui/transition@2.0.1
  - @chakra-ui/clickable@2.0.1
  - @chakra-ui/hooks@2.0.1

## 2.0.1

### Patch Changes

- Updated dependencies
  [[`3319eca8b`](https://github.com/chakra-ui/chakra-ui/commit/3319eca8bf02b892ea345a68294110919e2963cb)]:
  - @chakra-ui/descendant@3.0.1

## 2.0.0

### Major Changes

- [#5879](https://github.com/chakra-ui/chakra-ui/pull/5879)
  [`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump all packages
  to next major for Chakra UI version 2.

* [#5989](https://github.com/chakra-ui/chakra-ui/pull/5989)
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Omit `src`
  directory from being published to npm

- [#5882](https://github.com/chakra-ui/chakra-ui/pull/5882)
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump peer
  dependency to React and ReactDOM to >=18

### Patch Changes

- Updated dependencies
  [[`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f),
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7),
  [`1a47fd27e`](https://github.com/chakra-ui/chakra-ui/commit/1a47fd27e6e37ff5d149e0469888eed0ec306632),
  [`8991ac13e`](https://github.com/chakra-ui/chakra-ui/commit/8991ac13e5ec71cc1fbd09610981913b7efe9798),
  [`6b969b41d`](https://github.com/chakra-ui/chakra-ui/commit/6b969b41dad850fa061613b3d50f50b8a15265a7),
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196),
  [`d32aea176`](https://github.com/chakra-ui/chakra-ui/commit/d32aea176b66b4d5206df10530c011f8eaa2e42d)]:
  - @chakra-ui/clickable@2.0.0
  - @chakra-ui/descendant@3.0.0
  - @chakra-ui/hooks@2.0.0
  - @chakra-ui/popper@3.0.0
  - @chakra-ui/react-utils@2.0.0
  - @chakra-ui/transition@2.0.0
  - @chakra-ui/utils@2.0.0

## 2.0.0-next.4

### Major Changes

- [#5989](https://github.com/chakra-ui/chakra-ui/pull/5989)
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Omit `src`
  directory from being published to npm

### Patch Changes

- Updated dependencies
  [[`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7)]:
  - @chakra-ui/clickable@2.0.0-next.2
  - @chakra-ui/descendant@3.0.0-next.2
  - @chakra-ui/hooks@2.0.0-next.3
  - @chakra-ui/popper@3.0.0-next.3
  - @chakra-ui/react-utils@2.0.0-next.2
  - @chakra-ui/transition@2.0.0-next.2
  - @chakra-ui/utils@2.0.0-next.2

## 2.0.0-next.3

### Patch Changes

- Updated dependencies
  [[`6b969b41d`](https://github.com/chakra-ui/chakra-ui/commit/6b969b41dad850fa061613b3d50f50b8a15265a7)]:
  - @chakra-ui/popper@3.0.0-next.2

## 2.0.0-next.2

### Patch Changes

- Updated dependencies
  [[`8991ac13e`](https://github.com/chakra-ui/chakra-ui/commit/8991ac13e5ec71cc1fbd09610981913b7efe9798),
  [`d32aea176`](https://github.com/chakra-ui/chakra-ui/commit/d32aea176b66b4d5206df10530c011f8eaa2e42d)]:
  - @chakra-ui/hooks@2.0.0-next.2

## 2.0.0-next.1

### Major Changes

- [#5882](https://github.com/chakra-ui/chakra-ui/pull/5882)
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump peer
  depencency to React and ReactDOM to >=18

### Patch Changes

- Updated dependencies
  [[`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
  - @chakra-ui/clickable@2.0.0-next.1
  - @chakra-ui/descendant@3.0.0-next.1
  - @chakra-ui/hooks@2.0.0-next.1
  - @chakra-ui/popper@3.0.0-next.1
  - @chakra-ui/react-utils@2.0.0-next.1
  - @chakra-ui/transition@2.0.0-next.1
  - @chakra-ui/utils@2.0.0-next.1

## 2.0.0-next.0

### Major Changes

- [#5879](https://github.com/chakra-ui/chakra-ui/pull/5879)
  [`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump all packages
  to next major for Chakra UI version 2.

### Patch Changes

- Updated dependencies
  [[`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f),
  [`1a47fd27e`](https://github.com/chakra-ui/chakra-ui/commit/1a47fd27e6e37ff5d149e0469888eed0ec306632)]:
  - @chakra-ui/clickable@2.0.0-next.0
  - @chakra-ui/descendant@3.0.0-next.0
  - @chakra-ui/hooks@2.0.0-next.0
  - @chakra-ui/popper@3.0.0-next.0
  - @chakra-ui/react-utils@2.0.0-next.0
  - @chakra-ui/system@2.0.0-next.0
  - @chakra-ui/transition@2.0.0-next.0
  - @chakra-ui/utils@2.0.0-next.0

## 1.8.11

### Patch Changes

- [#5782](https://github.com/chakra-ui/chakra-ui/pull/5782)
  [`a70077ea4`](https://github.com/chakra-ui/chakra-ui/commit/a70077ea4fe64a4ab58a7029c7a62f55684e8241)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  menu items cannot type `type=submit`

* [#5827](https://github.com/chakra-ui/chakra-ui/pull/5827)
  [`c220af152`](https://github.com/chakra-ui/chakra-ui/commit/c220af15274377575d03900f0baaa1c0a1400778)
  Thanks [@Jason-Hendry](https://github.com/Jason-Hendry)! - Fix issue where
  Create React App template fails with newer versions of `framer-motion`
* Updated dependencies
  [[`a3b04dc1a`](https://github.com/chakra-ui/chakra-ui/commit/a3b04dc1ae49ad0d804bddc17fdca3afa218665c),
  [`aaadcd0ed`](https://github.com/chakra-ui/chakra-ui/commit/aaadcd0ed9388417b0b647d75055ede0613d3495)]:
  - @chakra-ui/hooks@1.9.1
  - @chakra-ui/transition@1.4.8

## 1.8.10

### Patch Changes

- Updated dependencies
  [[`73a06ae8c`](https://github.com/chakra-ui/chakra-ui/commit/73a06ae8ce1bee644e10f245edcf2f9f2b773964)]:
  - @chakra-ui/hooks@1.9.0

## 1.8.9

### Patch Changes

- [#5631](https://github.com/chakra-ui/chakra-ui/pull/5631)
  [`e4da6359d`](https://github.com/chakra-ui/chakra-ui/commit/e4da6359d0a007a4b23959b0b8feed6231a947b6)
  Thanks [@anubra266](https://github.com/anubra266)! - Fixed bug where passing
  `null` as value of `icon` prop in `MenuOptionItem` still rendered the icon.
- Updated dependencies
  [[`5cd5cff35`](https://github.com/chakra-ui/chakra-ui/commit/5cd5cff35e4837539d83a2157a07585d461b0aac)]:
  - @chakra-ui/hooks@1.8.5

## 1.8.8

### Patch Changes

- [`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process. Root cause was a bug in our
  CI configuration.
- Updated dependencies
  [[`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)]:
  - @chakra-ui/clickable@1.2.6
  - @chakra-ui/descendant@2.1.3
  - @chakra-ui/hooks@1.8.4
  - @chakra-ui/popper@2.4.3
  - @chakra-ui/react-utils@1.2.3
  - @chakra-ui/transition@1.4.7
  - @chakra-ui/utils@1.10.4

## 1.8.7

### Patch Changes

- Updated dependencies
  [[`a870e6b94`](https://github.com/chakra-ui/chakra-ui/commit/a870e6b94367b7c6448d5c5c5aa8577e33e15e3a)]:
  - @chakra-ui/utils@1.10.3
  - @chakra-ui/clickable@1.2.5
  - @chakra-ui/hooks@1.8.3
  - @chakra-ui/transition@1.4.6

## 1.8.6

### Patch Changes

- [#5536](https://github.com/chakra-ui/chakra-ui/pull/5536)
  [`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process.

- Updated dependencies
  [[`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)]:
  - @chakra-ui/clickable@1.2.4
  - @chakra-ui/descendant@2.1.2
  - @chakra-ui/hooks@1.8.2
  - @chakra-ui/popper@2.4.2
  - @chakra-ui/react-utils@1.2.2
  - @chakra-ui/transition@1.4.5
  - @chakra-ui/utils@1.10.2

## 1.8.5

### Patch Changes

- [#5499](https://github.com/chakra-ui/chakra-ui/pull/5499)
  [`f1d024749`](https://github.com/chakra-ui/chakra-ui/commit/f1d02474983dc8277e767dc729abc3cbb02cfe10)
  Thanks [@noobinthisgame](https://github.com/noobinthisgame)! - allow framer
  motion v6 as peer dependency

- Updated dependencies
  [[`f1d024749`](https://github.com/chakra-ui/chakra-ui/commit/f1d02474983dc8277e767dc729abc3cbb02cfe10),
  [`24b4333d0`](https://github.com/chakra-ui/chakra-ui/commit/24b4333d008d149380785f87f4891e28584ff89b)]:
  - @chakra-ui/transition@1.4.4
  - @chakra-ui/utils@1.10.1
  - @chakra-ui/clickable@1.2.3
  - @chakra-ui/hooks@1.8.1

## 1.8.4

### Patch Changes

- [#5442](https://github.com/chakra-ui/chakra-ui/pull/5442)
  [`cbad002e7`](https://github.com/chakra-ui/chakra-ui/commit/cbad002e7bdb439a0dfeada82ebfb5b529e145fe)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where the
  content of a lazy popover or menu gets unmounted before (framer-motion)
  animation ends leading to a janky user experience.
- Updated dependencies
  [[`cbad002e7`](https://github.com/chakra-ui/chakra-ui/commit/cbad002e7bdb439a0dfeada82ebfb5b529e145fe),
  [`6e259a1f7`](https://github.com/chakra-ui/chakra-ui/commit/6e259a1f7008a00f7be096e6b315cb9d62ef9748),
  [`1537a725f`](https://github.com/chakra-ui/chakra-ui/commit/1537a725fbc7f84979e374f546bda625fc685ac3)]:
  - @chakra-ui/hooks@1.8.0
  - @chakra-ui/utils@1.10.0
  - @chakra-ui/clickable@1.2.2
  - @chakra-ui/transition@1.4.3

## 1.8.3

### Patch Changes

- [#5296](https://github.com/chakra-ui/chakra-ui/pull/5296)
  [`94da4e986`](https://github.com/chakra-ui/chakra-ui/commit/94da4e9868a73794ba2256ff1de1916b2487cd03)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Omit `disabled` and
  `aria-disabled` props from `MenuItemProps` types

- Updated dependencies
  [[`801008e27`](https://github.com/chakra-ui/chakra-ui/commit/801008e276812a6f94f2f5dc634bcbfe01d23026),
  [`8a0e5bdbc`](https://github.com/chakra-ui/chakra-ui/commit/8a0e5bdbccb7fa10dd4cd7b909ca60991fce81a0)]:
  - @chakra-ui/hooks@1.7.2

## 1.8.2

### Patch Changes

- [`cd0b7996b`](https://github.com/chakra-ui/chakra-ui/commit/cd0b7996b3f9df999cd87371f1a4a1384a10063e)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  `enabled` TS type was exposed to popover and menu from `UsePopperProps`. This
  was resolved by omitting `enabled` from the type
- Updated dependencies
  [[`39846457e`](https://github.com/chakra-ui/chakra-ui/commit/39846457e241e6af3d18c77cdc0ba02857fe7462)]:
  - @chakra-ui/transition@1.4.2

## 1.8.1

### Patch Changes

- [#5075](https://github.com/chakra-ui/chakra-ui/pull/5075)
  [`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Update babel config to
  transpile soruces for older browsers. This fixes issues with CRA and
  Storybook.
- Updated dependencies
  [[`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)]:
  - @chakra-ui/clickable@1.2.1
  - @chakra-ui/descendant@2.1.1
  - @chakra-ui/hooks@1.7.1
  - @chakra-ui/popper@2.4.1
  - @chakra-ui/react-utils@1.2.1
  - @chakra-ui/transition@1.4.1
  - @chakra-ui/utils@1.9.1

## 1.8.0

### Minor Changes

- [#4991](https://github.com/chakra-ui/chakra-ui/pull/4991)
  [`6095eaf9a`](https://github.com/chakra-ui/chakra-ui/commit/6095eaf9ac64a7e4d9f934bcb530bae2a92111a6)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Update build system
  we use from a custom babel cli setup to
  [preconstruct](https://preconstruct.tools/).

  The previous build system transpiles the code in `src` directory to `dist/esm`
  and `dist/cjs` keeping the same file structure. The new build system merges
  all files in `src` and transpiles to a single `esm` and `cjs` file.

  **Potential Breaking Change:** The side effect of this is that, if you
  imported any function, component or hook using the **undocumented** approach
  like
  `import { useOutsideClick } from "@chakra-ui/hooks/dist/use-outside-click"`,
  you'll notice that the this doesn't work anymore.

  Here's how to resolve it:

  ```jsx live=false
  // Won't work 🎇
  import { useOutsideClick } from "@chakra-ui/hooks/dist/use-outside-click"

  // Works ✅
  import { useOutsideClick } from "@chakra-ui/hooks"
  ```

  If this affected your project, we recommend that you import hooks, functions
  or components the way it's shown in the documentation. This will help keep
  your project future-proof.

### Patch Changes

- Updated dependencies
  [[`6095eaf9a`](https://github.com/chakra-ui/chakra-ui/commit/6095eaf9ac64a7e4d9f934bcb530bae2a92111a6)]:
  - @chakra-ui/clickable@1.2.0
  - @chakra-ui/descendant@2.1.0
  - @chakra-ui/hooks@1.7.0
  - @chakra-ui/popper@2.4.0
  - @chakra-ui/react-utils@1.2.0
  - @chakra-ui/transition@1.4.0
  - @chakra-ui/utils@1.9.0

## 1.7.8

### Patch Changes

- [`04774e219`](https://github.com/chakra-ui/chakra-ui/commit/04774e2196b9f3e8edd77f779e8c15981e8d8135)
  [#4965](https://github.com/chakra-ui/chakra-ui/pull/4965) Thanks
  [@takethefake](https://github.com/takethefake)! - Allow usage of
  `framer-motion` 5.x in `peerDependency`

- Updated dependencies
  [[`04774e219`](https://github.com/chakra-ui/chakra-ui/commit/04774e2196b9f3e8edd77f779e8c15981e8d8135),
  [`c3f016149`](https://github.com/chakra-ui/chakra-ui/commit/c3f01614929d2f68a39cf78111d17f4f4c684706)]:
  - @chakra-ui/transition@1.3.8
  - @chakra-ui/popper@2.3.1

## 1.7.7

### Patch Changes

- [`98fdadd9d`](https://github.com/chakra-ui/chakra-ui/commit/98fdadd9df76369770a017ff1338fa2d9764a84e)
  [#4822](https://github.com/chakra-ui/chakra-ui/pull/4822) Thanks
  [@takethefake](https://github.com/takethefake)! - Fixed an error where the
  onOpen was called multiple/infinite times

* [`c28d9232d`](https://github.com/chakra-ui/chakra-ui/commit/c28d9232df555e88d149c17f2116600350c83b14)
  [#4888](https://github.com/chakra-ui/chakra-ui/pull/4888) Thanks
  [@dodas](https://github.com/dodas)! - Fix issue where computePositionOnMount
  didn't work without explict value

* Updated dependencies
  [[`5fe9b552b`](https://github.com/chakra-ui/chakra-ui/commit/5fe9b552bcae55935d1ab8ffde86b701075e6e6a),
  [`cd0893c56`](https://github.com/chakra-ui/chakra-ui/commit/cd0893c561d8c72b69db7c03d10adae752468a4f)]:
  - @chakra-ui/hooks@1.6.2
  - @chakra-ui/utils@1.8.4
  - @chakra-ui/clickable@1.1.9
  - @chakra-ui/transition@1.3.7

## 1.7.6

### Patch Changes

- Updated dependencies
  [[`c06d242c6`](https://github.com/chakra-ui/chakra-ui/commit/c06d242c672a10f93fab4dc2321143beae2db669),
  [`a9d1dc4ac`](https://github.com/chakra-ui/chakra-ui/commit/a9d1dc4ac874825f292d874ad4eadaf060fed436),
  [`5b4d8ef24`](https://github.com/chakra-ui/chakra-ui/commit/5b4d8ef24017dab1d69aeb5016b53366bdb3bcfd)]:
  - @chakra-ui/utils@1.8.3
  - @chakra-ui/hooks@1.6.1
  - @chakra-ui/clickable@1.1.8
  - @chakra-ui/transition@1.3.6

## 1.7.5

### Patch Changes

- Updated dependencies
  [[`eafb21e18`](https://github.com/chakra-ui/chakra-ui/commit/eafb21e1883cf40bfe44e143714d9a480a0cc7da)]:
  - @chakra-ui/transition@1.3.5

## 1.7.4

### Patch Changes

- [`19d9abe75`](https://github.com/chakra-ui/chakra-ui/commit/19d9abe75cf863468b70362ce7eee90f0ad94d29)
  [#4691](https://github.com/chakra-ui/chakra-ui/pull/4691) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where keyboard
  navigation doesn't work when `MenuButton` isn't rendered. This is useful in
  scenarios where you want the menu to be triggered by a command or right-click.
- Updated dependencies
  [[`4146a9051`](https://github.com/chakra-ui/chakra-ui/commit/4146a9051a5151532503e31c464193e9d118dd26)]:
  - @chakra-ui/popper@2.3.0

## 1.7.3

### Patch Changes

- Updated dependencies
  [[`28af4c030`](https://github.com/chakra-ui/chakra-ui/commit/28af4c0308e234871548c0857e946e33ff18a130)]:
  - @chakra-ui/hooks@1.6.0

## 1.7.2

### Patch Changes

- [`6dadb97db`](https://github.com/chakra-ui/chakra-ui/commit/6dadb97db74fb9e559c41770b8c99e1a9ed08577)
  [#4514](https://github.com/chakra-ui/chakra-ui/pull/4514) Thanks
  [@takethefake](https://github.com/takethefake)! - MenuList scroll to next
  MenuItem on KeyboardNavigation when there is a defined maxHeight on MenuList

* [`43f66097b`](https://github.com/chakra-ui/chakra-ui/commit/43f66097b39f1c37a4627dd6ca8a85555f35b95c)
  [#4458](https://github.com/chakra-ui/chakra-ui/pull/4458) Thanks
  [@agundermann](https://github.com/agundermann)! - Fix issues when rendering
  chakra components in different window

* Updated dependencies
  [[`4c1071969`](https://github.com/chakra-ui/chakra-ui/commit/4c1071969a9b41a952b374f9990ac0bb89d24fa0),
  [`43f66097b`](https://github.com/chakra-ui/chakra-ui/commit/43f66097b39f1c37a4627dd6ca8a85555f35b95c)]:
  - @chakra-ui/utils@1.8.2
  - @chakra-ui/clickable@1.1.7
  - @chakra-ui/hooks@1.5.5
  - @chakra-ui/transition@1.3.4

## 1.7.1

### Patch Changes

- Updated dependencies
  [[`4a1e4d93b`](https://github.com/chakra-ui/chakra-ui/commit/4a1e4d93b0a07df7266d40bb66039385b158d3d1)]:
  - @chakra-ui/utils@1.8.1
  - @chakra-ui/clickable@1.1.6
  - @chakra-ui/hooks@1.5.4
  - @chakra-ui/transition@1.3.3

## 1.7.0

### Minor Changes

- [`5afa7ef49`](https://github.com/chakra-ui/chakra-ui/commit/5afa7ef49c7e3b01bce932e252865226b9511b39)
  [#4180](https://github.com/chakra-ui/chakra-ui/pull/4180) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Added
  `computePositionOnMount` prop to allow positioning the popover or menu before
  initial open

### Patch Changes

- [`9fadbc80f`](https://github.com/chakra-ui/chakra-ui/commit/9fadbc80f626534edca5f9a789bda2b5232cde15)
  [#4211](https://github.com/chakra-ui/chakra-ui/pull/4211) Thanks
  [@tim-stasse](https://github.com/tim-stasse)! - Fixed menu typeahead

* [`afb9b3cfa`](https://github.com/chakra-ui/chakra-ui/commit/afb9b3cfa87076ed8897b7edd4a9d9f1e1701721)
  [#4103](https://github.com/chakra-ui/chakra-ui/pull/4103) Thanks
  [@with-heart](https://github.com/with-heart)! - Update transitions to use
  theme tokens and remove outline transitions

- [`245a164f6`](https://github.com/chakra-ui/chakra-ui/commit/245a164f6058e96986b2354017d96816b5d336e9)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  closeOnSelect won't work sometime

- Updated dependencies
  [[`e8da4c65f`](https://github.com/chakra-ui/chakra-ui/commit/e8da4c65f026f636ea26d11b7aaed63f2babf00d),
  [`aa374ffcb`](https://github.com/chakra-ui/chakra-ui/commit/aa374ffcb4003efd88eb6a62e10723ea9fbfa3d0),
  [`5afa7ef49`](https://github.com/chakra-ui/chakra-ui/commit/5afa7ef49c7e3b01bce932e252865226b9511b39)]:
  - @chakra-ui/transition@1.3.2
  - @chakra-ui/hooks@1.5.3
  - @chakra-ui/popper@2.2.1

## 1.6.3

### Patch Changes

- [`5e24481fc`](https://github.com/chakra-ui/chakra-ui/commit/5e24481fc73b0097d0bac900479d7cc145a92670)
  [#4026](https://github.com/chakra-ui/chakra-ui/pull/4026) Thanks
  [@dodas](https://github.com/dodas)! - Add `enabled` option to `usePopper`
  hook.

  The `popper.js` instance will not be created until this option is `true`.

  `Menu`, `Popover` and `Tooltip` components now use this option, so the
  `popper.js` instance is created only once the popper is open. This should
  significantly improve render and scroll performance.

- Updated dependencies
  [[`5e24481fc`](https://github.com/chakra-ui/chakra-ui/commit/5e24481fc73b0097d0bac900479d7cc145a92670)]:
  - @chakra-ui/popper@2.2.0

## 1.6.2

### Patch Changes

- [`e190ce1b3`](https://github.com/chakra-ui/chakra-ui/commit/e190ce1b30e17eb0cffaa00c7ec2660d25ba6c23)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  keyboard navigation doesn't work `isLazy` is passed.

* [`8dc0622e8`](https://github.com/chakra-ui/chakra-ui/commit/8dc0622e8a5acda768c694d2daa28a4181d829ad)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  typeaheaad overrides input keydown

* Updated dependencies
  [[`c1f8d90ad`](https://github.com/chakra-ui/chakra-ui/commit/c1f8d90ad7ebd9594e9888010170cda7969f0ded)]:
  - @chakra-ui/transition@1.3.1

## 1.6.1

### Patch Changes

- [`ad87d837a`](https://github.com/chakra-ui/chakra-ui/commit/ad87d837a9b7b117cec35d0819cc1f4c72769923)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  `closeOnSelect` didn't work for menuitem options

- Updated dependencies
  [[`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01),
  [`b199b06e3`](https://github.com/chakra-ui/chakra-ui/commit/b199b06e33924bdf98c9c13868f14172a20d0248),
  [`173738dd9`](https://github.com/chakra-ui/chakra-ui/commit/173738dd938903d2b0fcdc666a7c9f4fe13e2bd6),
  [`b479ff22e`](https://github.com/chakra-ui/chakra-ui/commit/b479ff22ea10c1a1393224c37c36aa6ceabc4aab),
  [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd),
  [`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01)]:
  - @chakra-ui/utils@1.8.0
  - @chakra-ui/transition@1.3.0
  - @chakra-ui/descendant@2.0.1
  - @chakra-ui/hooks@1.5.2
  - @chakra-ui/clickable@1.1.5

## 1.6.0

### Minor Changes

- [`d14c97420`](https://github.com/chakra-ui/chakra-ui/commit/d14c974203fe8c1a525d8932d5c8d0ae7d1fa84e)
  [#3864](https://github.com/chakra-ui/chakra-ui/pull/3864) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - - Update menu to use new
  descendants logic.
  - Fix issue where menu doesn't select menu item when the first item is
    disabled.
  - Fix issue where menu doesn't work when an input is used within it.

### Patch Changes

- [`1f94620a1`](https://github.com/chakra-ui/chakra-ui/commit/1f94620a11dc616f0982321114a9a236bbf872d2)
  [#3863](https://github.com/chakra-ui/chakra-ui/pull/3863) Thanks
  [@isBatak](https://github.com/isBatak)! - Fix issue where menu button doesn't
  work with truncated text

- Updated dependencies
  [[`82f08867f`](https://github.com/chakra-ui/chakra-ui/commit/82f08867fa4825d647a3b9cc805220d9364f2f3f),
  [`82f08867f`](https://github.com/chakra-ui/chakra-ui/commit/82f08867fa4825d647a3b9cc805220d9364f2f3f),
  [`e9ac4cc76`](https://github.com/chakra-ui/chakra-ui/commit/e9ac4cc7629cd79efc753b4e3353bacdad46cd7d)]:
  - @chakra-ui/react-utils@1.1.2
  - @chakra-ui/descendant@2.0.0
  - @chakra-ui/utils@1.7.0
  - @chakra-ui/clickable@1.1.4
  - @chakra-ui/hooks@1.5.1
  - @chakra-ui/popper@2.1.2
  - @chakra-ui/transition@1.2.2

## 1.5.0

### Minor Changes

- [`f2544fb58`](https://github.com/chakra-ui/chakra-ui/commit/f2544fb581a6dbe558236ebb11883a273ed61a28)
  [#3839](https://github.com/chakra-ui/chakra-ui/pull/3839) Thanks
  [@with-heart](https://github.com/with-heart)! - This change restores the
  behavior of the `isLazy` prop (which was broken by the previous release) and
  adds a new `lazyBehavior` prop which configures the behavior of `isLazy`.

  If you'd like the content of tab panel, popover and menu components to be
  unmounted when not selected or opened, please continue to use `isLazy`. This
  is the default behavior.

  If you'd like the content of tab panel, popover and menu components to remain
  mounted (but hidden) after it was previously selected or opened, use
  `lazyBehavior="keepMounted"` in combination with `isLazy`.

### Patch Changes

- [`57baa5e63`](https://github.com/chakra-ui/chakra-ui/commit/57baa5e6350f89f1098a5d965b90483348aa0073)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Make it possible to
  pass popper.js props to popover and menu

- Updated dependencies
  [[`0974e547c`](https://github.com/chakra-ui/chakra-ui/commit/0974e547c29e4efc1ba4d1eb1507d0dad7d7a77a),
  [`59ea894a7`](https://github.com/chakra-ui/chakra-ui/commit/59ea894a7e03d16cd7a1b89d00816eafa9fab65d),
  [`384902e35`](https://github.com/chakra-ui/chakra-ui/commit/384902e35b186c8c8154b9569455c27f72ee0f6f)]:
  - @chakra-ui/utils@1.6.0
  - @chakra-ui/hooks@1.5.0
  - @chakra-ui/clickable@1.1.3
  - @chakra-ui/transition@1.2.1
  - @chakra-ui/descendant@1.1.3

## 1.4.0

### Minor Changes

- [`29148130a`](https://github.com/chakra-ui/chakra-ui/commit/29148130a699409322931cc6ba1b970b7afeefbd)
  [#3762](https://github.com/chakra-ui/chakra-ui/pull/3762) Thanks
  [@franky47](https://github.com/franky47)! - Add `closeOnSelect` to `MenuItem`
  and `MenuItemOption`.

  This allows menu items to override their parent `Menu`'s `closeOnSelect`
  behavior.

  Can be useful for menus with a combination of `MenuItem`s (that generally
  close their menu when selected) and `MenuItemOption`s (that should keep the
  menu open for further edition).

### Patch Changes

- [`a588116f9`](https://github.com/chakra-ui/chakra-ui/commit/a588116f92911769334132d90ccec01d49f029aa)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Do not unmount
  menu list after first render

* [`d37b00021`](https://github.com/chakra-ui/chakra-ui/commit/d37b00021490c24bd3168a7f2800b6490aee90b1)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Use prop getter
  from use-popper to prevent ssr content jump

* Updated dependencies
  [[`8b5eb9654`](https://github.com/chakra-ui/chakra-ui/commit/8b5eb9654affe562795d38a19f732f84732a949d),
  [`5617aabea`](https://github.com/chakra-ui/chakra-ui/commit/5617aabeaa6c3faef37deeebeddbc9bf3cc88088),
  [`d1532f0b7`](https://github.com/chakra-ui/chakra-ui/commit/d1532f0b72c36d0609ee4510613d7c76f4f9c113),
  [`1615af488`](https://github.com/chakra-ui/chakra-ui/commit/1615af4881a6f37cffb7ea15078cf7ab6a4e4c79),
  [`a73198529`](https://github.com/chakra-ui/chakra-ui/commit/a7319852908f68596600da799ef08a0e7dbb468e)]:
  - @chakra-ui/utils@1.5.2
  - @chakra-ui/transition@1.2.0
  - @chakra-ui/hooks@1.4.0
  - @chakra-ui/popper@2.1.1
  - @chakra-ui/clickable@1.1.2
  - @chakra-ui/descendant@1.1.2

## 1.3.1

### Patch Changes

- [`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Update import of
  shared utils from `react-utils` to `utils`

- Updated dependencies
  [[`87a03b320`](https://github.com/chakra-ui/chakra-ui/commit/87a03b320b62e639ca4a891186f202cb839a8402),
  [`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94),
  [`c69d2b983`](https://github.com/chakra-ui/chakra-ui/commit/c69d2b98350b57f133d6a8ea47b631cd25693aee),
  [`75817ec42`](https://github.com/chakra-ui/chakra-ui/commit/75817ec428ca3c078660a7c7f2a1c1b578c474df),
  [`e481ba491`](https://github.com/chakra-ui/chakra-ui/commit/e481ba4914a7f163d93d4c22e2e457f1afb08721)]:
  - @chakra-ui/react-utils@1.1.1
  - @chakra-ui/clickable@1.1.1
  - @chakra-ui/utils@1.5.1
  - @chakra-ui/transition@1.1.2
  - @chakra-ui/popper@2.1.0
  - @chakra-ui/hooks@1.3.1
  - @chakra-ui/descendant@1.1.1

## 1.3.0

### Minor Changes

- [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)
  [#3674](https://github.com/chakra-ui/chakra-ui/pull/3674) Thanks
  [@codebender828](https://github.com/codebender828)! - Extract all React based
  utilities and types into `@chakra-ui/react-utils`

### Patch Changes

- Updated dependencies
  [[`623e782e8`](https://github.com/chakra-ui/chakra-ui/commit/623e782e80124297740a109e5c6c58cddc35b2eb),
  [`a58b724e9`](https://github.com/chakra-ui/chakra-ui/commit/a58b724e9c8656044f866b658f378662f2a44b46),
  [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)]:
  - @chakra-ui/hooks@1.3.0
  - @chakra-ui/utils@1.5.0
  - @chakra-ui/clickable@1.1.0
  - @chakra-ui/descendant@1.1.0
  - @chakra-ui/react-utils@1.1.0
  - @chakra-ui/transition@1.1.1
  - @chakra-ui/popper@2.0.1

## 1.2.0

### Minor Changes

- [`64e8466b5`](https://github.com/chakra-ui/chakra-ui/commit/64e8466b528a027c915b7d2d5f474b08a0800e92)
  [#3623](https://github.com/chakra-ui/chakra-ui/pull/3623) Thanks
  [@with-heart](https://github.com/with-heart)! - Added support for
  `framer-motion` v4

### Patch Changes

- [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b)
  [#3583](https://github.com/chakra-ui/chakra-ui/pull/3583) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - - Refactor arrow
  components to use `data-popper-arrow` and `data-popper-arrow-inner` to define
  the arrow elements. This is used within the modifiers to update the arrow
  styles/position positioning.

  - Change `arrowSize` and `arrowShadowColor` to use CSS custom properties
    instead of passing it to `usePopper`.

  - Update component themes to use `--popper-arrow-bg` to set the background for
    the popper's arrow element.

* [`9c143bfe5`](https://github.com/chakra-ui/chakra-ui/commit/9c143bfe5bbf180929fabb0a1b4c18d40f7fd3fc)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Update focus utils
  to use `nextTick` option since its default value is now false in the focus
  utils

  > `@internal` use only

* Updated dependencies
  [[`64e8466b5`](https://github.com/chakra-ui/chakra-ui/commit/64e8466b528a027c915b7d2d5f474b08a0800e92),
  [`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86),
  [`9c143bfe5`](https://github.com/chakra-ui/chakra-ui/commit/9c143bfe5bbf180929fabb0a1b4c18d40f7fd3fc),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b)]:
  - @chakra-ui/transition@1.1.0
  - @chakra-ui/hooks@1.2.0
  - @chakra-ui/utils@1.4.0
  - @chakra-ui/popper@2.0.0
  - @chakra-ui/descendant@1.0.9
  - @chakra-ui/clickable@1.0.6

## 1.1.3

### Patch Changes

- Updated dependencies
  [[`83ae62905`](https://github.com/chakra-ui/chakra-ui/commit/83ae62905935fdb3104380d6fd845159b00095fa),
  [`e1924c621`](https://github.com/chakra-ui/chakra-ui/commit/e1924c62182969a109b4900b05932caa1b73ed99),
  [`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/hooks@1.1.5
  - @chakra-ui/popper@1.1.5
  - @chakra-ui/utils@1.3.0
  - @chakra-ui/descendant@1.0.8
  - @chakra-ui/transition@1.0.9
  - @chakra-ui/clickable@1.0.5

## 1.1.2

### Patch Changes

- Updated dependencies
  [[`51ad518e2`](https://github.com/chakra-ui/chakra-ui/commit/51ad518e22642076485bee3dd1f99acbf025161b)]:
  - @chakra-ui/popper@1.1.4

## 1.1.1

### Patch Changes

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/clickable@1.0.4
  - @chakra-ui/hooks@1.1.4
  - @chakra-ui/popper@1.1.3
  - @chakra-ui/transition@1.0.8
  - @chakra-ui/descendant@1.0.7

## 1.1.0

### Minor Changes

- [`68694e5ab`](https://github.com/chakra-ui/chakra-ui/commit/68694e5ab774a5981be943acb705e6e0af34e870)
  [#3141](https://github.com/chakra-ui/chakra-ui/pull/3141) Thanks
  [@dodas](https://github.com/dodas)! - - The `MenuItem` now accepts a
  `commandSpacing` prop that can be used to adjust the space between the command
  and label.

  - Add support `rootProps` to `MenuList` so it's possible override the styles
    for root container for menu list. Common use case is to change the applied
    `zIndex` of the menulist.

  - Make it possible to override `zIndex` by passing props to `MenuList`

* [`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a)
  [#3092](https://github.com/chakra-ui/chakra-ui/pull/3092) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - - Improved theme typing in
  order to provide a better autocomplete experience
  - Fixed a type issue where pseudo style props like `_hover` and `_active`
    didn't allow regular css properties

### Patch Changes

- Updated dependencies
  [[`b572bceed`](https://github.com/chakra-ui/chakra-ui/commit/b572bceedd9fb0c41c65118f0d9ba672791932ca)]:
  - @chakra-ui/hooks@1.1.3
  - @chakra-ui/descendant@1.0.6
  - @chakra-ui/popper@1.1.2
  - @chakra-ui/transition@1.0.7

## 1.0.6

### Patch Changes

- [`66193eb2`](https://github.com/chakra-ui/chakra-ui/commit/66193eb2073867ea47d062d4723416aae0e962b8)
  [#3116](https://github.com/chakra-ui/chakra-ui/pull/3116) Thanks
  [@tmikeschu](https://github.com/tmikeschu)! - Update Menu docs for the
  autoSelect property to specify focus over "selected".

- Updated dependencies
  [[`002a4361`](https://github.com/chakra-ui/chakra-ui/commit/002a4361bd738bef49e021a2fff2b9b6a9af5815)]:
  - @chakra-ui/hooks@1.1.2
  - @chakra-ui/descendant@1.0.5
  - @chakra-ui/popper@1.1.1
  - @chakra-ui/transition@1.0.6

## 1.0.5

### Patch Changes

- [`26f28512`](https://github.com/chakra-ui/chakra-ui/commit/26f285129f6c739b24bf28ede71a5358ba4dbf9f)
  [#3080](https://github.com/chakra-ui/chakra-ui/pull/3080) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Update styles to use css
  logical style props

* [`032f1678`](https://github.com/chakra-ui/chakra-ui/commit/032f16788553b84685de61af5f021c395e09648f)
  [#3022](https://github.com/chakra-ui/chakra-ui/pull/3022) Thanks
  [@dodas](https://github.com/dodas)! - Added `enabled` property to `usePopper`.
  Popper won't be updated while it is set to `false`.

  `Menu` now uses this option to not update its position while it's closed.

* Updated dependencies
  [[`02855588`](https://github.com/chakra-ui/chakra-ui/commit/02855588a4ffbc6573768052e53cc538361e91ee),
  [`032f1678`](https://github.com/chakra-ui/chakra-ui/commit/032f16788553b84685de61af5f021c395e09648f)]:
  - @chakra-ui/hooks@1.1.1
  - @chakra-ui/popper@1.1.0
  - @chakra-ui/descendant@1.0.4
  - @chakra-ui/transition@1.0.5

## 1.0.4

### Patch Changes

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/hooks@1.1.0
  - @chakra-ui/utils@1.1.0
  - @chakra-ui/descendant@1.0.3
  - @chakra-ui/popper@1.0.3
  - @chakra-ui/transition@1.0.4
  - @chakra-ui/clickable@1.0.3

## 1.0.3

### Patch Changes

- [`5bff79a1`](https://github.com/chakra-ui/chakra-ui/commit/5bff79a1ba6989d279fc432d5040c72cd75b392e)
  Thanks [@jmiazga](https://github.com/jmiazga)! - Updated framer-motion
  peerDependencies to v3

- Updated dependencies
  [[`5bff79a1`](https://github.com/chakra-ui/chakra-ui/commit/5bff79a1ba6989d279fc432d5040c72cd75b392e),
  [`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5)]:
  - @chakra-ui/transition@1.0.3
  - @chakra-ui/utils@1.0.2
  - @chakra-ui/clickable@1.0.2
  - @chakra-ui/hooks@1.0.2
  - @chakra-ui/popper@1.0.2
  - @chakra-ui/descendant@1.0.2

## 1.0.2

### Patch Changes

- Updated dependencies
  [[`2416cf9a`](https://github.com/chakra-ui/chakra-ui/commit/2416cf9abe183a3a38adbccff794088d86a46341)]:
  - @chakra-ui/transition@1.0.2

## 1.0.1

### Patch Changes

- Updated dependencies
  [[`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213),
  [`204ff7e3`](https://github.com/chakra-ui/chakra-ui/commit/204ff7e39dd37003786194704b36069ef94d56a6)]:
  - @chakra-ui/utils@1.0.1
  - @chakra-ui/hooks@1.0.1
  - @chakra-ui/clickable@1.0.1
  - @chakra-ui/popper@1.0.1
  - @chakra-ui/transition@1.0.1
  - @chakra-ui/descendant@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/menu

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.8 (2020-10-29)

### Bug Fixes

- **toast:** allow custom render in update
  ([eb8bff9](https://github.com/chakra-ui/chakra-ui/commit/eb8bff911e6ec9de0165ab1e8f5ca10d5e022459)),
  closes [#2362](https://github.com/chakra-ui/chakra-ui/issues/2362)

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.7 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/menu

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/menu

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/menu

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/menu

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/menu

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/menu

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/menu@1.0.0-rc.0...@chakra-ui/menu@1.0.0-rc.1) (2020-08-06)

### Bug Fixes

- **variables:** drop unused imports
  ([552b2e9](https://github.com/chakra-ui/chakra-ui/commit/552b2e9b7510963db509a5724af5361ef07c8ecb))
- prevent scroll when menu returns focus
  ([b7f0d20](https://github.com/chakra-ui/chakra-ui/commit/b7f0d2012fc7a111f12d456a0e3a565868b76e25))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/menu@1.0.0-next.7...@chakra-ui/menu@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/menu

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/menu@1.0.0-next.6...@chakra-ui/menu@1.0.0-next.7) (2020-07-26)

### Bug Fixes

- prevent issue where right click triggers active css state
  ([4ea9b88](https://github.com/chakra-ui/chakra-ui/commit/4ea9b8872599168f7a6ecb078b62f3473a25b4d8))
- **menu:** update MenuOption isChecked prop to boolean type
  ([045c3bb](https://github.com/chakra-ui/chakra-ui/commit/045c3bbc129605782b23b664e1a9df4237b55e50))
- click issue with menu butotn
  ([a1c8aac](https://github.com/chakra-ui/chakra-ui/commit/a1c8aacf6992ded6fe85b5e9ce1b5b3ae1ffe1f1))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/menu@1.0.0-next.5...@chakra-ui/menu@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/menu

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/menu@1.0.0-next.4...@chakra-ui/menu@1.0.0-next.5) (2020-07-15)

### Bug Fixes

- issue where clicking submenu button closes menu due to mousedown
  ([fcf772a](https://github.com/chakra-ui/chakra-ui/commit/fcf772a0bef57eff421aa45bb46589d5b80dc3e5))

### Performance Improvements

- improve menu performance by skipping menuitem render
  ([cc58fa2](https://github.com/chakra-ui/chakra-ui/commit/cc58fa2030e38e30f860284891fead2a1cdcbf83))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- case sensitivity issues in packages
  ([b423cd8](https://github.com/chakra-ui/chakra-ui/commit/b423cd88f0ede7e37b9a9eaec63cacfc1e9e5221))
- pointerEvents must be string
  ([8f35389](https://github.com/chakra-ui/chakra-ui/commit/8f35389a75c6d64555e04a37d49bf4af38a923d9))
- some menu bugs
  ([5f9efe1](https://github.com/chakra-ui/chakra-ui/commit/5f9efe1566f067467573a418d2ec319c9e8a607f))
- space keydown on menu button
  ([68f10ab](https://github.com/chakra-ui/chakra-ui/commit/68f10abc585eb351c1cfea2d37b34110a8d89626))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

### Features

- add submenu icon to nested menu
  ([55e2bb0](https://github.com/chakra-ui/chakra-ui/commit/55e2bb06d53f972e650ec65dbb063acf88485e5a))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- case sensitivity issues in packages
  ([b423cd8](https://github.com/chakra-ui/chakra-ui/commit/b423cd88f0ede7e37b9a9eaec63cacfc1e9e5221))
- pointerEvents must be string
  ([8f35389](https://github.com/chakra-ui/chakra-ui/commit/8f35389a75c6d64555e04a37d49bf4af38a923d9))
- some menu bugs
  ([5f9efe1](https://github.com/chakra-ui/chakra-ui/commit/5f9efe1566f067467573a418d2ec319c9e8a607f))
- space keydown on menu button
  ([68f10ab](https://github.com/chakra-ui/chakra-ui/commit/68f10abc585eb351c1cfea2d37b34110a8d89626))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

### Features

- add submenu icon to nested menu
  ([55e2bb0](https://github.com/chakra-ui/chakra-ui/commit/55e2bb06d53f972e650ec65dbb063acf88485e5a))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- case sensitivity issues in packages
  ([b423cd8](https://github.com/chakra-ui/chakra-ui/commit/b423cd88f0ede7e37b9a9eaec63cacfc1e9e5221))
- pointerEvents must be string
  ([8f35389](https://github.com/chakra-ui/chakra-ui/commit/8f35389a75c6d64555e04a37d49bf4af38a923d9))
- some menu bugs
  ([5f9efe1](https://github.com/chakra-ui/chakra-ui/commit/5f9efe1566f067467573a418d2ec319c9e8a607f))
- space keydown on menu button
  ([68f10ab](https://github.com/chakra-ui/chakra-ui/commit/68f10abc585eb351c1cfea2d37b34110a8d89626))

### Features

- add submenu icon to nested menu
  ([55e2bb0](https://github.com/chakra-ui/chakra-ui/commit/55e2bb06d53f972e650ec65dbb063acf88485e5a))
