# @chakra-ui/react

## 3.8.1

### Patch Changes

- [`cdb9459`](https://github.com/chakra-ui/chakra-ui/commit/cdb9459a764800391e15864108fbd8fa94a7164c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Fix performance
  regression from `v3.5.x` by reverting memoization logic
  - Add `useMemo` to provider components and styling hooks to avoid unnecessary
    recomputations

## 3.8.0

### Minor Changes

- [`fa5e966`](https://github.com/chakra-ui/chakra-ui/commit/fa5e966f389e75f4bb795b31e6f6b5dd8df017ba)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Add new hooks
  `useElementRect`, `useForceUpdate`, `useLiveRef`,`usePrevious` and
  `useSafeLayoutEffect`

  - Add new `FocusTrap` component for trapping focus within a container

### Patch Changes

- [#9616](https://github.com/chakra-ui/chakra-ui/pull/9616)
  [`54a73a7`](https://github.com/chakra-ui/chakra-ui/commit/54a73a79c6121d3b367ffcff1860347d97ab0fd9)
  Thanks [@mhsattarian](https://github.com/mhsattarian)! - - **Breadcrumb**: Fix
  issue where breadcrumb arrow don't flip in RTL
  - **Snippets / Color Mode**: Add `LightMode` and `DarkMode` components to
    force light and dark color mode in a subtree
  - **Docs / Testing**: Add testing guideline for Vitest
  - **Group**: Fix issue where `Group` component doesn't skip invalid children

## 3.7.0

### Minor Changes

- [`cb0ffc9`](https://github.com/chakra-ui/chakra-ui/commit/cb0ffc99b47da92482294bf0cef9743d1eb4c188)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **Avatar:** Add
  support for passing `name` to the `AvatarFallback` to render the initials. If
  no `name` or `children` is passed, it'll render either the initials or a
  fallback icon.

  - **Hooks**: Add `useConst` and `useUpdateEffect` hooks from v2.
  - **Wrap:** Bring back the `Wrap` component from v2.

## 3.6.0

### Minor Changes

- [`04a1a07`](https://github.com/chakra-ui/chakra-ui/commit/04a1a07f1eb8924648b7d1a0de005777330cf5f3)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **Styled
  System:**

  - Boost performance of style resolution by removing `JSON.stringify` in `memo`
    function and avoid memoizing non-primitive arguments.
  - Connect `assets` token to `backgroundImage` and `listStyleImage` css
    properties.
  - **Menu, Tooltip:** Set `lazyMount` and `unmountOnExit` to `true` in the
    `Root` component to improve initial rendering performance.
  - **AbsoluteCenter:** Fix issue where axis doesn't work in RTL mode.
  - **Snippets / QRCode:** Remove snippet in favor of compound component
    pattern.
  - **List:** Fix issue where list items don't wrap correctly.
  - **Stat:** Bring back `StatGroup` component from v2.
  - **Close Button:** Add `CloseButton` component.

## 3.5.1

### Patch Changes

- [`34d46e3`](https://github.com/chakra-ui/chakra-ui/commit/34d46e38eb16bb5adda70f5445d9e406b4da415b)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **Button:** Fix
  issue where button is not disabled when loading props is passed

  - **ColorPicker, HoverCard, Tooltip:** Fixed intermittent placement shifts
    caused by updates to the `data-placement` attribute
  - **Snippets / Alert:** Deprecate the `Alert` snippet in favor of using the
    `Alert` component directly from `@chakra-ui/react`.

## 3.5.0

### Minor Changes

- [`30a12d0`](https://github.com/chakra-ui/chakra-ui/commit/30a12d01af9672ebf36ea872f3d9bdfcc2b212d2)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **Native Select**

  - Fix issue where `disabled` and `invalid` props were not being passed to the
    `NativeSelectField` component.
  - Persist error focus ring when `invalid` prop is set.
  - Fix issue where native select isn't readable in dark mode for Windows/Linux
    devices.
  - **[New] Loader:** Add new `Loader` and `LoaderOverlay` components.
  - **[New] Button Group:** Add new `ButtonGroup` component similar to v2 for
    grouping similar buttons.
  - **Button:** Add `loading` and `loadingText` props to the `Button` component.
  - **Snippets / Menu:** Refactor checkbox item to fix rendering
  - **Snippets / Button:** Removed the button snippet in favor of built-in
    component.

## 3.4.0

### Minor Changes

- [`375e05f`](https://github.com/chakra-ui/chakra-ui/commit/375e05ff087ec79c0d900a5bc01da8ffddc59dbc)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **[New]
  Presence:** Add component to animate an element using css animation, and
  control the mount/unmount behavior

### Patch Changes

- [`882c7f6`](https://github.com/chakra-ui/chakra-ui/commit/882c7f67b3c6de9c15acd97703dc810599fb8562)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **Separator**:
  Fix issue where `aria-orientation` was missing in the DOM and `orientation`
  was added instead.

  - **FileUpload**
    - Resolved an issue where form-related components reset despite the reset
      event being cancelled.
    - Fixed a brief warning display when a new image file is added to the
      preview.
    - Enhanced click detection for the dropzone and added support for the
      `disableClick` prop.

- [`4c885df`](https://github.com/chakra-ui/chakra-ui/commit/4c885dfd0be37d00a49201d4930aa76397eeaa61)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **Button, Icon**
  Fix issue where button and icon doesn't export props providers

- [`b39ea43`](https://github.com/chakra-ui/chakra-ui/commit/b39ea43b1d44305cded9fed1766a2b8ba9969d64)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - **System**: Fix
  issue where render times feels slower compared to v2 due to the global style
  computation in the provider component. Now, it is much faster.
  [See Discussion](https://github.com/chakra-ui/chakra-ui/discussions/9488#discussioncomment-11868684)

## 3.3.3

### Patch Changes

- [`9c55f21`](https://github.com/chakra-ui/chakra-ui/commit/9c55f2138fdb7cfe7422223f11dc4153421c654b)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  icon sizes doesn't work anymore

## 3.3.2

### Patch Changes

- [`855bb29`](https://github.com/chakra-ui/chakra-ui/commit/855bb290d3e89533e43833abfa21a6863d367953)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **Icon:**
  Refactor icon recipe `size=inherit` to allow for composition with button

  - **Snippet / Tooltip:** Set `portalled` to `true` by default

- [#9470](https://github.com/chakra-ui/chakra-ui/pull/9470)
  [`4bd9f8d`](https://github.com/chakra-ui/chakra-ui/commit/4bd9f8d6db8a7f2174ce184e4a921f6b0a6b86f6)
  Thanks [@lcswillems](https://github.com/lcswillems)! - - **Menu, Select:** Use
  the same semantic token for select `_highlighted` state

  - **Toast:** Fix issue where toast close trigger was not visible

- [`e4fe984`](https://github.com/chakra-ui/chakra-ui/commit/e4fe984a14d2538a7913db85eb486491b5d8a9c9)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  using `<Icon as={...} />` throws an error, forcing users to use the `asChild`
  approach

- [`e506044`](https://github.com/chakra-ui/chakra-ui/commit/e506044a175a241b43c1b23b612e322b42de15a9)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  factory shows a warning React 19 due to accessing `child.ref`

## 3.3.1

### Patch Changes

- [`0fc040a`](https://github.com/chakra-ui/chakra-ui/commit/0fc040adedce9239bb00d7001e0cffc861ff4ea0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - **HoverCard,
  Tooltip**: Resolved an issue where the controlled open state could become
  inconsistent during the `opening` or `closing` phases.

- [`1439548`](https://github.com/chakra-ui/chakra-ui/commit/1439548c7f72b02133e3dba7211879c12b698303)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  `useRecipe` and `useSlotRecipe` returns `never` when key does not match
  built-in recipe.

## 3.3.0

### Minor Changes

- [#9437](https://github.com/chakra-ui/chakra-ui/pull/9437)
  [`791bcec`](https://github.com/chakra-ui/chakra-ui/commit/791bcec921913cedfe2316b21ed3edfd5d86d07b)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - ### Added

  - **Clipboard**: Introduced `Clipboard.ValueText` to display clipboard
    content.
  - **FileUpload**:
    - Added `preventDropOnDocument` to block file drops on the document when the
      file upload component is active.
    - Added `setClipboardFiles` to the API for setting files from clipboard
      data.
  - **Progress**: Added support for`onValueChange` and `defaultValue`.
  - **Tabs, Menu, Combobox**: Added `navigate` property for custom router
    navigation when selections render as links.
  - **QrCode**:
    - Added support for `onValueChange` and `defaultValue`.
    - Added `QrCode.DownloadTrigger` to enable QR code image downloads.

  ### Fixed

  - **Collapsible**: Fixed a bug where the opening animation replayed when an
    open collapsible was re-rendered.
  - **Dialog, Popover**: Resolved an issue causing dialogs or popovers to close
    if the focused element was removed from the DOM.
  - **FileUpload**: Fixed a bug causing the hidden input to desync from accepted
    files.
  - **Menu, Popover**: Fixed inconsistent interaction detection outside the
    component when the trigger was inside a scrollable container.
  - **Pagination**: Corrected an issue where the page range returned an
    incorrect `end` value when `pageSize` exceeded `count`.
  - **QRCode**: Fixed `getDataUrl` to generate a properly sized QR code.

- [#9437](https://github.com/chakra-ui/chakra-ui/pull/9437)
  [`791bcec`](https://github.com/chakra-ui/chakra-ui/commit/791bcec921913cedfe2316b21ed3edfd5d86d07b)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add new QRCode
  component for converting text and links to QR codes.

  ```tsx
  import { QrCode } from "@chakra-ui/react"

  export const QrCodeWithoutSnippet = () => {
    return (
      <QrCode.Root value="..." size="md">
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>
      </QrCode.Root>
    )
  }
  ```

### Patch Changes

- [`d3f1c19`](https://github.com/chakra-ui/chakra-ui/commit/d3f1c1918d3bb0bb98260f2a3623776f0f392f99)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  `htmlWidth` and `htmlHeight` doesn't work in `Image` or `chakra.image`
  elements.

- [`f32cb4a`](https://github.com/chakra-ui/chakra-ui/commit/f32cb4a7e2240bfd9879b3b4b093d76020f766ef)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Improve typesafety
  for layer styles to support common shorthands like `bg`, `bgColor`, `bgImage`

- [`b11587b`](https://github.com/chakra-ui/chakra-ui/commit/b11587b8b93fd55d30aeac17a7c2413ddc72395d)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix compound
  variant matching not working with `colorPalette` prop

## 3.2.5

### Patch Changes

- [`d195ced`](https://github.com/chakra-ui/chakra-ui/commit/d195ced85f53d4d2e0ef39aff3912aee8c94fa62)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **Snippets /
  Pagination**: Fix issue where pagination page text renders incorrectly when
  the `pageSize` is greater than the `count` value with `format=long`

  - **Snippets / InputGroup**: Improve typings for `children` prop to prevent TS
    errors

- [`609855d`](https://github.com/chakra-ui/chakra-ui/commit/609855df6ae6f3f19b74b65c8d87dd73769be4d4)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Improve type-safety
  in `useRecipe` and `useSlotRecipe` hooks

- [`636c61f`](https://github.com/chakra-ui/chakra-ui/commit/636c61f80ae575c4f37d2d03d3577cc386ea1b0a)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - **useMediaQuery**:
  Fix issue where partial media queries like `aspect-ratio < 1` doesn't return
  the correct result.

  > **Good to know**: Partial media queries like `aspect-ratio < 1` resolves to
  > `aspect-ratio < 1 / 1` in the browser.

- [`b1c3f74`](https://github.com/chakra-ui/chakra-ui/commit/b1c3f7467048be9d3ef20062819b0fbfefb1733b)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  composing `Input` component throws `asChild` React HTML prop warning.

- [`e7fddd5`](https://github.com/chakra-ui/chakra-ui/commit/e7fddd502150f3781b6569c7042608de82f30e1e)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  `mergeConfigs` does not override functions

- [`55258da`](https://github.com/chakra-ui/chakra-ui/commit/55258daf9c4eec8c3bd8b88b2cf6e7bdbb1905a9)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **FileUpload**:
  Resolved an issue where the `accept` attribute wasn’t applied to the hidden
  input.

  - **NumberInput**: Fixed issue where the input event wasn’t triggered on the
    first click of the increment/decrement controls.

## 3.2.4

### Patch Changes

- [`df0ac52`](https://github.com/chakra-ui/chakra-ui/commit/df0ac52ca14fc9bb6170bb14c5fcd2183ec7084f)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  component hook props (like `UseCheckboxProps`, `UseCheckboxGroupProps`, etc.)
  are not exported.

- [`be8f80a`](https://github.com/chakra-ui/chakra-ui/commit/be8f80ad9e1a2c987ebb477944377ed72138e33c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  `chakra.x` factory component props throws TS error in React 19

## 3.2.3

### Patch Changes

- [`d821ab5`](https://github.com/chakra-ui/chakra-ui/commit/d821ab58b893f725ae7cbcf5122edb7ea1e11756)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  responsive semantic tokens doesn't work as expected.

## 3.2.2

### Patch Changes

- [`7234d75`](https://github.com/chakra-ui/chakra-ui/commit/7234d756315ed4ccce127229e0687eef060266c4)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **Slider**

  - Add `DraggingIndicator` component to show an element only while dragging
  - Fix issue where slider marks were not styled correctly in vertical
    orientation
  - **Menu**: Update recipe to use `--available-height` css variable to keep the
    menu's height within the available space
  - **System**: Fixed issue where exporting `withRootProvider` would result in
    type error
  - **Snippets / Slider**

    - Move `MarkerGroup` into the `Control` component
    - Remove hardcoded margin values in favor of recipes and
      `data-has-mark-label` attribute

## 3.2.1

### Patch Changes

- [#9240](https://github.com/chakra-ui/chakra-ui/pull/9240)
  [`561ccc0`](https://github.com/chakra-ui/chakra-ui/commit/561ccc015561203f53cc12d7c5e6606283bb41ab)
  Thanks [@Pagebakers](https://github.com/Pagebakers)! - - **System**: Fix issue
  where exporting `withProvider` and `withContext` would result in type error

  - **Timeline**: Fix issue where `TimelineTitle` was missing from the export
  - **Tabs**: Fix issue where `useTabs` and `useTabsContext` were not exported
  - **Snippets / ColorPicker**: Fix flex direction of `ColorPickerChannelInputs`
    and `ColorPickerChannelSliders`

## 3.2.0

### Minor Changes

- [#9130](https://github.com/chakra-ui/chakra-ui/pull/9130)
  [`e5880fb`](https://github.com/chakra-ui/chakra-ui/commit/e5880fb7eafe9044604ffb893589792b35961eaf)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - [Preview] Add new
  `ColorPicker` component to allow users pick a color in hsl, rgb, hsb formats.

  - Add new `ColorSwatch` component to preview a color.
  - Fix issue where `mergeConfigs` mutates the underlying configs passed to it.

## 3.1.2

### Patch Changes

- [`65952d7`](https://github.com/chakra-ui/chakra-ui/commit/65952d7a796ae491ea6a0d57661a25a404a11452)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **General:** Fix
  issue where value change types were not re-exported from Ark UI

  - **Layer Style:** Fix issue where `fill.surface` layer style doesn't render
    the correct styles
  - **Pagination:** Fix issue where `PaginationPageText` did not render the
    correct page range

## 3.1.1

### Patch Changes

- [#9128](https://github.com/chakra-ui/chakra-ui/pull/9128)
  [`0715e2c`](https://github.com/chakra-ui/chakra-ui/commit/0715e2cd51a20db4d66f1e5290a8c1d74cb59858)
  Thanks [@coverlv](https://github.com/coverlv)! - Fix issue where
  `useBreakpointValue` throws error if `ssr` is false

- [#9103](https://github.com/chakra-ui/chakra-ui/pull/9103)
  [`1254769`](https://github.com/chakra-ui/chakra-ui/commit/12547692bdfe2ebe7be9c16ea381a5c42f553e1c)
  Thanks [@Newbie012](https://github.com/Newbie012)! - - **Checkbox**: Fix issue
  where checkmark doesn't show on Safari

  - **Alert**: Fix issue where indicator icon is not visible on Safari
  - **ClientOnly**: Fix issue where returned the incorrect type leading to TS
    error like `ClientOnly cannot be used as a JSX component.`
  - **Fieldset**: Fix issue where anatomy is not exported
  - **Timeline**: Refactor variants such that it responds to `colorPalette`

## 3.1.0

### Minor Changes

- [`9a27c2c`](https://github.com/chakra-ui/chakra-ui/commit/9a27c2c6fd6289cf31a9ad9cd3ba51f3091a6363)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **System:** Fix
  issue where using `as` prop with logic based components doesn't work as
  expected.

  - **DataList:** Add support for `bold` variant.
  - **Button:** Tweak the horizontal padding when size is `sm`.
  - **Snippets**

    - Slider: Add `showValue` prop to render the text value of the slider.
    - Select
      - Add `HiddenSelect` to ensure it works in form submissions.
      - Fix type inference is lost when using `SelectRoot` component from
        snippet
      - Fix issue where form data is not populated when using native form
        element
    - ColorMode: Fix type error when using the latest `next-themes`.
    - Provider: Forward props to `ColorModeProvider` powered by `next-themes`
      for better customization.

  - **Toggle:** Add `Toggle` component for toggling between two states. It
    composes the `Button` component.

## 3.0.2

### Patch Changes

- [`20b91bd`](https://github.com/chakra-ui/chakra-ui/commit/20b91bdc6134e83897fab058b0ff30fd23e61c5d)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **InputAddon**:
  Fix issue with input addon not stretched correctly.
  - **Snippets / Toaster**: Improve toaster styling by adding
    `width={{ md: "sm" }}` to the toast root.

## 3.0.1

### Patch Changes

- [`c0020c9`](https://github.com/chakra-ui/chakra-ui/commit/c0020c984cba3b583875b7c1a34e8c7fb1a0d86a)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  using `keyframe` interpolation in `animation` prop doesn't work

- [`7d4f898`](https://github.com/chakra-ui/chakra-ui/commit/7d4f8987e6b7d49440ecc9c1bd292c065d212267)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  `scrollBehavior=outside` doesn't allow scrolling outside the dialog content

## 3.0.0

### Major Changes

- [#8153](https://github.com/chakra-ui/chakra-ui/pull/8153)
  [`7b6e66a`](https://github.com/chakra-ui/chakra-ui/commit/7b6e66a15b08ad27e8458a009c3fb15ee738ca37)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Prepares the ground
  for the next version Chakra that leverages Ark UI.

  **User Facing**

  - Consolidate all component packages into a single package
  - Remove all deprecated components and APIs
  - Simplify the Changelogs for all v2 releases

  **Infrastructure**

  - Simplify the repo infrastructure and release process
  - Migrate from `jest` to `vitest`
  - Migrate from `tsup` to custom `rollup` setup for better bundling strategy

- [#8815](https://github.com/chakra-ui/chakra-ui/pull/8815)
  [`806be96`](https://github.com/chakra-ui/chakra-ui/commit/806be96aa3be56399af7fb697bbbb92b2533fffd)
  Thanks [@isBatak](https://github.com/isBatak)! - Remove the `@chakra-ui/hooks`
  package in favour of using dedicated, robust libraries like `react-use` and
  `usehooks-ts`

### Minor Changes

- [#8121](https://github.com/chakra-ui/chakra-ui/pull/8121)
  [`170198f`](https://github.com/chakra-ui/chakra-ui/commit/170198fc3936ad34f8136a2da173c12d9dc3dc36)
  Thanks [@kkieninger](https://github.com/kkieninger)! - ### Fixed

  - Fix hard-coded z-index for Menu in favor of one defined from the theme
  - Fix problem with leading and trailing spaces when getting initials for the
    Avatar component
  - Suppress unnecessary re-renders of Checkbox and Radio component

  ### Added

  - Add CSS `accentColor` property to style props
  - Add support for `asChild` in chakra factory
  - Export `toastStore` from `toast` component
  - Upgrade `framer-motion` to allow for skipAnimations
  - Add component namespace to reduce imports and provide better composition
  - Modal, Drawer: Add default `preserveScrollBarGap`

  ### Changed

  Redesign the component themes and anatomy

- [`192c6b1`](https://github.com/chakra-ui/chakra-ui/commit/192c6b1c0981b9bbb147fda4ad2dd288c624c78c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add new fieldset
  component

- [`07b04b1`](https://github.com/chakra-ui/chakra-ui/commit/07b04b1c506995f6f276f5f80a93d09d89b92fce)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **[NEW]:** Add
  `RatingGroup`, `SegmentControl`

  - **[NEW]:** Add `EmptyState` component for empty states
  - **[NEW]:** Add `RadioCard` and `CheckboxCard` components for card-based
    selection

- [#8568](https://github.com/chakra-ui/chakra-ui/pull/8568)
  [`5fd993b`](https://github.com/chakra-ui/chakra-ui/commit/5fd993bfbfd82f340646b3aa55fccc4d633834a7)
  Thanks [@isBatak](https://github.com/isBatak)! - Add Collapsible recipe with
  default open/close animation

- [`3fc49ca`](https://github.com/chakra-ui/chakra-ui/commit/3fc49ca37df42e793d84afd4bc857c568e2e8b5a)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  `FormatNumber` and `FormatByte` components

- [`3ccbbdf`](https://github.com/chakra-ui/chakra-ui/commit/3ccbbdff6e9c48350461358fb898ea1a8a166c08)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - ### Motion Styles

  Add support for `motionStyle` props.

  The idea is to pair them with text styles and layer styles to create this
  three-part mixin that can make your styles a lot cleaner.

  Motion styles focus solely on animations, allowing you to orchestrate
  animation properties.

  ```jsx
  import { defineMotionStyles } from "@chakra-ui/react"

  export const motionStyles = defineMotionStyles({
    "slide-fade-in": {
      value: {
        transformOrigin: "var(--transform-origin)",
        animationDuration: "fast",
        "&[data-placement^=top]": {
          animationName: "slide-from-top, fade-in",
        },
        "&[data-placement^=bottom]": {
          animationName: "slide-from-bottom, fade-in",
        },
        "&[data-placement^=left]": {
          animationName: "slide-from-left, fade-in",
        },
        "&[data-placement^=right]": {
          animationName: "slide-from-right, fade-in",
        },
      },
    },
  })
  ```

  ### Built-in Keyframe Animations

  Chakra new provides built-in keyframe animations that you can use to create
  your own motion styles.

  **Slide:** `slide-from-top`, `slide-from-bottom`, `slide-from-left`,
  `slide-from-right`, `slide-to-top`, `slide-to-bottom`, `slide-to-left`,
  `slide-to-right`

  **Slide Full:** `slide-from-top-full`, `slide-from-bottom-full`,
  `slide-from-left-full`, `slide-from-right-full`, `slide-to-top-full`,
  `slide-to-bottom-full`, `slide-to-left-full`, `slide-to-right-full`

  **Fade:** `fade-in`, `fade-out`

  **Scale:** `scale-in`, `scale-out`

  You can compose these animations using the `animationName` property in your
  motion styles to create really cool animations. No JS required.

  ```jsx
  <Box animationName="slide-from-top, fade-in" animationDuration="fast">
    Slide from top and fade in
  </Box>
  ```

- [`3ccbbdf`](https://github.com/chakra-ui/chakra-ui/commit/3ccbbdff6e9c48350461358fb898ea1a8a166c08)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  built-in layer styles to help prototype faster with automatic dark mode.
  Paired with `colorPalette`, you can create beautiful designs with little code
  that adapts to dark mode automatically.

  **Fill Layer Styles:** `fill.muted`, `fill.solid`, `fill.surface`

  ```jsx
  <Box layerStyle="fill.muted" colorPalette="red">
    This is a subtle fill layer
  </Box>
  ```

  **Border Layer Styles:** `outline.muted`, `outline.solid`

  ```jsx
  <Box layerStyle="outline.muted" colorPalette="red">
    This is a subtle outline layer
  </Box>
  ```

  **Indicator Styles**: `indicator.top`, `indicator.end`, `indicator.bottom`,
  `indicator.start`

  ```jsx
  <Box layerStyle="indicator.top" colorPalette="red">
    This is a top indicator layer
  </Box>
  ```

  **Disabled Styles:** `disabled`

  ```jsx
  <Box _disabled={{ layerStyle: "disabled" }}>Disabled Button</Box>
  ```

  You can combine these layer styles to create very complex designs with little
  code.

  ```jsx
  <Box
    layerStyle="fill.muted"
    _hover={{ layerStyle: "outline.solid" }}
    colorPalette="red"
  >
    This is a complex layer
  </Box>
  ```

- [`de9c0a0`](https://github.com/chakra-ui/chakra-ui/commit/de9c0a0d78f70db1fb246ea8ec377e57e10919e7)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add `DataList`
  component

- [`e77a9b8`](https://github.com/chakra-ui/chakra-ui/commit/e77a9b81ecd765d0b0963e5f847a867dfd506363)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Add new Timeline
  component to presenting chronological information or activities.

  - Trim generated `className` in the DOM.
  - Add `neutral` status to `Alert` component

- [`763329e`](https://github.com/chakra-ui/chakra-ui/commit/763329ebdca2a9d4b7295d94fff3d2265a793c99)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add preset and
  preset-base entrypoints.

  - The `preset` entrypoint exposes the default theme and recipes for Chakra.
  - The `preset-base` entrypoint exposes the base utilities and conditions used
    internally.

- [`925cfd9`](https://github.com/chakra-ui/chakra-ui/commit/925cfd99ce0a09c4145b81c17605e882c4aa1840)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add ActionBar,
  Status, Rating, Pagination components

- [`e9a1537`](https://github.com/chakra-ui/chakra-ui/commit/e9a1537579e80071cc00722a5f707768524f675c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - BREAKING: Change
  signature of `useRecipe`, `useSlotRecipe`, `createSlotRecipeContext`

  ### createSlotRecipeContext

  Before:

  ```tsx
  const { withProvider, withContext } = createSlotRecipeContext("accordion")
  ```

  After:

  ```tsx
  const { withProvider, withContext } = createSlotRecipeContext({
    key: "accordion",
  })
  ```

  ### useSlotRecipe

  Before:

  ```tsx
  const recipe = useSlotRecipe("accordion")
  ```

  After:

  ```tsx
  const recipe = useSlotRecipe({ key: "accordion" })
  ```

- [`3908155`](https://github.com/chakra-ui/chakra-ui/commit/3908155e291b14468c12711abc9e45e94c904358)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Rename
  `createStyleContext` to `createSlotRecipeContext`

- [`c654ee3`](https://github.com/chakra-ui/chakra-ui/commit/c654ee31fff590be2ec132a30deb2be399af7035)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Improve performance
  of styled components to avoid unneeded re-renders.

- [`edec8f7`](https://github.com/chakra-ui/chakra-ui/commit/edec8f79a7e444987a0de0fb43171636d14a6b35)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add clipboard
  composition

- [`5093e18`](https://github.com/chakra-ui/chakra-ui/commit/5093e186a94f9c73452dd346fcf8becb57c21140)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add cursor pointer
  to button

- [`4c6838c`](https://github.com/chakra-ui/chakra-ui/commit/4c6838c5e6c262da6b573c8576595bb8cedc5452)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Rename `onLabel`
  and `offLabel` to `trackLabel`

  - Add support for `thumbLabel` prop for rendering an icon within thumb

- [#8393](https://github.com/chakra-ui/chakra-ui/pull/8393)
  [`623e558`](https://github.com/chakra-ui/chakra-ui/commit/623e558ac22f84e6250387d0971aafe9713667a6)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Integrate Ark UI
  components to reduce maintenance surface.

  - Add `FileUpload` component
  - Remove `trigger=hover` in favor of `HoverCard`
  - Replace `Tooltip`, `Popover` and `HoverCard` with those from Ark UI

- [`945a777`](https://github.com/chakra-ui/chakra-ui/commit/945a7774ad138a9b77a36ef46fdbb501addfe1db)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - BREAKING: Integrate
  Ark v4. This mostly affects the custom select component that requires the use
  of `createListCollection` now.

- [`c26acf0`](https://github.com/chakra-ui/chakra-ui/commit/c26acf01608ad8ef1b4bb7547c97fa111026ecf7)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  cursor token type

- [`55c0839`](https://github.com/chakra-ui/chakra-ui/commit/55c08393b46e07c0f229ccd0e448863e2daf3ccf)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Move the `Prose`
  component to snippets so it can be customized by the user.

- [`952647a`](https://github.com/chakra-ui/chakra-ui/commit/952647a1767df596d08f91fd3b50c28e8edc22e7)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add `CardTitle` and
  `CardDescription` components

- [`f4762bf`](https://github.com/chakra-ui/chakra-ui/commit/f4762bf087a8aac240c83093adde0f84e37a0456)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  merging multiple system configs into one within `createSystem`

  Before:

  ```tsx
  const config = mergeConfigs(defaultConfig, customConfig)
  export const system = createSystem(config)
  ```

  After:

  ```tsx
  const system = createSystem(defaultConfig, customConfig)
  ```

- [#8218](https://github.com/chakra-ui/chakra-ui/pull/8218)
  [`a89c598`](https://github.com/chakra-ui/chakra-ui/commit/a89c598ed822bf11efc519f8789fa7c145e3bba0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  custom theme conditions or pseudo props via `theme.conditions`

  ```ts
  // theme.ts

  const theme = extendTheme({
    conditions: {
      _closed: "[data-state='closed']", // pseudo prop
    },
  })
  ```

  This allows you to use the pseudo prop in your components

  ```jsx
  <Box data-state="closed" _closed={{ bg: "red.200" }}>
    This box is closed
  </Box>
  ```

  **For TypeScript users**, you need to use the Chakra CLI to generate the types
  for your custom conditions.

  ```sh
  pnpm chakra-cli tokens src/theme/index.ts
  ```

- [`c2f45ca`](https://github.com/chakra-ui/chakra-ui/commit/c2f45cac80ab9431dd416fe4405bd9252f401b9f)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Rename
  `Fieldset.Control` to `Fieldset.Content`

- [`1738b90`](https://github.com/chakra-ui/chakra-ui/commit/1738b901122932b664f6a4c06701cfab4c00afd2)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Icon: Set
  `asChild` to `true` by default to reduce repetition

  - All components

    - Ensure consistent sizing convention (units of 4px). Smaller elements start
      at 20px, larger elements start at 40px
    - Ensure focus ring matches the colorPalette

  - Input, Textarea: Rename `filled` variant to `subtle`
  - Tags: Add new `Tag.StartElement` and `Tag.EndElement` components to allow
    for easier styling of the start and end elements

- [`3ccbbdf`](https://github.com/chakra-ui/chakra-ui/commit/3ccbbdff6e9c48350461358fb898ea1a8a166c08)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Redesign `Stepper`
  component. It's now called `Steps` and manages the state internally, no need
  to use `useSteps` anymore.

  We've also improved the accessibility of the component by leveraging the tabs
  pattern and adding the required ARIA attributes.

  ```tsx
  <Steps.Root defaultIndex={0} count={2}>
    <Steps.List>
      <Steps.Item index={0}>
        <Steps.Trigger>
          <Steps.Title>Step 1</Steps.Title>
        </Steps.Trigger>
        <Steps.Separator />
      </Steps.Item>

      <Steps.Item index={1}>
        <Steps.Trigger>
          <Steps.Title>Step 2</Steps.Title>
        </Steps.Trigger>
        <Steps.Separator />
      </Steps.Item>
    </Steps.List>

    <Steps.Content index={0}>Step 1</Steps.Content>
    <Steps.Content index={1}>Step 2</Steps.Content>
    <Steps.CompleteContent>Complete</Steps.CompleteContent>
  </Steps.Root>
  ```

  Using the CLI, you can also scaffold an already composed stepper component

  ```sh
  chakra composition add steps
  ```

- [`548470d`](https://github.com/chakra-ui/chakra-ui/commit/548470dd4306dd39d76555e172da64fd1861fdc5)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add custom select
  from Ark UI and design recipe

- [`8b110da`](https://github.com/chakra-ui/chakra-ui/commit/8b110dafa8c3db069254ea3e01937165f5bd9321)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Support inlining
  recipe in `createRecipeContext` and `createSlotRecipeContext` for better DX
  when shipping libraries based on Chakra.

  This reduces the need for using the Chakra CLI to generate types for custom
  components.

- [`05793a2`](https://github.com/chakra-ui/chakra-ui/commit/05793a2d15f22b7caa3fb19f93c2a6e1482e5bd0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Make `gray` the
  default color palette.

  - Change avatar sm size to `36px` for consistency.
  - Move `bg` for outline component variants.

- [`43f2c7d`](https://github.com/chakra-ui/chakra-ui/commit/43f2c7d857c8fe3cab911891200fdc75d1aa782d)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **CheckboxCard
  [New]**

  Add support for a new `CheckboxCard` component that can be used to render a
  card with a checkbox.

  ```jsx
  <CheckboxCard.Root>
    <CheckboxCard.Control>
      <Stack gap="0" flex="1">
        <CheckboxCard.Label>Checkbox</CheckboxCard.Label>
        <Text>Some description</Text>
      </Stack>

      <CheckboxCard.HiddenInput />
      <CheckboxCard.Indicator />
    </CheckboxCard.Control>
  </CheckboxCard.Root>
  ```

  - **Checkmark [New]**

    Add new checkmark component for rendering a static checkmark icon with the
    `checked`, `disabled`, and `indeterminate` state baked in.

  ```jsx
  <Stack>
    <Checkmark />
    <Checkmark checked />
    <Checkmark indeterminate />
    <Checkmark disabled />
    <Checkmark checked disabled />
    <Checkmark indeterminate disabled />
  </Stack>
  ```

  - **EmptyState [New]**

    Add new `EmptyState` component for rendering an empty state message with a
    title, description, and optional action button.

  ```jsx
  <EmptyState.Root>
    <EmptyState.Content>
      <EmptyState.Indicator>
        <HiTemplate />
      </EmptyState.Indicator>

      <VStack textAlign="center">
        <Text fontWeight="medium">No template found</Text>
        <Text fontSize="sm" color="fg.muted">
          Try creating a new template with the button below
        </Text>
      </VStack>

      <Button variant="outline">
        <HiPlus /> Create Template
      </Button>
    </EmptyState.Content>
  </EmptyState.Root>
  ```

- [`e119ae9`](https://github.com/chakra-ui/chakra-ui/commit/e119ae94088a4ab84cf72559fe75621b30f9f4f7)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Rename
  `motionStyle` to `animationStyle` for better intuitiveness

- [#8575](https://github.com/chakra-ui/chakra-ui/pull/8575)
  [`d4522d9`](https://github.com/chakra-ui/chakra-ui/commit/d4522d92bca44a79baa404340426b2783d283e2e)
  Thanks [@isBatak](https://github.com/isBatak)! - Align theme recipe name with
  panda

- [`3ccbbdf`](https://github.com/chakra-ui/chakra-ui/commit/3ccbbdff6e9c48350461358fb898ea1a8a166c08)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  `focusRing` and `focusRingColor` style props that allow to quickly style focus
  visible state of form controls.

  The focus ring values can be either `extend` or `contain`

  ```jsx
  <Box asChild focusRing="extend" focusRingColor="pink.500">
    <input type="text" />
  </Box>
  ```

- [`4ff153f`](https://github.com/chakra-ui/chakra-ui/commit/4ff153fd9b449d3e43561b7daceaadfe3c925b08)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Speed up
  intellisence for style props, and add support for `strictTokens` in the CLI.

- [`47a8a9e`](https://github.com/chakra-ui/chakra-ui/commit/47a8a9ebb3fe89d168850b501414da5e8648f5c2)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Add `inherit` to
  Spinner recipe size

  - Refactor button and link button snippets

- [`b6d1d0d`](https://github.com/chakra-ui/chakra-ui/commit/b6d1d0db60644fc43d04e6d40e86b6dba659457a)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Simplify spinner
  component to use less custom props.

  - Removed `emptyColor`, prefer to use `--spinner-track-color`
  - Removed `speed`, prefer to use `animationDuration`
  - Removed `thickness`, prefer to use `borderWidth`

- [#8218](https://github.com/chakra-ui/chakra-ui/pull/8218)
  [`a89c598`](https://github.com/chakra-ui/chakra-ui/commit/a89c598ed822bf11efc519f8789fa7c145e3bba0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  `_open` and `_closed` pseudo props for styling their respective selectors.

  - `_open`: `&[data-state=open], &[open]`
  - `_closed`: `&[data-state=closed]`
  - `_groupOpen`: `[data-group][data-state=open] &`
  - `_groupClosed`: `[data-group][data-state=closed] &`

  Extend the existing pseudo props to support new selectors`

  - `_placeholder` now supports `&[data-placeholder]`
  - `_placeholderShow` now supports `&[data-placeholder-shown]`
  - `_fullscreen` now supports `&[data-fullscreen]`
  - `_empty` now supports `&[data-empty]`
  - `_expanded` now supports `&[data-state=expanded]`
  - `_checked` now supports `&[data-state-checked]`

- [#8569](https://github.com/chakra-ui/chakra-ui/pull/8569)
  [`eb26857`](https://github.com/chakra-ui/chakra-ui/commit/eb2685735e25d6790d14d28653c792b9572c080e)
  Thanks [@isBatak](https://github.com/isBatak)! - Fix the `boxSize` type to
  allow number values.

- [`47b3b5a`](https://github.com/chakra-ui/chakra-ui/commit/47b3b5af95e711f78a5e8452cf4a8debe8e76975)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Support array in
  conditions object. This matches the API in Panda CSS and allow users to define
  complex selectors like media hover queries.

- [`e4f2df0`](https://github.com/chakra-ui/chakra-ui/commit/e4f2df05a44d39cb951193cad771bc3f6f917bf2)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add `Prose`
  component to help style markdown content.

- [`c243698`](https://github.com/chakra-ui/chakra-ui/commit/c243698a30a47c189b7d1c9903feb888055bdff5)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Add
  referrerPolicy to Avatar component.
  - Add CheckboxDescription, CheckboxCardDescription and RadioCardDescription
  - Swap `muted` and `subtle` color tokens

### Patch Changes

- [`be98566`](https://github.com/chakra-ui/chakra-ui/commit/be98566181ca98871eb3e94d3fb2a9be29b73388)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix checkbox and
  toast on mobile

- [`c941971`](https://github.com/chakra-ui/chakra-ui/commit/c9419714db8b50b2cad3f478d90d4be4268da48f)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Convert `Tabs`
  component to use Ark UI

  - Convert `NumberInput` to use Ark UI

- [#8795](https://github.com/chakra-ui/chakra-ui/pull/8795)
  [`4408573`](https://github.com/chakra-ui/chakra-ui/commit/4408573683c0f78eed28413e749701d2da937b06)
  Thanks [@TylerAPfledderer](https://github.com/TylerAPfledderer)! - Adds style
  prop names to `LayerStyleProperty` union type

- [`83366c4`](https://github.com/chakra-ui/chakra-ui/commit/83366c43e42d7d4d385bbb3d85051768b0e03be7)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Fix regression in
  `mergeConfigs`

  - Decompose `Field` components into smaller components, which can be
    optionally used with `Field`

    - `Label` which is a generic label component
    - `ErrorMessage` which is a generic error message component
    - `HelpText` which is a generic help text component

  - **Refactor components to use Ark UI:** Avatar, Progress, CircularProgress,
    PinInput

- [`0ae054d`](https://github.com/chakra-ui/chakra-ui/commit/0ae054d3745339bd7bdae83b19a7be42957f0f59)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  `hideFrom` and `hideBelow` doesn't show any autocompletions

- [`0a03bcc`](https://github.com/chakra-ui/chakra-ui/commit/0a03bcc602f36b2901f53e4e03e6498d28bd8fa6)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Fix circular
  progress element types

  - Ensure consistent exports in components

- [#8617](https://github.com/chakra-ui/chakra-ui/pull/8617)
  [`7e9fbf0`](https://github.com/chakra-ui/chakra-ui/commit/7e9fbf06db6286220451ba9c4d0784e4e4be3dac)
  Thanks [@isBatak](https://github.com/isBatak)! - Refactor text-styles to use
  tokens instead of raw values.

- [`6d4cbbe`](https://github.com/chakra-ui/chakra-ui/commit/6d4cbbef2a48cc6a62c9e5ce548fc54426b2ed62)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix ES module
  interop for @emotion/is-prop-value that makes Jest throw error.

- [#8857](https://github.com/chakra-ui/chakra-ui/pull/8857)
  [`fdc2b9b`](https://github.com/chakra-ui/chakra-ui/commit/fdc2b9b0903dd75f0ddfe6bdf1e5a626d436f84c)
  Thanks [@stevensecreti](https://github.com/stevensecreti)! - update mapObject
  util to not call fn provided on nullish values

- [`788f493`](https://github.com/chakra-ui/chakra-ui/commit/788f4937e4e3d3774d260030705859eeb56242c0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  media query css order is inconsistent with v2

- [`87cf70c`](https://github.com/chakra-ui/chakra-ui/commit/87cf70cc161d1b38f44a5989a5d84867d0e7e4b1)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Revert text recipe
  to prevent color regressions

- [#8740](https://github.com/chakra-ui/chakra-ui/pull/8740)
  [`d5a225f`](https://github.com/chakra-ui/chakra-ui/commit/d5a225f1bc3eca8be67a69b78429481cf802372b)
  Thanks [@Pagebakers](https://github.com/Pagebakers)! - Use correct extension
  for ESM exports

- [#8905](https://github.com/chakra-ui/chakra-ui/pull/8905)
  [`807a581`](https://github.com/chakra-ui/chakra-ui/commit/807a581715ed44a279edb042a396fb9c971d6955)
  Thanks [@stevensecreti](https://github.com/stevensecreti)! - Added transform
  function to backgroundClip to appropriately handle 'text' value

- [#8739](https://github.com/chakra-ui/chakra-ui/pull/8739)
  [`651561b`](https://github.com/chakra-ui/chakra-ui/commit/651561bd43dd90894203e22d36b125453016f5f3)
  Thanks [@Pagebakers](https://github.com/Pagebakers)! - Added /anatomy to
  exports

- [#8792](https://github.com/chakra-ui/chakra-ui/pull/8792)
  [`4dd77ec`](https://github.com/chakra-ui/chakra-ui/commit/4dd77ecbcb2a993e771fab12a8eb8ca0a6eb69c7)
  Thanks [@TylerAPfledderer](https://github.com/TylerAPfledderer)! - Updates the
  exposed list of slot anatomy to ensure all anatomy is included for use in
  type-checking extend recipe configs.

- [`bffb68f`](https://github.com/chakra-ui/chakra-ui/commit/bffb68f4fdedf4a438a0e56406315b44b98c6011)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **Pagination:**
  Fix issue page props were not forwarded correctly.

  - **PinInput:** Fix issue mask props were not forwarded correctly.

- [#8601](https://github.com/chakra-ui/chakra-ui/pull/8601)
  [`1867d66`](https://github.com/chakra-ui/chakra-ui/commit/1867d6628fa83c97eba5a30c7bf4238dd2c20c09)
  Thanks [@isBatak](https://github.com/isBatak)! - Fix `blur` property token
  conversion to CSS variable.

- [`32a454d`](https://github.com/chakra-ui/chakra-ui/commit/32a454d0c2ffc67a9f09210d591f68b052e889e9)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add missing
  `use client` directives to several components

- [#8854](https://github.com/chakra-ui/chakra-ui/pull/8854)
  [`388716d`](https://github.com/chakra-ui/chakra-ui/commit/388716daa185a7c93d5fa5375712aa1e9b788a8d)
  Thanks [@codebutler](https://github.com/codebutler)! - Fix issue where target
  was not passed to link overlay

- [#8475](https://github.com/chakra-ui/chakra-ui/pull/8475)
  [`9224f4e`](https://github.com/chakra-ui/chakra-ui/commit/9224f4e16299ab6eee7dbc9b1ba3bc6723f00046)
  Thanks [@ryo-manba](https://github.com/ryo-manba)! - Add `aria-current`
  attribute to stepper

## 3.0.0-next.32

### Minor Changes

- [`05793a2`](https://github.com/chakra-ui/chakra-ui/commit/05793a2d15f22b7caa3fb19f93c2a6e1482e5bd0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Make `gray` the
  default color palette.

  - Change avatar sm size to `36px` for consistency.
  - Move `bg` for outline component variants.

- [`c243698`](https://github.com/chakra-ui/chakra-ui/commit/c243698a30a47c189b7d1c9903feb888055bdff5)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Add
  referrerPolicy to Avatar component.
  - Add CheckboxDescription, CheckboxCardDescription and RadioCardDescription
  - Swap `muted` and `subtle` color tokens

## 3.0.0-next.31

### Minor Changes

- [`47a8a9e`](https://github.com/chakra-ui/chakra-ui/commit/47a8a9ebb3fe89d168850b501414da5e8648f5c2)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Add `inherit` to
  Spinner recipe size
  - Refactor button and link button snippets

## 3.0.0-next.30

### Minor Changes

- [`1738b90`](https://github.com/chakra-ui/chakra-ui/commit/1738b901122932b664f6a4c06701cfab4c00afd2)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Icon: Set
  `asChild` to `true` by default to reduce repetition

  - All components

    - Ensure consistent sizing convention (units of 4px). Smaller elements start
      at 20px, larger elements start at 40px
    - Ensure focus ring matches the colorPalette

  - Input, Textarea: Rename `filled` variant to `subtle`
  - Tags: Add new `Tag.StartElement` and `Tag.EndElement` components to allow
    for easier styling of the start and end elements

## 3.0.0-next.29

### Minor Changes

- [`c2f45ca`](https://github.com/chakra-ui/chakra-ui/commit/c2f45cac80ab9431dd416fe4405bd9252f401b9f)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Rename
  `Fieldset.Control` to `Fieldset.Content`

### Patch Changes

- [#8905](https://github.com/chakra-ui/chakra-ui/pull/8905)
  [`807a581`](https://github.com/chakra-ui/chakra-ui/commit/807a581715ed44a279edb042a396fb9c971d6955)
  Thanks [@stevensecreti](https://github.com/stevensecreti)! - Added transform
  function to backgroundClip to appropriately handle 'text' value

## 3.0.0-next.28

### Minor Changes

- [`47b3b5a`](https://github.com/chakra-ui/chakra-ui/commit/47b3b5af95e711f78a5e8452cf4a8debe8e76975)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Support array in
  conditions object. This matches the API in Panda CSS and allow users to define
  complex selectors like media hover queries.

## 3.0.0-next.27

### Minor Changes

- [`5093e18`](https://github.com/chakra-ui/chakra-ui/commit/5093e186a94f9c73452dd346fcf8becb57c21140)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add cursor pointer
  to button

- [`945a777`](https://github.com/chakra-ui/chakra-ui/commit/945a7774ad138a9b77a36ef46fdbb501addfe1db)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - BREAKING: Integrate
  Ark v4. This mostly affects the custom select component that requires the use
  of `createListCollection` now.

- [`c26acf0`](https://github.com/chakra-ui/chakra-ui/commit/c26acf01608ad8ef1b4bb7547c97fa111026ecf7)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  cursor token type

### Patch Changes

- [#8857](https://github.com/chakra-ui/chakra-ui/pull/8857)
  [`fdc2b9b`](https://github.com/chakra-ui/chakra-ui/commit/fdc2b9b0903dd75f0ddfe6bdf1e5a626d436f84c)
  Thanks [@stevensecreti](https://github.com/stevensecreti)! - update mapObject
  util to not call fn provided on nullish values

- [#8854](https://github.com/chakra-ui/chakra-ui/pull/8854)
  [`388716d`](https://github.com/chakra-ui/chakra-ui/commit/388716daa185a7c93d5fa5375712aa1e9b788a8d)
  Thanks [@codebutler](https://github.com/codebutler)! - Fix issue where target
  was not passed to link overlay

## 3.0.0-next.26

### Patch Changes

- [`6d4cbbe`](https://github.com/chakra-ui/chakra-ui/commit/6d4cbbef2a48cc6a62c9e5ce548fc54426b2ed62)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix ES module
  interop for @emotion/is-prop-value that makes Jest throw error.

## 3.0.0-next.25

### Patch Changes

- [`788f493`](https://github.com/chakra-ui/chakra-ui/commit/788f4937e4e3d3774d260030705859eeb56242c0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  media query css order is inconsistent with v2

## 3.0.0-next.24

### Major Changes

- [#8815](https://github.com/chakra-ui/chakra-ui/pull/8815)
  [`806be96`](https://github.com/chakra-ui/chakra-ui/commit/806be96aa3be56399af7fb697bbbb92b2533fffd)
  Thanks [@isBatak](https://github.com/isBatak)! - Remove the `@chakra-ui/hooks`
  package in favour of using dedicated, robust libraries like `react-use` and
  `usehooks-ts`

## 3.0.0-next.23

### Minor Changes

- [`edec8f7`](https://github.com/chakra-ui/chakra-ui/commit/edec8f79a7e444987a0de0fb43171636d14a6b35)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add clipboard
  composition

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.23
  - @chakra-ui/utils@3.0.0-next.23

## 3.0.0-next.22

### Minor Changes

- [`55c0839`](https://github.com/chakra-ui/chakra-ui/commit/55c08393b46e07c0f229ccd0e448863e2daf3ccf)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Move the `Prose`
  component to snippets so it can be customized by the user.

### Patch Changes

- [`be98566`](https://github.com/chakra-ui/chakra-ui/commit/be98566181ca98871eb3e94d3fb2a9be29b73388)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix checkbox and
  toast on mobile

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.22
  - @chakra-ui/utils@3.0.0-next.22

## 3.0.0-next.21

### Minor Changes

- [`192c6b1`](https://github.com/chakra-ui/chakra-ui/commit/192c6b1c0981b9bbb147fda4ad2dd288c624c78c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add new fieldset
  component

### Patch Changes

- [#8795](https://github.com/chakra-ui/chakra-ui/pull/8795)
  [`4408573`](https://github.com/chakra-ui/chakra-ui/commit/4408573683c0f78eed28413e749701d2da937b06)
  Thanks [@TylerAPfledderer](https://github.com/TylerAPfledderer)! - Adds style
  prop names to `LayerStyleProperty` union type

- [#8792](https://github.com/chakra-ui/chakra-ui/pull/8792)
  [`4dd77ec`](https://github.com/chakra-ui/chakra-ui/commit/4dd77ecbcb2a993e771fab12a8eb8ca0a6eb69c7)
  Thanks [@TylerAPfledderer](https://github.com/TylerAPfledderer)! - Updates the
  exposed list of slot anatomy to ensure all anatomy is included for use in
  type-checking extend recipe configs.
- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.21
  - @chakra-ui/utils@3.0.0-next.21

## 3.0.0-next.20

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.20
  - @chakra-ui/utils@3.0.0-next.20

## 3.0.0-next.19

### Minor Changes

- [`4c6838c`](https://github.com/chakra-ui/chakra-ui/commit/4c6838c5e6c262da6b573c8576595bb8cedc5452)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Rename `onLabel`
  and `offLabel` to `trackLabel`

  - Add support for `thumbLabel` prop for rendering an icon within thumb

- [`f4762bf`](https://github.com/chakra-ui/chakra-ui/commit/f4762bf087a8aac240c83093adde0f84e37a0456)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  merging multiple system configs into one within `createSystem`

  Before:

  ```tsx
  const config = mergeConfigs(defaultConfig, customConfig)
  export const system = createSystem(config)
  ```

  After:

  ```tsx
  const system = createSystem(defaultConfig, customConfig)
  ```

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.19
  - @chakra-ui/utils@3.0.0-next.19

## 3.0.0-next.18

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.18
  - @chakra-ui/utils@3.0.0-next.18

## 3.0.0-next.17

### Minor Changes

- [`e9a1537`](https://github.com/chakra-ui/chakra-ui/commit/e9a1537579e80071cc00722a5f707768524f675c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - BREAKING: Change
  signature of `useRecipe`, `useSlotRecipe`, `createSlotRecipeContext`

  ### createSlotRecipeContext

  Before:

  ```tsx
  const { withProvider, withContext } = createSlotRecipeContext("accordion")
  ```

  After:

  ```tsx
  const { withProvider, withContext } = createSlotRecipeContext({
    key: "accordion",
  })
  ```

  ### useSlotRecipe

  Before:

  ```tsx
  const recipe = useSlotRecipe("accordion")
  ```

  After:

  ```tsx
  const recipe = useSlotRecipe({ key: "accordion" })
  ```

- [`8b110da`](https://github.com/chakra-ui/chakra-ui/commit/8b110dafa8c3db069254ea3e01937165f5bd9321)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Support inlining
  recipe in `createRecipeContext` and `createSlotRecipeContext` for better DX
  when shipping libraries based on Chakra.

  This reduces the need for using the Chakra CLI to generate types for custom
  components.

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.17
  - @chakra-ui/utils@3.0.0-next.17

## 3.0.0-next.16

### Patch Changes

- [#8740](https://github.com/chakra-ui/chakra-ui/pull/8740)
  [`d5a225f`](https://github.com/chakra-ui/chakra-ui/commit/d5a225f1bc3eca8be67a69b78429481cf802372b)
  Thanks [@Pagebakers](https://github.com/Pagebakers)! - Use correct extension
  for ESM exports

- [#8739](https://github.com/chakra-ui/chakra-ui/pull/8739)
  [`651561b`](https://github.com/chakra-ui/chakra-ui/commit/651561bd43dd90894203e22d36b125453016f5f3)
  Thanks [@Pagebakers](https://github.com/Pagebakers)! - Added /anatomy to
  exports

- Updated dependencies
  [[`d5a225f`](https://github.com/chakra-ui/chakra-ui/commit/d5a225f1bc3eca8be67a69b78429481cf802372b)]:
  - @chakra-ui/hooks@3.0.0-next.16
  - @chakra-ui/utils@3.0.0-next.16

## 3.0.0-next.15

### Minor Changes

- [`e119ae9`](https://github.com/chakra-ui/chakra-ui/commit/e119ae94088a4ab84cf72559fe75621b30f9f4f7)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Rename
  `motionStyle` to `animationStyle` for better intuitiveness

### Patch Changes

- [`87cf70c`](https://github.com/chakra-ui/chakra-ui/commit/87cf70cc161d1b38f44a5989a5d84867d0e7e4b1)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Revert text recipe
  to prevent color regressions

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.15
  - @chakra-ui/utils@3.0.0-next.15

## 3.0.0-next.14

### Minor Changes

- [`3908155`](https://github.com/chakra-ui/chakra-ui/commit/3908155e291b14468c12711abc9e45e94c904358)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Rename
  `createStyleContext` to `createSlotRecipeContext`

- [`952647a`](https://github.com/chakra-ui/chakra-ui/commit/952647a1767df596d08f91fd3b50c28e8edc22e7)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add `CardTitle` and
  `CardDescription` components

- [`b6d1d0d`](https://github.com/chakra-ui/chakra-ui/commit/b6d1d0db60644fc43d04e6d40e86b6dba659457a)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Simplify spinner
  component to use less custom props.

  - Removed `emptyColor`, prefer to use `--spinner-track-color`
  - Removed `speed`, prefer to use `animationDuration`
  - Removed `thickness`, prefer to use `borderWidth`

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.14
  - @chakra-ui/utils@3.0.0-next.14

## 3.0.0-next.13

### Minor Changes

- [`3fc49ca`](https://github.com/chakra-ui/chakra-ui/commit/3fc49ca37df42e793d84afd4bc857c568e2e8b5a)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  `FormatNumber` and `FormatByte` components

### Patch Changes

- [`bffb68f`](https://github.com/chakra-ui/chakra-ui/commit/bffb68f4fdedf4a438a0e56406315b44b98c6011)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **Pagination:**
  Fix issue page props were not forwarded correctly.
  - **PinInput:** Fix issue mask props were not forwarded correctly.
- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.13
  - @chakra-ui/utils@3.0.0-next.13

## 3.0.0-next.12

### Patch Changes

- [`0ae054d`](https://github.com/chakra-ui/chakra-ui/commit/0ae054d3745339bd7bdae83b19a7be42957f0f59)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  `hideFrom` and `hideBelow` doesn't show any autocompletions

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.12
  - @chakra-ui/utils@3.0.0-next.12

## 3.0.0-next.11

### Minor Changes

- [`e77a9b8`](https://github.com/chakra-ui/chakra-ui/commit/e77a9b81ecd765d0b0963e5f847a867dfd506363)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Add new Timeline
  component to presenting chronological information or activities.

  - Trim generated `className` in the DOM.
  - Add `neutral` status to `Alert` component

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.11
  - @chakra-ui/utils@3.0.0-next.11

## 3.0.0-next.10

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.10
  - @chakra-ui/utils@3.0.0-next.10

## 3.0.0-next.9

### Minor Changes

- [`3ccbbdf`](https://github.com/chakra-ui/chakra-ui/commit/3ccbbdff6e9c48350461358fb898ea1a8a166c08)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - ### Motion Styles

  Add support for `motionStyle` props.

  The idea is to pair them with text styles and layer styles to create this
  three-part mixin that can make your styles a lot cleaner.

  Motion styles focus solely on animations, allowing you to orchestrate
  animation properties.

  ```jsx
  import { defineMotionStyles } from "@chakra-ui/react"

  export const motionStyles = defineMotionStyles({
    "slide-fade-in": {
      value: {
        transformOrigin: "var(--transform-origin)",
        animationDuration: "fast",
        "&[data-placement^=top]": {
          animationName: "slide-from-top, fade-in",
        },
        "&[data-placement^=bottom]": {
          animationName: "slide-from-bottom, fade-in",
        },
        "&[data-placement^=left]": {
          animationName: "slide-from-left, fade-in",
        },
        "&[data-placement^=right]": {
          animationName: "slide-from-right, fade-in",
        },
      },
    },
  })
  ```

  ### Built-in Keyframe Animations

  Chakra new provides built-in keyframe animations that you can use to create
  your own motion styles.

  **Slide:** `slide-from-top`, `slide-from-bottom`, `slide-from-left`,
  `slide-from-right`, `slide-to-top`, `slide-to-bottom`, `slide-to-left`,
  `slide-to-right`

  **Slide Full:** `slide-from-top-full`, `slide-from-bottom-full`,
  `slide-from-left-full`, `slide-from-right-full`, `slide-to-top-full`,
  `slide-to-bottom-full`, `slide-to-left-full`, `slide-to-right-full`

  **Fade:** `fade-in`, `fade-out`

  **Scale:** `scale-in`, `scale-out`

  You can compose these animations using the `animationName` property in your
  motion styles to create really cool animations. No JS required.

  ```jsx
  <Box animationName="slide-from-top, fade-in" animationDuration="fast">
    Slide from top and fade in
  </Box>
  ```

- [`3ccbbdf`](https://github.com/chakra-ui/chakra-ui/commit/3ccbbdff6e9c48350461358fb898ea1a8a166c08)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  built-in layer styles to help prototype faster with automatic dark mode.
  Paired with `colorPalette`, you can create beautiful designs with little code
  that adapts to dark mode automatically.

  **Fill Layer Styles:** `fill.muted`, `fill.solid`, `fill.surface`

  ```jsx
  <Box layerStyle="fill.muted" colorPalette="red">
    This is a subtle fill layer
  </Box>
  ```

  **Border Layer Styles:** `outline.muted`, `outline.solid`

  ```jsx
  <Box layerStyle="outline.muted" colorPalette="red">
    This is a subtle outline layer
  </Box>
  ```

  **Indicator Styles**: `indicator.top`, `indicator.end`, `indicator.bottom`,
  `indicator.start`

  ```jsx
  <Box layerStyle="indicator.top" colorPalette="red">
    This is a top indicator layer
  </Box>
  ```

  **Disabled Styles:** `disabled`

  ```jsx
  <Box _disabled={{ layerStyle: "disabled" }}>Disabled Button</Box>
  ```

  You can combine these layer styles to create very complex designs with little
  code.

  ```jsx
  <Box
    layerStyle="fill.muted"
    _hover={{ layerStyle: "outline.solid" }}
    colorPalette="red"
  >
    This is a complex layer
  </Box>
  ```

- [`c654ee3`](https://github.com/chakra-ui/chakra-ui/commit/c654ee31fff590be2ec132a30deb2be399af7035)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Improve performance
  of styled components to avoid unneeded re-renders.

- [`3ccbbdf`](https://github.com/chakra-ui/chakra-ui/commit/3ccbbdff6e9c48350461358fb898ea1a8a166c08)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Redesign `Stepper`
  component. It's now called `Steps` and manages the state internally, no need
  to use `useSteps` anymore.

  We've also improved the accessibility of the component by leveraging the tabs
  pattern and adding the required ARIA attributes.

  ```tsx
  <Steps.Root defaultIndex={0} count={2}>
    <Steps.List>
      <Steps.Item index={0}>
        <Steps.Trigger>
          <Steps.Title>Step 1</Steps.Title>
        </Steps.Trigger>
        <Steps.Separator />
      </Steps.Item>

      <Steps.Item index={1}>
        <Steps.Trigger>
          <Steps.Title>Step 2</Steps.Title>
        </Steps.Trigger>
        <Steps.Separator />
      </Steps.Item>
    </Steps.List>

    <Steps.Content index={0}>Step 1</Steps.Content>
    <Steps.Content index={1}>Step 2</Steps.Content>
    <Steps.CompleteContent>Complete</Steps.CompleteContent>
  </Steps.Root>
  ```

  Using the CLI, you can also scaffold an already composed stepper component

  ```sh
  chakra composition add steps
  ```

- [`3ccbbdf`](https://github.com/chakra-ui/chakra-ui/commit/3ccbbdff6e9c48350461358fb898ea1a8a166c08)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  `focusRing` and `focusRingColor` style props that allow to quickly style focus
  visible state of form controls.

  The focus ring values can be either `extend` or `contain`

  ```jsx
  <Box asChild focusRing="extend" focusRingColor="pink.500">
    <input type="text" />
  </Box>
  ```

### Patch Changes

- [`0a03bcc`](https://github.com/chakra-ui/chakra-ui/commit/0a03bcc602f36b2901f53e4e03e6498d28bd8fa6)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Fix circular
  progress element types

  - Ensure consistent exports in components

- [#8617](https://github.com/chakra-ui/chakra-ui/pull/8617)
  [`7e9fbf0`](https://github.com/chakra-ui/chakra-ui/commit/7e9fbf06db6286220451ba9c4d0784e4e4be3dac)
  Thanks [@isBatak](https://github.com/isBatak)! - Refactor text-styles to use
  tokens instead of raw values.

- [#8601](https://github.com/chakra-ui/chakra-ui/pull/8601)
  [`1867d66`](https://github.com/chakra-ui/chakra-ui/commit/1867d6628fa83c97eba5a30c7bf4238dd2c20c09)
  Thanks [@isBatak](https://github.com/isBatak)! - Fix `blur` property token
  conversion to CSS variable.

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.9
  - @chakra-ui/utils@3.0.0-next.9

## 3.0.0-next.8

### Patch Changes

- [`32a454d`](https://github.com/chakra-ui/chakra-ui/commit/32a454d0c2ffc67a9f09210d591f68b052e889e9)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add missing
  `use client` directives to several components

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.8
  - @chakra-ui/utils@3.0.0-next.8

## 3.0.0-next.7

### Minor Changes

- [`4ff153f`](https://github.com/chakra-ui/chakra-ui/commit/4ff153fd9b449d3e43561b7daceaadfe3c925b08)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Speed up
  intellisence for style props, and add support for `strictTokens` in the CLI.

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.7
  - @chakra-ui/utils@3.0.0-next.7

## 3.0.0-next.6

### Minor Changes

- [`925cfd9`](https://github.com/chakra-ui/chakra-ui/commit/925cfd99ce0a09c4145b81c17605e882c4aa1840)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add ActionBar,
  Status, Rating, Pagination components

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.6
  - @chakra-ui/utils@3.0.0-next.6

## 3.0.0-next.5

### Minor Changes

- [`07b04b1`](https://github.com/chakra-ui/chakra-ui/commit/07b04b1c506995f6f276f5f80a93d09d89b92fce)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **[NEW]:** Add
  `RatingGroup`, `SegmentControl`

  - **[NEW]:** Add `EmptyState` component for empty states
  - **[NEW]:** Add `RadioCard` and `CheckboxCard` components for card-based
    selection

- [#8568](https://github.com/chakra-ui/chakra-ui/pull/8568)
  [`5fd993b`](https://github.com/chakra-ui/chakra-ui/commit/5fd993bfbfd82f340646b3aa55fccc4d633834a7)
  Thanks [@isBatak](https://github.com/isBatak)! - Add Collapsible recipe with
  default open/close animation

- [`43f2c7d`](https://github.com/chakra-ui/chakra-ui/commit/43f2c7d857c8fe3cab911891200fdc75d1aa782d)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **CheckboxCard
  [New]**

  Add support for a new `CheckboxCard` component that can be used to render a
  card with a checkbox.

  ```jsx
  <CheckboxCard.Root>
    <CheckboxCard.Control>
      <Stack gap="0" flex="1">
        <CheckboxCard.Label>Checkbox</CheckboxCard.Label>
        <Text>Some description</Text>
      </Stack>

      <CheckboxCard.HiddenInput />
      <CheckboxCard.Indicator />
    </CheckboxCard.Control>
  </CheckboxCard.Root>
  ```

  - **Checkmark [New]**

    Add new checkmark component for rendering a static checkmark icon with the
    `checked`, `disabled`, and `indeterminate` state baked in.

  ```jsx
  <Stack>
    <Checkmark />
    <Checkmark checked />
    <Checkmark indeterminate />
    <Checkmark disabled />
    <Checkmark checked disabled />
    <Checkmark indeterminate disabled />
  </Stack>
  ```

  - **EmptyState [New]**

    Add new `EmptyState` component for rendering an empty state message with a
    title, description, and optional action button.

  ```jsx
  <EmptyState.Root>
    <EmptyState.Content>
      <EmptyState.Indicator>
        <HiTemplate />
      </EmptyState.Indicator>

      <VStack textAlign="center">
        <Text fontWeight="medium">No template found</Text>
        <Text fontSize="sm" color="fg.muted">
          Try creating a new template with the button below
        </Text>
      </VStack>

      <Button variant="outline">
        <HiPlus /> Create Template
      </Button>
    </EmptyState.Content>
  </EmptyState.Root>
  ```

- [#8575](https://github.com/chakra-ui/chakra-ui/pull/8575)
  [`d4522d9`](https://github.com/chakra-ui/chakra-ui/commit/d4522d92bca44a79baa404340426b2783d283e2e)
  Thanks [@isBatak](https://github.com/isBatak)! - Align theme recipe name with
  panda

- [#8569](https://github.com/chakra-ui/chakra-ui/pull/8569)
  [`eb26857`](https://github.com/chakra-ui/chakra-ui/commit/eb2685735e25d6790d14d28653c792b9572c080e)
  Thanks [@isBatak](https://github.com/isBatak)! - Fix the `boxSize` type to
  allow number values.

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.5
  - @chakra-ui/utils@3.0.0-next.5

## 3.0.0-next.4

### Minor Changes

- [`e4f2df0`](https://github.com/chakra-ui/chakra-ui/commit/e4f2df05a44d39cb951193cad771bc3f6f917bf2)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add `Prose`
  component to help style markdown content.

### Patch Changes

- [#8475](https://github.com/chakra-ui/chakra-ui/pull/8475)
  [`9224f4e`](https://github.com/chakra-ui/chakra-ui/commit/9224f4e16299ab6eee7dbc9b1ba3bc6723f00046)
  Thanks [@ryo-manba](https://github.com/ryo-manba)! - Add aria-current
  attribute to stepper

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.4
  - @chakra-ui/utils@3.0.0-next.4

## 3.0.0-next.3

### Minor Changes

- [`de9c0a0`](https://github.com/chakra-ui/chakra-ui/commit/de9c0a0d78f70db1fb246ea8ec377e57e10919e7)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add `DataList`
  component

- [`763329e`](https://github.com/chakra-ui/chakra-ui/commit/763329ebdca2a9d4b7295d94fff3d2265a793c99)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add preset and
  preset-base entrypoints.

  - The `preset` entrypoint exposes the default theme and recipes for Chakra.
  - The `preset-base` entrypoint exposes the base utilities and conditions used
    internally.

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.3
  - @chakra-ui/utils@3.0.0-next.3

## 3.0.0-next.2

### Patch Changes

- [`83366c4`](https://github.com/chakra-ui/chakra-ui/commit/83366c43e42d7d4d385bbb3d85051768b0e03be7)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Fix regression in
  `mergeConfigs`
  - Decompose `Field` component
  - Refactor `Avatar` to use Ark UI
  - Refactor `Progress` to use Ark UI
- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.2
  - @chakra-ui/utils@3.0.0-next.2

## 3.0.0-next.1

### Minor Changes

- [`548470d`](https://github.com/chakra-ui/chakra-ui/commit/548470dd4306dd39d76555e172da64fd1861fdc5)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add custom select
  from Ark UI and design recipe

### Patch Changes

- [`c941971`](https://github.com/chakra-ui/chakra-ui/commit/c9419714db8b50b2cad3f478d90d4be4268da48f)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Convert Tabs
  component to use Ark UI

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.1
  - @chakra-ui/utils@3.0.0-next.1

## 3.0.0-next.0

### Major Changes

- [#8153](https://github.com/chakra-ui/chakra-ui/pull/8153)
  [`7b6e66a`](https://github.com/chakra-ui/chakra-ui/commit/7b6e66a15b08ad27e8458a009c3fb15ee738ca37)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Prepares the ground
  for the next version Chakra that leverages Ark UI.

  **User Facing**

  - Consolidate all component packages into a single package
  - Remove all deprecated components and APIs
  - Simplify the Changelogs for all v2 releases

  **Infrastructure**

  - Simplify the repo infrastructure and release process
  - Migrate from `jest` to `vitest`
  - Migrate from `tsup` to custom `rollup` setup for better bundling strategy

### Minor Changes

- [#8121](https://github.com/chakra-ui/chakra-ui/pull/8121)
  [`170198f`](https://github.com/chakra-ui/chakra-ui/commit/170198fc3936ad34f8136a2da173c12d9dc3dc36)
  Thanks [@kkieninger](https://github.com/kkieninger)! - ### Fixed

  - Fix hard-coded z-index for Menu in favor of one defined from the theme
  - Fix problem with leading and trailing spaces when getting initials for the
    Avatar component
  - Suppress unnecessary re-renders of Checkbox and Radio component

  ### Added

  - Add CSS `accentColor` property to style props
  - Add support for `asChild` in chakra factory
  - Export `toastStore` from `toast` component
  - Upgrade `framer-motion` to allow for skipAnimations
  - Add component namespace to reduce imports and provide better composition
  - Modal, Drawer: Add default `preserveScrollBarGap`

  ### Changed

  Redesign the component themes and anatomy

- [#8393](https://github.com/chakra-ui/chakra-ui/pull/8393)
  [`623e558`](https://github.com/chakra-ui/chakra-ui/commit/623e558ac22f84e6250387d0971aafe9713667a6)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Integrate Ark UI
  components to reduce maintenance surface.

  - Add `FileUpload` component
  - Remove `trigger=hover` in favor of `HoverCard`
  - Replace `Tooltip`, `Popover` and `HoverCard` with those from Ark UI

- [#8218](https://github.com/chakra-ui/chakra-ui/pull/8218)
  [`a89c598`](https://github.com/chakra-ui/chakra-ui/commit/a89c598ed822bf11efc519f8789fa7c145e3bba0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  custom theme conditions or pseudo props via `theme.conditions`

  ```ts
  // theme.ts

  const theme = extendTheme({
    conditions: {
      _closed: "[data-state='closed']", // pseudo prop
    },
  })
  ```

  This allows you to use the pseudo prop in your components

  ```jsx
  <Box data-state="closed" _closed={{ bg: "red.200" }}>
    This box is closed
  </Box>
  ```

  **For TypeScript users**, you need to use the Chakra CLI to generate the types
  for your custom conditions.

  ```sh
  pnpm chakra-cli tokens src/theme/index.ts
  ```

- [#8218](https://github.com/chakra-ui/chakra-ui/pull/8218)
  [`a89c598`](https://github.com/chakra-ui/chakra-ui/commit/a89c598ed822bf11efc519f8789fa7c145e3bba0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  `_open` and `_closed` pseudo props for styling their respective selectors.

  - `_open`: `&[data-state=open], &[open]`
  - `_closed`: `&[data-state=closed]`
  - `_groupOpen`: `[data-group][data-state=open] &`
  - `_groupClosed`: `[data-group][data-state=closed] &`

  Extend the existing pseudo props to support new selectors`

  - `_placeholder` now supports `&[data-placeholder]`
  - `_placeholderShow` now supports `&[data-placeholder-shown]`
  - `_fullscreen` now supports `&[data-fullscreen]`
  - `_empty` now supports `&[data-empty]`
  - `_expanded` now supports `&[data-state=expanded]`
  - `_checked` now supports `&[data-state-checked]`

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.0
  - @chakra-ui/utils@3.0.0-next.0
