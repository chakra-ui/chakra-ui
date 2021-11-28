# Change Log

## 1.7.1

### Patch Changes

- [#5075](https://github.com/chakra-ui/chakra-ui/pull/5075)
  [`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Update babel config to
  transpile soruces for older browsers. This fixes issues with CRA and
  Storybook.
- Updated dependencies
  [[`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)]:
  - @chakra-ui/react-utils@1.2.1
  - @chakra-ui/utils@1.9.1

## 1.7.0

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
  - @chakra-ui/react-utils@1.2.0
  - @chakra-ui/utils@1.9.0

## 1.6.2

### Patch Changes

- [`5fe9b552b`](https://github.com/chakra-ui/chakra-ui/commit/5fe9b552bcae55935d1ab8ffde86b701075e6e6a)
  [#4822](https://github.com/chakra-ui/chakra-ui/pull/4822) Thanks
  [@takethefake](https://github.com/takethefake)! - used useCallbackRef for
  onOpenProp/onCloseProp in useDisclosure

- Updated dependencies
  [[`cd0893c56`](https://github.com/chakra-ui/chakra-ui/commit/cd0893c561d8c72b69db7c03d10adae752468a4f)]:
  - @chakra-ui/utils@1.8.4

## 1.6.1

### Patch Changes

- [`a9d1dc4ac`](https://github.com/chakra-ui/chakra-ui/commit/a9d1dc4ac874825f292d874ad4eadaf060fed436)
  [#4803](https://github.com/chakra-ui/chakra-ui/pull/4803) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Forward `threshold`
  options from `usePanSession` to `PanSession` class

- Updated dependencies
  [[`c06d242c6`](https://github.com/chakra-ui/chakra-ui/commit/c06d242c672a10f93fab4dc2321143beae2db669),
  [`5b4d8ef24`](https://github.com/chakra-ui/chakra-ui/commit/5b4d8ef24017dab1d69aeb5016b53366bdb3bcfd)]:
  - @chakra-ui/utils@1.8.3

## 1.6.0

### Minor Changes

- [`28af4c030`](https://github.com/chakra-ui/chakra-ui/commit/28af4c0308e234871548c0857e946e33ff18a130)
  [#4595](https://github.com/chakra-ui/chakra-ui/pull/4595) Thanks
  [@margalit](https://github.com/margalit)! - - Added an enabled prop to the
  `useOutsideClick` hook to conditionally attach event handlers.

  - Updated the `useMenu` hook to only enable the `useOutsideClick` hook when
    the menu is open.

## 1.5.5

### Patch Changes

- Updated dependencies
  [[`4c1071969`](https://github.com/chakra-ui/chakra-ui/commit/4c1071969a9b41a952b374f9990ac0bb89d24fa0),
  [`43f66097b`](https://github.com/chakra-ui/chakra-ui/commit/43f66097b39f1c37a4627dd6ca8a85555f35b95c)]:
  - @chakra-ui/utils@1.8.2

## 1.5.4

### Patch Changes

- Updated dependencies
  [[`4a1e4d93b`](https://github.com/chakra-ui/chakra-ui/commit/4a1e4d93b0a07df7266d40bb66039385b158d3d1)]:
  - @chakra-ui/utils@1.8.1

## 1.5.3

### Patch Changes

- [`aa374ffcb`](https://github.com/chakra-ui/chakra-ui/commit/aa374ffcb4003efd88eb6a62e10723ea9fbfa3d0)
  [#4166](https://github.com/chakra-ui/chakra-ui/pull/4166) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Fix inconsisent id
  generation between client and server

## 1.5.2

### Patch Changes

- [`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - `usePanGesture`:
  Add `onPanSessionEnd` to pan event handlers and mark as internal
  - `useDimensions`: Remove `ref` from effect dependency list
- Updated dependencies
  [[`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01),
  [`b479ff22e`](https://github.com/chakra-ui/chakra-ui/commit/b479ff22ea10c1a1393224c37c36aa6ceabc4aab),
  [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd)]:
  - @chakra-ui/utils@1.8.0

## 1.5.1

### Patch Changes

- Updated dependencies
  [[`82f08867f`](https://github.com/chakra-ui/chakra-ui/commit/82f08867fa4825d647a3b9cc805220d9364f2f3f),
  [`e9ac4cc76`](https://github.com/chakra-ui/chakra-ui/commit/e9ac4cc7629cd79efc753b4e3353bacdad46cd7d)]:
  - @chakra-ui/react-utils@1.1.2
  - @chakra-ui/utils@1.7.0

## 1.5.0

### Minor Changes

- [`384902e35`](https://github.com/chakra-ui/chakra-ui/commit/384902e35b186c8c8154b9569455c27f72ee0f6f)
  [#3836](https://github.com/chakra-ui/chakra-ui/pull/3836) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - - Add pan session hook
  `usePanGesture` for detecting pan gestures

  - Update `useLatestRef` to inline value updates. Not concurrent mode safe but
    works for now.

  - Add `useEventListenerMap` to provide an elegant way of attaching several
    pointer event to the `document` or an element.

### Patch Changes

- Updated dependencies
  [[`0974e547c`](https://github.com/chakra-ui/chakra-ui/commit/0974e547c29e4efc1ba4d1eb1507d0dad7d7a77a),
  [`59ea894a7`](https://github.com/chakra-ui/chakra-ui/commit/59ea894a7e03d16cd7a1b89d00816eafa9fab65d)]:
  - @chakra-ui/utils@1.6.0

## 1.4.0

### Minor Changes

- [`d1532f0b7`](https://github.com/chakra-ui/chakra-ui/commit/d1532f0b72c36d0609ee4510613d7c76f4f9c113)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Add support for
  passing function that returns element to `useEventListener` and
  `usePointerEvent`

### Patch Changes

- Updated dependencies
  [[`8b5eb9654`](https://github.com/chakra-ui/chakra-ui/commit/8b5eb9654affe562795d38a19f732f84732a949d)]:
  - @chakra-ui/utils@1.5.2

## 1.3.1

### Patch Changes

- Updated dependencies
  [[`87a03b320`](https://github.com/chakra-ui/chakra-ui/commit/87a03b320b62e639ca4a891186f202cb839a8402),
  [`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94),
  [`e481ba491`](https://github.com/chakra-ui/chakra-ui/commit/e481ba4914a7f163d93d4c22e2e457f1afb08721)]:
  - @chakra-ui/react-utils@1.1.1
  - @chakra-ui/utils@1.5.1

## 1.3.0

### Minor Changes

- [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)
  [#3674](https://github.com/chakra-ui/chakra-ui/pull/3674) Thanks
  [@codebender828](https://github.com/codebender828)! - Extract all React based
  utilities and types into `@chakra-ui/react-utils`

### Patch Changes

- [`623e782e8`](https://github.com/chakra-ui/chakra-ui/commit/623e782e80124297740a109e5c6c58cddc35b2eb)
  [#3408](https://github.com/chakra-ui/chakra-ui/pull/3408) Thanks
  [@dodas](https://github.com/dodas)! - `useControllableState`: The `onChange`
  callback will be called only if the new value isn't equal to the current one.
- Updated dependencies
  [[`a58b724e9`](https://github.com/chakra-ui/chakra-ui/commit/a58b724e9c8656044f866b658f378662f2a44b46),
  [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)]:
  - @chakra-ui/utils@1.5.0
  - @chakra-ui/react-utils@1.1.0

## 1.2.0

### Minor Changes

- [`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - ### Pointer Events

  Add unified pointer event management utils and hook for interal use only.

  The hook is called `usePointerEvent`, it works pretty similar to
  `useEventListener` except that does two things:

  - Unifies the pointer event system and ensure that only one of `onMouse*`,
    `onTouch*`, or `onPointer*` handler runs
  - Provide event information about the pointer event like `x` and `y` position
    depending on the pointer type.

  > Credits to `framer-motion` for doing the hard work for this utilities

  - Added `useFocusOnPointerDown` to get Safari to detect the correct
    `event.relatedTarget` when you blur a focused element.

  ### Focus Management

  Set `preventScroll` option to be `true` by default, setting focus on an
  element should happen without scrolling the page (in most cases).

  Set `nextTick` to `undefined` by default and update all components that use
  next tick to use `{ nextTick: true }`.

### Patch Changes

- [`9c143bfe5`](https://github.com/chakra-ui/chakra-ui/commit/9c143bfe5bbf180929fabb0a1b4c18d40f7fd3fc)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Update focus utils
  to use `nextTick` option since its default value is now false in the focus
  utils

  > `@internal` use only

- Updated dependencies
  [[`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b)]:
  - @chakra-ui/utils@1.4.0

## 1.1.5

### Patch Changes

- [`83ae62905`](https://github.com/chakra-ui/chakra-ui/commit/83ae62905935fdb3104380d6fd845159b00095fa)
  [#3373](https://github.com/chakra-ui/chakra-ui/pull/3373) Thanks
  [@tobiasz](https://github.com/tobiasz)! - ### useClipboard

  Add support to `format` - Optional string. Set the MIME type of what you want
  to copy as. Use text/html to copy as HTML, text/plain to avoid inherited
  styles showing when pasted into rich text editor.

- Updated dependencies
  [[`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/utils@1.3.0

## 1.1.4

### Patch Changes

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0

## 1.1.3

### Patch Changes

- [`b572bceed`](https://github.com/chakra-ui/chakra-ui/commit/b572bceedd9fb0c41c65118f0d9ba672791932ca)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! -
  **useOutsideClick:**

  - Update reference to `document.addEventListener` to detect owner document
    based on `ref` passed. This would help detect outside click currently from
    within an `iframe`.

## 1.1.2

### Patch Changes

- [`002a4361`](https://github.com/chakra-ui/chakra-ui/commit/002a4361bd738bef49e021a2fff2b9b6a9af5815)
  [#3125](https://github.com/chakra-ui/chakra-ui/pull/3125) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Fixed issue where using an
  uncontrolled RadioGroup without a defaultValue causes multiple radio options
  can be selected.

  This was caused by the `useControllableProp` hook that uses `useRef` to check
  if a value is controlled or uncontrolled.

## 1.1.1

### Patch Changes

- [`02855588`](https://github.com/chakra-ui/chakra-ui/commit/02855588a4ffbc6573768052e53cc538361e91ee)
  [#3056](https://github.com/chakra-ui/chakra-ui/pull/3056) Thanks
  [@with-heart](https://github.com/with-heart)! - - Resolved an issue where
  event handlers for certain components were removed after the first event
  occurred.

  - Fixed SSR issue with `useId` hook

## 1.1.0

### Minor Changes

- [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)
  [#3015](https://github.com/chakra-ui/chakra-ui/pull/3015) Thanks
  [@with-heart](https://github.com/with-heart)! - Added `useCallbackRef` hook
  for persisting a value between renders and updating it if it changes.

### Patch Changes

- [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)
  [#3015](https://github.com/chakra-ui/chakra-ui/pull/3015) Thanks
  [@with-heart](https://github.com/with-heart)! - Deprecated `useLatestRef`,
  `useEventCallback`, and `useMouseDownRef`. These functions will be removed in
  a future `major` version.
- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/utils@1.1.0

## 1.0.2

### Patch Changes

- Updated dependencies
  [[`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5)]:
  - @chakra-ui/utils@1.0.2

## 1.0.1

### Patch Changes

- [`204ff7e3`](https://github.com/chakra-ui/chakra-ui/commit/204ff7e39dd37003786194704b36069ef94d56a6)
  [#2577](https://github.com/chakra-ui/chakra-ui/pull/2577) Thanks
  [@navin-moorthy](https://github.com/navin-moorthy)! - Fix setter function
  update of `value` in useControllable

- Updated dependencies
  [[`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213)]:
  - @chakra-ui/utils@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/hooks

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

**Note:** Version bump only for package @chakra-ui/hooks

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/hooks

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/hooks

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/hooks

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/hooks

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/hooks

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/hooks@1.0.0-rc.0...@chakra-ui/hooks@1.0.0-rc.1) (2020-08-06)

### Features

- update popper hook and use-clipboard
  ([2659f60](https://github.com/chakra-ui/chakra-ui/commit/2659f60b7d44815c7638d2bc03eb6a97ad7bc581))

### Performance Improvements

- improve popper hook
  ([d7ecb04](https://github.com/chakra-ui/chakra-ui/commit/d7ecb04baed8b6e6488321f7f2b28bed10a3a0d3))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/hooks@1.0.0-next.7...@chakra-ui/hooks@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/hooks

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/hooks@1.0.0-next.6...@chakra-ui/hooks@1.0.0-next.7) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/hooks

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/hooks@1.0.0-next.5...@chakra-ui/hooks@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/hooks

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/hooks@1.0.0-next.4...@chakra-ui/hooks@1.0.0-next.5) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/hooks

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- some menu bugs
  ([5f9efe1](https://github.com/chakra-ui/chakra-ui/commit/5f9efe1566f067467573a418d2ec319c9e8a607f))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

### Features

- add live-region package
  ([e0efe6a](https://github.com/chakra-ui/chakra-ui/commit/e0efe6af7f501d1dd213a9d92de5710c55fe34ed))
- add setup for switch component tests
  ([d845d08](https://github.com/chakra-ui/chakra-ui/commit/d845d089a91841e6bb1b53daf9c35502c3ce2538))
- add setup for switch component tests
  ([fc0026b](https://github.com/chakra-ui/chakra-ui/commit/fc0026ba20199169df399218c15b0ca575ec4110))
- add tests for switch component
  ([a327f4a](https://github.com/chakra-ui/chakra-ui/commit/a327f4a2807ba900bc1cc62b13c7c498cb690526))
- add tests for switch component
  ([90805b3](https://github.com/chakra-ui/chakra-ui/commit/90805b3d0676409394a5ece9a1a834d156ebda51))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- some menu bugs
  ([5f9efe1](https://github.com/chakra-ui/chakra-ui/commit/5f9efe1566f067467573a418d2ec319c9e8a607f))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

### Features

- add live-region package
  ([e0efe6a](https://github.com/chakra-ui/chakra-ui/commit/e0efe6af7f501d1dd213a9d92de5710c55fe34ed))
- add setup for switch component tests
  ([d845d08](https://github.com/chakra-ui/chakra-ui/commit/d845d089a91841e6bb1b53daf9c35502c3ce2538))
- add setup for switch component tests
  ([fc0026b](https://github.com/chakra-ui/chakra-ui/commit/fc0026ba20199169df399218c15b0ca575ec4110))
- add tests for switch component
  ([a327f4a](https://github.com/chakra-ui/chakra-ui/commit/a327f4a2807ba900bc1cc62b13c7c498cb690526))
- add tests for switch component
  ([90805b3](https://github.com/chakra-ui/chakra-ui/commit/90805b3d0676409394a5ece9a1a834d156ebda51))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- some menu bugs
  ([5f9efe1](https://github.com/chakra-ui/chakra-ui/commit/5f9efe1566f067467573a418d2ec319c9e8a607f))

### Features

- add live-region package
  ([e0efe6a](https://github.com/chakra-ui/chakra-ui/commit/e0efe6af7f501d1dd213a9d92de5710c55fe34ed))
- add setup for switch component tests
  ([d845d08](https://github.com/chakra-ui/chakra-ui/commit/d845d089a91841e6bb1b53daf9c35502c3ce2538))
- add setup for switch component tests
  ([fc0026b](https://github.com/chakra-ui/chakra-ui/commit/fc0026ba20199169df399218c15b0ca575ec4110))
- add tests for switch component
  ([a327f4a](https://github.com/chakra-ui/chakra-ui/commit/a327f4a2807ba900bc1cc62b13c7c498cb690526))
- add tests for switch component
  ([90805b3](https://github.com/chakra-ui/chakra-ui/commit/90805b3d0676409394a5ece9a1a834d156ebda51))
