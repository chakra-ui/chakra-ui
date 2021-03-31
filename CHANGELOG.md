# Change Log

## @chakra-ui/react@1.4.2 (2021-03-30)

### @chakra-ui/accordion@1.2.0

- **Feature🚀**: Extract all react based utilities and types to
  `@chakra-ui/react-utils`.

### @chakra-ui/avatar@1.2.0

- **Bug-fix🐛**: Fix RTL styles.

### @chakra-ui/checkbox@1.4.0

- **Feature🚀**: Add `getRootProps` to `useCheckbox` hook to manage props passed
  to checkbox container.

- **Feature🚀**: Forward `onFocus`, `onBlur` and `aria-\*` props to the input
  element for better integration with form libraries.

- **Feature🚀**: Ensure the checkbox works when the root element is not label.
  This helps to fix the current accessibility issues with the Switch component
  when wrapped within `FormControl`.

### @chakra-ui/counter@1.1.0

- **Feature🚀**: Expose `setValue` function to allow update state without
  calling `onChange`.
- **Bug-fix🐛**: Fix issue where `onChange` is called when value did not change.

### @chakra-ui/form-control@1.3.0

- **Feature🚀**: Refactor `useFormControlProvider` to return prop getters
  `getHelpTextProps`, `getErrorMessageProps`, and `getRootProps`.

- **Feature🚀**: Detect helper text and error message using ref callback instead
  of `useLayoutEffect`.

- **Feature🚀**: Update `aria-describedby` id to include feedbackId only when
  `isInvalid` is true.

- **Feature🚀**: Create `useFormControlProps` to provide a way to get the
  resolved form control props `isInvalid`, `isDisabled`, instead of HTML
  attributes. This will make it easier to integrate with number-input, checkbox,
  and switch.
- **Bug-fix🐛**: Fix concurrent mode issue with setting state in focus event
  handler. We use withFlushSync helper to achieve this.

### @chakra-ui/hooks@1.3.0

- **Bug-fix🐛**: useControllableState: The onChange callback will be called only
  if the new value isn't equal to the current one.

### @chakra-ui/layout@1.4.0

- **Bug-fix🐛**: Remove redundant role attribute from divider.
- **Bug-fix🐛**: Fixed the bug where a margin- bottom would get applied to
  `direction=row `of stack when using responsive props.

- **Bug-fix🐛**: Fix issue where AbsoluteCenter doesn't have
  `position: absolute`.

### @chakra-ui/number-input@1.2.0

- **Bug-fix🐛**: Forward `aria-\*` props to the input element.

- **Bug-fix🐛**: Fix issue where `onChange` was called on mount.
- **Bug-fix🐛**: Fix issue where `onBlur` was called twice.
- **Bug-fix🐛**: Memoize all callback props `onFocus`, `onBlur`,
  `getAriaValueText`.
- **Bug-fix🐛**: Refactor implicit `useFormControl` logic to be called from
  NumberInput instead.

- **Bug-fix🐛**: Call `setFocused.on` with `ReactDOM.flushSync` to prevent
  concurrent mode issue where setting state in onFocus affects onChange event
  handler.

### @chakra-ui/styled-system@1.10.0

- **Feature🚀**: Add support for css variable tokens. This means you can create
  a css variable and reference value in the tokens.

```jsx
<Box
  sx={{
    "--banner-color": "colors.red.200",
    "& .banner": {
      bg: "var(--banner-color)",
    },
  }}
/>
```

### @chakra-ui/system@1.6.0

- **Bug-fix🐛**: Fixed an issue where the `StylesProvider` export was not
  working in every environment.

- **Feature🚀**: Add style config for upcoming `rotateX`, `rotateY`, `scaleX`,
  `scaleY` style props.

### @chakra-ui/theme@1.8.0

- **Feature🚀**: Remove 0 token value from spacing tokens. 0 maps to 0 and
  there's no need to create a css custom property for that.

#### Switch

- Add container part
- Use css vars to handle styles
- Fix RTL styles

#### Stat, Table

- Fix RTL styles

### @chakra-ui/utils@1.5.0

- **Feature🚀**: Add `withFlushSync` function wrapper to help resolve concurrent
  mode and onFocus state issues.

### @chakra-ui/toast@1.2.1

- **Bug-fix🐛**: Bump `@reach/alert` to fix yarn pnp issue.

## @chakra-ui/react@1.4.1 (2021-03-21)

### @chakra-ui/styled-system@1.9.1

- **Bug-fix🐛**: Fix issue where `textStyle` doesn't get applied.

## @chakra-ui/react@1.4.0 (2021-03-20)

### @chakra-ui/react@1.4.0

- **Feature🚀**: Added support for `framer-motion` v4.

### @chakra-ui/popper@2.0.0

- **Feature🚀**: Refactor the positioning logic to improve stability and
  leverage CSS custom properties.

### @chakra-ui/styled-system@1.9.0

- **Bug-fix🐛**: Fix issue where responsive styles defined in text styles not
  overridden by style props.
- **Bug-fix🐛**: Fix issue where `toCSSVars` omitted the transition tokens.
- **Bug Fix🐛**: Fix issue where RTL property keys are incorrect due to
  `config.property` mutation.
- **Bug-fix🐛**: Added typings for the theme prop in `ThemingPropsThunk` and
  export a standalone type ThemeComponentProps. ThemingPropsThunk
- **Bug-fix🐛**: Update `mx` and `px` to use logical properties. Instead of
  mapping to `marginLeft` and `marginRight`, it maps to `marginInlineStart` and
  `marginInlineEnd`. Same for `px`.

### @chakra-ui/cli@1.3.0

- **Feature🚀**: Add support for text style and layer style theme type
  generation to `@chakra-ui/cli`.

### @chakra-ui/color-mode@1.1.2

- **Bug-fix🐛**: Memoize the context value for `ColorModeProvider`.

### @chakra-ui/editable@1.1.3

- **Bug-fix🐛**: Fix issue where blur/submit fires unexpectedly if
  `submitOnBlur` is true and you try to click the cancel button.

### @chakra-ui/radio@1.2.5

- **Bug-fix🐛**: Fix issue where controlled radio group can't be cleared.
- **Bug-fix🐛**: Fix `onChange` type for use-radio-group props.

### @chakra-ui/tag@1.1.3

- **Bug-fix🐛**: Add `aria-label` to tag close button.

### @chakra-ui/gatsby-plugin@1.0.2

- **Bug-fix🐛**: Update peer-dependency range for gatsby to support the latest.

### @chakra-ui/popover@1.3.0

- **Bug-fix🐛**: Fix issue (for Safari and Firefox) where popover doesn't close
  when you click the trigger and popover is open.

## @chakra-ui/react@1.3.4 (2021-03-05)

### @chakra-ui/system@1.4.0

- **Feature🚀**: Add support for CSS Variables to the core of Chakra.
- **Feature🚀**: Improve style computation performance by 2.5x.
- **Feature🚀**: Adds support for main in chakra factory

### @chakra-ui/styled-system@1.8.0

- **Feature🚀**: Add support for CSS Variables to the core of Chakra.
- **Feature🚀**: Improve style computation performance by 2.5x.

### @chakra-ui/theme@1.7.0

- **Feature🚀**: Add new config property cssVarPrefix to add a custom prefix for
  CSS variables. It defaults to `chakra`.
- **Feature🚀**: TabPanels component can now be styled from Tabs component
  theme, specifying the tabpanels part.
- **Bug-fix🐛**: Fix full size modal with y-overflowing content behaviour
- **Bug-fix🐛**: Fix border styles for alert and number input
- **Bug-fix🐛**: Provide proper typings for `ThemeOverride.components`.
- **Bug-fix🐛**: Resolved an issue where optgroup in dark mode was unreadable on
  browsers that allow select contents styling.

### @chakra-ui/theme-tools@1.1.0

- **Feature🚀**: Update implementation of create-breakpoints to reduce code
  logic. Add deprecation message

### @chakra-ui/hooks@1.1.5

- **Bug-fix🐛**: Add support to format - Optional string. Set the MIME type of
  what you want to copy as. Use text/html to copy as HTML, text/plain to avoid
  inherited styles showing when pasted into rich text editor.

### @chakra-ui/layout@1.3.2

- **Bug-fix🐛**: SimpleGrid: Avoid grid blow by adding `minmax(0, 1fr)`.
- **Bug-fix🐛**: Simplify wrap style management to use CSS custom properties.

### @chakra-ui/popper@1.1.5

- **Bug-fix🐛**: Make the react-popper state in sync with the internal popper
  instance state

### @chakra-ui/react@1.3.4

- **Bug-fix🐛**: Fixed an issue where extending the theme with custom
  breakpoints with `strictNullChecks: false` in tsconfig.json lead to an error.

### @chakra-ui/select@1.1.2

- **Bug-fix🐛**: Resolved an issue where optgroup in dark mode was unreadable on
  browsers that allow select contents styling.

### @chakra-ui/slider@1.1.2

- **Bug-fix🐛**: onChangeEnd won't be called if value doesn't change.

## @chakra-ui/react@1.3.3 (2021-02-13)

### @chakra-ui/color-mode@1.1.0

- **Feature🚀**: You can now customize the `nonce` of the `<script>` that
  `ColorModeScript` creates by passing `nonce` prop.

### @chakra-ui/focus-lock@1.1.0

- **Feature🚀**: Upgrade to react-remove-scroll@2.4.1 and react-focus-lock@2.5.0
  to fix React 17 peer dependencies compatibility.

### @chakra-ui/checkbox@1.2.3 & @chakra-ui/radio@1.2.3

- **Bug-fix🐛**: Improve the semantic HTML structure of checkbox.

### @chakra-ui/popper@1.1.4

- **Bug-fix🐛**: The popper.js instance is now created only once it is actually
  needed for positioning.

### @chakra-ui/react@1.3.3

- **Bug-fix🐛**: The extendTheme function uses the type Theme again.

### @chakra-ui/theme@1.6.2

- **Bug-fix🐛**: Export Recursive\* types from theme, styled-system.
- **Bug-fix🐛**: Bring back the TS type Theme export and deprecated
  DefaultChakraTheme.
- **Bug-fix🐛**: Allow halved values in design token in spacing as mentioned in
  the documents.

### @chakra-ui/cli@1.2.1

- **Bug-fix🐛**: CLI tokens command now ignores TS errors in your theme file.

## @chakra-ui/react@1.3.2 (2021-02-06)

### @chakra-ui/pin-input@1.4.0

- **Feature🚀**: Resolved an issue where completing character entry in PinInput
  failed to call `onComplete`.

### @chakra-ui/react@1.3.0

- **Feature🚀**: Introducing a generic TypeScript type `ChakraTheme` to improve
  the `extendTheme` function even further.

```jsx
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

```jsx
 import { useTheme } from "@chakra-ui/react"
  import { MyCustomTheme } from "./my-custom-theme"

  const MyComponent = () => {
    const customTheme = useTheme<MyCustomTheme>()
    //...
  }
```

- **Bug-fix🐛**: Fixed issue in `extendTheme` where overrides defined as
  function replaced all base styles defined as a plain object.
- **Bug-fix🐛**: Fixed an issue where the TypeScript types were too narrow for
  component defaultProps and ComponentMultiStyleConfig.

### @chakra-ui/styled-system@1.7.0

- **Feature🚀**: Theme Typings: Add autocomplete for negative space values.
- **Feature🚀**: Add support for `textStyle` and `layerStyle` in styled-system
  package. This makes it possible to use them in the component theme, `css`
  function and `sx` prop as well.

```jsx
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

- **Feature🚀**: Refactored `apply` prop handling to use the style config
  pattern instead of add it imperatively.
- **Bug-fix🐛**: Allow numbers for `borderTop` and provide autocomplete for
  `fontWeight` prop.
- **Bug-fix🐛**: Support negative scale values for css variables.

### @chakra-ui/system@1.3.0

- **Feature🚀**: Add support for responsive values when using `apply`,
  `textStyle` and `layerStyle`.

### @chakra-ui/theme@1.6.0

- **Bug-fix🐛**: Fixed an issue where a `Tooltip` with negative `gutter` causes
  flickering on hover.
- **Bug-fix🐛**: Fixed an issue in Firefox where `Input` overflows it's flex
  container.

### @chakra-ui/cli@1.2.0

- **Feature🚀**: Theme Typings: Add autocomplete for negative space values

### @chakra-ui/accordion@1.1.2 & @chakra-ui/avatar@1.1.2 & @chakra-ui/button@1.1.2 & @chakra-ui/checkbox@1.2.2 & @chakra-ui/radio@1.2.2

- **Bug-fix🐛**: Provide better typings for `size` and `variant` for
  `AvatarGroup`, `CheckboxGroup`, `ButtonGroup`, and `RadioGroup`

### @chakra-ui/color-mode@1.0.7

- **Bug-fix🐛**: Fix issue where reading from localStorage maybe fail due to
  several reasons (SecurityError, Uncaught DOMException, TypeError, etc.)

### @chakra-ui/input@1.1.1

- **Bug-fix🐛**: Fixed the typo in `InputProps` interface due to which theming
  types were not correct.

### @chakra-ui/tooltip@1.1.1

- **Bug-fix🐛**: Fixed an issue where a `Tooltip` with negative `gutter` causes
  flickering on hover.

## @chakra-ui/react@1.2.1 (2021-01-31)

### @chakra-ui/system@1.2.1

- **Bug-fix🐛**: Allow string values for ThemingProps['colorScheme']

### @chakra-ui/cli@1.1.0

- **Feature🚀**: Add minor bump for adding subcommand tokens to generate Theme
  Typings & Republished with version 1.1.0.

## @chakra-ui/react@1.2.0 (2021-01-31)

### @chakra-ui/color-mode@1.0.6

- **Bug-fix🐛**: `useColorModeValue` defaults to light mode on first render if
  system color mode is used.

### @chakra-ui/hooks@1.1.3

- **Bug-fix🐛**: Update reference to document.addEventListener to detect owner
  document based on ref passed. This would help detect outside click currently
  from within an iframe.

### @chakra-ui/layout@1.3.0

- **Feature🚀**: Update transform style for AbsoluteCenter when axis is both
- **Feature🚀**: Add `shouldWrapChildren` to Wrap component to make it possible
  use Wrap directly without thinking about WrapItem.
- **Feature🚀**: Update `LinkBox` and `LinkOverlay` components and make them
  public in docs.

### @chakra-ui/menu@1.1.0

- **Feature🚀**: The `MenuItem` now accepts a `commandSpacing` prop that can be
  used to adjust the space between the command and label.
- **Feature🚀**: Add support `rootProps` to `MenuList` so it's possible override
  the styles for root container for menu list. Common use case is to change the
  applied zIndex of the menulist.
- **Feature🚀**: Make it possible to override `zIndex` by passing props to
  `MenuList`.

### @chakra-ui/modal@1.5.0 & @chakra-ui/tooltip@1.1.0

- **Feature🚀**: Add support for forwarding props to the underlying Portal
  component. Pass the portalProps prop to achieve this.
- **Feature🚀**: `containerRef`: ref for the element where to mount the portal.
- **Feature🚀**: `appendToParentPortal`: If false, it'll opt out of portal
  nesting.

### @chakra-ui/portal@1.1.0

- **Feature🚀**: Add support for `appendToParentPortal={false}` to opt out of
  nested portals.
- **Bug-fix🐛**: Fix issue with portal zIndex container where it renders
  elements outside of view.
- **Feature🚀**: Renamed `getContainer `prop to `containerRef` to make it
  possible to pass the ref directly. This affects the `Modal` component
  primarily.

### @chakra-ui/styled-system@1.6.0

- **Bug-fix🐛**: Fix issue where CSS color names are not passed correctly.
- **Feature🚀**: Improved theme typing in order to provide a better autocomplete
  experience.

### @chakra-ui/tabs@1.1.0

- **Feature🚀**: The `useTabsContext` hook is now exported and can be used in
  user land.

### @chakra-ui/theme@1.5.0

- **Feature🚀**: Add `8xl` to size tokens.

## @chakra-ui/react@1.1.6 (2021-01-24)

### @chakra-ui/layout@1.2.0

- **Feature🚀**: Add AbsoluteCenter component to help manage centering of an
  element relative to its parent dimensions

### @chakra-ui/pin-input@1.2.0

- **Feature🚀**: Added an `otp` flag to `PinInput` that sets the autoComplete
  value of PinInputField to "one-time-code"

### @chakra-ui/hooks@1.1.2

- **Bug-fix🐛**: Fixed issue where using an uncontrolled RadioGroup without a
  defaultValue causes multiple radio options can be selected

### @chakra-ui/portal@1.0.6

- **Bug-fix🐛**: Fixed portal z-index wrapper squashing portaled elements

### @chakra-ui/popover@1.1.0

- **Feature🚀**: Add `flip` prop to Popover to change the placement when it is
  scheduled to overflow a given boundary

## @chakra-ui/react@1.1.5 (2021-01-17)

### @chakra-ui/popper@1.1.0

- **Feature🚀**: Added enabled property to `usePopper`. Popper won't be updated
  while it is set to false. Menu now uses this option to not update its position
  while it's closed.

### @chakra-ui/styled-system@1.5.0

- **Feature🚀**: Move `srOnly` prop to styled system props. This will deprecate
  the need for the visually hidden package. Less is more!

```jsx
  // If `true`, hide an element visually without hiding it from screen readers.
  <Box srOnly>Visually hidden</Box>

  // If `focusable`, the sr-only styles will be undone, making the element visible to sighted users as well as screen readers.
  <Box srOnly _active={{ srOnly: "focusable" }}>Visually hidden but shown on focus
  </Box>
```

- **Feature🚀**: Add `polyfill` for inset style prop as the CSS inset doesn't
  work in Safari Add missing style props for grid and flex layouts:
  gridTemplate, gridRowStart, gridRowEnd, flexFlow, clipPath

### @chakra-ui/checkbox@1.1.2

- **Bug-fix🐛**: Update styles to use css logical style props

### @chakra-ui/hooks@1.1.1

- **Bug-fix🐛**: Resolved an issue where event handlers for certain components
  were removed after the first event occurred.
- **Bug-fix🐛**: Fixed SSR issue with useId hook.

### @chakra-ui/menu@1.0.5

- **Bug-fix🐛**: Update styles to use css logical style props
- **Feature🚀**: Added enabled property to usePopper. Popper won't be updated
  while it is set to false. Menu now uses this option to not update its position
  while it's closed.

### @chakra-ui/popover@1.0.7

- **Bug-fix🐛**: Popover now won't update its popper position while it's closed.

### @chakra-ui/portal@1.0.5

- **Bug-fix🐛**: Fixed issue where adding `portalZIndex` to `ChakraProvider`
  makes app unusable

### @chakra-ui/progress@1.0.5

- **Bug-fix🐛**: You can now override linear progress component's border radius
  in the theme.

### @chakra-ui/radio@1.1.2

- **Bug-fix🐛**: Update styles to use css logical style props.

## @chakra-ui/react@1.1.4 (2021-01-11)

### @chakra-ui/hooks@1.1.0

- **Feature🚀**: Added `useCallbackRef` hook for persisting a value between
  renders and updating it if it changes.
- **Bug-fix🐛**: Deprecated `useLatestRef`, `useEventCallback`, and
  `useMouseDownRef`. These functions will be removed in a future major version.

## @chakra-ui/react@1.1.3 (2021-01-10)

### @chakra-ui/styled-system@1.4.0

- **Bug-fix🐛**: Fixed a bug where `rgb` values in `bgGradient` did not work
  correctly
- **Bug-fix🐛**: Due to Safari not support css logical properties for `right`,
  and `left`, we added polyfill for these css logical properties.
- **Feature🚀**: Add support for css media query and dark class selectors.

### @chakra-ui/theme@1.4.0

- **Feature🚀**: Add the `2xl` breakpoint to the theme which maps to `96em` or
  `1536px`.

### @chakra-ui/media-query@1.0.3

- **Bug-fix🐛**: Fixed `useBreakpoinValue` infinite loop due to bug in
  `createMediaQueries`.

### @chakra-ui/portal@1.0.3

- **Bug-fix🐛**: Fixed issue where elements within portal used in an iframe got
  rendered outside of the iframe. Portal now smartly detects its document owner
  and attaches its node to the correct document.body
- **Bug-fix🐛**: Removed extra DOM node `PortalManager` creates. Less is more!

### @chakra-ui/skeleton@1.0.7

- **Bug-fix🐛**: Fixed a bug where SkeletonText kept its fixed dimensions when
  isLoaded is true.

### @chakra-ui/tabs@1.0.4

- **Bug-fix🐛**: Fixed issue where Tab button no longer has
  `aria-selected="false"` when it is inactive.

## @chakra-ui/react@1.1.1 (2021-01-03)

### @chakra-ui/button@1.0.3

- **Bug-fix🐛**: Update the style props applied for `leftIcon` and `rightIcon`
  to support RTL. Changed `ml` and `mr` to marginStart and marginEnd
  respectively.
- **Bug-fix🐛**: Update the style props applied when isLoading is `true`.
  Changed `marginRight` to `marginEnd`.

### @chakra-ui/stack

- **Bug-fix🐛**: Update `directionStyles` to use logical CSS properties for RTL
  support.
- **Bug-fix🐛**: Changed `marginLeft` and `marginRight` to `marginStart` and
  `marginEnd` respectively.

### @chakra-ui/styled-system@1.3.1

- **Bug-fix🐛**: Add missing `borderStart`, and `borderEnd` types for for style
  and color.
- **Bug-fix🐛**: Sort `Object.assign` keys in `configs/border.ts` for better
  readability.

Other RTL fixes:

- **Bug-fix🐛**: Alignment for the close icon for `Tag`, `Modal`, and `Drawer`
  components to support RTL.
- **Bug-fix🐛**: Add RTL storybook toolbar to make it easy to test RTL layouts.

## @chakra-ui/react@1.1.0 (2020-12-28)

### @chakra-ui/react@1.1.0

- **Feature🚀**: Add gradient support to chakra style props :sparkles: see
  https://chakra-ui.com/docs/features/gradient for more information
- **Feature🚀**: Add rtl support :sparkles: see
  https://chakra-ui.com/docs/features/rtl-support for more information
- **Feature🚀**: Improve `extendTheme` typings & accept optional second argument
  `baseTheme`.

### @chakra-ui/checkbox@1.1.0

- **Feature🚀**: Deprecated the `defaultIsChecked` prop in favor of
  `defaultChecked`.

### @chakra-ui/radio@1.1.0

- **Feature🚀**: Deprecated the `defaultIsChecked` prop in favor of
  `defaultChecked`.
- **Feature🚀**: Resolved an issue where uncontrolled Radio components used
  outside of RadioGroup were not working.

### @chakra-ui/styled-system@1.3.0

- **Feature🚀**: Improved performance

### @chakra-ui/pin-input@1.1.2

- **Bug-fix🐛**: Resolved an issue where PinInputField rendered an input with
  `autocomplete="not-allowed"` instead of `autocomplete="off"`.

### @chakra-ui/skeleton@1.0.4

- **Bug-fix🐛**: `SkeletonText` now accepts the props `fadeDuration` and `speed`
  and animates its children, like the `Skeleton` component.

## @chakra-ui/react@1.0.4 (2020-12-18)

⚠️ Peer dep version bump! framer-motion is now at 3.0.0

### @chakra-ui/form-control@1.1.0

- **Feature🚀**: Add support for controlling focus lock across frames.
- **Bug-fix🐛**: Removed isLoading prop from FormControl out of a lack of need.
- **Bug-fix🐛**: Fixed an issue where FormHelperText was not rendering when
  parent FormControl.isInvalid was set.

### @chakra-ui/modal@1.3.0

- **Feature🚀**: Add support for controlling focus lock across frames.

### @chakra-ui/styled-system@1.2.0

- **Feature🚀**: Add suppotr for css logical properties and direction in the
  theme for future RTL optimizations.

### @chakra-ui/pin-input@1.1.1

- **Bug-fix🐛**: Fixed an issue where copy pasting didnt work.

### @chakra-ui/number-input@1.0.3

- **Bug-fix🐛**: Fixed an issue where input didnt work with form libraries that
  rely on ref (e.g. react-hook-form).
- **Feature🚀**: Added support to override `type` and `pattern` props.

### @chakra-ui/input@1.0.3

- **Bug-fix🐛**: Fixed an issue where removing an element didnt reset the
  padding.

### @chakra-ui/skeleton@1.0.3

- **Bug-fix🐛**: Fixed an issue where Skeleton.isLoading would fade the skeleton
  even if isLoading is true.

### @chakra-ui/theme@1.2.2

- **Bug-fix🐛**: Focus outline > isInvalid outline (affects all components
  extending from Input, e.g. Select, PinInput, ...)

### @chakra-ui/utils@1.0.2

- **Bug-fix🐛**: Custom breakpoints beginning with a number are now working

## @chakra-ui/react@1.0.3 (2020-12-08)

### @chakra-ui/pin-input@1.1.0

- **Feature🚀**: Internals reworked.
- **Feature🚀**: Added support for type prop (`alphanumeric` | `number`).
- **Feature🚀**: Added `mask` prop to provide similar utility like input type
  password.

### @chakra-ui/alert@1.0.2

- **Bug-fix🐛**: `Alert` now colorScheme aware (overrideable via status).

### @chakra-ui/close-button@1.0.2

- **Bug-fix🐛**: Resolved an issue where `DrawerCloseButton` was not receiving
  its base styles when it was passed other styles through the `__css` property,
  breaking the button's positioning.

### @chakra-ui/react@1.0.3

- **Bug-fix🐛**: Fix too narrow TypeScript type for theme override.

## @chakra-ui/react@1.0.2 (2020-12-03)

Docs:

- **Feature🚀**: The search functionality has returned! https://chakra-ui.com/

### @chakra-ui/layout@1.1.0

- **Feature🚀**: `Divider`, `Container`, `List`, `ListItem` and `ListIcon` are
  now themable.

### @chakra-ui/modal@1.2.0

- **Feature🚀**: `ModalCloseButton` is now themable.

### @chakra-ui/theme@1.2.0

- **Feature🚀**: `AlertIcon` no longer shrinks if alert contains long text.
- **Feature🚀**: Added theme support for above mentioned layout components.

### @chakra-ui/toast@1.1.0

- **Feature🚀**: Allow React.ReactNode as type for title.

### @chakra-ui/form-control@1.0.2

- **Bug-fix🐛**: Remove dead props on type.

### @chakra-ui/number-input@1.0.2

- **Bug-fix🐛**: `NumberInput` is now form-control props agnostic, like Input
  and Select do.

### @chakra-ui/radio@1.0.2

- **Bug-fix🐛**: `Radio`is now form-control props agnostic, like Input and
  Select do.

### @chakra-ui/react@1.0.2

- **Bug-fix🐛**: Improved types for extendTheme.

### @chakra-ui/transition@1.0.2

- **Bug-fix🐛**: Children now consistently render if "in" was true on initial
  render.
