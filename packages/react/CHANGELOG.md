# Change Log

## 1.6.0

### Minor Changes

- [`1d5e55272`](https://github.com/chakra-ui/chakra-ui/commit/1d5e55272fe1475ce6fa0ed5bdccef4218885f77)
  [#3511](https://github.com/chakra-ui/chakra-ui/pull/3511) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - The `extendTheme` function
  allows you to pass multiple overrides or extensions:

  ```js
  import {
    extendTheme,
    withDefaultColorScheme,
    withDefaultSize,
    withDefaultVariant,
    withDefaultProps,
  } from "@chakra-ui/react"

  const customTheme = extendTheme(
    {
      colors: {
        brand: {
          // ...
          500: "#b4d455",
          // ...
        },
      },
    },
    withDefaultColorScheme({ colorScheme: "brand" }),
    withDefaultSize({
      size: "lg",
      components: ["Input", "NumberInput", "PinInput"],
    }),
    withDefaultVariant({
      variant: "outline",
      components: ["Input", "NumberInput", "PinInput"],
    }),
    // or all in one:
    withDefaultProps({
      defaultProps: {
        colorScheme: "brand",
        variant: "outline",
        size: "lg",
      },
      components: ["Input", "NumberInput", "PinInput"],
    }),
    // optional:
    yourCustomBaseTheme, // defaults to our chakra default theme
  )
  ```

### Patch Changes

- Updated dependencies
  [[`17c57be68`](https://github.com/chakra-ui/chakra-ui/commit/17c57be6821247413c9ea8e94df34331f0ef129e),
  [`1f94620a1`](https://github.com/chakra-ui/chakra-ui/commit/1f94620a11dc616f0982321114a9a236bbf872d2),
  [`82f08867f`](https://github.com/chakra-ui/chakra-ui/commit/82f08867fa4825d647a3b9cc805220d9364f2f3f),
  [`ad8a7b9f1`](https://github.com/chakra-ui/chakra-ui/commit/ad8a7b9f1064bba04a8f9cc022de2d773ab1e331),
  [`d14c97420`](https://github.com/chakra-ui/chakra-ui/commit/d14c974203fe8c1a525d8932d5c8d0ae7d1fa84e),
  [`04be15201`](https://github.com/chakra-ui/chakra-ui/commit/04be15201ac9ae4c284ca639bd45f6a42d9f11bc),
  [`946f8eab5`](https://github.com/chakra-ui/chakra-ui/commit/946f8eab5b98036db372dc0c85c9e5354c565b58),
  [`1d5e55272`](https://github.com/chakra-ui/chakra-ui/commit/1d5e55272fe1475ce6fa0ed5bdccef4218885f77),
  [`e9ac4cc76`](https://github.com/chakra-ui/chakra-ui/commit/e9ac4cc7629cd79efc753b4e3353bacdad46cd7d)]:
  - @chakra-ui/pin-input@1.6.0
  - @chakra-ui/menu@1.6.0
  - @chakra-ui/accordion@1.3.0
  - @chakra-ui/tabs@1.5.0
  - @chakra-ui/button@1.3.1
  - @chakra-ui/progress@1.1.8
  - @chakra-ui/theme@1.8.4
  - @chakra-ui/utils@1.7.0
  - @chakra-ui/alert@1.2.4
  - @chakra-ui/avatar@1.2.4
  - @chakra-ui/breadcrumb@1.2.4
  - @chakra-ui/checkbox@1.5.1
  - @chakra-ui/editable@1.2.4
  - @chakra-ui/form-control@1.3.4
  - @chakra-ui/hooks@1.5.1
  - @chakra-ui/input@1.2.4
  - @chakra-ui/layout@1.4.4
  - @chakra-ui/modal@1.8.4
  - @chakra-ui/number-input@1.2.4
  - @chakra-ui/popover@1.6.1
  - @chakra-ui/popper@2.1.2
  - @chakra-ui/portal@1.2.4
  - @chakra-ui/radio@1.3.4
  - @chakra-ui/slider@1.2.4
  - @chakra-ui/system@1.6.4
  - @chakra-ui/tooltip@1.3.4
  - @chakra-ui/table@1.2.3
  - @chakra-ui/toast@1.2.5
  - @chakra-ui/close-button@1.1.8
  - @chakra-ui/control-box@1.0.11
  - @chakra-ui/counter@1.1.4
  - @chakra-ui/react-env@1.0.3
  - @chakra-ui/icon@1.1.8
  - @chakra-ui/image@1.0.14
  - @chakra-ui/live-region@1.0.11
  - @chakra-ui/media-query@1.0.12
  - @chakra-ui/select@1.1.8
  - @chakra-ui/skeleton@1.1.11
  - @chakra-ui/spinner@1.1.8
  - @chakra-ui/stat@1.1.8
  - @chakra-ui/switch@1.2.4
  - @chakra-ui/tag@1.1.8
  - @chakra-ui/textarea@1.1.8
  - @chakra-ui/transition@1.2.2
  - @chakra-ui/visually-hidden@1.0.11

## 1.5.2

### Patch Changes

- Updated dependencies
  [[`0974e547c`](https://github.com/chakra-ui/chakra-ui/commit/0974e547c29e4efc1ba4d1eb1507d0dad7d7a77a),
  [`fbc125258`](https://github.com/chakra-ui/chakra-ui/commit/fbc12525822190e1ea5eced874ef3fdfafdabfb3),
  [`57baa5e63`](https://github.com/chakra-ui/chakra-ui/commit/57baa5e6350f89f1098a5d965b90483348aa0073),
  [`aec2aaf9d`](https://github.com/chakra-ui/chakra-ui/commit/aec2aaf9d6e7fb43855ae7e3b238ee043ec2c533),
  [`59ea894a7`](https://github.com/chakra-ui/chakra-ui/commit/59ea894a7e03d16cd7a1b89d00816eafa9fab65d),
  [`384902e35`](https://github.com/chakra-ui/chakra-ui/commit/384902e35b186c8c8154b9569455c27f72ee0f6f),
  [`a13252624`](https://github.com/chakra-ui/chakra-ui/commit/a13252624fdc69eab2dc4dbd3fa228b86380f091),
  [`f2544fb58`](https://github.com/chakra-ui/chakra-ui/commit/f2544fb581a6dbe558236ebb11883a273ed61a28),
  [`a139b106f`](https://github.com/chakra-ui/chakra-ui/commit/a139b106f428cadbaaffe9cdbd45ff264804b2c2),
  [`9c6be11b1`](https://github.com/chakra-ui/chakra-ui/commit/9c6be11b1d95f8add314dbe214bc7ce3c67b76cd)]:
  - @chakra-ui/utils@1.6.0
  - @chakra-ui/checkbox@1.5.0
  - @chakra-ui/menu@1.5.0
  - @chakra-ui/popover@1.6.0
  - @chakra-ui/button@1.3.0
  - @chakra-ui/hooks@1.5.0
  - @chakra-ui/stat@1.1.7
  - @chakra-ui/tabs@1.4.0
  - @chakra-ui/react-env@1.0.2
  - @chakra-ui/slider@1.2.3
  - @chakra-ui/modal@1.8.3
  - @chakra-ui/theme@1.8.3
  - @chakra-ui/accordion@1.2.3
  - @chakra-ui/alert@1.2.3
  - @chakra-ui/avatar@1.2.3
  - @chakra-ui/breadcrumb@1.2.3
  - @chakra-ui/close-button@1.1.7
  - @chakra-ui/control-box@1.0.10
  - @chakra-ui/counter@1.1.3
  - @chakra-ui/editable@1.2.3
  - @chakra-ui/form-control@1.3.3
  - @chakra-ui/icon@1.1.7
  - @chakra-ui/image@1.0.13
  - @chakra-ui/input@1.2.3
  - @chakra-ui/layout@1.4.3
  - @chakra-ui/live-region@1.0.10
  - @chakra-ui/media-query@1.0.11
  - @chakra-ui/number-input@1.2.3
  - @chakra-ui/pin-input@1.5.3
  - @chakra-ui/portal@1.2.3
  - @chakra-ui/progress@1.1.7
  - @chakra-ui/radio@1.3.3
  - @chakra-ui/select@1.1.7
  - @chakra-ui/skeleton@1.1.10
  - @chakra-ui/spinner@1.1.7
  - @chakra-ui/switch@1.2.3
  - @chakra-ui/system@1.6.3
  - @chakra-ui/table@1.2.2
  - @chakra-ui/tag@1.1.7
  - @chakra-ui/textarea@1.1.7
  - @chakra-ui/toast@1.2.4
  - @chakra-ui/tooltip@1.3.3
  - @chakra-ui/transition@1.2.1
  - @chakra-ui/visually-hidden@1.0.10

## 1.5.1

### Patch Changes

- [`09aa19b23`](https://github.com/chakra-ui/chakra-ui/commit/09aa19b23544f612ac54c22ad0b344d66b871674)
  [#3779](https://github.com/chakra-ui/chakra-ui/pull/3779) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Fixed typing issues for
  `extendTheme` where variant overrides lead to an TS error.

* [`81a40231f`](https://github.com/chakra-ui/chakra-ui/commit/81a40231f12461dcca0fa0cd3c4e9e2c0497a04d)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add
  `EnvironmentProvider` to `ChakraProvider` for better window and document
  detection across hooks and components
* Updated dependencies
  [[`8b5eb9654`](https://github.com/chakra-ui/chakra-ui/commit/8b5eb9654affe562795d38a19f732f84732a949d),
  [`5617aabea`](https://github.com/chakra-ui/chakra-ui/commit/5617aabeaa6c3faef37deeebeddbc9bf3cc88088),
  [`753b56d63`](https://github.com/chakra-ui/chakra-ui/commit/753b56d6366276f217d28131c17c41427ae7761c),
  [`3ff53e4e3`](https://github.com/chakra-ui/chakra-ui/commit/3ff53e4e3857b94c4fc18b8e02cf914bdff860e1),
  [`fce6d8ecb`](https://github.com/chakra-ui/chakra-ui/commit/fce6d8ecb17b6fe5792804a980cfbe5367d519da),
  [`3310f952e`](https://github.com/chakra-ui/chakra-ui/commit/3310f952efc6a196b12ffff1a0951683e0b0b6ff),
  [`327f00644`](https://github.com/chakra-ui/chakra-ui/commit/327f00644d3336fe1e2d3152f9cc3474a18824ef),
  [`9fcccbe34`](https://github.com/chakra-ui/chakra-ui/commit/9fcccbe348f87fb4a386450e5327bb578e14cb16),
  [`19421fa94`](https://github.com/chakra-ui/chakra-ui/commit/19421fa94f52c32d43a34768e232e7919708eae2),
  [`a588116f9`](https://github.com/chakra-ui/chakra-ui/commit/a588116f92911769334132d90ccec01d49f029aa),
  [`327f00644`](https://github.com/chakra-ui/chakra-ui/commit/327f00644d3336fe1e2d3152f9cc3474a18824ef),
  [`655b1a878`](https://github.com/chakra-ui/chakra-ui/commit/655b1a878cde607921fe4c9ae6fe41373552c5c3),
  [`000402a2c`](https://github.com/chakra-ui/chakra-ui/commit/000402a2c720878a06a63152a332b15efd79814f),
  [`3bc27c018`](https://github.com/chakra-ui/chakra-ui/commit/3bc27c0183d06f8e0d38ab8e6d7d793f20e883c8),
  [`d1532f0b7`](https://github.com/chakra-ui/chakra-ui/commit/d1532f0b72c36d0609ee4510613d7c76f4f9c113),
  [`1615af488`](https://github.com/chakra-ui/chakra-ui/commit/1615af4881a6f37cffb7ea15078cf7ab6a4e4c79),
  [`890839d9f`](https://github.com/chakra-ui/chakra-ui/commit/890839d9fe32d5ec90954c8f4c5b6c463ff0b57d),
  [`782aa7f27`](https://github.com/chakra-ui/chakra-ui/commit/782aa7f27cfed28785f63aa294c3a6532ac47a06),
  [`29148130a`](https://github.com/chakra-ui/chakra-ui/commit/29148130a699409322931cc6ba1b970b7afeefbd),
  [`3ff53e4e3`](https://github.com/chakra-ui/chakra-ui/commit/3ff53e4e3857b94c4fc18b8e02cf914bdff860e1),
  [`a73198529`](https://github.com/chakra-ui/chakra-ui/commit/a7319852908f68596600da799ef08a0e7dbb468e),
  [`d37b00021`](https://github.com/chakra-ui/chakra-ui/commit/d37b00021490c24bd3168a7f2800b6490aee90b1),
  [`dd2257935`](https://github.com/chakra-ui/chakra-ui/commit/dd225793575ff88aa2a2114a5840150ac3cf744c),
  [`655b1a878`](https://github.com/chakra-ui/chakra-ui/commit/655b1a878cde607921fe4c9ae6fe41373552c5c3),
  [`890839d9f`](https://github.com/chakra-ui/chakra-ui/commit/890839d9fe32d5ec90954c8f4c5b6c463ff0b57d)]:
  - @chakra-ui/utils@1.5.2
  - @chakra-ui/transition@1.2.0
  - @chakra-ui/theme@1.8.2
  - @chakra-ui/button@1.2.2
  - @chakra-ui/tabs@1.3.2
  - @chakra-ui/tooltip@1.3.2
  - @chakra-ui/input@1.2.2
  - @chakra-ui/react-env@1.0.1
  - @chakra-ui/menu@1.4.0
  - @chakra-ui/toast@1.2.3
  - @chakra-ui/editable@1.2.2
  - @chakra-ui/system@1.6.2
  - @chakra-ui/layout@1.4.2
  - @chakra-ui/hooks@1.4.0
  - @chakra-ui/popper@2.1.1
  - @chakra-ui/popover@1.5.1
  - @chakra-ui/spinner@1.1.6
  - @chakra-ui/progress@1.1.6
  - @chakra-ui/accordion@1.2.2
  - @chakra-ui/alert@1.2.2
  - @chakra-ui/avatar@1.2.2
  - @chakra-ui/breadcrumb@1.2.2
  - @chakra-ui/checkbox@1.4.2
  - @chakra-ui/close-button@1.1.6
  - @chakra-ui/control-box@1.0.9
  - @chakra-ui/counter@1.1.2
  - @chakra-ui/form-control@1.3.2
  - @chakra-ui/icon@1.1.6
  - @chakra-ui/image@1.0.12
  - @chakra-ui/live-region@1.0.9
  - @chakra-ui/media-query@1.0.10
  - @chakra-ui/modal@1.8.2
  - @chakra-ui/number-input@1.2.2
  - @chakra-ui/pin-input@1.5.2
  - @chakra-ui/portal@1.2.2
  - @chakra-ui/radio@1.3.2
  - @chakra-ui/select@1.1.6
  - @chakra-ui/skeleton@1.1.9
  - @chakra-ui/slider@1.2.2
  - @chakra-ui/stat@1.1.6
  - @chakra-ui/switch@1.2.2
  - @chakra-ui/table@1.2.1
  - @chakra-ui/tag@1.1.6
  - @chakra-ui/textarea@1.1.6
  - @chakra-ui/visually-hidden@1.0.9

## 1.5.0

### Minor Changes

- [`ac21d798a`](https://github.com/chakra-ui/chakra-ui/commit/ac21d798a0759b45de02c6821804f40f492fd80e)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump package as
  minor

### Patch Changes

- [`2287d82e3`](https://github.com/chakra-ui/chakra-ui/commit/2287d82e31744cd289aaf524bb9961e46003c404)
  [#3715](https://github.com/chakra-ui/chakra-ui/pull/3715) Thanks
  [@with-heart](https://github.com/with-heart)! - Resolved a peer dependency
  resolution issue reported by yarn2, npm7, and other more modern package
  managers
- Updated dependencies
  [[`1cff6f54e`](https://github.com/chakra-ui/chakra-ui/commit/1cff6f54e5d6d8d72456915f56a6a575054305dc),
  [`06612e3ba`](https://github.com/chakra-ui/chakra-ui/commit/06612e3ba108fe7726634f856c5fcbcc7fcda27d),
  [`38706f731`](https://github.com/chakra-ui/chakra-ui/commit/38706f731372783bb05f01b5755a1753fab16f9e),
  [`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94),
  [`799f3c803`](https://github.com/chakra-ui/chakra-ui/commit/799f3c8037121b10aa4de15f5e9672b2b43a6a73),
  [`c69d2b983`](https://github.com/chakra-ui/chakra-ui/commit/c69d2b98350b57f133d6a8ea47b631cd25693aee),
  [`2287d82e3`](https://github.com/chakra-ui/chakra-ui/commit/2287d82e31744cd289aaf524bb9961e46003c404),
  [`75817ec42`](https://github.com/chakra-ui/chakra-ui/commit/75817ec428ca3c078660a7c7f2a1c1b578c474df),
  [`75817ec42`](https://github.com/chakra-ui/chakra-ui/commit/75817ec428ca3c078660a7c7f2a1c1b578c474df),
  [`e481ba491`](https://github.com/chakra-ui/chakra-ui/commit/e481ba4914a7f163d93d4c22e2e457f1afb08721),
  [`d86a0f6b4`](https://github.com/chakra-ui/chakra-ui/commit/d86a0f6b4cfcaaf759559325c8fe8b9376f7548b),
  [`75817ec42`](https://github.com/chakra-ui/chakra-ui/commit/75817ec428ca3c078660a7c7f2a1c1b578c474df),
  [`07ddf0f27`](https://github.com/chakra-ui/chakra-ui/commit/07ddf0f276e14f900119668c87947d3e669e09af),
  [`ac21d798a`](https://github.com/chakra-ui/chakra-ui/commit/ac21d798a0759b45de02c6821804f40f492fd80e)]:
  - @chakra-ui/progress@1.1.5
  - @chakra-ui/table@1.2.0
  - @chakra-ui/checkbox@1.4.1
  - @chakra-ui/number-input@1.2.1
  - @chakra-ui/radio@1.3.1
  - @chakra-ui/accordion@1.2.1
  - @chakra-ui/editable@1.2.1
  - @chakra-ui/menu@1.3.1
  - @chakra-ui/popover@1.5.0
  - @chakra-ui/slider@1.2.1
  - @chakra-ui/tabs@1.3.1
  - @chakra-ui/utils@1.5.1
  - @chakra-ui/toast@1.2.2
  - @chakra-ui/transition@1.1.2
  - @chakra-ui/modal@1.8.1
  - @chakra-ui/tooltip@1.3.1
  - @chakra-ui/popper@2.1.0
  - @chakra-ui/theme@1.8.1
  - @chakra-ui/form-control@1.3.1
  - @chakra-ui/select@1.1.5
  - @chakra-ui/alert@1.2.1
  - @chakra-ui/avatar@1.2.1
  - @chakra-ui/breadcrumb@1.2.1
  - @chakra-ui/button@1.2.1
  - @chakra-ui/hooks@1.3.1
  - @chakra-ui/input@1.2.1
  - @chakra-ui/layout@1.4.1
  - @chakra-ui/pin-input@1.5.1
  - @chakra-ui/portal@1.2.1
  - @chakra-ui/switch@1.2.1
  - @chakra-ui/close-button@1.1.5
  - @chakra-ui/control-box@1.0.8
  - @chakra-ui/counter@1.1.1
  - @chakra-ui/icon@1.1.5
  - @chakra-ui/image@1.0.11
  - @chakra-ui/live-region@1.0.8
  - @chakra-ui/media-query@1.0.9
  - @chakra-ui/skeleton@1.1.8
  - @chakra-ui/spinner@1.1.5
  - @chakra-ui/stat@1.1.5
  - @chakra-ui/system@1.6.1
  - @chakra-ui/tag@1.1.5
  - @chakra-ui/textarea@1.1.5
  - @chakra-ui/visually-hidden@1.0.8

## 1.4.2

### Patch Changes

- Updated dependencies
  [[`a8a841beb`](https://github.com/chakra-ui/chakra-ui/commit/a8a841bebb1bdb6c172c5b34be43921d4118670a),
  [`1d85e4729`](https://github.com/chakra-ui/chakra-ui/commit/1d85e472918346f1eb4ba7aed5291b9e7254e1f8),
  [`623e782e8`](https://github.com/chakra-ui/chakra-ui/commit/623e782e80124297740a109e5c6c58cddc35b2eb),
  [`aba02eab1`](https://github.com/chakra-ui/chakra-ui/commit/aba02eab1b38ab6c4ea6ae170740a10f8f9f16b7),
  [`36252981a`](https://github.com/chakra-ui/chakra-ui/commit/36252981a6e38ed138b5f41e0d50d01a19b4b77c),
  [`eed076c4b`](https://github.com/chakra-ui/chakra-ui/commit/eed076c4b373efa80cf55f541774c08a7366b846),
  [`6ab82ca37`](https://github.com/chakra-ui/chakra-ui/commit/6ab82ca37e898444b13c6a54de0b18704f562f12),
  [`f1612df7b`](https://github.com/chakra-ui/chakra-ui/commit/f1612df7bbaf68286c11d30c89d671cbe526c9c5),
  [`a58b724e9`](https://github.com/chakra-ui/chakra-ui/commit/a58b724e9c8656044f866b658f378662f2a44b46),
  [`f9b1a2a9b`](https://github.com/chakra-ui/chakra-ui/commit/f9b1a2a9b82abddbfeff510afd52cf127b765818),
  [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc),
  [`3cc77ce60`](https://github.com/chakra-ui/chakra-ui/commit/3cc77ce60681650436f764e28b4b2234c5ca6408),
  [`c71cb7b08`](https://github.com/chakra-ui/chakra-ui/commit/c71cb7b088a1d4c2a27a8c2d58d8573d9c2224c7),
  [`fa9350eff`](https://github.com/chakra-ui/chakra-ui/commit/fa9350eff0b907abd87cac98f9d758baed260596),
  [`fa9350eff`](https://github.com/chakra-ui/chakra-ui/commit/fa9350eff0b907abd87cac98f9d758baed260596),
  [`428593906`](https://github.com/chakra-ui/chakra-ui/commit/428593906ca3f3423a2e1bc25241169d1bf4de81),
  [`bb5b004ef`](https://github.com/chakra-ui/chakra-ui/commit/bb5b004ef2498d6641e38713868c3e5ed1d8789f),
  [`69ae9f68e`](https://github.com/chakra-ui/chakra-ui/commit/69ae9f68e6f56e9b21660590b7a307f16b5695e8)]:
  - @chakra-ui/popover@1.4.0
  - @chakra-ui/layout@1.4.0
  - @chakra-ui/hooks@1.3.0
  - @chakra-ui/theme@1.8.0
  - @chakra-ui/system@1.6.0
  - @chakra-ui/switch@1.2.0
  - @chakra-ui/avatar@1.2.0
  - @chakra-ui/utils@1.5.0
  - @chakra-ui/counter@1.1.0
  - @chakra-ui/accordion@1.2.0
  - @chakra-ui/alert@1.2.0
  - @chakra-ui/breadcrumb@1.2.0
  - @chakra-ui/button@1.2.0
  - @chakra-ui/checkbox@1.4.0
  - @chakra-ui/editable@1.2.0
  - @chakra-ui/form-control@1.3.0
  - @chakra-ui/input@1.2.0
  - @chakra-ui/menu@1.3.0
  - @chakra-ui/modal@1.8.0
  - @chakra-ui/number-input@1.2.0
  - @chakra-ui/pin-input@1.5.0
  - @chakra-ui/portal@1.2.0
  - @chakra-ui/radio@1.3.0
  - @chakra-ui/slider@1.2.0
  - @chakra-ui/tabs@1.3.0
  - @chakra-ui/tooltip@1.3.0
  - @chakra-ui/toast@1.2.1
  - @chakra-ui/image@1.0.10
  - @chakra-ui/skeleton@1.1.7
  - @chakra-ui/transition@1.1.1
  - @chakra-ui/close-button@1.1.4
  - @chakra-ui/control-box@1.0.7
  - @chakra-ui/icon@1.1.4
  - @chakra-ui/media-query@1.0.8
  - @chakra-ui/progress@1.1.4
  - @chakra-ui/select@1.1.4
  - @chakra-ui/spinner@1.1.4
  - @chakra-ui/stat@1.1.4
  - @chakra-ui/table@1.1.4
  - @chakra-ui/tag@1.1.4
  - @chakra-ui/textarea@1.1.4
  - @chakra-ui/visually-hidden@1.0.7
  - @chakra-ui/live-region@1.0.7
  - @chakra-ui/popper@2.0.1

## 1.4.1

### Patch Changes

- [`a576f4de8`](https://github.com/chakra-ui/chakra-ui/commit/a576f4de850706ea7088c8a6ea687269cad05e69)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix: avoid mutation
  for `getWithPriority` to get `textStyle` and `layerStyle` working
  consistently.
- Updated dependencies []:
  - @chakra-ui/system@1.5.1
  - @chakra-ui/skeleton@1.1.6

## 1.4.0

### Minor Changes

- [`64e8466b5`](https://github.com/chakra-ui/chakra-ui/commit/64e8466b528a027c915b7d2d5f474b08a0800e92)
  [#3623](https://github.com/chakra-ui/chakra-ui/pull/3623) Thanks
  [@with-heart](https://github.com/with-heart)! - Added support for
  `framer-motion` v4

* [`64e8466b5`](https://github.com/chakra-ui/chakra-ui/commit/64e8466b528a027c915b7d2d5f474b08a0800e92)
  [#3623](https://github.com/chakra-ui/chakra-ui/pull/3623) Thanks
  [@with-heart](https://github.com/with-heart)! - Upgraded `framer-motion`
  dependency to `^4.0.0`

### Patch Changes

- Updated dependencies
  [[`96139067d`](https://github.com/chakra-ui/chakra-ui/commit/96139067daa4b9a606b60c73f28a88ccd99d983b),
  [`64e8466b5`](https://github.com/chakra-ui/chakra-ui/commit/64e8466b528a027c915b7d2d5f474b08a0800e92),
  [`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86),
  [`035d5726e`](https://github.com/chakra-ui/chakra-ui/commit/035d5726e28396ef487b9801d7e2fa57677c703c),
  [`da443cd67`](https://github.com/chakra-ui/chakra-ui/commit/da443cd67289122d661bdab802d0ccb3740eb707),
  [`5bbad1947`](https://github.com/chakra-ui/chakra-ui/commit/5bbad19478694b16bf83e00faa9f1fd420578535),
  [`96139067d`](https://github.com/chakra-ui/chakra-ui/commit/96139067daa4b9a606b60c73f28a88ccd99d983b),
  [`d82c3c81d`](https://github.com/chakra-ui/chakra-ui/commit/d82c3c81def4b984c716888472f5df8027b6e679),
  [`fd0252be2`](https://github.com/chakra-ui/chakra-ui/commit/fd0252be2c5fcb1202721aa5dbeef2efe5ec31dd),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b),
  [`9c143bfe5`](https://github.com/chakra-ui/chakra-ui/commit/9c143bfe5bbf180929fabb0a1b4c18d40f7fd3fc),
  [`e6d33794b`](https://github.com/chakra-ui/chakra-ui/commit/e6d33794b84b9e107c43ea42b9ccd205101ef29d),
  [`223e50b32`](https://github.com/chakra-ui/chakra-ui/commit/223e50b32f6375ba67a8e21b643dd74951f1848c),
  [`00be7e92f`](https://github.com/chakra-ui/chakra-ui/commit/00be7e92f6383dc2c12a2930ce0322ddbfe3aa73),
  [`96139067d`](https://github.com/chakra-ui/chakra-ui/commit/96139067daa4b9a606b60c73f28a88ccd99d983b),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b),
  [`eece70293`](https://github.com/chakra-ui/chakra-ui/commit/eece70293fb095d016a1ef8f2e367422b3e02ef5)]:
  - @chakra-ui/system@1.5.0
  - @chakra-ui/checkbox@1.3.0
  - @chakra-ui/menu@1.2.0
  - @chakra-ui/modal@1.7.0
  - @chakra-ui/popover@1.3.0
  - @chakra-ui/toast@1.2.0
  - @chakra-ui/tooltip@1.2.0
  - @chakra-ui/transition@1.1.0
  - @chakra-ui/hooks@1.2.0
  - @chakra-ui/utils@1.4.0
  - @chakra-ui/layout@1.3.3
  - @chakra-ui/radio@1.2.5
  - @chakra-ui/theme@1.7.1
  - @chakra-ui/editable@1.1.3
  - @chakra-ui/number-input@1.1.3
  - @chakra-ui/slider@1.1.3
  - @chakra-ui/tag@1.1.3
  - @chakra-ui/avatar@1.1.4
  - @chakra-ui/popper@2.0.0
  - @chakra-ui/accordion@1.1.4
  - @chakra-ui/alert@1.1.3
  - @chakra-ui/breadcrumb@1.1.3
  - @chakra-ui/button@1.1.4
  - @chakra-ui/close-button@1.1.3
  - @chakra-ui/control-box@1.0.6
  - @chakra-ui/form-control@1.2.3
  - @chakra-ui/icon@1.1.3
  - @chakra-ui/image@1.0.9
  - @chakra-ui/input@1.1.4
  - @chakra-ui/media-query@1.0.7
  - @chakra-ui/pin-input@1.4.2
  - @chakra-ui/progress@1.1.3
  - @chakra-ui/select@1.1.3
  - @chakra-ui/skeleton@1.1.5
  - @chakra-ui/spinner@1.1.3
  - @chakra-ui/stat@1.1.3
  - @chakra-ui/switch@1.1.5
  - @chakra-ui/table@1.1.3
  - @chakra-ui/tabs@1.2.1
  - @chakra-ui/textarea@1.1.3
  - @chakra-ui/visually-hidden@1.0.6
  - @chakra-ui/counter@1.0.9
  - @chakra-ui/portal@1.1.3
  - @chakra-ui/live-region@1.0.6

## 1.3.4

### Patch Changes

- [`92adc0dc1`](https://github.com/chakra-ui/chakra-ui/commit/92adc0dc10e609d14439b95ed304a2731247d084)
  [#3438](https://github.com/chakra-ui/chakra-ui/pull/3438) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue where
  extending the theme with custom breakpoints with `strictNullChecks: false` in
  `tsconfig.json` lead to an error.
- Updated dependencies
  [[`f60e5c174`](https://github.com/chakra-ui/chakra-ui/commit/f60e5c174e07730cf073f2bf53ac6e0c8a66d0c1),
  [`79ff8e84e`](https://github.com/chakra-ui/chakra-ui/commit/79ff8e84e4a8f70d3abe969d68d8bfbb63c18471),
  [`87e42eb64`](https://github.com/chakra-ui/chakra-ui/commit/87e42eb6410846d0041a7e88e2c771d15d596f25),
  [`7efc9c217`](https://github.com/chakra-ui/chakra-ui/commit/7efc9c217789b2b314ed629c94b947256e8cbe2c),
  [`53408372e`](https://github.com/chakra-ui/chakra-ui/commit/53408372ef6926840815a03f2ac5269e3a4757f2),
  [`83ae62905`](https://github.com/chakra-ui/chakra-ui/commit/83ae62905935fdb3104380d6fd845159b00095fa),
  [`e1924c621`](https://github.com/chakra-ui/chakra-ui/commit/e1924c62182969a109b4900b05932caa1b73ed99),
  [`280d0dbfd`](https://github.com/chakra-ui/chakra-ui/commit/280d0dbfdd8894ab4aa228ac7ef816008a5d0824),
  [`0e93767f1`](https://github.com/chakra-ui/chakra-ui/commit/0e93767f1dfca00e5843d7ffab5eb3f038cec7fe),
  [`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d),
  [`dedc2d45f`](https://github.com/chakra-ui/chakra-ui/commit/dedc2d45fd8e568f9162bcf406b3059819eff6ff),
  [`f032942c8`](https://github.com/chakra-ui/chakra-ui/commit/f032942c8a2568a3a23baee0d5972834345e5fa6),
  [`39375c15b`](https://github.com/chakra-ui/chakra-ui/commit/39375c15b64635ea3f59d9f5ad1f31851f9f018b),
  [`1f4d0aa4e`](https://github.com/chakra-ui/chakra-ui/commit/1f4d0aa4eff7ba3caffb0599eb81edfb223a36cc)]:
  - @chakra-ui/layout@1.3.2
  - @chakra-ui/modal@1.6.1
  - @chakra-ui/theme@1.7.0
  - @chakra-ui/system@1.4.0
  - @chakra-ui/hooks@1.1.5
  - @chakra-ui/popper@1.1.5
  - @chakra-ui/slider@1.1.2
  - @chakra-ui/utils@1.3.0
  - @chakra-ui/tabs@1.2.0
  - @chakra-ui/select@1.1.2
  - @chakra-ui/toast@1.1.12
  - @chakra-ui/accordion@1.1.3
  - @chakra-ui/alert@1.1.2
  - @chakra-ui/avatar@1.1.3
  - @chakra-ui/breadcrumb@1.1.2
  - @chakra-ui/button@1.1.3
  - @chakra-ui/checkbox@1.2.4
  - @chakra-ui/close-button@1.1.2
  - @chakra-ui/control-box@1.0.5
  - @chakra-ui/editable@1.1.2
  - @chakra-ui/form-control@1.2.2
  - @chakra-ui/icon@1.1.2
  - @chakra-ui/image@1.0.8
  - @chakra-ui/input@1.1.3
  - @chakra-ui/media-query@1.0.6
  - @chakra-ui/menu@1.1.3
  - @chakra-ui/number-input@1.1.2
  - @chakra-ui/pin-input@1.4.1
  - @chakra-ui/popover@1.2.3
  - @chakra-ui/progress@1.1.2
  - @chakra-ui/radio@1.2.4
  - @chakra-ui/skeleton@1.1.4
  - @chakra-ui/spinner@1.1.2
  - @chakra-ui/stat@1.1.2
  - @chakra-ui/switch@1.1.4
  - @chakra-ui/table@1.1.2
  - @chakra-ui/tag@1.1.2
  - @chakra-ui/textarea@1.1.2
  - @chakra-ui/tooltip@1.1.3
  - @chakra-ui/visually-hidden@1.0.5
  - @chakra-ui/counter@1.0.8
  - @chakra-ui/portal@1.1.2
  - @chakra-ui/transition@1.0.9
  - @chakra-ui/live-region@1.0.5

## 1.3.3

### Patch Changes

- [`5a8d8c054`](https://github.com/chakra-ui/chakra-ui/commit/5a8d8c054aa3ecdfac51e355b61ac1ae6214f2d5)
  [#3366](https://github.com/chakra-ui/chakra-ui/pull/3366) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - The `extendTheme` function
  uses the type `Theme` again

* [`8597f58b7`](https://github.com/chakra-ui/chakra-ui/commit/8597f58b7d5c1fe401086d28a379bc1727756c5b)
  [#3361](https://github.com/chakra-ui/chakra-ui/pull/3361) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Allow halved values in
  design token in spacing as mentioned in the documents

* Updated dependencies
  [[`e8113d3ca`](https://github.com/chakra-ui/chakra-ui/commit/e8113d3ca66e9d45ac2dbb7109ff8904cbfd1134),
  [`091bad84a`](https://github.com/chakra-ui/chakra-ui/commit/091bad84a928c9d7f3cba103f2a0926045d931b8),
  [`b99b8674f`](https://github.com/chakra-ui/chakra-ui/commit/b99b8674f1c1874d5805cb3ad2e893c0d852374f),
  [`d6808f0a4`](https://github.com/chakra-ui/chakra-ui/commit/d6808f0a4ae6ad426b498e9556c76071f7aa9848),
  [`8597f58b7`](https://github.com/chakra-ui/chakra-ui/commit/8597f58b7d5c1fe401086d28a379bc1727756c5b),
  [`51ad518e2`](https://github.com/chakra-ui/chakra-ui/commit/51ad518e22642076485bee3dd1f99acbf025161b)]:
  - @chakra-ui/theme@1.6.2
  - @chakra-ui/modal@1.6.0
  - @chakra-ui/checkbox@1.2.3
  - @chakra-ui/radio@1.2.3
  - @chakra-ui/popper@1.1.4
  - @chakra-ui/system@1.3.1
  - @chakra-ui/toast@1.1.11
  - @chakra-ui/switch@1.1.3
  - @chakra-ui/menu@1.1.2
  - @chakra-ui/popover@1.2.2
  - @chakra-ui/tooltip@1.1.2
  - @chakra-ui/skeleton@1.1.3

## 1.3.2

### Patch Changes

- [`f3ba8dd53`](https://github.com/chakra-ui/chakra-ui/commit/f3ba8dd53abc697c096165185764235012ada90f)
  [#3300](https://github.com/chakra-ui/chakra-ui/pull/3300) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue where the
  TypeScript types were too narrow for component defaultProps and
  ComponentMultiStyleConfig
- Updated dependencies
  [[`f3ba8dd53`](https://github.com/chakra-ui/chakra-ui/commit/f3ba8dd53abc697c096165185764235012ada90f)]:
  - @chakra-ui/theme@1.6.1
  - @chakra-ui/toast@1.1.10

## 1.3.1

### Patch Changes

- Updated dependencies
  [[`01231ed49`](https://github.com/chakra-ui/chakra-ui/commit/01231ed4919521fbe911cb1b035f4beadb340fa5)]:
  - @chakra-ui/accordion@1.1.2
  - @chakra-ui/avatar@1.1.2
  - @chakra-ui/button@1.1.2
  - @chakra-ui/checkbox@1.2.2
  - @chakra-ui/input@1.1.2
  - @chakra-ui/radio@1.2.2
  - @chakra-ui/switch@1.1.2

## 1.3.0

### Minor Changes

- [`408aaaace`](https://github.com/chakra-ui/chakra-ui/commit/408aaaace0dd413b61354958a4c30b9f2f8aa376)
  [#3227](https://github.com/chakra-ui/chakra-ui/pull/3227) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Introducing a generic
  TypeScript type `ChakraTheme` to improve the `extendTheme` function even
  further.

  ```ts
  import { extendTheme } from "@chakra-ui/react"

  export const customTheme = extendTheme({
    // here you get autocomplete for
    //   - existing definitions from the default theme
    //   - new components (Single and MultiStyle)
    //   - CSS definitions
    //   - color hues
    //   - etc.
  })

  export type MyCustomTheme = typeof customTheme
  ```

  You can get typesafe access to your custom theme like this:

  ```ts
  import { useTheme } from "@chakra-ui/react"
  import { MyCustomTheme } from "./my-custom-theme"

  const MyComponent = () => {
    const customTheme = useTheme<MyCustomTheme>()
    //...
  }
  ```

### Patch Changes

- [`0100edbf0`](https://github.com/chakra-ui/chakra-ui/commit/0100edbf05c108c7d4725616dbbe9788a39da809)
  [#3232](https://github.com/chakra-ui/chakra-ui/pull/3232) Thanks
  [@dodas](https://github.com/dodas)! - Fixed issue in `extendTheme` where
  overrides defined as function replaced all base styles defined as plain
  object.
- Updated dependencies
  [[`a023a269f`](https://github.com/chakra-ui/chakra-ui/commit/a023a269ffe0efdae74be3de28e41790c9a5ca8a),
  [`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`f50934bdd`](https://github.com/chakra-ui/chakra-ui/commit/f50934bdd5ec47396464a0f4cb02af732f835ee5),
  [`2861b613b`](https://github.com/chakra-ui/chakra-ui/commit/2861b613bf354e6d00de01bf12bb543b2f2c2532),
  [`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`408aaaace`](https://github.com/chakra-ui/chakra-ui/commit/408aaaace0dd413b61354958a4c30b9f2f8aa376),
  [`3aa2abb13`](https://github.com/chakra-ui/chakra-ui/commit/3aa2abb134368acee592970995386dfd9aa5de01),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a),
  [`2eb58df12`](https://github.com/chakra-ui/chakra-ui/commit/2eb58df12b2ab1bd29cd02889e2eafa406747036)]:
  - @chakra-ui/theme@1.6.0
  - @chakra-ui/tooltip@1.1.1
  - @chakra-ui/system@1.3.0
  - @chakra-ui/toast@1.1.9
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/input@1.1.1
  - @chakra-ui/pin-input@1.4.0
  - @chakra-ui/accordion@1.1.1
  - @chakra-ui/alert@1.1.1
  - @chakra-ui/avatar@1.1.1
  - @chakra-ui/breadcrumb@1.1.1
  - @chakra-ui/button@1.1.1
  - @chakra-ui/checkbox@1.2.1
  - @chakra-ui/close-button@1.1.1
  - @chakra-ui/control-box@1.0.4
  - @chakra-ui/editable@1.1.1
  - @chakra-ui/form-control@1.2.1
  - @chakra-ui/icon@1.1.1
  - @chakra-ui/image@1.0.7
  - @chakra-ui/layout@1.3.1
  - @chakra-ui/media-query@1.0.5
  - @chakra-ui/menu@1.1.1
  - @chakra-ui/modal@1.5.1
  - @chakra-ui/number-input@1.1.1
  - @chakra-ui/popover@1.2.1
  - @chakra-ui/progress@1.1.1
  - @chakra-ui/radio@1.2.1
  - @chakra-ui/select@1.1.1
  - @chakra-ui/skeleton@1.1.2
  - @chakra-ui/slider@1.1.1
  - @chakra-ui/spinner@1.1.1
  - @chakra-ui/stat@1.1.1
  - @chakra-ui/switch@1.1.1
  - @chakra-ui/table@1.1.1
  - @chakra-ui/tabs@1.1.1
  - @chakra-ui/tag@1.1.1
  - @chakra-ui/textarea@1.1.1
  - @chakra-ui/visually-hidden@1.0.4
  - @chakra-ui/counter@1.0.7
  - @chakra-ui/hooks@1.1.4
  - @chakra-ui/live-region@1.0.4
  - @chakra-ui/popper@1.1.3
  - @chakra-ui/portal@1.1.1
  - @chakra-ui/transition@1.0.8

## 1.2.1

### Patch Changes

- Updated dependencies
  [[`2575d6957`](https://github.com/chakra-ui/chakra-ui/commit/2575d6957feb6da82775aacf6fe633b50ca3f81e)]:
  - @chakra-ui/system@1.2.1
  - @chakra-ui/skeleton@1.1.1

## 1.2.0

### Minor Changes

- [`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a)
  [#3092](https://github.com/chakra-ui/chakra-ui/pull/3092) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - - Improved theme typing in
  order to provide a better autocomplete experience
  - Fixed a type issue where pseudo style props like `_hover` and `_active`
    didn't allow regular css properties

### Patch Changes

- [`408096ca3`](https://github.com/chakra-ui/chakra-ui/commit/408096ca377197e46e2c9eb13e0ea33c46355b38)
  [#3164](https://github.com/chakra-ui/chakra-ui/pull/3164) Thanks
  [@ivanyeoh](https://github.com/ivanyeoh)! - fix: Extend theme should not
  include polyfill function

* [`fa2083807`](https://github.com/chakra-ui/chakra-ui/commit/fa2083807f8372dc054261a214d66545ab7cac14)
  [#3150](https://github.com/chakra-ui/chakra-ui/pull/3150) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Improve TypeScript type
  for `extendTheme` to allow deeply nested color objects

* Updated dependencies
  [[`500b1eea0`](https://github.com/chakra-ui/chakra-ui/commit/500b1eea0876909b670c103ffa354b2b77ff024f),
  [`14be4be2c`](https://github.com/chakra-ui/chakra-ui/commit/14be4be2c6f64896612cb05d7e56c2c5e4015335),
  [`98ed67bc0`](https://github.com/chakra-ui/chakra-ui/commit/98ed67bc09faf11238440af9233a420849ecb2e7),
  [`ab788323d`](https://github.com/chakra-ui/chakra-ui/commit/ab788323dadc8637af80e80af7c450d5e7b9bc5a),
  [`68694e5ab`](https://github.com/chakra-ui/chakra-ui/commit/68694e5ab774a5981be943acb705e6e0af34e870),
  [`20fb74c07`](https://github.com/chakra-ui/chakra-ui/commit/20fb74c074fbb4f229c9613f91de65e824309c07),
  [`f90d8be54`](https://github.com/chakra-ui/chakra-ui/commit/f90d8be545069ebedc42f13cb293c26c35eb0d3b),
  [`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a),
  [`4e193f721`](https://github.com/chakra-ui/chakra-ui/commit/4e193f721fd51fd7e8d5f0fdc399a2784276a158),
  [`709ca0398`](https://github.com/chakra-ui/chakra-ui/commit/709ca0398a8c82c55b85c1364d80b90c5e075257),
  [`b572bceed`](https://github.com/chakra-ui/chakra-ui/commit/b572bceedd9fb0c41c65118f0d9ba672791932ca),
  [`e41e6b81b`](https://github.com/chakra-ui/chakra-ui/commit/e41e6b81bf6943fef9b34e5ddd31ee57b416a426)]:
  - @chakra-ui/tabs@1.1.0
  - @chakra-ui/modal@1.5.0
  - @chakra-ui/tooltip@1.1.0
  - @chakra-ui/breadcrumb@1.1.0
  - @chakra-ui/number-input@1.1.0
  - @chakra-ui/menu@1.1.0
  - @chakra-ui/theme@1.5.0
  - @chakra-ui/layout@1.3.0
  - @chakra-ui/accordion@1.1.0
  - @chakra-ui/alert@1.1.0
  - @chakra-ui/avatar@1.1.0
  - @chakra-ui/button@1.1.0
  - @chakra-ui/checkbox@1.2.0
  - @chakra-ui/close-button@1.1.0
  - @chakra-ui/editable@1.1.0
  - @chakra-ui/form-control@1.2.0
  - @chakra-ui/icon@1.1.0
  - @chakra-ui/input@1.1.0
  - @chakra-ui/pin-input@1.3.0
  - @chakra-ui/popover@1.2.0
  - @chakra-ui/progress@1.1.0
  - @chakra-ui/radio@1.2.0
  - @chakra-ui/select@1.1.0
  - @chakra-ui/skeleton@1.1.0
  - @chakra-ui/slider@1.1.0
  - @chakra-ui/spinner@1.1.0
  - @chakra-ui/stat@1.1.0
  - @chakra-ui/switch@1.1.0
  - @chakra-ui/system@1.2.0
  - @chakra-ui/table@1.1.0
  - @chakra-ui/tag@1.1.0
  - @chakra-ui/textarea@1.1.0
  - @chakra-ui/hooks@1.1.3
  - @chakra-ui/portal@1.1.0
  - @chakra-ui/toast@1.1.8
  - @chakra-ui/image@1.0.6
  - @chakra-ui/counter@1.0.6
  - @chakra-ui/popper@1.1.2
  - @chakra-ui/transition@1.0.7

## 1.1.6

### Patch Changes

- Updated dependencies
  [[`66193eb2`](https://github.com/chakra-ui/chakra-ui/commit/66193eb2073867ea47d062d4723416aae0e962b8),
  [`df66d58e`](https://github.com/chakra-ui/chakra-ui/commit/df66d58e163c285f33649cfd2a480b810e9599a2),
  [`f91058e3`](https://github.com/chakra-ui/chakra-ui/commit/f91058e3883f30a6f8ef8f8288e9be614333a862),
  [`002a4361`](https://github.com/chakra-ui/chakra-ui/commit/002a4361bd738bef49e021a2fff2b9b6a9af5815),
  [`8816f3e3`](https://github.com/chakra-ui/chakra-ui/commit/8816f3e392eafbe283af119c44b900f5728b589e),
  [`07edd6d4`](https://github.com/chakra-ui/chakra-ui/commit/07edd6d4bf9988d95d49399f84f714533f96fb94),
  [`31881da7`](https://github.com/chakra-ui/chakra-ui/commit/31881da7314c9c464d080b7dd83edd59d8786b7c)]:
  - @chakra-ui/menu@1.0.6
  - @chakra-ui/layout@1.2.0
  - @chakra-ui/pin-input@1.2.0
  - @chakra-ui/hooks@1.1.2
  - @chakra-ui/select@1.0.6
  - @chakra-ui/popover@1.1.0
  - @chakra-ui/portal@1.0.6
  - @chakra-ui/accordion@1.0.6
  - @chakra-ui/checkbox@1.1.3
  - @chakra-ui/counter@1.0.5
  - @chakra-ui/editable@1.0.5
  - @chakra-ui/form-control@1.1.3
  - @chakra-ui/image@1.0.5
  - @chakra-ui/modal@1.4.5
  - @chakra-ui/number-input@1.0.6
  - @chakra-ui/popper@1.1.1
  - @chakra-ui/radio@1.1.3
  - @chakra-ui/skeleton@1.0.10
  - @chakra-ui/slider@1.0.5
  - @chakra-ui/tabs@1.0.7
  - @chakra-ui/toast@1.1.7
  - @chakra-ui/tooltip@1.0.6
  - @chakra-ui/transition@1.0.6
  - @chakra-ui/switch@1.0.6
  - @chakra-ui/system@1.1.7
  - @chakra-ui/input@1.0.6
  - @chakra-ui/textarea@1.0.6
  - @chakra-ui/avatar@1.0.5

## 1.1.5

### Patch Changes

- Updated dependencies
  [[`02041efc`](https://github.com/chakra-ui/chakra-ui/commit/02041efcecd8b5f98ddd7be411c56cf12a40d343),
  [`26f28512`](https://github.com/chakra-ui/chakra-ui/commit/26f285129f6c739b24bf28ede71a5358ba4dbf9f),
  [`02855588`](https://github.com/chakra-ui/chakra-ui/commit/02855588a4ffbc6573768052e53cc538361e91ee),
  [`b9e2cae0`](https://github.com/chakra-ui/chakra-ui/commit/b9e2cae06277b764278c427dea949abbf3278e92),
  [`0d620f1d`](https://github.com/chakra-ui/chakra-ui/commit/0d620f1d46b9c72c9aef3bb15a691a249ace2eb4),
  [`032f1678`](https://github.com/chakra-ui/chakra-ui/commit/032f16788553b84685de61af5f021c395e09648f)]:
  - @chakra-ui/progress@1.0.5
  - @chakra-ui/checkbox@1.1.2
  - @chakra-ui/menu@1.0.5
  - @chakra-ui/radio@1.1.2
  - @chakra-ui/hooks@1.1.1
  - @chakra-ui/popover@1.0.7
  - @chakra-ui/portal@1.0.5
  - @chakra-ui/popper@1.1.0
  - @chakra-ui/switch@1.0.5
  - @chakra-ui/system@1.1.6
  - @chakra-ui/accordion@1.0.5
  - @chakra-ui/counter@1.0.4
  - @chakra-ui/editable@1.0.4
  - @chakra-ui/form-control@1.1.2
  - @chakra-ui/image@1.0.4
  - @chakra-ui/modal@1.4.4
  - @chakra-ui/number-input@1.0.5
  - @chakra-ui/pin-input@1.1.4
  - @chakra-ui/skeleton@1.0.9
  - @chakra-ui/slider@1.0.4
  - @chakra-ui/tabs@1.0.6
  - @chakra-ui/toast@1.1.6
  - @chakra-ui/tooltip@1.0.5
  - @chakra-ui/transition@1.0.5
  - @chakra-ui/avatar@1.0.4
  - @chakra-ui/input@1.0.5
  - @chakra-ui/select@1.0.5
  - @chakra-ui/textarea@1.0.5

## 1.1.4

### Patch Changes

- Updated dependencies
  [[`4ae55fa3`](https://github.com/chakra-ui/chakra-ui/commit/4ae55fa3ff28eec1be9e1e5b6ab37d3c7f727df1),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/form-control@1.1.1
  - @chakra-ui/theme@1.4.1
  - @chakra-ui/hooks@1.1.0
  - @chakra-ui/utils@1.1.0
  - @chakra-ui/input@1.0.4
  - @chakra-ui/number-input@1.0.4
  - @chakra-ui/radio@1.1.1
  - @chakra-ui/select@1.0.4
  - @chakra-ui/textarea@1.0.4
  - @chakra-ui/toast@1.1.5
  - @chakra-ui/accordion@1.0.4
  - @chakra-ui/checkbox@1.1.1
  - @chakra-ui/counter@1.0.3
  - @chakra-ui/editable@1.0.3
  - @chakra-ui/image@1.0.3
  - @chakra-ui/menu@1.0.4
  - @chakra-ui/modal@1.4.3
  - @chakra-ui/pin-input@1.1.3
  - @chakra-ui/popover@1.0.6
  - @chakra-ui/popper@1.0.3
  - @chakra-ui/portal@1.0.4
  - @chakra-ui/skeleton@1.0.8
  - @chakra-ui/slider@1.0.3
  - @chakra-ui/tabs@1.0.5
  - @chakra-ui/tooltip@1.0.4
  - @chakra-ui/transition@1.0.4
  - @chakra-ui/alert@1.0.4
  - @chakra-ui/avatar@1.0.3
  - @chakra-ui/breadcrumb@1.0.3
  - @chakra-ui/button@1.0.4
  - @chakra-ui/close-button@1.0.4
  - @chakra-ui/control-box@1.0.3
  - @chakra-ui/icon@1.0.3
  - @chakra-ui/layout@1.1.3
  - @chakra-ui/live-region@1.0.3
  - @chakra-ui/media-query@1.0.4
  - @chakra-ui/progress@1.0.4
  - @chakra-ui/spinner@1.0.3
  - @chakra-ui/stat@1.0.3
  - @chakra-ui/switch@1.0.4
  - @chakra-ui/system@1.1.5
  - @chakra-ui/table@1.0.3
  - @chakra-ui/tag@1.0.4
  - @chakra-ui/visually-hidden@1.0.3

## 1.1.3

### Patch Changes

- Updated dependencies
  [[`3ab385bd`](https://github.com/chakra-ui/chakra-ui/commit/3ab385bdd61be3a9cbe5234494a8992a7be0dcdf),
  [`1bc2aeb3`](https://github.com/chakra-ui/chakra-ui/commit/1bc2aeb31bac24f7c8108201a07f7aac3c1ac6ea),
  [`a98817de`](https://github.com/chakra-ui/chakra-ui/commit/a98817de0849bf9eec89fae3faf4fbe085f21011),
  [`ff7c3676`](https://github.com/chakra-ui/chakra-ui/commit/ff7c36764650dc7f01957c417eae1ec8ce356495),
  [`1286da79`](https://github.com/chakra-ui/chakra-ui/commit/1286da7977db7bd8f19e2abd03b73990737b1379)]:
  - @chakra-ui/tabs@1.0.4
  - @chakra-ui/skeleton@1.0.7
  - @chakra-ui/portal@1.0.3
  - @chakra-ui/theme@1.4.0
  - @chakra-ui/media-query@1.0.3
  - @chakra-ui/system@1.1.4
  - @chakra-ui/modal@1.4.2
  - @chakra-ui/popover@1.0.5
  - @chakra-ui/tooltip@1.0.3
  - @chakra-ui/toast@1.1.4

## 1.1.2

### Patch Changes

- Updated dependencies
  [[`f192cfd6`](https://github.com/chakra-ui/chakra-ui/commit/f192cfd640302e75762bb351cec21fdf670ab898),
  [`a9807b33`](https://github.com/chakra-ui/chakra-ui/commit/a9807b334477ac9ecd7f3637c0ff7d5fb5c46639),
  [`de3d059b`](https://github.com/chakra-ui/chakra-ui/commit/de3d059bf2ee7ca2a8ba5f10051b4cd76f86847a),
  [`f7142599`](https://github.com/chakra-ui/chakra-ui/commit/f714259943a03d6e191949c7c1c68c9f9b8b49fd),
  [`d45c4956`](https://github.com/chakra-ui/chakra-ui/commit/d45c495617ee5038b56eee89b094979b2ac96128)]:
  - @chakra-ui/theme@1.3.0
  - @chakra-ui/modal@1.4.1
  - @chakra-ui/system@1.1.3
  - @chakra-ui/progress@1.0.3
  - @chakra-ui/toast@1.1.3
  - @chakra-ui/skeleton@1.0.6

## 1.1.1

### Patch Changes

- Updated dependencies
  [[`5cef5de4`](https://github.com/chakra-ui/chakra-ui/commit/5cef5de4f45cd58f7a29436335543cb5b40c0d70),
  [`6a82a3d4`](https://github.com/chakra-ui/chakra-ui/commit/6a82a3d4f061191171a12e6d38719ba05414a86e),
  [`5c9ef8bd`](https://github.com/chakra-ui/chakra-ui/commit/5c9ef8bd9ca8a2bffae34bc96f9d50b17c9eb3c6)]:
  - @chakra-ui/button@1.0.3
  - @chakra-ui/layout@1.1.2
  - @chakra-ui/modal@1.4.0
  - @chakra-ui/tag@1.0.3
  - @chakra-ui/tabs@1.0.3
  - @chakra-ui/system@1.1.2
  - @chakra-ui/skeleton@1.0.5

## 1.1.0

### Minor Changes

- [`6a410f77`](https://github.com/chakra-ui/chakra-ui/commit/6a410f778f534e00e01fdf0d3ce1ffdd1d7b138e)
  [#2834](https://github.com/chakra-ui/chakra-ui/pull/2834) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Allow `extendTheme` to
  accept optional second argument `baseTheme` to customize:

  ```jsx
  const theme = extendTheme(
    { colors: { red: { 500: "#ff0000" } } },
    // the base theme to customize with the above overrides
    yourTheme,
  )
  ```

  If no `baseTheme` is provided, defaults to the Chakra theme.

* [`a0e0bd9a`](https://github.com/chakra-ui/chakra-ui/commit/a0e0bd9a5d45fe08887f8df8d3eccc84951578df)
  [#2816](https://github.com/chakra-ui/chakra-ui/pull/2816) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Add gradient support to
  chakra style props. This PR adds to props:

  - `bgGradient`: a shorthand, convenient style prop to apply theme-aware
    gradients.
  - `bgClip`: a shorthand for `background-clip` CSS attribute. Useful when
    creating text gradients.
  - `backgroundClip`: the typical `background-clip` CSS attribute. Useful when
    creating text gradients.

  ## The Background Gradient API

  To add a gradient to a component, pass the `bgGradient` prop and set its value
  following the API below:

  - `linear(<direction>, <from>, <to>)`
  - `radial(<from>, <to>)`

  and other valid css gradient properties. For linear gradients, the direction
  can be either of the following values:

  ```js
  "to-t" // 'to top'
  "to-tr" // 'to top right'
  "to-r" // 'to right'
  "to-br" // 'to bottom right'
  "to-b" // 'to bottom'
  "to-bl" // 'to bottom left'
  "to-l" // 'to left'
  "to-tl" // 'to top left'
  ```

  ```jsx
  <Box w="500px" h="200px" bgGradient="linear(to-r, gray.300, pink.200)" />
  ```

  You can use both theme-aware color tokens or raw CSS color values.

  ```jsx
  <Box w="500px" h="200px" bgGradient="linear(to-l, #7928CA, #FF0080)" />
  ```

  ### Multiple Color Stops

  This is a gradient with multiple stops

  ```jsx
  <Box w="500px" h="200px" bgGradient="radial(gray.300,yellow.400,pink.200)" />
  ```

  ## The Text Gradient API

  To add a text gradient, pass the `bgGradient` following the API and `bgClip`
  prop to `text`.

  ```jsx
  <Text
    bgGradient="linear(to-l,#7928CA,#FF0080)"
    bgClip="text"
    fontSize="7xl"
    fontWeight="extrabold"
  >
    Welcome to Chakra UI
  </Text>
  ```

### Patch Changes

- [`916588a5`](https://github.com/chakra-ui/chakra-ui/commit/916588a5bbb771ff3f07b0ceb160bef57cdd6a8a)
  [#2783](https://github.com/chakra-ui/chakra-ui/pull/2783) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue where
  `extendTheme` did not allow string properties besides ColorHue in the `colors`
  attribute of the theme override.

  ```jsx
  extendTheme({
    colors: {
      myColor: {
        text: "#ff0000",
      },
    },
  })
  ```

- Updated dependencies
  [[`1e6db1e0`](https://github.com/chakra-ui/chakra-ui/commit/1e6db1e068c6bc0a4c6c6893d1716d284dcbb8f8),
  [`5c8f0838`](https://github.com/chakra-ui/chakra-ui/commit/5c8f08382858c0bbc77d875db52859e7c304392f),
  [`f09a1cbf`](https://github.com/chakra-ui/chakra-ui/commit/f09a1cbf2eaef537b31b1f2fdf1e7c685e1926bb),
  [`46e24c58`](https://github.com/chakra-ui/chakra-ui/commit/46e24c5820ef2726a4fb16a190efda39fb0b075a)]:
  - @chakra-ui/checkbox@1.1.0
  - @chakra-ui/radio@1.1.0
  - @chakra-ui/skeleton@1.0.4
  - @chakra-ui/pin-input@1.1.2
  - @chakra-ui/switch@1.0.3
  - @chakra-ui/system@1.1.1

## 1.0.4

### Patch Changes

- [`5bff79a1`](https://github.com/chakra-ui/chakra-ui/commit/5bff79a1ba6989d279fc432d5040c72cd75b392e)
  Thanks [@jmiazga](https://github.com/jmiazga)! - Updated framer-motion
  peerDependencies to v3

- Updated dependencies
  [[`730a2da1`](https://github.com/chakra-ui/chakra-ui/commit/730a2da19b652614bc051b9f80313d211b22d1de),
  [`0f1e34f2`](https://github.com/chakra-ui/chakra-ui/commit/0f1e34f2c2263de687343184fd143a6377a42176),
  [`b8df0bf4`](https://github.com/chakra-ui/chakra-ui/commit/b8df0bf44a10512658826e5ef8e3067bc45fbc4a),
  [`5bff79a1`](https://github.com/chakra-ui/chakra-ui/commit/5bff79a1ba6989d279fc432d5040c72cd75b392e),
  [`123aaf59`](https://github.com/chakra-ui/chakra-ui/commit/123aaf59a60aaae269e2a305730a650a112c0975),
  [`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5),
  [`40a4ab8d`](https://github.com/chakra-ui/chakra-ui/commit/40a4ab8dfcedabf290882936cae0e1523e5aa414),
  [`aeb5e521`](https://github.com/chakra-ui/chakra-ui/commit/aeb5e5214970e7fd239629226dd06f6058b8c697),
  [`29c0e45e`](https://github.com/chakra-ui/chakra-ui/commit/29c0e45efb9f8f37dc2e81b56c08e2f1cedeb621),
  [`b590570f`](https://github.com/chakra-ui/chakra-ui/commit/b590570f25ae2f15fd15eeaa6de37ce0c2119609),
  [`85eb4090`](https://github.com/chakra-ui/chakra-ui/commit/85eb409039640949e01f3aa7353519b19a42a53f),
  [`080a7acc`](https://github.com/chakra-ui/chakra-ui/commit/080a7accdd321123e44df082911c6250154fdbd5),
  [`d1bd91e1`](https://github.com/chakra-ui/chakra-ui/commit/d1bd91e141fba54c1094a7f60932a060fba4949a)]:
  - @chakra-ui/pin-input@1.1.1
  - @chakra-ui/number-input@1.0.3
  - @chakra-ui/system@1.1.0
  - @chakra-ui/radio@1.0.3
  - @chakra-ui/form-control@1.1.0
  - @chakra-ui/modal@1.3.0
  - @chakra-ui/checkbox@1.0.2
  - @chakra-ui/menu@1.0.3
  - @chakra-ui/popover@1.0.4
  - @chakra-ui/toast@1.1.2
  - @chakra-ui/tooltip@1.0.2
  - @chakra-ui/transition@1.0.3
  - @chakra-ui/utils@1.0.2
  - @chakra-ui/skeleton@1.0.3
  - @chakra-ui/layout@1.1.1
  - @chakra-ui/input@1.0.3
  - @chakra-ui/theme@1.2.2
  - @chakra-ui/accordion@1.0.3
  - @chakra-ui/alert@1.0.3
  - @chakra-ui/avatar@1.0.2
  - @chakra-ui/breadcrumb@1.0.2
  - @chakra-ui/button@1.0.2
  - @chakra-ui/close-button@1.0.3
  - @chakra-ui/control-box@1.0.2
  - @chakra-ui/editable@1.0.2
  - @chakra-ui/icon@1.0.2
  - @chakra-ui/image@1.0.2
  - @chakra-ui/media-query@1.0.2
  - @chakra-ui/progress@1.0.2
  - @chakra-ui/select@1.0.3
  - @chakra-ui/slider@1.0.2
  - @chakra-ui/spinner@1.0.2
  - @chakra-ui/stat@1.0.2
  - @chakra-ui/switch@1.0.2
  - @chakra-ui/table@1.0.2
  - @chakra-ui/tabs@1.0.2
  - @chakra-ui/tag@1.0.2
  - @chakra-ui/textarea@1.0.3
  - @chakra-ui/visually-hidden@1.0.2
  - @chakra-ui/counter@1.0.2
  - @chakra-ui/hooks@1.0.2
  - @chakra-ui/live-region@1.0.2
  - @chakra-ui/popper@1.0.2
  - @chakra-ui/portal@1.0.2

## 1.0.3

### Patch Changes

- [`0d0ed051`](https://github.com/chakra-ui/chakra-ui/commit/0d0ed0513ac1094833f1e0294f655af122682ff4)
  [#2707](https://github.com/chakra-ui/chakra-ui/pull/2707) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Fix too narrow TypeScript
  type for theme override

- Updated dependencies
  [[`f3cc344e`](https://github.com/chakra-ui/chakra-ui/commit/f3cc344e1a7dd08dc7a312e6ce039d55a80cc526),
  [`72bbd0db`](https://github.com/chakra-ui/chakra-ui/commit/72bbd0dbb913ba38ee2b9191d12bf73713ae4398),
  [`653f3dd6`](https://github.com/chakra-ui/chakra-ui/commit/653f3dd6f30a17e366c069666acbfd9eddb11936),
  [`c73cce25`](https://github.com/chakra-ui/chakra-ui/commit/c73cce25bf986fd5b1261575ca395f731f827f53)]:
  - @chakra-ui/pin-input@1.1.0
  - @chakra-ui/theme@1.2.1
  - @chakra-ui/close-button@1.0.2
  - @chakra-ui/system@1.0.2
  - @chakra-ui/alert@1.0.2
  - @chakra-ui/toast@1.1.1
  - @chakra-ui/modal@1.2.1
  - @chakra-ui/popover@1.0.3
  - @chakra-ui/skeleton@1.0.2

## 1.0.2

### Patch Changes

- [`cfd3b325`](https://github.com/chakra-ui/chakra-ui/commit/cfd3b32564066076529811c5350aff6be565b7a3)
  [#2632](https://github.com/chakra-ui/chakra-ui/pull/2632) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Improve typings for
  `extendTheme`. IntelliSense now can suggest property keys for colors and
  existing components.
- Updated dependencies
  [[`e1b095cd`](https://github.com/chakra-ui/chakra-ui/commit/e1b095cdb799bb3630d3cbb7891d8c7e929db0f4),
  [`6b527414`](https://github.com/chakra-ui/chakra-ui/commit/6b52741456f71ba4ec8cfe3e6307796d195adf5b),
  [`28bd21d7`](https://github.com/chakra-ui/chakra-ui/commit/28bd21d793911ba56bd146dd7aaff1008a70d147),
  [`2192be3d`](https://github.com/chakra-ui/chakra-ui/commit/2192be3db77504addffc89cbfef62fb9e884fa5d),
  [`a36ede75`](https://github.com/chakra-ui/chakra-ui/commit/a36ede7519b7193f90e4985636a06c5d483a8a62),
  [`ff10bcec`](https://github.com/chakra-ui/chakra-ui/commit/ff10bceca5774769766eef3a6812a22f387dd58d),
  [`ac0af38d`](https://github.com/chakra-ui/chakra-ui/commit/ac0af38d12dc5828503e178fb94a21f252e3a62b),
  [`c696345a`](https://github.com/chakra-ui/chakra-ui/commit/c696345a711338a23542a7b1911a33927a9ba5f1),
  [`9fdc61d8`](https://github.com/chakra-ui/chakra-ui/commit/9fdc61d8801f6d76783b5c9f068525d4dfc28b20),
  [`2416cf9a`](https://github.com/chakra-ui/chakra-ui/commit/2416cf9abe183a3a38adbccff794088d86a46341),
  [`58e26653`](https://github.com/chakra-ui/chakra-ui/commit/58e26653134caee1dd2caddb9014f7a90dc4eb7e)]:
  - @chakra-ui/number-input@1.0.2
  - @chakra-ui/layout@1.1.0
  - @chakra-ui/modal@1.2.0
  - @chakra-ui/theme@1.2.0
  - @chakra-ui/form-control@1.0.2
  - @chakra-ui/toast@1.1.0
  - @chakra-ui/transition@1.0.2
  - @chakra-ui/radio@1.0.2
  - @chakra-ui/input@1.0.2
  - @chakra-ui/select@1.0.2
  - @chakra-ui/textarea@1.0.2
  - @chakra-ui/accordion@1.0.2
  - @chakra-ui/menu@1.0.2
  - @chakra-ui/popover@1.0.2

## 1.0.1

### Patch Changes

- Updated dependencies
  [[`b3594802`](https://github.com/chakra-ui/chakra-ui/commit/b3594802714115c762013174badd5b838217be6f),
  [`843854ec`](https://github.com/chakra-ui/chakra-ui/commit/843854ec669367623b50a598402be343866d87a8),
  [`f0d03d9f`](https://github.com/chakra-ui/chakra-ui/commit/f0d03d9f6e474a1f1767643889734665c2910dc1),
  [`892ea2ca`](https://github.com/chakra-ui/chakra-ui/commit/892ea2ca1c02b4127f4f044df33de58cc7641f5c),
  [`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213),
  [`204ff7e3`](https://github.com/chakra-ui/chakra-ui/commit/204ff7e39dd37003786194704b36069ef94d56a6),
  [`ba262ac7`](https://github.com/chakra-ui/chakra-ui/commit/ba262ac7b2e2d932bb227d4ff9181e83fbaa4149),
  [`a1ff404b`](https://github.com/chakra-ui/chakra-ui/commit/a1ff404b12a898ab97af024391a06c34da5bc69a)]:
  - @chakra-ui/layout@1.0.1
  - @chakra-ui/theme@1.1.0
  - @chakra-ui/progress@1.0.1
  - @chakra-ui/tabs@1.0.1
  - @chakra-ui/utils@1.0.1
  - @chakra-ui/hooks@1.0.1
  - @chakra-ui/modal@1.1.0
  - @chakra-ui/media-query@1.0.1
  - @chakra-ui/system@1.0.1
  - @chakra-ui/toast@1.0.1
  - @chakra-ui/accordion@1.0.1
  - @chakra-ui/alert@1.0.1
  - @chakra-ui/avatar@1.0.1
  - @chakra-ui/breadcrumb@1.0.1
  - @chakra-ui/button@1.0.1
  - @chakra-ui/checkbox@1.0.1
  - @chakra-ui/close-button@1.0.1
  - @chakra-ui/control-box@1.0.1
  - @chakra-ui/counter@1.0.1
  - @chakra-ui/editable@1.0.1
  - @chakra-ui/form-control@1.0.1
  - @chakra-ui/icon@1.0.1
  - @chakra-ui/image@1.0.1
  - @chakra-ui/input@1.0.1
  - @chakra-ui/live-region@1.0.1
  - @chakra-ui/menu@1.0.1
  - @chakra-ui/number-input@1.0.1
  - @chakra-ui/pin-input@1.0.1
  - @chakra-ui/popover@1.0.1
  - @chakra-ui/popper@1.0.1
  - @chakra-ui/portal@1.0.1
  - @chakra-ui/radio@1.0.1
  - @chakra-ui/select@1.0.1
  - @chakra-ui/skeleton@1.0.1
  - @chakra-ui/slider@1.0.1
  - @chakra-ui/spinner@1.0.1
  - @chakra-ui/stat@1.0.1
  - @chakra-ui/switch@1.0.1
  - @chakra-ui/tag@1.0.1
  - @chakra-ui/textarea@1.0.1
  - @chakra-ui/tooltip@1.0.1
  - @chakra-ui/transition@1.0.1
  - @chakra-ui/visually-hidden@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/react

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

**Note:** Version bump only for package @chakra-ui/core

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/core

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/core

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/core

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/core

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/core

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/core@1.0.0-rc.0...@chakra-ui/core@1.0.0-rc.1) (2020-08-06)

### Bug Fixes

- stack key issue and yarn2 deps issue
  ([d6cb6b8](https://github.com/chakra-ui/chakra-ui/commit/d6cb6b8fd964729efdf41b1e29c888a3c101316c))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/core@1.0.0-next.7...@chakra-ui/core@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/core

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/core@1.0.0-next.6...@chakra-ui/core@1.0.0-next.7) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/core

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/core@1.0.0-next.5...@chakra-ui/core@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/core

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/core@1.0.0-next.4...@chakra-ui/core@1.0.0-next.5) (2020-07-15)

### Bug Fixes

- revert icon fallback to correct svg path
  ([afa4dbb](https://github.com/chakra-ui/chakra-ui/commit/afa4dbb49931391778f635784bddd3395d555df0))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.4](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/core@0.8.0...@chakra-ui/core@1.0.0-next.4) (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- Adding PIN input to core export
  ([301483e](https://github.com/chakra-ui/chakra-ui/commit/301483e47996d266612f4f282611dfffca333bbc))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- **core:** add Skeleton export
  ([9255f24](https://github.com/chakra-ui/chakra-ui/commit/9255f24a3653f6f71773d4fdf7221c40aeddb873))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.3](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/core@0.8.0...@chakra-ui/core@1.0.0-next.3) (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- **core:** add Skeleton export
  ([9255f24](https://github.com/chakra-ui/chakra-ui/commit/9255f24a3653f6f71773d4fdf7221c40aeddb873))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.2](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/core@0.8.0...@chakra-ui/core@1.0.0-next.2) (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- **core:** add Skeleton export
  ([9255f24](https://github.com/chakra-ui/chakra-ui/commit/9255f24a3653f6f71773d4fdf7221c40aeddb873))

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
