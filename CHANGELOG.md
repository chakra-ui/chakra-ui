# Change Log

## @chakra-ui/react@1.4.2

### @chakra-ui/accordion@1.2.0

- **Feature🚀**: Extract all react based utilities and types to
  @chakra-ui/react-utils.

### @chakra-ui/avatar@1.2.0

- **Bug-fix🐛**: Fix RTL styles.

### @chakra-ui/checkbox@1.4.0

- **Feature🚀**: Add getRootProps to useCheckbox hook to manage props passed to
  checkbox container.

- **Feature🚀**: Forward onFocus, onBlur and aria-\* props to the input element
  for better integration with form libraries.

- **Feature🚀**: Ensure the checkbox works when the root element is not label.
  This helps to fix the current accessibility issues with the Switch component
  when wrapped within FormControl.

### @chakra-ui/counter@1.1.0

- **Feature🚀**: Expose setValue function to allow update state without calling
  onChange.
- **Bug-fix🐛**: Fix issue where onChange is called when value did not change.

### @chakra-ui/form-control@1.3.0

- **Feature🚀**: Refactor useFormControlProvider to return prop getters
  getHelpTextProps, getErrorMessageProps, and getRootProps.

- **Feature🚀**: Detect helper text and error message using ref callback instead
  of useLayoutEffect.

- **Feature🚀**: Update aria-describedby id to include feedbackId only when
  isInvalid is true.

- **Feature🚀**: Create useFormControlProps to provide a way to get the resolved
  form control props isInvalid, isDisabled, instead of HTML attributes. This
  will make it easier to integrate with number-input, checkbox, and switch.
- **Bug-fix🐛**: Fix concurrent mode issue with setting state in focus event
  handler. We use withFlushSync helper to achieve this.

### @chakra-ui/hooks@1.3.0

- **Bug-fix🐛**: useControllableState: The onChange callback will be called only
  if the new value isn't equal to the current one.

### @chakra-ui/layout@1.4.0

- **Bug-fix🐛**: Remove redundant role attribute from divider.
- **Bug-fix🐛**: Fixed the bug where a margin- bottom would get applied to
  direction=row of stack when using responsive props.

- **Bug-fix🐛**: Fix issue where AbsoluteCenter doesn't have position: absolute.

### @chakra-ui/number-input@1.2.0

- **Bug-fix🐛**: Forward aria-\* props to the input element.

- **Bug-fix🐛**: Fix issue where onChange was called on mount.
- **Bug-fix🐛**: Fix issue where onBlur was called twice.
- **Bug-fix🐛**: Memoize all callback props onFocus, onBlur, getAriaValueText.
- **Bug-fix🐛**: Refactor implicit useFormControl logic to be called from
  NumberInput instead.

- **Bug-fix🐛**: Call setFocused.on with ReactDOM.flushSync to prevent
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

- **Bug-fix🐛**: Fixed an issue where the StylesProvider export was not working
  in every environment.

- **Feature🚀**: Add style config for upcoming rotateX, rotateY, scaleX, scaleY
  style props.

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

- **Feature🚀**: Add withFlushSync function wrapper to help resolve concurrent
  mode and onFocus state issues.

### @chakra-ui/toast@1.2.1

- **Bug-fix🐛**: Bump @reach/alert to fix yarn pnp issue.

## @chakra-ui/react@1.4.1

### @chakra-ui/styled-system@1.9.1

- **Bug-fix🐛**: Fix issue where textStyle doesn't get applied.

## @chakra-ui/react@1.4.0

### @chakra-ui/react@1.4.0

- **Feature🚀**: Added support for framer-motion v4.

### @chakra-ui/popper@2.0.0

- **Feature🚀**: Refactor the positioning logic to improve stability and
  leverage CSS custom properties.

### @chakra-ui/styled-system@1.9.0

- **Bug-fix🐛**: Fix issue where responsive styles defined in text styles not
  overridden by style props.
- **Bug-fix🐛**: Fix issue where toCSSVars omitted the transition tokens.
- **Bug Fix🐛**: Fix issue where RTL property keys are incorrect due to
  config.property mutation.
- **Bug-fix🐛**: Added typings for the theme prop in ThemingPropsThunk and
  export a standalone type ThemeComponentProps. ThemingPropsThunk
- **Bug-fix🐛**: Update mx and px to use logical properties. Instead of mapping
  to marginLeft and marginRight, it maps to marginInlineStart and
  marginInlineEnd. Same for px.

### @chakra-ui/cli@1.3.0

- **Feature🚀**: Add support for text style and layer style theme type
  generation to @chakra-ui/cli.

### @chakra-ui/color-mode@1.1.2

- **Bug-fix🐛**: Memoize the context value for ColorModeProvider.

### @chakra-ui/editable@1.1.3

- **Bug-fix🐛**: Fix issue where blur/submit fires unexpectedly if submitOnBlur
  is true and you try to click the cancel button.

### @chakra-ui/radio@1.2.5

- **Bug-fix🐛**: Fix issue where controlled radio group can't be cleared.
- **Bug-fix🐛**: Fix onChange type for use-radio-group props.

### @chakra-ui/tag@1.1.3

- **Bug-fix🐛**: Add aria-label to tag close button.

### @chakra-ui/gatsby-plugin@1.0.2

- **Bug-fix🐛**: Update peer-dependency range for gatsby to support the latest.

### @chakra-ui/popover@1.3.0

- **Bug-fix🐛**: Fix issue (for Safari and Firefox) where popover doesn't close
  when you click the trigger and popover is open.

## @chakra-ui/react@1.3.4

### @chakra-ui/system@1.4.0

- **Feature🚀**: Add support for CSS Variables to the core of Chakra.
- **Feature🚀**: Improve style computation performance by 2.5x.
- **Feature🚀**: Adds support for main in chakra factory

### @chakra-ui/styled-system@1.8.0

- **Feature🚀**: Add support for CSS Variables to the core of Chakra.
- **Feature🚀**: Improve style computation performance by 2.5x.

### @chakra-ui/theme@1.7.0

- **Feature🚀**: Add new config property cssVarPrefix to add a custom prefix for
  CSS variables. It defaults to chakra.
- **Feature🚀**: TabPanels component can now be styled from Tabs component
  theme, specifying the tabpanels part.
- **Bug-fix🐛**: Fix full size modal with y-overflowing content behaviour
- **Bug-fix🐛**: Fix border styles for alert and number input
- **Bug-fix🐛**: Provide proper typings for ThemeOverride.components
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

- **Bug-fix🐛**: SimpleGrid: Avoid grid blow by adding minmax(0, 1fr)
- **Bug-fix🐛**: Simplify wrap style management to use CSS custom properties.

### @chakra-ui/popper@1.1.5

- **Bug-fix🐛**: Make the react-popper state in sync with the internal popper
  instance state

### @chakra-ui/react@1.3.4

- **Bug-fix🐛**: Fixed an issue where extending the theme with custom
  breakpoints with strictNullChecks: false in tsconfig.json lead to an error.

### @chakra-ui/select@1.1.2

- **Bug-fix🐛**: Resolved an issue where optgroup in dark mode was unreadable on
  browsers that allow select contents styling.

### @chakra-ui/slider@1.1.2

- **Bug-fix🐛**: onChangeEnd won't be called if value doesn't change.

## @chakra-ui/react@1.3.3

### @chakra-ui/color-mode@1.1.0

- **Feature🚀**: You can now customize the nonce of the `<script>` that
  ColorModeScript creates by passing nonce prop.

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

## @chakra-ui/react@1.3.2

### @chakra-ui/pin-input@1.4.0

- **Feature🚀**: Resolved an issue where completing character entry in PinInput
  failed to call onComplete.

### @chakra-ui/react@1.3.0

- **Feature🚀**: Introducing a generic TypeScript type ChakraTheme to improve
  the extendTheme function even further.

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

- **Bug-fix🐛**: Fixed issue in extendTheme where overrides defined as function
  replaced all base styles defined as a plain object.
- **Bug-fix🐛**: Fixed an issue where the TypeScript types were too narrow for
  component defaultProps and ComponentMultiStyleConfig.

### @chakra-ui/styled-system@1.7.0

- **Feature🚀**: Theme Typings: Add autocomplete for negative space values.
- **Feature🚀**: Add support for textStyle and layerStyle in styled-system
  package. This makes it possible to use them in the component theme, css
  function and sx prop as well.

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

- **Feature🚀**: Refactored apply prop handling to use the style config pattern
  instead of add it imperatively.
- **Bug-fix🐛**: Allow numbers for borderTop and provide autocomplete for
  fontWeight prop
- **Bug-fix🐛**: Support negative scale values for css variables.

### @chakra-ui/system@1.3.0

- **Feature🚀**: Add support for responsive values when using apply, textStyle
  and layerStyle.

### @chakra-ui/theme@1.6.0

- **Bug-fix🐛**: Fixed an issue where a Tooltip with negative gutter causes
  flickering on hover.
- **Bug-fix🐛**: Fixed an issue in Firefox where Input overflows it's flex
  container.

### @chakra-ui/cli@1.2.0

- **Feature🚀**: Theme Typings: Add autocomplete for negative space values

### @chakra-ui/accordion@1.1.2 & @chakra-ui/avatar@1.1.2 & @chakra-ui/button@1.1.2 & @chakra-ui/checkbox@1.2.2 & @chakra-ui/radio@1.2.2

- **Bug-fix🐛**: Provide better typings for size and variant for AvatarGroup,
  CheckboxGroup, ButtonGroup, and RadioGroup

### @chakra-ui/color-mode@1.0.7

- **Bug-fix🐛**: Fix issue where reading from localStorage maybe fail due to
  several reasons (SecurityError, Uncaught DOMException, TypeError, etc.)

### @chakra-ui/input@1.1.1

- **Bug-fix🐛**: Fixed the typo in InputProps interface due to which theming
  types were not correct.

### @chakra-ui/tooltip@1.1.1

- **Bug-fix🐛**: Fixed an issue where a Tooltip with negative gutter causes
  flickering on hover.

## @chakra-ui/react@1.2.1

### @chakra-ui/system@1.2.1

- **Bug-fix🐛**: Allow string values for ThemingProps['colorScheme']

### @chakra-ui/cli@1.1.0

- **Feature🚀**: Add minor bump for adding subcommand tokens to generate Theme
  Typings & Republished with version 1.1.0.

## @chakra-ui/react@1.2.0

### @chakra-ui/color-mode@1.0.6

- **Bug-fix🐛**: useColorModeValue defaults to light mode on first render if
  system color mode is used.

### @chakra-ui/hooks@1.1.3

- **Bug-fix🐛**: Update reference to document.addEventListener to detect owner
  document based on ref passed. This would help detect outside click currently
  from within an iframe.

### @chakra-ui/layout@1.3.0

- **Feature🚀**: Update transform style for AbsoluteCenter when axis is both
- **Feature🚀**: Add shouldWrapChildren to Wrap component to make it possible
  use Wrap directly without thinking about WrapItem.
- **Feature🚀**: Update LinkBox and LinkOverlay components and make them public
  in docs.

### @chakra-ui/menu@1.1.0

- **Feature🚀**: The MenuItem now accepts a commandSpacing prop that can be used
  to adjust the space between the command and label.
- **Feature🚀**: Add support rootProps to MenuList so it's possible override the
  styles for root container for menu list. Common use case is to change the
  applied zIndex of the menulist.
- **Feature🚀**: Make it possible to override zIndex by passing props to
  MenuList.

### @chakra-ui/modal@1.5.0 & @chakra-ui/tooltip@1.1.0

- **Feature🚀**: Add support for forwarding props to the underlying Portal
  component. Pass the portalProps prop to achieve this.
- **Feature🚀**: containerRef: ref for the element where to mount the portal.
- **Feature🚀**: appendToParentPortal: If false, it'll opt out of portal
  nesting.

### @chakra-ui/portal@1.1.0

- **Feature🚀**: Add support for appendToParentPortal={false} to opt out of
  nested portals.
- **Bug-fix🐛**: Fix issue with portal zIndex container where it renders
  elements outside of view.
- **Feature🚀**: Renamed getContainer prop to containerRef to make it possible
  to pass the ref directly. This affects the Modal component primarily.

### @chakra-ui/styled-system@1.6.0

- **Bug-fix🐛**: Fix issue where CSS color names are not passed correctly.
- **Feature🚀**: Improved theme typing in order to provide a better autocomplete
  experience.

### @chakra-ui/tabs@1.1.0

- **Feature🚀**: The useTabsContext hook is now exported and can be used in user
  land.

### @chakra-ui/theme@1.5.0

- **Feature🚀**: Add 8xl to size tokens.

## @chakra-ui/react@1.1.6

### @chakra-ui/layout@1.2.0

- **Feature🚀**: Add AbsoluteCenter component to help manage centering of an
  element relative to its parent dimensions

### @chakra-ui/pin-input@1.2.0

- **Feature🚀**: Added an otp flag to PinInput that sets the autoComplete value
  of PinInputField to "one-time-code"

### @chakra-ui/hooks@1.1.2

- **Bug-fix🐛**: Fixed issue where using an uncontrolled RadioGroup without a
  defaultValue causes multiple radio options can be selected

### @chakra-ui/portal@1.0.6

- **Bug-fix🐛**: Fixed portal z-index wrapper squashing portaled elements

### @chakra-ui/popover@1.1.0

- **Feature🚀**: Add `flip` prop to Popover to change the placement when it is
  scheduled to overflow a given boundary

## @chakra-ui/react@1.1.5

### @chakra-ui/popper@1.1.0

- **Feature🚀**: Added enabled property to usePopper. Popper won't be updated
  while it is set to false. Menu now uses this option to not update its position
  while it's closed.

### @chakra-ui/styled-system@1.5.0

- **Feature🚀**: Move srOnly prop to styled system props. This will deprecate
  the need for the visually hidden package. Less is more!

```jsx
  // If `true`, hide an element visually without hiding it from screen readers.
  <Box srOnly>Visually hidden</Box>

  // If `focusable`, the sr-only styles will be undone, making the element visible to sighted users as well as screen readers.
  <Box srOnly _active={{ srOnly: "focusable" }}>Visually hidden but shown on focus
  </Box>
```

- **Feature🚀**: Add polyfill for inset style prop as the CSS inset doesn't work
  in Safari Add missing style props for grid and flex layouts: gridTemplate,
  gridRowStart, gridRowEnd, flexFlow, clipPath

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

- **Bug-fix🐛**: Fixed issue where adding portalZIndex to ChakraProvider makes
  app unusable

### @chakra-ui/progress@1.0.5

- **Bug-fix🐛**: You can now override linear progress component's border radius
  in the theme.

### @chakra-ui/radio@1.1.2

- **Bug-fix🐛**: Update styles to use css logical style props.

## @chakra-ui/react@1.1.4

### @chakra-ui/hooks@1.1.0

- **Feature🚀**: Added useCallbackRef hook for persisting a value between
  renders and updating it if it changes.
- **Bug-fix🐛**: Deprecated useLatestRef, useEventCallback, and useMouseDownRef.
  These functions will be removed in a future major version.

## @chakra-ui/react@1.1.3

### @chakra-ui/styled-system@1.4.0

- **Bug-fix🐛**: Fixed a bug where rgb values in bgGradient did not work
  correctly
- **Bug-fix🐛**: Due to Safari not support css logical properties for right, and
  left, we added polyfill for these css logical properties.
- **Feature🚀**: Add support for css media query and dark class selectors.

### @chakra-ui/theme@1.4.0

- **Feature🚀**: Add the 2xl breakpoint to the theme which maps to 96em or
  1536px.

### @chakra-ui/media-query@1.0.3

- **Bug-fix🐛**: Fixed useBreakpoinValue infinite loop due to bug in
  createMediaQueries.

### @chakra-ui/portal@1.0.3

- **Bug-fix🐛**: Fixed issue where elements within portal used in an iframe got
  rendered outside of the iframe. Portal now smartly detects its document owner
  and attaches its node to the correct document.body
- **Bug-fix🐛**: Removed extra DOM node PortalManager creates. Less is more!

### @chakra-ui/skeleton@1.0.7

- **Bug-fix🐛**: Fixed a bug where SkeletonText kept its fixed dimensions when
  isLoaded is true.

### @chakra-ui/tabs@1.0.4

- **Bug-fix🐛**: Fixed issue where Tab button no longer has
  aria-selected="false" when it is inactive.

....This is before

## 1.1.8

### Patch Changes

- Updated dependencies
  [[`a576f4de8`](https://github.com/chakra-ui/chakra-ui/commit/a576f4de850706ea7088c8a6ea687269cad05e69)]:
  - @chakra-ui/react@1.4.1
  - @chakra-ui/props-docs@1.0.20

## 1.1.7

### Patch Changes

- Updated dependencies
  [[`64e8466b5`](https://github.com/chakra-ui/chakra-ui/commit/64e8466b528a027c915b7d2d5f474b08a0800e92),
  [`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86),
  [`035d5726e`](https://github.com/chakra-ui/chakra-ui/commit/035d5726e28396ef487b9801d7e2fa57677c703c),
  [`4955fe4fa`](https://github.com/chakra-ui/chakra-ui/commit/4955fe4fafa7468f3788583ab4cdac5dad611591),
  [`102d6da86`](https://github.com/chakra-ui/chakra-ui/commit/102d6da86d2186b186468b9b6801cb89a217a522),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b),
  [`64e8466b5`](https://github.com/chakra-ui/chakra-ui/commit/64e8466b528a027c915b7d2d5f474b08a0800e92)]:
  - @chakra-ui/react@1.4.0
  - @chakra-ui/utils@1.4.0
  - @chakra-ui/cli@1.3.0
  - @chakra-ui/props-docs@1.0.19
  - @chakra-ui/theme-tools@1.1.1

## 1.1.6

### Patch Changes

- [`79ff8e84e`](https://github.com/chakra-ui/chakra-ui/commit/79ff8e84e4a8f70d3abe969d68d8bfbb63c18471)
  [#3427](https://github.com/chakra-ui/chakra-ui/pull/3427) Thanks
  [@TheAsda](https://github.com/TheAsda)! - - Add drawer example to modal readme
  - Fix github references in drawer and alert-dialog docs
- Updated dependencies
  [[`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d),
  [`d77f63415`](https://github.com/chakra-ui/chakra-ui/commit/d77f63415822ad26e4f6ed133e4869c07fa72306),
  [`92adc0dc1`](https://github.com/chakra-ui/chakra-ui/commit/92adc0dc10e609d14439b95ed304a2731247d084)]:
  - @chakra-ui/utils@1.3.0
  - @chakra-ui/theme-tools@1.1.0
  - @chakra-ui/react@1.3.4
  - @chakra-ui/props-docs@1.0.18

## 1.1.5

### Patch Changes

- Updated dependencies
  [[`b78345c36`](https://github.com/chakra-ui/chakra-ui/commit/b78345c366ff79e1a2b5fb77d969f9ee8ced1ac8),
  [`5a8d8c054`](https://github.com/chakra-ui/chakra-ui/commit/5a8d8c054aa3ecdfac51e355b61ac1ae6214f2d5),
  [`8597f58b7`](https://github.com/chakra-ui/chakra-ui/commit/8597f58b7d5c1fe401086d28a379bc1727756c5b)]:
  - @chakra-ui/cli@1.2.1
  - @chakra-ui/react@1.3.3
  - @chakra-ui/props-docs@1.0.17

## 1.1.4

### Patch Changes

- Updated dependencies
  [[`f3ba8dd53`](https://github.com/chakra-ui/chakra-ui/commit/f3ba8dd53abc697c096165185764235012ada90f)]:
  - @chakra-ui/react@1.3.2
  - @chakra-ui/props-docs@1.0.16

## 1.1.3

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/react@1.3.1
  - @chakra-ui/props-docs@1.0.15

## 1.1.2

### Patch Changes

- Updated dependencies
  [[`a97e42568`](https://github.com/chakra-ui/chakra-ui/commit/a97e42568c4470d6cd1e16b48429af93c52def49),
  [`0100edbf0`](https://github.com/chakra-ui/chakra-ui/commit/0100edbf05c108c7d4725616dbbe9788a39da809),
  [`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`408aaaace`](https://github.com/chakra-ui/chakra-ui/commit/408aaaace0dd413b61354958a4c30b9f2f8aa376),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/cli@1.2.0
  - @chakra-ui/react@1.3.0
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/props-docs@1.0.14
  - @chakra-ui/theme-tools@1.0.4

## 1.1.1

### Patch Changes

- Updated dependencies
  [[`693528a1b`](https://github.com/chakra-ui/chakra-ui/commit/693528a1b73af2eeb462371a61ff2957c6f65810)]:
  - @chakra-ui/cli@1.1.0
  - @chakra-ui/react@1.2.1
  - @chakra-ui/props-docs@1.0.13

## 1.1.0

### Minor Changes

- [`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a)
  [#3092](https://github.com/chakra-ui/chakra-ui/pull/3092) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - - Improved theme typing in
  order to provide a better autocomplete experience
  - Fixed a type issue where pseudo style props like `_hover` and `_active`
    didn't allow regular css properties

### Patch Changes

- [`c61ed9f52`](https://github.com/chakra-ui/chakra-ui/commit/c61ed9f523e855bc1343d6b15f6b9fb770c026ea)
  [#3155](https://github.com/chakra-ui/chakra-ui/pull/3155) Thanks
  [@jungaretti](https://github.com/jungaretti)! - - Correct capitalization of
  `rightIcon` prop
  - Add `LinkOverlay` docs
  - Restructure component groupings and add permanent redirects
  - Add docs for `Portal` component
- Updated dependencies
  [[`408096ca3`](https://github.com/chakra-ui/chakra-ui/commit/408096ca377197e46e2c9eb13e0ea33c46355b38),
  [`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a),
  [`fa2083807`](https://github.com/chakra-ui/chakra-ui/commit/fa2083807f8372dc054261a214d66545ab7cac14)]:
  - @chakra-ui/react@1.2.0
  - @chakra-ui/props-docs@1.0.12

## 1.0.11

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/react@1.1.6
  - @chakra-ui/props-docs@1.0.11

## 1.0.10

### Patch Changes

- [`5ab9d8fd`](https://github.com/chakra-ui/chakra-ui/commit/5ab9d8fd7e94448be5014acaa35678fc69187b45)
  [#3066](https://github.com/chakra-ui/chakra-ui/pull/3066) Thanks
  [@dodas](https://github.com/dodas)! - Added Props Table for the `ButtonGroup`
  component.

* [`c771f339`](https://github.com/chakra-ui/chakra-ui/commit/c771f33915c3b40cf68ad8cd02f96bcf2a011b19)
  [#3036](https://github.com/chakra-ui/chakra-ui/pull/3036) Thanks
  [@dodas](https://github.com/dodas)! - Components that don't implement `size`
  or `variant` in the default theme will show note regarding that in their props
  table.

- [`b6054290`](https://github.com/chakra-ui/chakra-ui/commit/b605429010705441eabda3c4c3fe2bd483112096)
  [#3060](https://github.com/chakra-ui/chakra-ui/pull/3060) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Add links to the default
  theme implementation on all themable component pages.

* [`cfc71870`](https://github.com/chakra-ui/chakra-ui/commit/cfc718700941094dc0b3b176aed74088b569f106)
  [#3038](https://github.com/chakra-ui/chakra-ui/pull/3038) Thanks
  [@dodas](https://github.com/dodas)! - Removed redudant `borderRadius` related
  props from `InputGroup` example.

- [`5954f94e`](https://github.com/chakra-ui/chakra-ui/commit/5954f94e7bb6d7c1a0bd3187e447678d792f3c78)
  [#3069](https://github.com/chakra-ui/chakra-ui/pull/3069) Thanks
  [@dodas](https://github.com/dodas)! - Updated stats on the homepage.

* [`fad207b6`](https://github.com/chakra-ui/chakra-ui/commit/fad207b6cfe6587c8aadd80413e7897a8330b627)
  [#3034](https://github.com/chakra-ui/chakra-ui/pull/3034) Thanks
  [@dodas](https://github.com/dodas)! - Props table for each component now
  displays default `size` and `variant` values where possible.

- [`f4a51e56`](https://github.com/chakra-ui/chakra-ui/commit/f4a51e56453d1e48bbfbdc5e8ced16b6ee20f08d)
  [#3005](https://github.com/chakra-ui/chakra-ui/pull/3005) Thanks
  [@dodas](https://github.com/dodas)! - Format `size` and `variant` prop values
  as TS types.

* [`dbfb8eea`](https://github.com/chakra-ui/chakra-ui/commit/dbfb8eea89ce92bbb70ab81c751d99c2b23bc73c)
  [#3067](https://github.com/chakra-ui/chakra-ui/pull/3067) Thanks
  [@dodas](https://github.com/dodas)! - The `og:title` and `og:description` meta
  tags now describe specific URLs.

* Updated dependencies []:
  - @chakra-ui/react@1.1.5
  - @chakra-ui/props-docs@1.0.10

## 1.0.9

### Patch Changes

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/utils@1.1.0
  - @chakra-ui/react@1.1.4
  - @chakra-ui/theme-tools@1.0.3
  - @chakra-ui/props-docs@1.0.9

## 1.0.8

### Patch Changes

- [`878f5fa9`](https://github.com/chakra-ui/chakra-ui/commit/878f5fa95ba16da0bcc94129b3dcb64dea1739f6)
  [#2968](https://github.com/chakra-ui/chakra-ui/pull/2968) Thanks
  [@dodas](https://github.com/dodas)! - The `Changing the icon in the Select`
  example is now editable.

- Updated dependencies []:
  - @chakra-ui/props-docs@1.0.8
  - @chakra-ui/react@1.1.3

## 1.0.7

### Patch Changes

- [`5d83d2d6`](https://github.com/chakra-ui/chakra-ui/commit/5d83d2d67baee4b3a7fd4c50aca07e133691155a)
  [#2911](https://github.com/chakra-ui/chakra-ui/pull/2911) Thanks
  [@dodas](https://github.com/dodas)! - Replace example showing how to use
  `useToken` to make a gradient with one that shows how to make a `boxShadow`.
- Updated dependencies []:
  - @chakra-ui/react@1.1.2
  - @chakra-ui/props-docs@1.0.7

## 1.0.6

### Patch Changes

- [`ea93a6a5`](https://github.com/chakra-ui/chakra-ui/commit/ea93a6a5b11741d37be313126207a5d57e870e47)
  [#2900](https://github.com/chakra-ui/chakra-ui/pull/2900) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Add integration guide with
  react-table

* [`ffa2b92c`](https://github.com/chakra-ui/chakra-ui/commit/ffa2b92cb6b150e08e368f40fc2da967cef208f6)
  [#2913](https://github.com/chakra-ui/chakra-ui/pull/2913) Thanks
  [@dodas](https://github.com/dodas)! - Make the `Import` section consistent
  across component docs.

- [`5c9ef8bd`](https://github.com/chakra-ui/chakra-ui/commit/5c9ef8bd9ca8a2bffae34bc96f9d50b17c9eb3c6)
  [#2908](https://github.com/chakra-ui/chakra-ui/pull/2908) Thanks
  [@singhArmani](https://github.com/singhArmani)! - Added the missing
  `aria-labelledby` attribute and updated the tabs docs.

* [`4c80980b`](https://github.com/chakra-ui/chakra-ui/commit/4c80980b626c94a3566d48df82721fbfd30bec01)
  [#2927](https://github.com/chakra-ui/chakra-ui/pull/2927) Thanks
  [@walf443](https://github.com/walf443)! - replace exmples of Input tag
  type="phone" to type="tel".

- [`60fbea0f`](https://github.com/chakra-ui/chakra-ui/commit/60fbea0fe7094e3a795d5513f24fedd04f17a653)
  [#2915](https://github.com/chakra-ui/chakra-ui/pull/2915) Thanks
  [@dodas](https://github.com/dodas)! - Align social buttons in the header
  vertically

* [`1c068d61`](https://github.com/chakra-ui/chakra-ui/commit/1c068d6173e6544df568d22b9910b27476501b42)
  [#2914](https://github.com/chakra-ui/chakra-ui/pull/2914) Thanks
  [@dodas](https://github.com/dodas)! - Fix typos and inconsistent word
  capitalization in the `Icon` docs.

* Updated dependencies []:
  - @chakra-ui/react@1.1.1
  - @chakra-ui/props-docs@1.0.6

## 1.0.5

### Patch Changes

- [`9fc0a623`](https://github.com/chakra-ui/chakra-ui/commit/9fc0a62309a0c55b8696ee78e875535e9d6d1f6a)
  [#2868](https://github.com/chakra-ui/chakra-ui/pull/2868) Thanks
  [@MananDesai54](https://github.com/MananDesai54)! - Update form-control docs

- Updated dependencies
  [[`6a410f77`](https://github.com/chakra-ui/chakra-ui/commit/6a410f778f534e00e01fdf0d3ce1ffdd1d7b138e),
  [`a0e0bd9a`](https://github.com/chakra-ui/chakra-ui/commit/a0e0bd9a5d45fe08887f8df8d3eccc84951578df),
  [`916588a5`](https://github.com/chakra-ui/chakra-ui/commit/916588a5bbb771ff3f07b0ceb160bef57cdd6a8a)]:
  - @chakra-ui/react@1.1.0
  - @chakra-ui/props-docs@1.0.5

## 1.0.4

### Patch Changes

- Updated dependencies
  [[`5bff79a1`](https://github.com/chakra-ui/chakra-ui/commit/5bff79a1ba6989d279fc432d5040c72cd75b392e),
  [`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5)]:
  - @chakra-ui/react@1.0.4
  - @chakra-ui/utils@1.0.2
  - @chakra-ui/theme-tools@1.0.2
  - @chakra-ui/props-docs@1.0.4

## 1.0.3

### Patch Changes

- [`294cf486`](https://github.com/chakra-ui/chakra-ui/commit/294cf486bf820a1b2f658b6a5ef5fbb897120f98)
  [#2697](https://github.com/chakra-ui/chakra-ui/pull/2697) Thanks
  [@yicru](https://github.com/yicru)! - add import section to Spinner page

- Updated dependencies
  [[`0d0ed051`](https://github.com/chakra-ui/chakra-ui/commit/0d0ed0513ac1094833f1e0294f655af122682ff4)]:
  - @chakra-ui/react@1.0.3
  - @chakra-ui/props-docs@1.0.3

## 1.0.2

### Patch Changes

- [`e1b095cd`](https://github.com/chakra-ui/chakra-ui/commit/e1b095cdb799bb3630d3cbb7891d8c7e929db0f4)
  [#2217](https://github.com/chakra-ui/chakra-ui/pull/2217) Thanks
  [@silltho](https://github.com/silltho)! - feat(number-input): uses props of
  wrapping form-control

  This change enables `NumberInput` to automatically derive various values from
  a surrounding `FormControl` if found, similar to `Input` and `Select`.

- Updated dependencies
  [[`3b4b5e32`](https://github.com/chakra-ui/chakra-ui/commit/3b4b5e32d2baa81133daa4eb3f1be53c3c99656c),
  [`cfd3b325`](https://github.com/chakra-ui/chakra-ui/commit/cfd3b32564066076529811c5350aff6be565b7a3)]:
  - @chakra-ui/props-docs@1.0.2
  - @chakra-ui/react@1.0.2

## 1.0.1

### Patch Changes

- Updated dependencies
  [[`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213)]:
  - @chakra-ui/utils@1.0.1
  - @chakra-ui/props-docs@1.0.1
  - @chakra-ui/react@1.0.1
  - @chakra-ui/theme-tools@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/docs

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

**Note:** Version bump only for package @chakra-ui/docs

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/docs

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/docs

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/docs

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/docs

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/docs

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/docs@1.0.0-rc.0...@chakra-ui/docs@1.0.0-rc.1) (2020-08-06)

### Bug Fixes

- fix overlapping navbar
  ([fd4b2f4](https://github.com/chakra-ui/chakra-ui/commit/fd4b2f4cd60698c8abd2aefc8333f77e3b12ddab))
- issue with radio and radio group name
  ([4e09ebb](https://github.com/chakra-ui/chakra-ui/commit/4e09ebbf73d8f940a56703761914c2461e7a451f))
- **docs:** adapt to changes
  ([d3cfe90](https://github.com/chakra-ui/chakra-ui/commit/d3cfe904676ae280205425a6cd846cdb149a4c1c))
- **docs:** add note to PinInputField
  ([34106f4](https://github.com/chakra-ui/chakra-ui/commit/34106f4f3f40c6741e196023c1a8e8608ce4801c))

### Features

- add discord strip to homepage
  ([f3eb541](https://github.com/chakra-ui/chakra-ui/commit/f3eb541b01684a229c3b1a4e5907ae96df5b03ba))
- **docs:** add testimonials to homepage
  ([795927e](https://github.com/chakra-ui/chakra-ui/commit/795927e753ad003f4379a4ab62e6e982d9b6c5aa))
- add edit link and pagination
  ([7e0a23f](https://github.com/chakra-ui/chakra-ui/commit/7e0a23fe189a9bb25e02868f16846d7bd4f4571d))
- added docs for cookieStorageManager
  ([51de9cf](https://github.com/chakra-ui/chakra-ui/commit/51de9cf9ced7e54b8e98e69be083544418f3fac9))
- get author details and add tags as well
  ([77c82c7](https://github.com/chakra-ui/chakra-ui/commit/77c82c704b80a0a4e1a64dfbb134aceaa1f10b72))
- improve home page ui
  ([8cc9dde](https://github.com/chakra-ui/chakra-ui/commit/8cc9ddebba3f2bd6e31314be117fd0c00bf7a06c))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/docs@1.0.0-next.7...@chakra-ui/docs@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/docs

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/docs@1.0.0-next.6...@chakra-ui/docs@1.0.0-next.7) (2020-07-26)

### Bug Fixes

- **docs:** rename /docs to /website for relative page paths
  ([3c723b5](https://github.com/chakra-ui/chakra-ui/commit/3c723b53427c2a7c5fdfd679bf1918e71fb6a241))
- **toast:** status types
  ([4b6e76d](https://github.com/chakra-ui/chakra-ui/commit/4b6e76d03e5024544855d52623d13d3d9579eaff))
- typo in responsive-styles
  ([8d3f4e1](https://github.com/chakra-ui/chakra-ui/commit/8d3f4e133bb382d8a2fc0ee7ab9dda457b8fc93d))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/docs@1.0.0-next.5...@chakra-ui/docs@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/docs

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/docs@0.6.0...@chakra-ui/docs@1.0.0-next.5) (2020-07-15)

### Bug Fixes

- **tooltip:** rename show and hide to open and close
  ([b612144](https://github.com/chakra-ui/chakra-ui/commit/b612144c179f3076113dac495f8b4af982b16cd4))
- change react icons url
  ([722ecbd](https://github.com/chakra-ui/chakra-ui/commit/722ecbd648edf427dc42ef631ab7e4317cca6da7))
- remove trailing slashes from links
  ([d0ebdf3](https://github.com/chakra-ui/chakra-ui/commit/d0ebdf3183cc4c78c95ac0931133892b5bc499ef))
- revert back to full url on links
  ([13cf19b](https://github.com/chakra-ui/chakra-ui/commit/13cf19b40464a1d03b0b20a4973780c94fd617c3))
- updated Stack to allow 'row-reverse' and 'column-reverse' for direction prop
  ([1180b6b](https://github.com/chakra-ui/chakra-ui/commit/1180b6b7b97ba33c5b9506f65cec59ac4e37048f))

### Features

- **tooltip-disable:** add is-disabled prop to tooltip doc
  ([baad3e4](https://github.com/chakra-ui/chakra-ui/commit/baad3e4cbbc129651089b1c368c7bb054e8c862f))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.6.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/docs@0.5.0...@chakra-ui/docs@0.6.0) (2020-07-01)

### Bug Fixes

- bottom nav works with dark mode
  ([991714a](https://github.com/chakra-ui/chakra-ui/commit/991714a816a8707ee34fee7f2b2ac687c97e8ef3))
- updated the transition components in modal docs and migration guide
  ([7d5f019](https://github.com/chakra-ui/chakra-ui/commit/7d5f019f61a80577c04b410ba933d523b67b16ff))
- **site:** prefix guides with /guides
  ([161637e](https://github.com/chakra-ui/chakra-ui/commit/161637e6427f6fb16d1c662b4f597d2d862dbb70))
- **site:** update pagination node order
  ([14e0cf3](https://github.com/chakra-ui/chakra-ui/commit/14e0cf3744fca3ec8959e5b96b00e17333214cce))
- minor rephrasing
  ([70dbe4f](https://github.com/chakra-ui/chakra-ui/commit/70dbe4fce608719c3d11f2de3f812344131e90c2))
- use pseudo element instead of pseudo class
  ([756cdae](https://github.com/chakra-ui/chakra-ui/commit/756cdaeb1f72f7dcbda45124b78696c7638c80de))

### Features

- **theme:** reduce default z-index values
  ([c925ca2](https://github.com/chakra-ui/chakra-ui/commit/c925ca2c6b598477146ceea5857eac48a2bd71f4))
- add support for line-clamp
  ([1173ca6](https://github.com/chakra-ui/chakra-ui/commit/1173ca6974e8b9fcf27aa301bd1accece07ca5fc))
