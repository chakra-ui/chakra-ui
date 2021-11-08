# Change Log

## 1.9.1

### Patch Changes

- [`04774e219`](https://github.com/chakra-ui/chakra-ui/commit/04774e2196b9f3e8edd77f779e8c15981e8d8135)
  [#4965](https://github.com/chakra-ui/chakra-ui/pull/4965) Thanks
  [@takethefake](https://github.com/takethefake)! - Allow usage of
  `framer-motion` 5.x in `peerDependency`

- Updated dependencies
  [[`c3f016149`](https://github.com/chakra-ui/chakra-ui/commit/c3f01614929d2f68a39cf78111d17f4f4c684706)]:
  - @chakra-ui/popper@2.3.1

## 1.9.0

### Minor Changes

- [`e31439c98`](https://github.com/chakra-ui/chakra-ui/commit/e31439c985d71ba0b37197b18a393b0fe5cf79a4)
  [#4929](https://github.com/chakra-ui/chakra-ui/pull/4929) Thanks
  [@Mattinton](https://github.com/Mattinton)! - Made PopoverCloseButton
  themeable

### Patch Changes

- Updated dependencies
  [[`5fe9b552b`](https://github.com/chakra-ui/chakra-ui/commit/5fe9b552bcae55935d1ab8ffde86b701075e6e6a),
  [`cd0893c56`](https://github.com/chakra-ui/chakra-ui/commit/cd0893c561d8c72b69db7c03d10adae752468a4f)]:
  - @chakra-ui/hooks@1.6.2
  - @chakra-ui/utils@1.8.4
  - @chakra-ui/close-button@1.1.13

## 1.8.5

### Patch Changes

- [`d557a080b`](https://github.com/chakra-ui/chakra-ui/commit/d557a080be9704293344fedd938eb14dbb5c643c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  `computePositionOnMount` didn't work without explict value

- Updated dependencies
  [[`c06d242c6`](https://github.com/chakra-ui/chakra-ui/commit/c06d242c672a10f93fab4dc2321143beae2db669),
  [`a9d1dc4ac`](https://github.com/chakra-ui/chakra-ui/commit/a9d1dc4ac874825f292d874ad4eadaf060fed436),
  [`5b4d8ef24`](https://github.com/chakra-ui/chakra-ui/commit/5b4d8ef24017dab1d69aeb5016b53366bdb3bcfd)]:
  - @chakra-ui/utils@1.8.3
  - @chakra-ui/hooks@1.6.1
  - @chakra-ui/close-button@1.1.12

## 1.8.4

### Patch Changes

- Updated dependencies
  [[`4146a9051`](https://github.com/chakra-ui/chakra-ui/commit/4146a9051a5151532503e31c464193e9d118dd26)]:
  - @chakra-ui/popper@2.3.0

## 1.8.3

### Patch Changes

- Updated dependencies
  [[`28af4c030`](https://github.com/chakra-ui/chakra-ui/commit/28af4c0308e234871548c0857e946e33ff18a130)]:
  - @chakra-ui/hooks@1.6.0

## 1.8.2

### Patch Changes

- Updated dependencies
  [[`4c1071969`](https://github.com/chakra-ui/chakra-ui/commit/4c1071969a9b41a952b374f9990ac0bb89d24fa0),
  [`43f66097b`](https://github.com/chakra-ui/chakra-ui/commit/43f66097b39f1c37a4627dd6ca8a85555f35b95c)]:
  - @chakra-ui/utils@1.8.2
  - @chakra-ui/close-button@1.1.11
  - @chakra-ui/hooks@1.5.5

## 1.8.1

### Patch Changes

- Updated dependencies
  [[`4a1e4d93b`](https://github.com/chakra-ui/chakra-ui/commit/4a1e4d93b0a07df7266d40bb66039385b158d3d1)]:
  - @chakra-ui/utils@1.8.1
  - @chakra-ui/close-button@1.1.10
  - @chakra-ui/hooks@1.5.4

## 1.8.0

### Minor Changes

- [`5afa7ef49`](https://github.com/chakra-ui/chakra-ui/commit/5afa7ef49c7e3b01bce932e252865226b9511b39)
  [#4180](https://github.com/chakra-ui/chakra-ui/pull/4180) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Added
  `computePositionOnMount` prop to allow positioning the popover or menu before
  initial open

### Patch Changes

- [`8881d925d`](https://github.com/chakra-ui/chakra-ui/commit/8881d925d494b33b4bebd53cc14e5dea6cea5a46)
  [#4146](https://github.com/chakra-ui/chakra-ui/pull/4146) Thanks
  [@anubra266](https://github.com/anubra266)! - Fix issue where arrowshadowcolor
  didn't work

- Updated dependencies
  [[`aa374ffcb`](https://github.com/chakra-ui/chakra-ui/commit/aa374ffcb4003efd88eb6a62e10723ea9fbfa3d0),
  [`5afa7ef49`](https://github.com/chakra-ui/chakra-ui/commit/5afa7ef49c7e3b01bce932e252865226b9511b39)]:
  - @chakra-ui/hooks@1.5.3
  - @chakra-ui/popper@2.2.1

## 1.7.1

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

## 1.7.0

### Minor Changes

- [`8501fd105`](https://github.com/chakra-ui/chakra-ui/commit/8501fd105b50ebc61f53026688f8f63ad1e64173)
  [#3906](https://github.com/chakra-ui/chakra-ui/pull/3906) Thanks
  [@joaorodrs](https://github.com/joaorodrs)! - Add an export for
  `usePopoverContext` hook

### Patch Changes

- Updated dependencies
  [[`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01),
  [`b479ff22e`](https://github.com/chakra-ui/chakra-ui/commit/b479ff22ea10c1a1393224c37c36aa6ceabc4aab),
  [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd),
  [`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01)]:
  - @chakra-ui/utils@1.8.0
  - @chakra-ui/hooks@1.5.2
  - @chakra-ui/close-button@1.1.9

## 1.6.1

### Patch Changes

- Updated dependencies
  [[`82f08867f`](https://github.com/chakra-ui/chakra-ui/commit/82f08867fa4825d647a3b9cc805220d9364f2f3f),
  [`e9ac4cc76`](https://github.com/chakra-ui/chakra-ui/commit/e9ac4cc7629cd79efc753b4e3353bacdad46cd7d)]:
  - @chakra-ui/react-utils@1.1.2
  - @chakra-ui/utils@1.7.0
  - @chakra-ui/hooks@1.5.1
  - @chakra-ui/popper@2.1.2
  - @chakra-ui/close-button@1.1.8

## 1.6.0

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
  - @chakra-ui/close-button@1.1.7

## 1.5.1

### Patch Changes

- [`782aa7f27`](https://github.com/chakra-ui/chakra-ui/commit/782aa7f27cfed28785f63aa294c3a6532ac47a06)
  [#3765](https://github.com/chakra-ui/chakra-ui/pull/3765) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - - Fix RTL styles for close
  button
  - Do not unmount lazy popovers after first render

* [`655b1a878`](https://github.com/chakra-ui/chakra-ui/commit/655b1a878cde607921fe4c9ae6fe41373552c5c3)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Update
  focus-onmousedown to avoid memory leak
  - Use prop-getters from use-popper to prevent ssr content shift
* Updated dependencies
  [[`8b5eb9654`](https://github.com/chakra-ui/chakra-ui/commit/8b5eb9654affe562795d38a19f732f84732a949d),
  [`d1532f0b7`](https://github.com/chakra-ui/chakra-ui/commit/d1532f0b72c36d0609ee4510613d7c76f4f9c113),
  [`1615af488`](https://github.com/chakra-ui/chakra-ui/commit/1615af4881a6f37cffb7ea15078cf7ab6a4e4c79)]:
  - @chakra-ui/utils@1.5.2
  - @chakra-ui/hooks@1.4.0
  - @chakra-ui/popper@2.1.1
  - @chakra-ui/close-button@1.1.6

## 1.5.0

### Minor Changes

- [`75817ec42`](https://github.com/chakra-ui/chakra-ui/commit/75817ec428ca3c078660a7c7f2a1c1b578c474df)
  [#3733](https://github.com/chakra-ui/chakra-ui/pull/3733) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - - Return prop getters for
  popover header and body and use `ref` callback to determine element's presense
  instead of `useEffect`.

  - Mark `usePopover` as internal for now.

  - Add support for `rootProps` to `PopoverContent` to allow passing props to
    popover's positioner.

  - Make it possible to add custom motion `variants` so users can orchestrate
    custom transitions.

  - Remove unused dependencies

  - Move popover arrow shadow color computation to popover's theme.

### Patch Changes

- [`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Update import of
  shared utils from `react-utils` to `utils`

- Updated dependencies
  [[`87a03b320`](https://github.com/chakra-ui/chakra-ui/commit/87a03b320b62e639ca4a891186f202cb839a8402),
  [`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94),
  [`75817ec42`](https://github.com/chakra-ui/chakra-ui/commit/75817ec428ca3c078660a7c7f2a1c1b578c474df),
  [`e481ba491`](https://github.com/chakra-ui/chakra-ui/commit/e481ba4914a7f163d93d4c22e2e457f1afb08721)]:
  - @chakra-ui/react-utils@1.1.1
  - @chakra-ui/utils@1.5.1
  - @chakra-ui/popper@2.1.0
  - @chakra-ui/hooks@1.3.1
  - @chakra-ui/close-button@1.1.5

## 1.4.0

### Minor Changes

- [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)
  [#3674](https://github.com/chakra-ui/chakra-ui/pull/3674) Thanks
  [@codebender828](https://github.com/codebender828)! - Extract all React based
  utilities and types into `@chakra-ui/react-utils`

### Patch Changes

- [`a8a841beb`](https://github.com/chakra-ui/chakra-ui/commit/a8a841bebb1bdb6c172c5b34be43921d4118670a)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  popover arrow can't be overriden

- Updated dependencies
  [[`623e782e8`](https://github.com/chakra-ui/chakra-ui/commit/623e782e80124297740a109e5c6c58cddc35b2eb),
  [`a58b724e9`](https://github.com/chakra-ui/chakra-ui/commit/a58b724e9c8656044f866b658f378662f2a44b46),
  [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)]:
  - @chakra-ui/hooks@1.3.0
  - @chakra-ui/utils@1.5.0
  - @chakra-ui/portal@1.2.0
  - @chakra-ui/react-utils@1.1.0
  - @chakra-ui/transition@1.1.1
  - @chakra-ui/close-button@1.1.4
  - @chakra-ui/popper@2.0.1

## 1.3.0

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

* [`223e50b32`](https://github.com/chakra-ui/chakra-ui/commit/223e50b32f6375ba67a8e21b643dd74951f1848c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  popover doesn't close on trigger click when popover is open

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
  - @chakra-ui/close-button@1.1.3
  - @chakra-ui/portal@1.1.3

## 1.2.3

### Patch Changes

- Updated dependencies
  [[`83ae62905`](https://github.com/chakra-ui/chakra-ui/commit/83ae62905935fdb3104380d6fd845159b00095fa),
  [`e1924c621`](https://github.com/chakra-ui/chakra-ui/commit/e1924c62182969a109b4900b05932caa1b73ed99),
  [`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/hooks@1.1.5
  - @chakra-ui/popper@1.1.5
  - @chakra-ui/utils@1.3.0
  - @chakra-ui/close-button@1.1.2
  - @chakra-ui/portal@1.1.2
  - @chakra-ui/transition@1.0.9

## 1.2.2

### Patch Changes

- Updated dependencies
  [[`51ad518e2`](https://github.com/chakra-ui/chakra-ui/commit/51ad518e22642076485bee3dd1f99acbf025161b)]:
  - @chakra-ui/popper@1.1.4

## 1.2.1

### Patch Changes

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/close-button@1.1.1
  - @chakra-ui/hooks@1.1.4
  - @chakra-ui/popper@1.1.3
  - @chakra-ui/portal@1.1.1
  - @chakra-ui/transition@1.0.8

## 1.2.0

### Minor Changes

- [`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a)
  [#3092](https://github.com/chakra-ui/chakra-ui/pull/3092) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - - Improved theme typing in
  order to provide a better autocomplete experience
  - Fixed a type issue where pseudo style props like `_hover` and `_active`
    didn't allow regular css properties

### Patch Changes

- Updated dependencies
  [[`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a),
  [`b572bceed`](https://github.com/chakra-ui/chakra-ui/commit/b572bceedd9fb0c41c65118f0d9ba672791932ca),
  [`e41e6b81b`](https://github.com/chakra-ui/chakra-ui/commit/e41e6b81bf6943fef9b34e5ddd31ee57b416a426)]:
  - @chakra-ui/close-button@1.1.0
  - @chakra-ui/hooks@1.1.3
  - @chakra-ui/portal@1.1.0
  - @chakra-ui/popper@1.1.2
  - @chakra-ui/transition@1.0.7

## 1.1.0

### Minor Changes

- [`07edd6d4`](https://github.com/chakra-ui/chakra-ui/commit/07edd6d4bf9988d95d49399f84f714533f96fb94)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Add `flip` prop to
  `Popover` to change the placement when it is scheduled to overflow a given
  boundary

### Patch Changes

- Updated dependencies
  [[`002a4361`](https://github.com/chakra-ui/chakra-ui/commit/002a4361bd738bef49e021a2fff2b9b6a9af5815),
  [`31881da7`](https://github.com/chakra-ui/chakra-ui/commit/31881da7314c9c464d080b7dd83edd59d8786b7c)]:
  - @chakra-ui/hooks@1.1.2
  - @chakra-ui/portal@1.0.6
  - @chakra-ui/popper@1.1.1
  - @chakra-ui/transition@1.0.6

## 1.0.7

### Patch Changes

- [`b9e2cae0`](https://github.com/chakra-ui/chakra-ui/commit/b9e2cae06277b764278c427dea949abbf3278e92)
  [#3053](https://github.com/chakra-ui/chakra-ui/pull/3053) Thanks
  [@dodas](https://github.com/dodas)! - `Popover` now won't update its popper
  position while it's closed.

- Updated dependencies
  [[`02855588`](https://github.com/chakra-ui/chakra-ui/commit/02855588a4ffbc6573768052e53cc538361e91ee),
  [`0d620f1d`](https://github.com/chakra-ui/chakra-ui/commit/0d620f1d46b9c72c9aef3bb15a691a249ace2eb4),
  [`032f1678`](https://github.com/chakra-ui/chakra-ui/commit/032f16788553b84685de61af5f021c395e09648f)]:
  - @chakra-ui/hooks@1.1.1
  - @chakra-ui/portal@1.0.5
  - @chakra-ui/popper@1.1.0
  - @chakra-ui/transition@1.0.5

## 1.0.6

### Patch Changes

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/hooks@1.1.0
  - @chakra-ui/utils@1.1.0
  - @chakra-ui/popper@1.0.3
  - @chakra-ui/portal@1.0.4
  - @chakra-ui/transition@1.0.4
  - @chakra-ui/close-button@1.0.4

## 1.0.5

### Patch Changes

- Updated dependencies
  [[`a98817de`](https://github.com/chakra-ui/chakra-ui/commit/a98817de0849bf9eec89fae3faf4fbe085f21011)]:
  - @chakra-ui/portal@1.0.3

## 1.0.4

### Patch Changes

- [`5bff79a1`](https://github.com/chakra-ui/chakra-ui/commit/5bff79a1ba6989d279fc432d5040c72cd75b392e)
  Thanks [@jmiazga](https://github.com/jmiazga)! - Updated framer-motion
  peerDependencies to v3

- Updated dependencies
  [[`5bff79a1`](https://github.com/chakra-ui/chakra-ui/commit/5bff79a1ba6989d279fc432d5040c72cd75b392e),
  [`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5)]:
  - @chakra-ui/transition@1.0.3
  - @chakra-ui/utils@1.0.2
  - @chakra-ui/close-button@1.0.3
  - @chakra-ui/hooks@1.0.2
  - @chakra-ui/popper@1.0.2
  - @chakra-ui/portal@1.0.2

## 1.0.3

### Patch Changes

- Updated dependencies
  [[`72bbd0db`](https://github.com/chakra-ui/chakra-ui/commit/72bbd0dbb913ba38ee2b9191d12bf73713ae4398)]:
  - @chakra-ui/close-button@1.0.2

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
  - @chakra-ui/close-button@1.0.1
  - @chakra-ui/popper@1.0.1
  - @chakra-ui/portal@1.0.1
  - @chakra-ui/transition@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/popover

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

**Note:** Version bump only for package @chakra-ui/popover

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/popover

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/popover

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/popover

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/popover

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/popover

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/popover@1.0.0-rc.0...@chakra-ui/popover@1.0.0-rc.1) (2020-08-06)

### Bug Fixes

- **variables:** drop unused imports
  ([552b2e9](https://github.com/chakra-ui/chakra-ui/commit/552b2e9b7510963db509a5724af5361ef07c8ecb))
- stack key issue and yarn2 deps issue
  ([d6cb6b8](https://github.com/chakra-ui/chakra-ui/commit/d6cb6b8fd964729efdf41b1e29c888a3c101316c))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/popover@1.0.0-next.7...@chakra-ui/popover@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/popover

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/popover@1.0.0-next.6...@chakra-ui/popover@1.0.0-next.7) (2020-07-26)

### Features

- add popover transition and merge props util
  ([112ff7b](https://github.com/chakra-ui/chakra-ui/commit/112ff7b53d7618f9a1442efa2fb427491a5fc51c))
- **popover:** add prop to defer rendering till popover is open
  ([aac438c](https://github.com/chakra-ui/chakra-ui/commit/aac438cf21e5cd0a160048d8ae0c1a26b99fd1f4))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/popover@1.0.0-next.5...@chakra-ui/popover@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/popover

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/popover@1.0.0-next.4...@chakra-ui/popover@1.0.0-next.5) (2020-07-15)

### Bug Fixes

- popover blur and event target issue
  [#1124](https://github.com/chakra-ui/chakra-ui/issues/1124)
  ([56f10fb](https://github.com/chakra-ui/chakra-ui/commit/56f10fb75646a18d6f8a18c6f0e4ca830957812e))

### Features

- add popover transition
  ([73d8c4f](https://github.com/chakra-ui/chakra-ui/commit/73d8c4fc9c676c95232cd259f59cce7d38eff94b))
- add transition for modal
  ([dda931b](https://github.com/chakra-ui/chakra-ui/commit/dda931bea7444c3f83392eebf1c34dd571a0dbbc))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- case sensitivity issues in packages
  ([b423cd8](https://github.com/chakra-ui/chakra-ui/commit/b423cd88f0ede7e37b9a9eaec63cacfc1e9e5221))
- case sensitivity issues in packages
  ([c70b653](https://github.com/chakra-ui/chakra-ui/commit/c70b653ab892e9290de6d6c55e7d1bd39f974456))
- focus management for popover
  ([c3259cc](https://github.com/chakra-ui/chakra-ui/commit/c3259ccac7ebf9102888506d510f3f52cf343906))
- popover prevent some focus return scenarios
  ([95457f8](https://github.com/chakra-ui/chakra-ui/commit/95457f8216dde577a2b72fc4d86ef2f058d46083))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- case sensitivity issues in packages
  ([b423cd8](https://github.com/chakra-ui/chakra-ui/commit/b423cd88f0ede7e37b9a9eaec63cacfc1e9e5221))
- case sensitivity issues in packages
  ([c70b653](https://github.com/chakra-ui/chakra-ui/commit/c70b653ab892e9290de6d6c55e7d1bd39f974456))
- focus management for popover
  ([c3259cc](https://github.com/chakra-ui/chakra-ui/commit/c3259ccac7ebf9102888506d510f3f52cf343906))
- popover prevent some focus return scenarios
  ([95457f8](https://github.com/chakra-ui/chakra-ui/commit/95457f8216dde577a2b72fc4d86ef2f058d46083))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- case sensitivity issues in packages
  ([b423cd8](https://github.com/chakra-ui/chakra-ui/commit/b423cd88f0ede7e37b9a9eaec63cacfc1e9e5221))
- case sensitivity issues in packages
  ([c70b653](https://github.com/chakra-ui/chakra-ui/commit/c70b653ab892e9290de6d6c55e7d1bd39f974456))
- focus management for popover
  ([c3259cc](https://github.com/chakra-ui/chakra-ui/commit/c3259ccac7ebf9102888506d510f3f52cf343906))
- popover prevent some focus return scenarios
  ([95457f8](https://github.com/chakra-ui/chakra-ui/commit/95457f8216dde577a2b72fc4d86ef2f058d46083))
