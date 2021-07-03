# @chakra-ui/cli

## 1.4.0

### Minor Changes

- [`fe2557584`](https://github.com/chakra-ui/chakra-ui/commit/fe255758437b04740e1a0d8c8549afefe7dc71ce)
  [#4067](https://github.com/chakra-ui/chakra-ui/pull/4067) Thanks
  [@jrolfs](https://github.com/jrolfs)! - The `tokens` command now supports
  generating theme token type definitions from a Chakra UI theme published as a
  package:

  ```sh
  npx @chakra-ui/cli tokens <@your-org/chakra-theme-package>
  ```

  A published theme package should export a theme object as either the `default`
  export or an export named `theme`.

  ```jsx
  // chakra-theme-package/src/index.js
  import { extendTheme } from "@chakra-ui/react"

  const theme = extendTheme({})

  // as default export
  export default theme
  // as named export
  export { theme }
  ```

## 1.3.1

### Patch Changes

- [`e8f64a4a6`](https://github.com/chakra-ui/chakra-ui/commit/e8f64a4a6ab5eac862ec8127dcf6c5852a0f84dd)
  [#3941](https://github.com/chakra-ui/chakra-ui/pull/3941) Thanks
  [@jbarzegar](https://github.com/jbarzegar)! - Fixes issues with `tokens`
  command hanging forever if theme workers run into errors during runtime. Now
  when an error is discovered within a worker an `{ err: string }` object is
  passed to the parent which will cause the promise to reject. This will in
  turn, pass the same `err` upwards to allow the command to exit gracefully,
  printing the `err` in question to `stdout`
- Updated dependencies
  [[`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01),
  [`b479ff22e`](https://github.com/chakra-ui/chakra-ui/commit/b479ff22ea10c1a1393224c37c36aa6ceabc4aab),
  [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd)]:
  - @chakra-ui/utils@1.8.0

## 1.3.0

### Minor Changes

- [`035d5726e`](https://github.com/chakra-ui/chakra-ui/commit/035d5726e28396ef487b9801d7e2fa57677c703c)
  [#3529](https://github.com/chakra-ui/chakra-ui/pull/3529) Thanks
  [@callum-mellorreed-privitar](https://github.com/callum-mellorreed-privitar)! -
  Add support for `textStyle` and `layerStyle` theme type generation to
  `@chakra-ui/cli`

### Patch Changes

- [`4955fe4fa`](https://github.com/chakra-ui/chakra-ui/commit/4955fe4fafa7468f3788583ab4cdac5dad611591)
  [#3621](https://github.com/chakra-ui/chakra-ui/pull/3621) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue where the
  cli tokens command exited unexpectedly

- Updated dependencies
  [[`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b)]:
  - @chakra-ui/utils@1.4.0

## 1.2.1

### Patch Changes

- [`b78345c36`](https://github.com/chakra-ui/chakra-ui/commit/b78345c366ff79e1a2b5fb77d969f9ee8ced1ac8)
  [#3309](https://github.com/chakra-ui/chakra-ui/pull/3309) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - CLI tokens command now
  ignores TS errors in your theme.ts file

## 1.2.0

### Minor Changes

- [`a97e42568`](https://github.com/chakra-ui/chakra-ui/commit/a97e42568c4470d6cd1e16b48429af93c52def49)
  [#3290](https://github.com/chakra-ui/chakra-ui/pull/3290) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Theme Typings: Add
  autocomplete for negative space values

### Patch Changes

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0

## 1.1.0

### Minor Changes

- [`693528a1b`](https://github.com/chakra-ui/chakra-ui/commit/693528a1b73af2eeb462371a61ff2957c6f65810)
  [#3222](https://github.com/chakra-ui/chakra-ui/pull/3222) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - - Package
  `@chakra-ui/cli@1.0.0` did already exist

  - Add minor bump for adding subcommand `tokens` to generate Theme Typings

    See https://chakra-ui.com/docs/theming/advanced for more info
