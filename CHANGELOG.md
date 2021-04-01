# Changelog

Legend:

- 🚀 Feature
- 🐛 Bug fix

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
