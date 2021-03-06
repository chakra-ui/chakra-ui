# Change Log

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
