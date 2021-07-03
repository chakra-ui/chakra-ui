---
title: Changelog
description: The changelog for Chakra UI React
slug: "/changelog"
---

The Changelog gives an overview of the meaningful changes we've made to Chakra
UI as we keep driving for better performance and best-in-class developer
experience.

To better understand the changelog, here are some legends we use:

- 💥 Breaking
- 🚀 Feature
- 🐛 Bug fix

## 16-06-2021

`@chakra-ui/react@1.6.4`

**Button** `v1.4.0`

- 🚀 Add `className` prop to button load spinner.
- 🐛 Update transitions to use theme tokens and remove outline transitions.

**Media Query** `v1.1.0`

- 🚀 `useBreakpointValue()` now supports receiving a `defaultBreakpoint` as the
  second argument to support SSR/SSG.

**Styled System** `v1.12.0`

- 🚀 Added the `_activeStep` pseudoselector which is applied when
  `aria-current="step"`.
  [See the `wai-aria` documentation](https://www.w3.org/TR/wai-aria-1.2/#aria-current)

**System** `v1.7.0`

- 🚀 The `styled` function allows a functional `baseStyle` property.

```jsx live=false
import { styled } from '@chakra-ui/react'

const MyComponent = styled('div', {
  baseStyle: (props) => ({
    bg: props.highlightColor
  })
})

// ...

<MyComponent highlightColor="red.500" />

```

**Cli** `v1.4.0`

- 🚀 The `tokens` command now supports generating theme token type definitions
  from a Chakra UI theme published as a package:

`npx @chakra-ui/cli tokens <@your-org/chakra-theme-package>`

A published theme package should export a theme object as either the `default`
export or an export named `theme`.

```jsx live=false
// chakra-theme-package/src/index.js
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({})

// as default export
export default theme
// as named export
export { theme }
```

**Accordion** `v1.3.3` & **Checkbox** `v1.5.3` & **Control Box** `v1.0.13` &
**Modal** `v1.8.8` & **Number Input** `v1.2.7` & **Progress** `v1.1.10` &
**Tag** `v1.1.10`

- 🐛 Update transitions to use theme tokens and remove outline transitions.

**Hooks** `v1.5.3`

- 🐛 Fix inconsisent id generation between client and server.

**Menu** `v1.6.4`

- 🐛 Fix issue where `closeOnSelect` won't work sometimes.
- 🐛 Update transitions to use theme tokens and remove outline transitions.

**Popover** `v1.7.2`

- 🐛 Fix issue where arrowshadowcolor didn't work.

**React** `v1.6.4`

- 🐛 Fix inconsisent id generation between client and server.

**Stat** `v1.1.10`

- 🐛 Export TypeScript interface `StatGroupProps`.

**Tabs** `v1.5.2`

- 🐛 Render tab indicator at the correct position.
- 🐛 Update transitions to use theme tokens and remove outline transitions.

**Theme** `v1.9.1`

- 🐛 Fix an issue where the distance to the next element below a textarea was
  too large in some browsers.
- 🐛 Update transitions to use theme tokens and remove outline transitions.

**Toast** `v1.2.8`

- 🐛 Resolved an issue where `overflowX` couldn't be used within a toast's
  `title` or `description` by adding `maxWidth="100%"` to the containing div.

**Transition** `v1.3.2`

- 🐛 Fixed an issue in the Collapse transition's enter animation in case of
  `unmountOnExit`.

## 26-05-2021

`@chakra-ui/react@1.6.3`

**Popper** `v2.2.0`

The `popper.js` instance will not be created until the `enabled` option is
`true`. This improves the render and scroll performance when you use many
popper-related items.

Affected components: Menu, Popover and Tooltip components

**Media Query** `v1.0.14` Fix issue where `useMediaQuery` does not work as
expected when use within an `iframe`. The hook now references the correct
`ownerDocument`

**Styled System** `v1.6.7`

- Fix boolean condition affecting `bgImage` url
- Fix import type issues caused by the `WithCSSVar` type

## 17-05-2021

`@chakra-ui/react@1.6.2`

**Styled System** `v1.11.0`

Ring

- 🚀 Added ring style props to make it easier to style an element's focus ring
  shadows. Props are `ring`, `ringColor`, `ringOffset`, and `ringOffsetColor`.

[CodeSandbox Link](https://codesandbox.io/s/ring-colors-4wz1w)

```jsx live=false
// adds a 2px box-shadow with `gray.400` color
<Box ring="2px" ringColor="gray.400">
  Sample
</Box>

// adds main box-shadow + offset box-shadow
<Box ring="2px" ringColor="gray.400" ringOffset="3px" ringOffsetColor="white">
 Sample
</Box>
```

Filter Styles

- 🚀 Added css variable based API to apply css filter properties (blur,
  backdrop-blur) to an element. Props are `filter`, `blur`, `sepia`,
  `brightness`, `invert`, `saturation`, `backdropFilter`, `backdropBlur`,
  `sepia`, `saturation`, etc.

To use this API, you'll need to set `filter` to `auto`, same for
`backdropFilter`.

```jsx live=false
// adds a 3px blur filter to this element
<Image src="boruto.png" filter="auto" blur="3px" />

// adds a 3px blur and 40% saturation filter to this element
<Image src="boruto.png" filter="auto" blur="3px" saturation={0.4} />
```

Transform Styles

- 🚀 Added css variable based API to apply css transform properties (translateX,
  translateY, scale, etc.). Props are `translateX`, `translateY`, `rotate`,
  `scaleX`, `scaleY`, and `scale`.

To use this API, you'll need to set `transform` to `auto` or `auto-gpu` (for the
GPU accelerated version).

```jsx live=false
<Circle transform="auto" translateX="4" _hover={{ translateX: "8" }}>
  <CheckIcon />
</Circle>
```

- Add `mixBlendMode`, `backgroundBlendMode`, and `bgBlendMode` props to apply
  blend modes to elements.

- Automatic wrapping of `backgroundImage` or `bgImage` props with url() so you
  can just pass the image URL directly.

```jsx live=false
// You can now do this!
<Box bgImage="naruto.png" />

// This still works
<Box bgImage="url(naruto.png)" />
```

- Text decoration styles: Added `textDecorationColor`, `textDecorationLine`,
  `textDecorationStyles` style props.

- Add `isolation` style prop to create a new stacking context.

High Contrast Mode

- Fixed issue where setting `outline:0` or `outline:none` and using `box-shadow`
  for focus outlines don't work in high-contrast mode.

- To fix this, we've added `outline: 2px solid transparent` whenever you set
  `outline:0` to make your components work in high-constrast mode by default.

[Learn more](https://sarahmhigley.com/writing/whcm-quick-tips/)

- Fix the `_dark` pseudo props to map to
  `.chakra-ui-dark &, [data-theme=dark] &, &[data-theme=dark]`.

- Added `_light` pseudo props to map to
  `.chakra-ui-light &, [data-theme=light] &, &[data-theme=light]` for users that
  prefer to start with dark mode.

- Added `overscroll`, `overscrollX`, and `overscrollY` style prop to manage
  overscroll behavior of an container.

**Theme** `v1.9.0`

- 🚀 Add blur token values for `filter` and `backdropFilter`.

```jsx live=false
{
  "none": 0,
  "sm": "4px",
  "base": "8px",
  "md": "12px",
  "lg": "16px",
  "xl": "24px",
  "2xl": "40px",
  "3xl": "64px"
}
```

**Form Control** `v1.3.6`

- 🐛 Fix issue where FormLabel could not be used without form-control.

**Menu** `v1.6.2`

- 🐛 Fix issue where typeahead overrides input keydown.

**React** `v1.6.2`

- 🐛 `ChakraProvider` now accepts the prop `cssVarsRoot` which defaults to
  `:host, :root`.

**System** `v1.6.6`

- 🐛 Attach CSS vars to `:host, :root` to fix usage in shadow dom.

**Transition** `v1.3.1`

- 🐛 Fix issue where `onAnimationComplete` is not forwarded to motion element.

## 04-05-2021

`@chakra-ui/react@1.6.1`

**Popover** `v1.7.0`

- 🚀 Add an export for `usePopoverContext` hook.

**Transition** `v1.3.0`

- 🚀 Add support for tweaking the enter-exit transitions. Affected components:
  `Fade`, `Slide`, `SlideFade`, `SlideScale`, `Collapse`.

```jsx live=false
<Fade
  transition={{
    enter: { duration: 0.3 },
    exit: { duration: 0.1 },
  }}
/>
```

- 🚀 Fix issue where `Collapse` animation hide overflow when it expands.
  Collapse transition how shows overflow when it's expanded and hides overflow
  when it's collapsed.

- 🚀 Add support for `delay` prop for all transition components.

```jsx live=false
// as a number
<Fade delay={0.3} />

// or based on state (enter/exit only)
<Fade delay={{ enter: 0.2 }} />

// or both
<Fade delay={{ enter: 0.2, exit: 0.1 }} />
```

Note: this only works when you're using our built-in transition definition. If
you're passing your own transition definition, pass the delay there.

```jsx live=false
// adding delay to your custom transition definition
<Fade
  transition={{
    enter: { duration: 0.2, delay: 0.1 },
  }}
/>
```

**Utils** `v1.8.0`

- 🚀 Add types for the return value of `pipe` function.
- 🚀 Update user agent assertions.
- 🚀 Add walkObject helper to iterate over all keys including nested.

**React Env** `v1.0.4`

- 🐛 Update mock window.

**Menu** `v1.6.1`

- 🐛 Fix issue where `closeOnSelect` didn't work for menuitem options.

**Modal** `v1.8.5`

- 🐛 Fix types for modal overlay fade config.

**Slider** `v1.2.5`

- 🐛 Fix issue where `onChangeStart` doesnt get called.
- 🐛 Fix issue where slider thumb remains tabbable when `isDisabled={true}`.
- 🐛 Fix issue where `onChangeEnd` doesn't get called when you click anywhere on
  the track.

**Styled System** `v1.10.5`

- 🐛 Refactored the creation of the theme css vars.

## 23-04-2021

`@chakra-ui/react@1.6.0`

**Gatsby Plugin** `v2.0.0`

- 💥 Upgrading to this new major version is recommended for everyone as it fixes
  hot reloading in Gatsby (Fast Refresh). In the previous version changes to the
  shadowed theme.js file didn't trigger automatic reloading, and a manual reload
  was necessary.

- 💥 The `isUsingColorMode` option was removed. The `ChakraProvider` will always
  use the `ColorModeProvider`.
- 💥 The `isResettingCSS` option was renamed to `resetCSS`. Those changes were
  made to use the current ChakraProvider and align the prop names.

Improvements

- Use `ChakraProvider` instead of the outdated `ThemeProvider` pattern.
- Add `initialColorMode` to the `ColorModeScript`.
- Allow Fast Refresh reloading of all theme files.
- Set stricter `peerDependency` on `gatsby` (to ^2.29.3 || ^3.0.0).

**Accordion** `v1.3.0`

- 🚀 Update tabs and accordion to use updated descendants logic.

**Menu** `v1.6.0`

- 🚀 Update menu to use new descendants logic.
- 🐛 Fix issue where menu doesn't select menu item when the first item is
  disabled.
- 🐛 Fix issue where menu doesn't work when an input is used within it.
- 🐛 Fix issue where menu button doesn't work with truncated text.

**Pin Input** `v1.6.0`

- 🚀 Update pin-input to use the new descendants logic.

**React** `v1.6.0` & **Theme** `v1.8.4`

- 🚀 The `extendTheme` function allows you to pass multiple overrides or
  extensions:

```jsx live=false
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

**Tabs** `v1.5.0`

- 🚀 Update tabs and accordion to use updated descendants logic.
- 🚀 Add support for RTL keyboard navigation.

**Utils** `v1.7.0`

- 🚀 Add `pipe` function.
- 🚀 Add generic to `isFunction` guard.

**Button** `v1.3.1`

- 🐛 Resolved an issue where the `type` prop of the `Button` component was set
  to `undefined`.

**Progress** `v1.1.8`

- 🐛 Fix hyperlink to docs.

**React Utils** `v1.1.2`

- 🐛 Update types for `mergeRefs` to include null.

**Gatsby Starter Default** `v0.3.0`

- 🚀 Updates to Gatsby-related documentation to account for the breaking changes
  made in PR #3841. The "Providers" section from the Gatsby guide was removed as
  the plugin itself handles everything already.

## 19-04-2021

`@chakra-ui/react@1.5.2`

**Button** `v1.3.0`

- 🚀 Added `spinnerPlacement` prop to allow changing the spinner placement for
  the button when `isLoading` is `true`. Spinner placement can be either `start`
  or `end`.

```jsx live=false
<Button isLoading spinnerPlacement="end">
  Click me
</Button>
```

**Checkbox** `v1.5.0`

- 🚀 Add `isDisabled` prop to `CheckboxGroup`.

**Hooks** `v1.5.0`

- 🚀 Add pan session hook `usePanGesture` for detecting pan gestures.
- 🚀 Update `useLatestRef` to inline value updates. Not concurrent mode safe but
  works for now.
- 🚀 Add `useEventListenerMap` to provide an elegant way of attaching several
  pointer event to the `document` or an element.

**Menu** `v1.5.0` & **Popover** `v1.6.0` & **Tabs** `v1.4.0`

- 🚀 This change restores the behavior of the `isLazy` prop (which was broken by
  the previous release) and adds a new `lazyBehavior` prop which configures the
  behavior of `isLazy`.

If you'd like the content of tab panel, popover and menu components to be
unmounted when not selected or opened, please continue to use `isLazy`. This is
the default behavior.

If you'd like the content of tab panel, popover and menu components to remain
mounted (but hidden) after it was previously selected or opened, use
`lazyBehavior="keepMounted"` in combination with `isLazy`.

**Utils** `v1.6.0`

- 🚀 Add lazy content utility for disclosure components like popover, menu, tab,
  etc.
- 🚀 Add pan session class to handle pan gestures. This is used in the slider
  logic and sharable with vue library.
- 🚀 Perfomance: Throttle pan move events to once per frame which improves the
  slider's `onChange` call performance.
- 🚀 Update types for internal pointer event.

**React Env** `v1.0.2`

- 🐛 Fix bug where `EnvProvider` breaks SSR.

**Modal** `v1.8.3` & **Theme** `v1.8.3`

- 🐛 Fixed an issue where the modal exceeded the viewport height on iOS.

**Slider** `v1.2.3`

- 🐛 Fix issue where slider doesnt work after first slide.
- 🐛 Avoid exccess `onChange` calls.

**Stat** `v1.1.7`

- 🐛 Fixed a11y issue related to `StatHelpText`. It was using an invalid `dl`
  child tag.

**Styled System** `v1.10.3`

- 🐛 Fixed an issue where thtransition props are not resolved correctly.

## 13-04-2021

`@chakra-ui/react@1.5.1`

**Hooks** `v1.4.0`

- 🚀 Add support for passing function that returns element to `useEventListener`
  and `usePointerEvent`.

**Menu** `v1.4.0`

- 🚀 Add `closeOnSelect` to `MenuItem` and `MenuItemOption`.
- 🐛 Do not unmount menu list after first render.
- 🐛 Use prop getter from use-popper to prevent ssr content jump.

**Transition** `v1.2.0`

- 🚀 Allow custom transition variants.

**Button** `v1.2.2`

- 🐛 Fix alignment of icon inside button.
- 🐛 Update button group styles to use rtl-friendly equivalent.

**Clickable** `v1.1.2`

- 🐛 Add missing dependency issue of `@chakra-ui/react-util`.

**Editable** `v1.1.2`

- 🐛 Update focus-on-mousedown util to avoid memory leak.

**React Env** `v1.0.1`

- 🐛 Fix issue where window could be null Skip logic when `environment` prop is
  passed.

**Input** `v1.2.2`

- 🐛 Remove unused padding-x from input element.

- 🐛 Update input addon and element style handling.

**Layout** `v1.4.2`

- 🐛 Fix RTL styles for OrderedList and UnorderedList.

**Popover** `v1.5.1`

- 🐛 Fix RTL styles for close button.

- 🐛 Do not unmount lazy popovers after first render.

- 🐛 Update focus-onmousedown to avoid memory leak.

- 🐛 Use prop-getters from use-popper to prevent ssr content shift.

**Popper** `v2.1.1`

- 🐛 Update README for the `popper.js` wrapper.

**Progress** `v1.1.6`

- 🐛 Fix an issue where `CircularProgress` with `isIndeterminate` doesn't show
  the indicator

**React** `v1.5.1`

- 🐛 Fixed typing issues for `extendTheme` where variant overrides lead to an TS
  error.

- 🐛 Add `EnvironmentProvider` to `ChakraProvider` for better window and
  document detection across hooks and components.

**Spinner** `v1.1.6`

- 🐛 Fix issue where spinner base-style cant be overriden.

**System** `v1.6.2`

- 🐛 Allow passing custom props to `useStyleConfig`.
- 🐛 Add missing dependency issue of `@chakra-ui/react-utils`.

**Tabs** `v1.3.2`

- 🐛 Do not unmount lazy tabs when unselected.

**Theme** `v1.8.2`

- 🐛 Changes incorrect `panel` part name in `Progress` theme file to `label`.

- 🐛 Update input, alert and tabs RTL styles.

**Toast** `v1.2.3`

- 🐛 Fix RTL styles for toast component.

**Tool tip** `v1.2.3`

- 🐛 Use prop-getters from use-popper to prevent ssr content shift.
- 🐛 Add missing dependency issue of `@chakra-ui/react-utils`.

**Utils** `v1.5.2`

- 🐛 update type signature for `px` function.

## 07-04-2021

`@chakra-ui/react@1.5.0`

**React** `v1.5.0`

- 🚀 Bump package as minor.
- 🐛 Resolved a peer dependency resolution issue reported by yarn2, npm7, and
  other more modern package managers.

**Popover** `v1.5.0`

- 🚀 Return prop getters for popover header and body and use ref callback to
  determine element's presense instead of useEffect.
  [#3733](https://github.com/chakra-ui/chakra-ui/pull/3733)

- 🚀 Add support for `rootProps` to `PopoverContent` to allow passing props to
  popover's positioner.
- 🚀 Make it possible to add custom motion `variants` so users can orchestrate
  custom transitions.
- 🚀 Move popover arrow shadow color computation to popover's theme.
- 🐛 Update import of shared utils from `react-utils` to `utils`.

**Popper** `v2.1.0`

- 🚀 Add prop getters for popper and arrow for better ssr support.
- 🚀 Replace `utils` dependency with `react-utils`.

**Table** `v1.2.0`

- 🚀 Add `TableContainer` component to help tables scroll horizontally when
  overflowing.

```jsx live=false
<TableContainer>
  <Table>
    {...}
  </Table>
</TableContainer>
```

**Checkbox** `v1.4.1`, **Radio** `v1.3.1`

- 🐛 Update import of shared utils from `react-utils` to `utils`.
- 🐛 Replace `withFlushSync` with `scheduleMicrotask` callback to prevent
  ReactDOM warning.

**Form Control** `v1.3.1`

- 🐛 Refactor form label to use prop getter instead of hook for better
  consistency.
- 🐛 Replace `withFlushSync` with `scheduleMicrotask` callback to prevent
  ReactDOM warning when an element us focused by calling `.focus()`. This works
  as well in concurrent mode.

**Modal** `v1.8.1`

- 🐛 Resolved a peer dependency resolution issue reported by yarn2, npm7, and
  other more modern package managers.
- 🐛 Omit scroll-behavior from drawer props.

**Number Input** `v1.2.1`

- 🐛 Replace `withFlushSync` with `scheduleMicrotask` callback to prevent
  ReactDOM warning.

**Progress** `v1.1.5`

- 🐛 Fix issue in safari where circular progress indicator shows a tiny bit when
  value is `0`.

**React Utils** `v1.1.1`

- 🐛 Update prop getter v2 type to take second parameter.
- 🐛 Update import of shared utils from `react-utils` to `utils`.
- 🐛 Replace `withFlushSync` with `scheduleMicrotask` callback to prevent
  ReactDOM warning.

**Select** `v1.1.5`

- 🐛 Fix RTL styles for select field to use `paddingEnd` instead of `pr`.

**Theme** `v1.8.1`

Popover

- 🐛 Moved `maxW` from popover's `popper` to `content` to allow for better
  control of the popover's width.
- 🐛 Use `width` instead of `maxW` to allow users more control of popover's
  width.
- 🐛 Use `--popover-bg` css property to control popover and arrow background.

```jsx live=false
<PopoverContent style={{ "--popover-bg": "purple" }}>
  <PopoverArrow />
</PopoverContent>
```

- 🐛 Add popover arrow shadow color.

Select

- 🐛 Update select icon to use insetEnd instead of right for RTL.

Skip Link

- 🐛 Update styles to use insetStart instead of left for RTL.

Table

🐛 Update text align attribute to use end instead of right for RTL.

**Theme Tools** `v1.1.3` & **Transition** `v1.1.2`

- 🐛 Fix issue where `warn` doesn't get called.

**Toast** `v1.2.2`

- 🐛 Take into account safe area insets for Toasts.

**Tooltip** `v1.3.1`

- 🐛 Resolved a peer dependency resolution issue reported by yarn2, npm7, and
  other more modern package managers.

**Utils** `v1.5.1`

- 🐛 Update import of shared utils from `react-utils` to `utils`.
- 🐛 Replace `withFlushSync` with `scheduleMicrotask` callback to prevent
  ReactDOM warning.
- 🐛 Import types for `warn` function.

## 30-03-2021

`@chakra-ui/react@1.4.2`

**Accordion** `v1.2.0`

- 🚀 Extract all react based utilities and types to `@chakra-ui/react-utils`.

**Avatar** `v1.2.0`

- 🐛 Fix RTL styles.

**Checkbox** `v1.4.0`

- 🚀 Add `getRootProps` to `useCheckbox` hook to manage props passed to checkbox
  container.

- 🚀 Forward `onFocus`, `onBlur` and `aria-\*` props to the input element for
  better integration with form libraries.

- 🚀 Ensure the checkbox works when the root element is not label. This helps to
  fix the current accessibility issues with the Switch component when wrapped
  within `FormControl`.

**Counter** `v1.1.0`

- 🚀 Expose `setValue` function to allow update state without calling
  `onChange`.
- 🐛 Fix issue where `onChange` is called when value did not change.

**Form Control** `v1.3.0`

- 🚀 Refactor `useFormControlProvider` to return prop getters
  `getHelpTextProps`, `getErrorMessageProps`, and `getRootProps`.

- 🚀 Detect helper text and error message using ref callback instead of
  `useLayoutEffect`.

- 🚀 Update `aria-describedby` id to include feedbackId only when `isInvalid` is
  true.

- 🚀 Create `useFormControlProps` to provide a way to get the resolved form
  control props `isInvalid`, `isDisabled`, instead of HTML attributes. This will
  make it easier to integrate with number-input, checkbox, and switch.
- 🐛 Fix concurrent mode issue with setting state in focus event handler. We use
  withFlushSync helper to achieve this.

**Hooks** `v1.3.0`

- 🐛 useControllableState: The onChange callback will be called only if the new
  value isn't equal to the current one.

**Layout** `v1.4.0`

- 🐛 Remove redundant role attribute from divider.
- 🐛 Fixed the bug where a margin- bottom would get applied to
  `direction=row `of stack when using responsive props.

- 🐛 Fix issue where AbsoluteCenter doesn't have `position: absolute`.

**Number Input** `v1.2.0`

- 🐛 Forward `aria-\*` props to the input element.

- 🐛 Fix issue where `onChange` was called on mount.
- 🐛 Fix issue where `onBlur` was called twice.
- 🐛 Memoize all callback props `onFocus`, `onBlur`, `getAriaValueText`.
- 🐛 Refactor implicit `useFormControl` logic to be called from NumberInput
  instead.

- 🐛 Call `setFocused.on` with `ReactDOM.flushSync` to prevent concurrent mode
  issue where setting state in onFocus affects onChange event handler.

**Styled System** `v1.1.0`

- 🚀 Add support for css variable tokens. This means you can create a css
  variable and reference value in the tokens.

```jsx live=false
<Box
  sx={{
    "--banner-color": "colors.red.200",
    "& .banner": {
      bg: "var(--banner-color)",
    },
  }}
/>
```

**System** `v1.6.0`

- 🐛 Fixed an issue where the `StylesProvider` export was not working in every
  environment.

- 🚀 Add style config for upcoming `rotateX`, `rotateY`, `scaleX`, `scaleY`
  style props.

**Theme** `v1.8.0`

- 🚀 Remove 0 token value from spacing tokens. 0 maps to 0 and there's no need
  to create a css custom property for that.

**Switch**

- Add container part
- Use css vars to handle styles
- Fix RTL styles

**Stat, Table**

- Fix RTL styles

**Utils** `v1.5.0`

- 🚀 Add `withFlushSync` function wrapper to help resolve concurrent mode and
  onFocus state issues.

**Toast** `v1.2.1`

- 🐛 Bump `@reach/alert` to fix yarn pnp issue.

## 21-03-2021

`@chakra-ui/react@1.4.1`

**Styled System** `v1.9.1`

- 🐛 Fix issue where `textStyle` doesn't get applied.

## 20-03-2021

`@chakra-ui/react@1.4.0`

**React** `v1.4.0`

- 🚀 Added support for `framer-motion` v4.

**Popper** `v2.0.0`

- 🚀 Refactor the positioning logic to improve stability and leverage CSS custom
  properties.

**Styled System** `v1.9.0`

- 🐛 Fix issue where responsive styles defined in text styles not overridden by
  style props.
- 🐛 Fix issue where `toCSSVars` omitted the transition tokens.
- 🐛 Fix issue where RTL property keys are incorrect due to `config.property`
  mutation.
- 🐛 Added typings for the theme prop in `ThemingPropsThunk` and export a
  standalone type ThemeComponentProps. ThemingPropsThunk
- 🐛 Update `mx` and `px` to use logical properties. Instead of mapping to
  `marginLeft` and `marginRight`, it maps to `marginInlineStart` and
  `marginInlineEnd`. Same for `px`.

**CLI** `v1.3.0`

- 🚀 Add support for text style and layer style theme type generation to
  `@chakra-ui/cli`.

**Color Mode** `v1.1.2`

- 🐛 Memoize the context value for `ColorModeProvider`.

**Editable** `v1.1.3`

- 🐛 Fix issue where blur/submit fires unexpectedly if `submitOnBlur` is true
  and you try to click the cancel button.

**Radio** `v1.2.5`

- 🐛 Fix issue where controlled radio group can't be cleared.
- 🐛 Fix `onChange` type for use-radio-group props.

**Tag** `v1.1.3`

- 🐛 Add `aria-label` to tag close button.

**Gatsby Plugin** `v1.0.2`

- 🐛 Update peer-dependency range for gatsby to support the latest.

**Popover** `v1.3.0`

- 🐛 Fix issue (for Safari and Firefox) where popover doesn't close when you
  click the trigger and popover is open.

## 05-03-2021

`@chakra-ui/react@1.3.4`

**System** `v1.4.0`

- 🚀 Add support for CSS Variables to the core of Chakra.
- 🚀 Improve style computation performance by 2.5x.
- 🚀 Adds support for main in chakra factory

**Styled System** `v1.8.0`

- 🚀 Add support for CSS Variables to the core of Chakra.
- 🚀 Improve style computation performance by 2.5x.

**Theme** `v1.7.0`

- 🚀 Add new config property cssVarPrefix to add a custom prefix for CSS
  variables. It defaults to `chakra`.
- 🚀 TabPanels component can now be styled from Tabs component theme, specifying
  the tabpanels part.
- 🐛 Fix full size modal with y-overflowing content behaviour
- 🐛 Fix border styles for alert and number input
- 🐛 Provide proper typings for `ThemeOverride.components`.
- 🐛 Resolved an issue where optgroup in dark mode was unreadable on browsers
  that allow select contents styling.

**Theme Tools** `v1.1.0`

- 🚀 Update implementation of create-breakpoints to reduce code logic. Add
  deprecation message

**Hooks** `v1.1.5`

- 🐛 Add support to format - Optional string. Set the MIME type of what you want
  to copy as. Use text/html to copy as HTML, text/plain to avoid inherited
  styles showing when pasted into rich text editor.

**Layout** `v1.3.2`

- 🐛 SimpleGrid: Avoid grid blow by adding `minmax(0, 1fr)`.
- 🐛 Simplify wrap style management to use CSS custom properties.

**Popper** `v1.1.5`

- 🐛 Make the react-popper state in sync with the internal popper instance state

**React** `v1.3.4`

- 🐛 Fixed an issue where extending the theme with custom breakpoints with
  `strictNullChecks: false` in tsconfig.json lead to an error.

**Select** `v1.1.2`

- 🐛 Resolved an issue where optgroup in dark mode was unreadable on browsers
  that allow select contents styling.

**Slider** `v1.1.2`

- 🐛 onChangeEnd won't be called if value doesn't change.

## 13-02-2021

`@chakra-ui/react@1.3.3`

**Color Mode** `v1.1.0`

- 🚀 You can now customize the `nonce` of the `<script>` that `ColorModeScript`
  creates by passing `nonce` prop.

**Focus Lock** `v1.1.0`

- 🚀 Upgrade to react-remove-scroll@2.4.1 and react-focus-lock@2.5.0 to fix
  React 17 peer dependencies compatibility.

**Checkbox** `v1.2.3` & **Radio** `v1.2.3`

- 🐛 Improve the semantic HTML structure of checkbox.

**Popper** `v1.1.4`

- 🐛 The popper.js instance is now created only once it is actually needed for
  positioning.

**React** `v1.3.3`

- 🐛 The extendTheme function uses the type Theme again.

**Theme** `v1.6.2`

- 🐛 Export Recursive\* types from theme, styled-system.
- 🐛 Bring back the TS type Theme export and deprecated DefaultChakraTheme.
- 🐛 Allow halved values in design token in spacing as mentioned in the
  documents.

**CLI** `v1.2.1`

- 🐛 CLI tokens command now ignores TS errors in your theme file.

## 06-02-2021

`@chakra-ui/react@1.3.2`

**Pin Input** `v1.4.0`

- 🚀 Resolved an issue where completing character entry in PinInput failed to
  call `onComplete`.

**React** `v1.3.0`

- 🚀 Introducing a generic TypeScript type `ChakraTheme` to improve the
  `extendTheme` function even further.

```jsx live=false
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

```jsx live=false
 import { useTheme } from "@chakra-ui/react"
  import { MyCustomTheme } from "./my-custom-theme"

  const MyComponent = () => {
    const customTheme = useTheme<MyCustomTheme>()
    //...
  }
```

- 🐛 Fixed issue in `extendTheme` where overrides defined as function replaced
  all base styles defined as a plain object.
- 🐛 Fixed an issue where the TypeScript types were too narrow for component
  defaultProps and ComponentMultiStyleConfig.

**Styled System** `v1.7.0`

- 🚀 Theme Typings: Add autocomplete for negative space values.
- 🚀 Add support for `textStyle` and `layerStyle` in styled-system package. This
  makes it possible to use them in the component theme, `css` function and `sx`
  prop as well.

```jsx live=false
const theme = {
  textStyles: {
    caps: {
      fontWeight: "bold",
      fontSize: "24px",
    },
  },
}

const styles = css({ textStyle: "caps" })(theme)
```

This also works for the component theme as well.

`layerStyle`, `textStyle` and `apply` can now take responsive values as well.

- 🚀 Refactored `apply` prop handling to use the style config pattern instead of
  add it imperatively.
- 🐛 Allow numbers for `borderTop` and provide autocomplete for `fontWeight`
  prop.
- 🐛 Support negative scale values for css variables.

**System** `v1.3.0`

- 🚀 Add support for responsive values when using `apply`, `textStyle` and
  `layerStyle`.

**Theme** `v1.6.0`

- 🐛 Fixed an issue where a `Tooltip` with negative `gutter` causes flickering
  on hover.
- 🐛 Fixed an issue in Firefox where `Input` overflows it's flex container.

**CLI** `v1.2.0`

- 🚀 Theme Typings: Add autocomplete for negative space values

**Accordion** `v1.1.2` & **Avatar** `v1.1.2` & **Button** `v1.1.2` &
**Checkbox** `v1.2.2` & **Radio** `v1.2.2`

- 🐛 Provide better typings for `size` and `variant` for `AvatarGroup`,
  `CheckboxGroup`, `ButtonGroup`, and `RadioGroup`

**Color Mode** `v1.0.7`

- 🐛 Fix issue where reading from localStorage maybe fail due to several reasons
  (SecurityError, Uncaught DOMException, TypeError, etc.)

**Input** `v1.1.1`

- 🐛 Fixed the typo in `InputProps` interface due to which theming types were
  not correct.

**Tool tip** `v1.1.1`

- 🐛 Fixed an issue where a `Tooltip` with negative `gutter` causes flickering
  on hover.

## 31-01-2021

`@chakra-ui/react@1.2.1`

**System** `v1.2.1`

- 🐛 Allow string values for ThemingProps['colorScheme']

**CLI** `v1.1.0`

- 🚀 Add minor bump for adding subcommand tokens to generate Theme Typings &
  Republished with version 1.1.0.

## 31-01-2021

`@chakra-ui/react@1.2.0`

**Color Mode** `v1.0.6`

- 🐛 `useColorModeValue` defaults to light mode on first render if system color
  mode is used.

**Hooks** `v1.1.3`

- 🐛 Update reference to document.addEventListener to detect owner document
  based on ref passed. This would help detect outside click currently from
  within an iframe.

**Layout** `v1.3.0`

- 🚀 Update transform style for AbsoluteCenter when axis is both
- 🚀 Add `shouldWrapChildren` to Wrap component to make it possible use Wrap
  directly without thinking about WrapItem.
- 🚀 Update `LinkBox` and `LinkOverlay` components and make them public in docs.

**Menu** `v1.1.0`

- 🚀 The `MenuItem` now accepts a `commandSpacing` prop that can be used to
  adjust the space between the command and label.
- 🚀 Add support `rootProps` to `MenuList` so it's possible override the styles
  for root container for menu list. Common use case is to change the applied
  zIndex of the menulist.
- 🚀 Make it possible to override `zIndex` by passing props to `MenuList`.

**Modal** `v1.5.0` & **Tool tip** `v1.1.0`

- 🚀 Add support for forwarding props to the underlying Portal component. Pass
  the portalProps prop to achieve this.
- 🚀 `containerRef`: ref for the element where to mount the portal.
- 🚀 `appendToParentPortal`: If false, it'll opt out of portal nesting.

**Portal** `v1.1.0`

- 🚀 Add support for `appendToParentPortal={false}` to opt out of nested
  portals.
- 🐛 Fix issue with portal zIndex container where it renders elements outside of
  view.
- 🚀 Renamed `getContainer `prop to `containerRef` to make it possible to pass
  the ref directly. This affects the `Modal` component primarily.

**Styled System** `v1.6.0`

- 🐛 Fix issue where CSS color names are not passed correctly.
- 🚀 Improved theme typing in order to provide a better autocomplete experience.

**Tabs** `v1.1.0`

- 🚀 The `useTabsContext` hook is now exported and can be used in user land.

**Theme** `v1.5.0`

- 🚀 Add `8xl` to size tokens.

## 24-01-2021

`@chakra-ui/react@1.1.6`

**Layout** `v1.2.0`

- 🚀 Add AbsoluteCenter component to help manage centering of an element
  relative to its parent dimensions

**Pin Input** `v1.2.0`

- 🚀 Added an `otp` flag to `PinInput` that sets the autoComplete value of
  PinInputField to "one-time-code"

**Hooks** `v1.1.2`

- 🐛 Fixed issue where using an uncontrolled RadioGroup without a defaultValue
  causes multiple radio options can be selected

**Portal** `v1.0.6`

- 🐛 Fixed portal z-index wrapper squashing portaled elements

**Popover** `v1.1.0`

- 🚀 Add `flip` prop to Popover to change the placement when it is scheduled to
  overflow a given boundary

## 17-01-2021

`@chakra-ui/react@1.1.5`

**Popper** `v1.1.0`

- 🚀 Added enabled property to `usePopper`. Popper won't be updated while it is
  set to false. Menu now uses this option to not update its position while it's
  closed.

**Stlyed System** `v1.5.0`

- 🚀 Move `srOnly` prop to styled system props. This will deprecate the need for
  the visually hidden package. Less is more!

```jsx live=false
  // If `true`, hide an element visually without hiding it from screen readers.
  <Box srOnly>Visually hidden</Box>

  // If `focusable`, the sr-only styles will be undone, making the element visible to sighted users as well as screen readers.
  <Box srOnly _active={{ srOnly: "focusable" }}>Visually hidden but shown on focus
  </Box>
```

- 🚀 Add `polyfill` for inset style prop as the CSS inset doesn't work in Safari
  Add missing style props for grid and flex layouts: gridTemplate, gridRowStart,
  gridRowEnd, flexFlow, clipPath

**Checkbox** `v1.1.2`

- 🐛 Update styles to use css logical style props

**Hooks** `v1.1.1`

- 🐛 Resolved an issue where event handlers for certain components were removed
  after the first event occurred.
- 🐛 Fixed SSR issue with useId hook.

**Menu** `v1.0.5`

- 🐛 Update styles to use css logical style props
- 🚀 Added enabled property to usePopper. Popper won't be updated while it is
  set to false. Menu now uses this option to not update its position while it's
  closed.

**Popover** `v1.0.7`

- 🐛 Popover now won't update its popper position while it's closed.

**Portal** `v1.0.5`

- 🐛 Fixed issue where adding `portalZIndex` to `ChakraProvider` makes app
  unusable

**Progress** `v1.0.5`

- 🐛 You can now override linear progress component's border radius in the
  theme.

**Radio** `v1.1.2`

- 🐛 Update styles to use css logical style props.

## 11-01-2021

`@chakra-ui/react@1.1.4`

**Hooks** `v1.1.0`

- 🚀 Added `useCallbackRef` hook for persisting a value between renders and
  updating it if it changes.
- 🐛 Deprecated `useLatestRef`, `useEventCallback`, and `useMouseDownRef`. These
  functions will be removed in a future major version.

## 10-01-2021

`@chakra-ui/react@1.1.3`

**Styled System** `v1.4.0`

- 🐛 Fixed a bug where `rgb` values in `bgGradient` did not work correctly
- 🐛 Due to Safari not support css logical properties for `right`, and `left`,
  we added polyfill for these css logical properties.
- 🚀 Add support for css media query and dark class selectors.

**Theme** `v1.4.0`

- 🚀 Add the `2xl` breakpoint to the theme which maps to `96em` or `1536px`.

**Media Query** `v1.0.3`

- 🐛 Fixed `useBreakpoinValue` infinite loop due to bug in `createMediaQueries`.

**Portal** `v1.0.3`

- 🐛 Fixed issue where elements within portal used in an iframe got rendered
  outside of the iframe. Portal now smartly detects its document owner and
  attaches its node to the correct document.body
- 🐛 Removed extra DOM node `PortalManager` creates. Less is more!

**Skeleton** `v1.0.7`

- 🐛 Fixed a bug where SkeletonText kept its fixed dimensions when isLoaded is
  true.

**Tabs** `v1.0.4`

- 🐛 Fixed issue where Tab button no longer has `aria-selected="false"` when it
  is inactive.

## 03-01-2021

`@chakra-ui/react@1.1.1`

**Button** `v1.0.3`

- 🐛 Update the style props applied for `leftIcon` and `rightIcon` to support
  RTL. Changed `ml` and `mr` to marginStart and marginEnd respectively.
- 🐛 Update the style props applied when isLoading is `true`. Changed
  `marginRight` to `marginEnd`.

**Stack**

- 🐛 Update `directionStyles` to use logical CSS properties for RTL support.
- 🐛 Changed `marginLeft` and `marginRight` to `marginStart` and `marginEnd`
  respectively.

**Styled System** `v1.3.1`

- 🐛 Add missing `borderStart`, and `borderEnd` types for for style and color.
- 🐛 Sort `Object.assign` keys in `configs/border.ts` for better readability.

Other RTL fixes:

- 🐛 Alignment for the close icon for `Tag`, `Modal`, and `Drawer` components to
  support RTL.
- 🐛 Add RTL storybook toolbar to make it easy to test RTL layouts.

## 28-12-2020

`@chakra-ui/react@1.1.0`

**React** `v1.1.0`

- 🚀 Add gradient support to chakra style props :sparkles: see
  https://chakra-ui.com/docs/features/gradient for more information
- 🚀 Add rtl support :sparkles: see
  https://chakra-ui.com/docs/features/rtl-support for more information
- 🚀 Improve `extendTheme` typings & accept optional second argument
  `baseTheme`.

**Checkbox** `v1.1.0`

- 🚀 Deprecated the `defaultIsChecked` prop in favor of `defaultChecked`.

**Radio** `v1.1.0`

- 🚀 Deprecated the `defaultIsChecked` prop in favor of `defaultChecked`.
- 🚀 Resolved an issue where uncontrolled Radio components used outside of
  RadioGroup were not working.

**Styled System** `v1.3.0`

- 🚀 Improved performance

**Pin Input** `v1.1.2`

- 🐛 Resolved an issue where PinInputField rendered an input with
  `autocomplete="not-allowed"` instead of `autocomplete="off"`.

**Skeleton** `v1.0.4`

- 🐛 `SkeletonText` now accepts the props `fadeDuration` and `speed` and
  animates its children, like the `Skeleton` component.

## 18-12-2020

`@chakra-ui/react@1.0.4`

⚠️ Peer dep version bump! framer-motion is now at 3.0.0

**Form Control** `v1.1.0`

- 🚀 Add support for controlling focus lock across frames.
- 🐛 Removed isLoading prop from FormControl out of a lack of need.
- 🐛 Fixed an issue where FormHelperText was not rendering when parent
  FormControl.isInvalid was set.

**Modal** `v1.3.0`

- 🚀 Add support for controlling focus lock across frames.

**Styled System** `v1.2.0`

- 🚀 Add suppotr for css logical properties and direction in the theme for
  future RTL optimizations.

**Pin Input** `v1.1.1`

- 🐛 Fixed an issue where copy pasting didnt work.

**Number Input** `v1.0.3`

- 🐛 Fixed an issue where input didnt work with form libraries that rely on ref
  (e.g. react-hook-form).
- 🚀 Added support to override `type` and `pattern` props.

**Input** `v1.0.3`

- 🐛 Fixed an issue where removing an element didnt reset the padding.

**Skeleton** `v1.0.3`

- 🐛 Fixed an issue where Skeleton.isLoading would fade the skeleton even if
  isLoading is true.

**Theme** `v1.2.2`

- 🐛 Focus outline > isInvalid outline (affects all components extending from
  Input, e.g. Select, PinInput, ...)

**Utils** `v1.0.2`

- 🐛 Custom breakpoints beginning with a number are now working

## 08-12-2020

`@chakra-ui/react@1.0.3`

**Pin Input** `v1.1.0`

- 🚀 Internals reworked.
- 🚀 Added support for type prop (`alphanumeric` | `number`).
- 🚀 Added `mask` prop to provide similar utility like input type password.

**Alert** `v1.0.2`

- 🐛 `Alert` now colorScheme aware (overrideable via status).

**Close Button** `v1.0.2`

- 🐛 Resolved an issue where `DrawerCloseButton` was not receiving its base
  styles when it was passed other styles through the `__css` property, breaking
  the button's positioning.

**React** `v1.0.3`

- 🐛 Fix too narrow TypeScript type for theme override.

## 03-12-2020

`@chakra-ui/react@1.0.2`

**Docs**

- 🚀 The search functionality has returned! https://chakra-ui.com/

**Layout** `v1.1.0`

- 🚀 `Divider`, `Container`, `List`, `ListItem` and `ListIcon` are now themable.

**Modal** `v1.2.0`

- 🚀 `ModalCloseButton` is now themable.

**Theme** `v1.2.0`

- 🚀 `AlertIcon` no longer shrinks if alert contains long text.
- 🚀 Added theme support for above mentioned layout components.

**Toast** `v1.1.0`

- 🚀 Allow React.ReactNode as type for title.

**Form Control** `v1.0.2`

- 🐛 Remove dead props on type.

**Number Input** `v1.0.2`

- 🐛 `NumberInput` is now form-control props agnostic, like Input and Select do.

**Radio** `v1.0.2`

- 🐛 `Radio`is now form-control props agnostic, like Input and Select do.

**React** `v1.0.2`

- 🐛 Improved types for extendTheme.

**Transition** `v1.0.2`

- 🐛 Children now consistently render if "in" was true on initial render.
