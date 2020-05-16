# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.8.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/core@0.7.0...@chakra-ui/core@0.8.0) (2020-05-16)

### Bug Fixes

- **ts:** add typing for content pseudobox property
  ([e2fb824](https://github.com/chakra-ui/chakra-ui/commit/e2fb82406796efc5a902128772c0e7cc5e422eb4))
- make component typings discoverable
  ([898d4f3](https://github.com/chakra-ui/chakra-ui/commit/898d4f3685a377d7914b0150503796b6eb3261bd))

### Features

- add iconColor prop to <Select />
  ([968ca80](https://github.com/chakra-ui/chakra-ui/commit/968ca80d916f691ed26515a6e80c43d01eb25d9f))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.7.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/core@0.6.1...@chakra-ui/core@0.7.0) (2020-03-25)

### Bug Fixes

- image hook and key errors
  ([5fa1895](https://github.com/chakra-ui/chakra-ui/commit/5fa1895a7ad4eadb423bb6af6674433768ea1ef8))
- **types:** export use form-control and disclosure hook return
  ([8598046](https://github.com/chakra-ui/chakra-ui/commit/85980461200addb9e1e4d5cfd5160edf31065e88))
- add visibility prop to BoxProps
  ([f3ec71d](https://github.com/chakra-ui/chakra-ui/commit/f3ec71dc7699a07722293b7a315f8e96ec739760))
- export skeleton not badge
  ([bd02904](https://github.com/chakra-ui/chakra-ui/commit/bd029045977b08b61ae6253cbd2bedf2ad97b521))
- import useTheme with relative import
  ([81a844a](https://github.com/chakra-ui/chakra-ui/commit/81a844a16a843dc8f95074d86ba0100c52a5e97c))
- key warning and export use-form-control
  ([50ab37c](https://github.com/chakra-ui/chakra-ui/commit/50ab37c3eecda928a1f2ce0a43df76cdcd394e1b))

### Features

- **checkbox:** add aria-labelledby attribute to input
  ([d808fbe](https://github.com/chakra-ui/chakra-ui/commit/d808fbe095862685aa507d05e1331651a053d6af))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.6.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/core@0.6.0...@chakra-ui/core@0.6.1) (2020-02-26)

### Bug Fixes

- update editable and useclipboard hook
  ([0fc4607](https://github.com/chakra-ui/chakra-ui/commit/0fc4607440601c6e593171823d3fd1135c505e81))
- update icon a11y
  ([2148d5a](https://github.com/chakra-ui/chakra-ui/commit/2148d5ab62864229984553a26c81247c88a23fdc))
- **popover:** fix popover flickering when trigger is "hover"
  ([a37c2a3](https://github.com/chakra-ui/chakra-ui/commit/a37c2a331c794786324c9ef63088a37af325437e))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.6.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/core@0.5.2...@chakra-ui/core@0.6.0) (2020-02-25)

### Bug Fixes

- Don't show tooltip after mouse leaves
  ([44c5ae1](https://github.com/chakra-ui/chakra-ui/commit/44c5ae114ce9756e1036c410108f7486eb32f91b)),
  closes
  [/github.com/chakra-ui/chakra-ui/issues/319#issuecomment-569674248](https://github.com//github.com/chakra-ui/chakra-ui/issues/319/issues/issuecomment-569674248)
- fix all children.map nullish issues
  ([67c0243](https://github.com/chakra-ui/chakra-ui/commit/67c0243a4becd2c2509934d59e52b4a25ff199ab))
- fix: Right addon disappears under background color on focus
  ([d7de7d5](https://github.com/chakra-ui/chakra-ui/commit/d7de7d5f4e85ba4baba0050ad3abfa47f2cacabc)),
  closes [#300](https://github.com/chakra-ui/chakra-ui/issues/300)
- update breadcrumb
  ([d1ace2e](https://github.com/chakra-ui/chakra-ui/commit/d1ace2e1a1e2b3595310185174c06664d4ba97ca))
- wrap modal content in animated and fix numberinput
  ([8ceaca1](https://github.com/chakra-ui/chakra-ui/commit/8ceaca1431e34ee5cc41186856cf109d079669be))
- **button:** default CloseButton to type of button
  ([789208f](https://github.com/chakra-ui/chakra-ui/commit/789208f0a34d8e1a36f49e3b80dc09f6f8572628))
- **image:** add `isMounted` check on `Image` component
  ([105c84f](https://github.com/chakra-ui/chakra-ui/commit/105c84fb34357fb3f35eb6cd8583fdc18fa774af))
- **pseudobox:** responsive props
  ([bac7c24](https://github.com/chakra-ui/chakra-ui/commit/bac7c24adc4edbc490aee8f75e13317b7bc2aa95))
- wrap notify in useCallback
  ([25e9a68](https://github.com/chakra-ui/chakra-ui/commit/25e9a68eb96c114c1feacf41c072498a8e6a89c0))
- **button:** add default type to props
  ([905f6cf](https://github.com/chakra-ui/chakra-ui/commit/905f6cfff781fd66cc1e455f686f3ab05bae5954))
- **image:** don't load image if src is not defined
  ([7559f4e](https://github.com/chakra-ui/chakra-ui/commit/7559f4ea2419359690ca7d83482cc7b8b0d22881))
- fix more bugs
  ([1e842de](https://github.com/chakra-ui/chakra-ui/commit/1e842de357f115f154fc45c4d670747100417ad4))
- ignore Tab key press for keyboard navigation
  ([5966cc6](https://github.com/chakra-ui/chakra-ui/commit/5966cc6737ddcdf84e12dfa5025825cc88d91dbf))
- using fractions and decimals for responsive width
  ([7257654](https://github.com/chakra-ui/chakra-ui/commit/725765481d4637825ef6548cf5cb235ea2832546)),
  closes [#304](https://github.com/chakra-ui/chakra-ui/issues/304)

### Features

- **editable:** cancel on blur
  ([37f2cbe](https://github.com/chakra-ui/chakra-ui/commit/37f2cbe7b901f2f4ab648cd10a123483ea557cfd))
- **tagclosebutton:** added isdisabled style and types to tagclosebutton
  ([d8375a1](https://github.com/chakra-ui/chakra-ui/commit/d8375a1586c29f4b34572950a97745b10f8ed0ec))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.5.2](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/core@0.5.1...@chakra-ui/core@0.5.2) (2019-12-25)

### Bug Fixes

- resolve modal focus lock issue
  ([1b2c4bb](https://github.com/chakra-ui/chakra-ui/commit/1b2c4bbfda6076239a5e64aa7aad30ec305698f0))
- use `UseNumberInputProps` instead of `useNumberInputProps`
  ([8ef820e](https://github.com/chakra-ui/chakra-ui/commit/8ef820ef11447b92ee1d87d5f97a1e84ce924f40))
- **types:** update types for theme
  ([57134eb](https://github.com/chakra-ui/chakra-ui/commit/57134ebae3846bb60158a7fb5c850f46264d678b))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.5.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/core@0.5.0...@chakra-ui/core@0.5.1) (2019-12-13)

### Bug Fixes

- export SimpleGrid component
  ([ecdca25](https://github.com/chakra-ui/chakra-ui/commit/ecdca25c1a72ba31fa93c39b4ad2891bfbcebc02))
- resolve types for variantColor
  ([9a0030c](https://github.com/chakra-ui/chakra-ui/commit/9a0030ce1ad61ffbefe4888f923c9b85253752bd))
- **numberinput:** fix bugs and improve types for onChange and value
  ([e3e3453](https://github.com/chakra-ui/chakra-ui/commit/e3e3453e495fae9f9d5f38a8b8bca0e4f33e6f9e))
- **types:** change listitem types to use pseudobox props
  ([615ebcc](https://github.com/chakra-ui/chakra-ui/commit/615ebcc9f516747c425e7fc84d45c6787f0ebbdb))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.5.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/core@0.4.1...@chakra-ui/core@0.5.0) (2019-12-03)

### Bug Fixes

- prevent bugs with multiple modals opened at the same time
  ([46c5eaa](https://github.com/chakra-ui/chakra-ui/commit/46c5eaa2d0f803df109e0ca54d74bfbd45d72b18))
- prop name in Checkbox examples
  ([5ff3c5a](https://github.com/chakra-ui/chakra-ui/commit/5ff3c5a67d0b876527fce694f425c8f527b27788))
- react-focus-lock issues and review storybook
  ([af3816e](https://github.com/chakra-ui/chakra-ui/commit/af3816eac08c0ae9cbe0f8b684f2772c2c8da51f))
- resolve latest issues and fix types
  ([db054a3](https://github.com/chakra-ui/chakra-ui/commit/db054a36bda3f5a09cb39f475947795204e51316))
- set aria-checked to mixed when partially checked
  ([42c8a1b](https://github.com/chakra-ui/chakra-ui/commit/42c8a1bec674b282c2df130749033bab85f4baa7))
- types for switch component
  ([ad22610](https://github.com/chakra-ui/chakra-ui/commit/ad226105a6d4ee1b28338b5f89e70197ee5aedee))
- useDisclosure types
  ([3f72505](https://github.com/chakra-ui/chakra-ui/commit/3f7250529310708bca3867edd5d116f8c980aaa3))
- **number-input:** cannot use numeric keypad
  ([5cc4b37](https://github.com/chakra-ui/chakra-ui/commit/5cc4b37cf13cf980e25fca37f34b3fb63518e618))
- **select:** add onChange prop
  ([1857fc6](https://github.com/chakra-ui/chakra-ui/commit/1857fc6619efea76589703791655c8cdbf147cec))
- **stack:** convert React children to array before processing
  ([3b7dce3](https://github.com/chakra-ui/chakra-ui/commit/3b7dce3421c09d57c58676a135b888f6b174d62c)),
  closes [#234](https://github.com/chakra-ui/chakra-ui/issues/234)
- **stack:** ensure that invalid elements are filtered correctly
  ([04f9e7e](https://github.com/chakra-ui/chakra-ui/commit/04f9e7e4e64f43fdb12dc54e24c74041666b6149))
- **types:** omit conflicting types
  ([830c93d](https://github.com/chakra-ui/chakra-ui/commit/830c93d6a6538f1a3b5a86ff363583cea9c32ec3))

### Features

- **theme:** apply fonts to Heading and Text
  ([5f1d815](https://github.com/chakra-ui/chakra-ui/commit/5f1d815db7bc923e6bb8aed2fa55697a878f0b92))
- add displayName to anonymous components
  ([5587de9](https://github.com/chakra-ui/chakra-ui/commit/5587de9082e0acd214205b1f9c81fdb36ca39d34))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.4.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/core@0.3.4...@chakra-ui/core@0.4.0) (2019-10-14)

### Bug Fixes

- **box:** update type definitions
  ([b78723a](https://github.com/chakra-ui/chakra-ui/commit/b78723a))
- **css:** export css function
  ([c8a17c8](https://github.com/chakra-ui/chakra-ui/commit/c8a17c8))
- **cssreset:** remove comments from CSSReset preflight.js
  ([25edb5b](https://github.com/chakra-ui/chakra-ui/commit/25edb5b)), closes
  [#161](https://github.com/chakra-ui/chakra-ui/issues/161)
- **image:** add prop to opt out of the fallbackSrc logic
  ([cd1acc6](https://github.com/chakra-ui/chakra-ui/commit/cd1acc6))
- **image:** add support for native width and height
  ([e4b6165](https://github.com/chakra-ui/chakra-ui/commit/e4b6165))
- **image:** add support for native width and height
  ([298f067](https://github.com/chakra-ui/chakra-ui/commit/298f067))
- improve NumberInput API
  ([bca497e](https://github.com/chakra-ui/chakra-ui/commit/bca497e))
- **image:** improve image hook
  ([4fb5c04](https://github.com/chakra-ui/chakra-ui/commit/4fb5c04))
- **numberinput:** improve NumberInput API
  ([fe0441d](https://github.com/chakra-ui/chakra-ui/commit/fe0441d))
- **numberinput:** update API and docs for numberinput
  ([dc70274](https://github.com/chakra-ui/chakra-ui/commit/dc70274))
- **numberinput:** update story
  ([bda8efc](https://github.com/chakra-ui/chakra-ui/commit/bda8efc))
- **types:** add types for default theme. closes issue
  [#160](https://github.com/chakra-ui/chakra-ui/issues/160)
  ([dfef504](https://github.com/chakra-ui/chakra-ui/commit/dfef504))
- **types:** add types for icons to improve DX
  ([5629bc7](https://github.com/chakra-ui/chakra-ui/commit/5629bc7))
- **types:** update types to allow for migration to TS
  ([73bbe73](https://github.com/chakra-ui/chakra-ui/commit/73bbe73))

### Features

- add SimpleGrid component
  ([ff5760c](https://github.com/chakra-ui/chakra-ui/commit/ff5760c))
- add SimpleGrid component and improve Stack
  ([16cc9ef](https://github.com/chakra-ui/chakra-ui/commit/16cc9ef))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.3.4](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/core@0.3.3...@chakra-ui/core@0.3.4) (2019-10-09)

### Bug Fixes

- **build:** remove babel-runtime dep to fix modal issue
  ([f4ae47f](https://github.com/chakra-ui/chakra-ui/commit/f4ae47f))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.3.3](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/core@0.3.2...@chakra-ui/core@0.3.3) (2019-10-09)

### Bug Fixes

- **box:** add overflow types from styled-system
  ([805cb61](https://github.com/chakra-ui/chakra-ui/commit/805cb61))
- **box:** update type definition for borderWidth props
  ([f4310ec](https://github.com/chakra-ui/chakra-ui/commit/f4310ec))
- **button:** fix the types for leftIcon and rightIcon
  ([9f3ba3a](https://github.com/chakra-ui/chakra-ui/commit/9f3ba3a))
- **cssreset:** update the type definition
  ([d8f2701](https://github.com/chakra-ui/chakra-ui/commit/d8f2701))
- **iconbutton:** fix the types for the iconbutton
  ([b9462d4](https://github.com/chakra-ui/chakra-ui/commit/b9462d4))
- **modal:** add support for preserving scrollbar gap
  ([bd67ea0](https://github.com/chakra-ui/chakra-ui/commit/bd67ea0))
- **types:** export named types in all components
  ([7378b77](https://github.com/chakra-ui/chakra-ui/commit/7378b77))
- resolve yarn v2 pnp issues
  ([0e0a04f](https://github.com/chakra-ui/chakra-ui/commit/0e0a04f))
- **types:** include named exports from theme in main type definitions
  ([68e06d8](https://github.com/chakra-ui/chakra-ui/commit/68e06d8))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.3.2](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/core@0.3.1...@chakra-ui/core@0.3.2) (2019-09-26)

### Bug Fixes

- **alertdialog:** update type definitions
  ([da3c706](https://github.com/chakra-ui/chakra-ui/commit/da3c706))
- **drawer:** update type definitions
  ([290e82c](https://github.com/chakra-ui/chakra-ui/commit/290e82c))
- **input:** resolve the error and focus border color props
  ([45b0d97](https://github.com/chakra-ui/chakra-ui/commit/45b0d97))
- **popover:** update type definitions
  ([3a221a3](https://github.com/chakra-ui/chakra-ui/commit/3a221a3))
- **tooltip:** fix the shouldwrapchildren issues. fixes issue
  [#121](https://github.com/chakra-ui/chakra-ui/issues/121)
  ([5d90b77](https://github.com/chakra-ui/chakra-ui/commit/5d90b77))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.3.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/core@0.3.0...@chakra-ui/core@0.3.1) (2019-09-25)

### Bug Fixes

- aliases and forwarding
  ([cec87c6](https://github.com/chakra-ui/chakra-ui/commit/cec87c6))
- compose extraConfig
  ([07c9c2a](https://github.com/chakra-ui/chakra-ui/commit/07c9c2a))
- resolve npm pack issue
  ([8b0676e](https://github.com/chakra-ui/chakra-ui/commit/8b0676e))
- resolve npm pack issue
  ([44b299f](https://github.com/chakra-ui/chakra-ui/commit/44b299f))

# 0.3.0-beta (2019-09-25)

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.3.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/core@0.2.8...@chakra-ui/core@0.3.0) (2019-09-24)

### Features

- Add typings for Slider.onChange
  ([2f15c6a](https://github.com/chakra-ui/chakra-ui/commit/2f15c6a)), closes
  [chakra-ui/chakra-ui#88](https://github.com/chakra-ui/chakra-ui/issues/88)
- **modal, drawer, alertdialog:** remove console errors and improve api
  ([c5ce4b4](https://github.com/chakra-ui/chakra-ui/commit/c5ce4b4))
