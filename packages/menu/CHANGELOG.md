# Change Log

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
