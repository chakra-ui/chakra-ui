# @chakra-ui/anatomy

## 1.3.0

### Minor Changes

- [#4443](https://github.com/chakra-ui/chakra-ui/pull/4443)
  [`fbe946223`](https://github.com/chakra-ui/chakra-ui/commit/fbe94622357e22acaf8bab0eae33ceae663d7a5b)
  Thanks [@heozeop](https://github.com/heozeop)! - Add `textarea` part to
  `editableAnatomy`

## 1.2.5

### Patch Changes

- [`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process. Root cause was a bug in our
  CI configuration.
- Updated dependencies
  [[`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)]:
  - @chakra-ui/theme-tools@1.3.6

## 1.2.4

### Patch Changes

- [#5595](https://github.com/chakra-ui/chakra-ui/pull/5595)
  [`0542b8a53`](https://github.com/chakra-ui/chakra-ui/commit/0542b8a53425093f18fd86d2b55220d3fa20253a)
  Thanks [@takethefake](https://github.com/takethefake)! - Add a new multi style
  part `root` to the Accordion component. It is applied to the topmost DOM
  element.
- Updated dependencies []:
  - @chakra-ui/theme-tools@1.3.5

## 1.2.3

### Patch Changes

- [#5536](https://github.com/chakra-ui/chakra-ui/pull/5536)
  [`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process.

- Updated dependencies
  [[`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)]:
  - @chakra-ui/theme-tools@1.3.4

## 1.2.2

### Patch Changes

- [#5432](https://github.com/chakra-ui/chakra-ui/pull/5432)
  [`98c5ec2bc`](https://github.com/chakra-ui/chakra-ui/commit/98c5ec2bc37fc0764446c3e4df816131418c14e1)
  Thanks [@Methuselah96](https://github.com/Methuselah96)! - Add missing peer
  dependencies

- Updated dependencies []:
  - @chakra-ui/theme-tools@1.3.3

## 1.2.1

### Patch Changes

- [#5075](https://github.com/chakra-ui/chakra-ui/pull/5075)
  [`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Update babel config to
  transpile soruces for older browsers. This fixes issues with CRA and
  Storybook.
- Updated dependencies
  [[`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)]:
  - @chakra-ui/theme-tools@1.3.1

## 1.2.0

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
  - @chakra-ui/theme-tools@1.3.0

## 1.1.0

### Minor Changes

- [`e31439c98`](https://github.com/chakra-ui/chakra-ui/commit/e31439c985d71ba0b37197b18a393b0fe5cf79a4)
  [#4929](https://github.com/chakra-ui/chakra-ui/pull/4929) Thanks
  [@Mattinton](https://github.com/Mattinton)! - Made PopoverCloseButton
  themeable

### Patch Changes

- Updated dependencies
  [[`cd0893c56`](https://github.com/chakra-ui/chakra-ui/commit/cd0893c561d8c72b69db7c03d10adae752468a4f)]:
  - @chakra-ui/theme-tools@1.2.3

## 1.0.1

### Patch Changes

- [`a096ccdde`](https://github.com/chakra-ui/chakra-ui/commit/a096ccdde87a52919cd6e39d985c0dd1154ffbd7)
  [#4721](https://github.com/chakra-ui/chakra-ui/pull/4721) Thanks
  [@chasinhues](https://github.com/chasinhues)! - Add missing breadcrumb part

* [`a02b0de8b`](https://github.com/chakra-ui/chakra-ui/commit/a02b0de8b14acb8282cabafe5cef885e8da0b8fb)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add container part
  to checkbox

* Updated dependencies
  [[`09577b088`](https://github.com/chakra-ui/chakra-ui/commit/09577b088272075f6f183bbb34d5639ac5e68cc0)]:
  - @chakra-ui/theme-tools@1.2.1
