---
title: Changelog
description: The changelog for Chakra UI React
slug: "/changelog"
---

The Changelog gives an overview of the meaningful changes we've made to Chakra
UI as we keep driving for better performance and best-in-class developer
experience.

<!-- CHANGELOG:INSERT -->

## 13-07-2022

`@chakra-ui/react@2.2.4`

**Chakra Nextjs** `v2.0.10`

- add portal example
- update to Next.js 12.2.2

**Portal** `v2.0.4`

- Fix portal to render children

**Media Query** `v3.2.0`

- fix getClosestValue to return nullable closest break point value

**Chakra Nextjs Ts** `v2.0.10`

- update to Next.js 12.2.2
- add color mode config and suspense

**Styled System** `v2.2.3`

- Fix incorrect breakpoint calculation which excluded some viewport widths from
  media query coverage

**Utils** `v2.0.4`

- Fix incorrect breakpoint calculation which excluded some viewport widths from
  media query coverage

**Color Mode** `v2.1.2`

- fix hydration issue

**React Env** `v2.0.4`

- fix hydration issue

## 10-07-2022

`@chakra-ui/react@2.2.3`

**Accordion** `v2.0.5`

- Export `useStyles` equivalent for multipart component styles. Accordion
  exports `useAccordionStyles`, Alert exports `useAlertStyles`, and so on.

**Alert** `v2.0.3`

- Export `useStyles` equivalent for multipart component styles. Accordion
  exports `useAccordionStyles`, Alert exports `useAlertStyles`, and so on.

**Avatar** `v2.0.4`

- Export `useStyles` equivalent for multipart component styles. Accordion
  exports `useAccordionStyles`, Alert exports `useAlertStyles`, and so on.

**Breadcrumb** `v2.0.3`

- Export `useStyles` equivalent for multipart component styles. Accordion
  exports `useAccordionStyles`, Alert exports `useAlertStyles`, and so on.

**Editable** `v2.0.3`

- Export `useStyles` equivalent for multipart component styles. Accordion
  exports `useAccordionStyles`, Alert exports `useAlertStyles`, and so on.

**Form Control** `v2.0.3`

- Export `useStyles` equivalent for multipart component styles. Accordion
  exports `useAccordionStyles`, Alert exports `useAlertStyles`, and so on.

**Menu** `v2.0.5`

- Export `useStyles` equivalent for multipart component styles. Accordion
  exports `useAccordionStyles`, Alert exports `useAlertStyles`, and so on.

**Number Input** `v2.0.3`

- Export `useStyles` equivalent for multipart component styles. Accordion
  exports `useAccordionStyles`, Alert exports `useAlertStyles`, and so on.

**Popover** `v2.0.3`

- Export `useStyles` equivalent for multipart component styles. Accordion
  exports `useAccordionStyles`, Alert exports `useAlertStyles`, and so on.
- Add `displayName` to components using `forwardRef`
- Fix issue where popover opens when mouse click opens the popover and trigget
  is set to `hover`.

**Progress** `v2.0.4`

- Export `useStyles` equivalent for multipart component styles. Accordion
  exports `useAccordionStyles`, Alert exports `useAlertStyles`, and so on.

**Slider** `v2.0.3`

- Export `useStyles` equivalent for multipart component styles. Accordion
  exports `useAccordionStyles`, Alert exports `useAlertStyles`, and so on.

**Stat** `v2.0.3`

- Export `useStyles` equivalent for multipart component styles. Accordion
  exports `useAccordionStyles`, Alert exports `useAlertStyles`, and so on.

**Table** `v2.0.3`

- Export `useStyles` equivalent for multipart component styles. Accordion
  exports `useAccordionStyles`, Alert exports `useAlertStyles`, and so on.

**Tabs** `v2.0.5`

- Export `useStyles` equivalent for multipart component styles. Accordion
  exports `useAccordionStyles`, Alert exports `useAlertStyles`, and so on.

**Tag** `v2.0.3`

- Export `useStyles` equivalent for multipart component styles. Accordion
  exports `useAccordionStyles`, Alert exports `useAlertStyles`, and so on.

**Gatsby Starter Default** `v1.0.9`

- Update ESlint packages and config

**Babel Plugin** `v1.0.4`

- Update ESlint packages and config

**Cra Template** `v2.0.3`

- Update ESlint packages and config

**Image** `v2.0.4`

- Add `displayName` to components using `forwardRef`

**Modal** `v2.1.1`

- Add `displayName` to components using `forwardRef`

**Cli** `v2.1.2`

- Fix importing of the default exported theme
- Update dependencies

**Utils** `v2.0.3`

- Fix `TypeError` in `getCSSVar` when the theme is an empty object
- Fix issue where `getFocusables` causes excessive repaint due to computed style
  calls

**Chakra Nextjs Ts** `v2.0.9`

- Update dependencies

**Transition** `v2.0.3`

- Fix emitted types that were incompatible with latest `framer-motion` release

**Theme** `v2.1.2`

- Add border radius of zero to the default full size modal

**React Env** `v2.0.3`

- Fix hydration issues when using `Suspense`

**Media Query** `v3.1.2`

- Fix hydration issues when using `Suspense`

**Portal** `v2.0.3`

- Fix hydration issues when using `Suspense`

**Layout** `v2.1.0`

- Add new highlight text component to emphasize any part of a string with the
  `mark` tag.

```jsx live=false
<Text fontWeight="semibold">
  <Highlight
    query={"with speed"}
    styles={{ px: "2", py: "1", rounded: "full", bg: "teal.100" }}
  >
    Create accessible React apps with speed
  </Highlight>
</Text>
```

## 07-06-2022

`@chakra-ui/react@2.2.1`

**Toast** `v2.1.0`

- Add support for `portalProps` in toast provider. When using with the
  `ChakraProvider`, this can be configure in the `toastOptions`

**System** `v2.1.3`

- Fixed a regression where useStyles and StylesProvider was removed from
  `@chakra-ui/system`

## 06-06-2022

`@chakra-ui/react@2.2.0`

- Ensure components show focus outline only when interacting with the keyboard.
- Migrate components to use `_focusVisible` instead of `_focus` selectors to
  indicate focus.

🚨 NOTE: This might be a potential breaking change for consumers who use the
`extendTheme` with the `_focus` styles. Kindly migrate to `_focusVisible`.- Bump
all packages to resolve deps issues

**Checkbox** `v2.1.0`

- Remove annoying focus outline by leveraging focus visible
- Bump all packages to resolve deps issues
- Track focus visible and add `data-focus-visible` to `getCheckboxProps`

**Styled System** `v2.2.0`

- Remove annoying focus outline by leveraging focus visible
- Bump all packages to resolve deps issues
- Add support for styling `data-focus-visible` using the `_focusVisible` pseudo
  prop

**Theme** `v2.1.0`

- Remove annoying focus outline by leveraging focus visible
- Bump all packages to resolve deps issues

**Modal** `v2.0.3`

- Fix shifting screen when opening modal
- Bump all packages to resolve deps issues
- Improve error messaging around style provider factory by creating a custom
  `createStylesContext` function.

**Media Query** `v3.1.0`

- Add support for client-side rendered (CSR) apps to get the correct value on
  first render.

> Affected hooks: `useMediaQuery`, `useBreakpoint`, `useBreakpointValue`.

These hooks are built work in server-side rendering (SSR) applications by
default. You might notice a quick flash of incorrect media query value when you
use them.

If you're creating a CSR-only app, you can now leverage the `ssr` argument to
get the correct value on first render.

```jsx live=false
const [isMobile] = useMediaQuery("(max-width: 768px)", {
  // you can now pass `ssr: false`
  ssr: false,
})

const buttonSize = useBreakpointValue(
  { base: "sm", lg: "md" },
  // you can now pass `ssr: false`
  { ssr: false },
)

// you can now pass `ssr: false`
const breakpoint = useBreakpoint({ ssr: false })
```

- Bump all packages to resolve deps issues

**Create React App Ts** `v2.0.6`

- Bump all packages to resolve deps issues

**Gatsby Starter Default** `v1.0.6`

- Bump all packages to resolve deps issues

**Chakra Nextjs** `v2.0.6`

- Bump all packages to resolve deps issues

**Chakra Nextjs Ts** `v2.0.6`

- Bump all packages to resolve deps issues

**Storybook Addon** `v2.0.6`

- Bump all packages to resolve deps issues

**Vite Ts** `v1.0.1`

- Bump all packages to resolve deps issues

**Accordion** `v2.0.3`

- Bump all packages to resolve deps issues
- Improve error messaging around style provider factory by creating a custom
  `createStylesContext` function.

**Alert** `v2.0.2`

- Bump all packages to resolve deps issues
- Improve error messaging around style provider factory by creating a custom
  `createStylesContext` function.

**Anatomy** `v2.0.1`

- Bump all packages to resolve deps issues

**Avatar** `v2.0.3`

- Bump all packages to resolve deps issues
- Improve error messaging around style provider factory by creating a custom
  `createStylesContext` function.

**Breadcrumb** `v2.0.2`

- Bump all packages to resolve deps issues
- Improve error messaging around style provider factory by creating a custom
  `createStylesContext` function.

**Button** `v2.0.2`

- Bump all packages to resolve deps issues

**Clickable** `v2.0.2`

- Bump all packages to resolve deps issues

**Close Button** `v2.0.2`

- Bump all packages to resolve deps issues

**Color Mode** `v2.0.4`

- Bump all packages to resolve deps issues

**Control Box** `v2.0.2`

- Bump all packages to resolve deps issues

**Counter** `v2.0.2`

- Bump all packages to resolve deps issues

**Css Reset** `v2.0.1`

- Bump all packages to resolve deps issues

**Descendant** `v3.0.2`

- Bump all packages to resolve deps issues

**Editable** `v2.0.2`

- Bump all packages to resolve deps issues
- Improve error messaging around style provider factory by creating a custom
  `createStylesContext` function.

**React Env** `v2.0.2`

- Bump all packages to resolve deps issues

**Focus Lock** `v2.0.3`

- Bump all packages to resolve deps issues

**Form Control** `v2.0.2`

- Bump all packages to resolve deps issues
- Improve error messaging around style provider factory by creating a custom
  `createStylesContext` function.

**Hooks** `v2.0.2`

- Bump all packages to resolve deps issues

**Icon** `v3.0.2`

- Bump all packages to resolve deps issues

**Icons** `v2.0.2`

- Bump all packages to resolve deps issues

**Image** `v2.0.3`

- Bump all packages to resolve deps issues

**Input** `v2.0.2`

- Bump all packages to resolve deps issues
- Improve error messaging around style provider factory by creating a custom
  `createStylesContext` function.

**Layout** `v2.0.2`

- Bump all packages to resolve deps issues
- Improve error messaging around style provider factory by creating a custom
  `createStylesContext` function.

**Live Region** `v2.0.2`

- Bump all packages to resolve deps issues

**Menu** `v2.0.3`

- Bump all packages to resolve deps issues
- Improve error messaging around style provider factory by creating a custom
  `createStylesContext` function.

**Number Input** `v2.0.2`

- Bump all packages to resolve deps issues
- Improve error messaging around style provider factory by creating a custom
  `createStylesContext` function.

**Pin Input** `v2.0.3`

- Bump all packages to resolve deps issues

**Popover** `v2.0.2`

- Bump all packages to resolve deps issues
- Improve error messaging around style provider factory by creating a custom
  `createStylesContext` function.

**Popper** `v3.0.2`

- Bump all packages to resolve deps issues

**Portal** `v2.0.2`

- Bump all packages to resolve deps issues

**Progress** `v2.0.2`

- Bump all packages to resolve deps issues
- Improve error messaging around style provider factory by creating a custom
  `createStylesContext` function.

**Provider** `v2.0.5`

- Bump all packages to resolve deps issues

**Radio** `v2.0.2`

- Bump all packages to resolve deps issues
- Fix a bug in chromium browsers where the modal position would change when
  focusing on the radio button in the modal which has some long content.

**React Utils** `v2.0.1`

- Bump all packages to resolve deps issues

**Select** `v2.0.2`

- Bump all packages to resolve deps issues

**Skeleton** `v2.0.5`

- Bump all packages to resolve deps issues

**Skip Nav** `v2.0.2`

- Bump all packages to resolve deps issues

**Slider** `v2.0.2`

- Bump all packages to resolve deps issues
- Improve error messaging around style provider factory by creating a custom
  `createStylesContext` function.

**Spinner** `v2.0.2`

- Bump all packages to resolve deps issues

**Stat** `v2.0.2`

- Bump all packages to resolve deps issues
- Improve error messaging around style provider factory by creating a custom
  `createStylesContext` function.

**Switch** `v2.0.3`

- Bump all packages to resolve deps issues

**System** `v2.1.2`

- Bump all packages to resolve deps issues
- Improve error messaging around style provider factory by creating a custom
  `createStylesContext` function.

**Table** `v2.0.2`

- Bump all packages to resolve deps issues
- Improve error messaging around style provider factory by creating a custom
  `createStylesContext` function.

**Tabs** `v2.0.3`

- Bump all packages to resolve deps issues
- Improve error messaging around style provider factory by creating a custom
  `createStylesContext` function.

**Tag** `v2.0.2`

- Bump all packages to resolve deps issues
- Improve error messaging around style provider factory by creating a custom
  `createStylesContext` function.

**Textarea** `v2.0.3`

- Bump all packages to resolve deps issues

**Theme Tools** `v2.0.2`

- Bump all packages to resolve deps issues

**Toast** `v2.0.6`

- Bump all packages to resolve deps issues

**Tooltip** `v2.0.2`

- Bump all packages to resolve deps issues

**Transition** `v2.0.2`

- Bump all packages to resolve deps issues

**Utils** `v2.0.2`

- Bump all packages to resolve deps issues

**Visually Hidden** `v2.0.2`

- Bump all packages to resolve deps issues

**Babel Plugin** `v1.0.3`

- Bump all packages to resolve deps issues

**Cli** `v2.1.0`

- Bump all packages to resolve deps issues
- New watch flag for the tokens command. You can specify a directory path to
  watch for changes. It defaults to the parent dir of `<source>`, e.g.
  `src/theme/theme.ts` => `src/theme`.

```shell
> chakra-cli tokens src/theme/theme.ts --watch

> chakra-cli tokens --help
Usage: chakra-cli tokens [options] <source>

Options:
  --out <path>              output file e.g. node_modules/@chakra-ui/styled-system/dist/declarations/src/theming.types.d.ts
  --strict-component-types  Generate strict types for props variant and size
  --watch [path]            Watch directory for changes and rebuild
  -h, --help                display help for command

```

- Fixed an issue where the tokens command failed with
  `SyntaxError: Undefined label 'e'`.

**Cra Template** `v2.0.2`

- Bump all packages to resolve deps issues

**Cra Template Typescript** `v2.0.2`

- Bump all packages to resolve deps issues

**Gatsby Plugin** `v3.0.1`

- Bump all packages to resolve deps issues

**Props Docs** `v2.0.6`

- Bump all packages to resolve deps issues

**Storybook Addon** `v4.0.0`

- Bump all packages to resolve deps issues
- Update storybook dependency

**Test Utils** `v2.0.6`

- Bump all packages to resolve deps issues

## 24-05-2022

`@chakra-ui/react@2.1.2`

**Toast** `v2.0.5`

- Fix SSR errors with toast and `use-sync-external-store` due to lack of
  `getServerSnapshot`

## 24-05-2022

`@chakra-ui/react@2.1.1`

- Refactor toast provider to not wrap entire app to prevent unneeded re-renders

**Utils** `v2.0.1`

- Expose `toMediaQuery` internal function for use in the styled system package

**Cra Template Typescript** `v2.0.1`

- Update version of react packages and fix ts error

**Cra Template** `v2.0.1`

- Update version of react packages and fix ts error

**Toast** `v2.0.4`

- Refactor toast internal architecture to fix issues with toast instance methods
  and `createStandaloneToast`

**Alert** `v2.0.1`

- Improve TS doc comments to include the `@default`value for prop types

**Avatar** `v2.0.2`

- Improve TS doc comments to include the `@default`value for prop types

**Breadcrumb** `v2.0.1`

- Improve TS doc comments to include the `@default`value for prop types

**Image** `v2.0.2`

- Improve TS doc comments to include the `@default`value for prop types

**Modal** `v2.0.2`

- Improve TS doc comments to include the `@default`value for prop types

**Popover** `v2.0.1`

- Improve TS doc comments to include the `@default`value for prop types

**Popper** `v3.0.1`

- Improve TS doc comments to include the `@default`value for prop types

**Portal** `v2.0.1`

- Improve TS doc comments to include the `@default`value for prop types

**Progress** `v2.0.1`

- Improve TS doc comments to include the `@default`value for prop types

**Slider** `v2.0.1`

- Improve TS doc comments to include the `@default`value for prop types

**Spinner** `v2.0.1`

- Improve TS doc comments to include the `@default`value for prop types

**Tabs** `v2.0.2`

- Improve TS doc comments to include the `@default`value for prop types

**Tooltip** `v2.0.1`

- Improve TS doc comments to include the `@default`value for prop types

**Transition** `v2.0.1`

- Improve TS doc comments to include the `@default`value for prop types

**Theme** `v2.0.3`

- Tab: Add visual feedback for disabled state in all variants.

**System** `v2.1.1`

- Revert type updates for use-style-config
- Fix media query calculations for responsive variants and sizes
- Fix issue where values with `!important` can resolve to a double `!important`
  being added

**Styled System** `v2.1.1`

- Fix media query calculations for responsive variants and sizes
- Fix issue where values with `!important` can resolve to a double `!important`
  being added

## 21-05-2022

`@chakra-ui/react@2.1.0`

- Ensure types used by other chakra packages are properly exported and imported
  so that `src` directory is not referenced in the emitted type declarations.
- Add support for responsive variants and sizes.

```jsx live=false
<Button variant={["sm", "lg"]}>Click me</Button>
```

Add support for `!important` in token values as an escape hatch for overriding
properties in responsive variants/sizes.

```jsx live=false
<Button variant={["sm", "lg"]} fontSize="lg !important">
  Click me
</Button>
```

**Notes**

- Based on how this is designed, there's no support for responsive `colorScheme`
  since it is technically not a variant
- When using responsive sizes and variants, overriding properties via props
  might not work as expected. We use native CSS media queries to enable this
  feature so there's no "magic" under the hood. If you really want to override
  properties, you can consider using the important syntax

**Descendant** `v3.0.1`

- Ensure types used by other chakra packages are properly exported and imported
  so that `src` directory is not referenced in the emitted type declarations.

**Theme** `v2.0.2`

- Ensure types used by other chakra packages are properly exported and imported
  so that `src` directory is not referenced in the emitted type declarations.
- Tag component variants borderRadius was overwriting baseStyle eventhough
  borderRadius was same for all variants. borderRadius is now part of the
  baseStyle

**Styled System** `v2.1.0`

- Add support for responsive variants and sizes.

```jsx live=false
<Button variant={["sm", "lg"]}>Click me</Button>
```

Add support for `!important` in token values as an escape hatch for overriding
properties in responsive variants/sizes.

```jsx live=false
<Button variant={["sm", "lg"]} fontSize="lg !important">
  Click me
</Button>
```

**Notes**

- Based on how this is designed, there's no support for responsive `colorScheme`
  since it is technically not a variant
- When using responsive sizes and variants, overriding properties via props
  might not work as expected. We use native CSS media queries to enable this
  feature so there's no "magic" under the hood. If you really want to override
  properties, you can consider using the important syntax

**System** `v2.1.0`

- Add support for responsive variants and sizes.

```jsx live=false
<Button variant={["sm", "lg"]}>Click me</Button>
```

Add support for `!important` in token values as an escape hatch for overriding
properties in responsive variants/sizes.

```jsx live=false
<Button variant={["sm", "lg"]} fontSize="lg !important">
  Click me
</Button>
```

**Notes**

- Based on how this is designed, there's no support for responsive `colorScheme`
  since it is technically not a variant
- When using responsive sizes and variants, overriding properties via props
  might not work as expected. We use native CSS media queries to enable this
  feature so there's no "magic" under the hood. If you really want to override
  properties, you can consider using the important syntax

**Textarea** `v2.0.1`

- Fix ESLint warnings and errors

**Avatar** `v2.0.1`

- Add referrerPolicy prop to Avatar & Image Components

**Image** `v2.0.1`

- Add referrerPolicy prop to Avatar & Image Components

**Media Query** `v3.0.1`

- Fix regression in use-media-query hook in SSR envrionments where it throws
  hydration mismatch

**Toast** `v2.0.3`

- Fix regression with the default toast position. It now defaults to `bottom` as
  described in docs

**Focus Lock** `v2.0.1`

- Upgrade dependency `react-focus-lock` to be compatible with React 18

## 17-05-2022

`@chakra-ui/react@2.0.2`

**Color Mode** `v2.0.2`

- Fix return value of color mode script

## 17-05-2022

`@chakra-ui/react@2.0.1`

**Toast** `v2.0.1`

- Revert toast's default variant to `solid`

**Color Mode** `v2.0.1`

- Improve SSR for color mode by adding `manager.get()` in the default state

- Add support `disableTransitionOnChange` option in `ColorModeProvider` and
  `theme.config` to control whether the transition of all elements should be
  temporarily disabled while the color mode changes.

- Expose `cookieStorageManagerSSR` for users who prefer to manage color mode
  server-side. If you use this, there's no need for the `ColorModeScript`

```jsx live=false
function App({ Component, pageProps }) {
  // get the `cookie` from each page `getServerSideProps` return value
  // Note: the implementation is up to you
  const manager = cookieStorageManagerSSR(pageProps.cookie)
  return (
    <ChakraProvider manager={manager}>
      <Component />
    </ChakraProvider>
  )
}
```

- We now provide a way to customize the localStorage / cookie storage key

```jsx live=false
import { createLocalStorageManager } from "@chakra-ui/react"

const manager = createLocalStorageManager("my-key")

// in root
function App() {
  return <ChakraProvider colorModeManager={manager} />
}

// in script
function Document() {
  return <ColorModeScript storageKey="my-key" />
}
```

- Fix inconsistent handling across provider and script

**Checkbox** `v2.0.1`

- Fix issue where checkbox doesn't reset the the form reset event is triggered

**Theme** `v2.0.1`

- Refactor global theme to use semantic token to prevent flash of white

## 12-05-2022

`@chakra-ui/react@2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Image** `v2.0.0`

- Added `fallbackStrategies` for `Image` to provide different behaviors when to
  display/load the `fallback`

- `beforeLoadOrError` is the default strategy and previous behaviour of `Image`
  which displays/loads the placeholder when `loading` the `src`/`srcSet` and on
  `error`
- `onError` strategy displays/loads the fallback image only on `error`
- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Alert** `v2.0.0`

- The `AlertIcon` component accepts custom icons as React children

```jsx live=false
<AlertIcon>
  <MyCustomIcon />
</AlertIcon>
```

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Storybook Addon** `v2.0.0`

- Fixed an issue where the storybook addon did not use the default theme if none
  was provided
- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bumped the supported version of storybook to >6.4 to support other bundlers
  than webpack.

Disable the new Storybook feature flag `emotionAlias` to prevent version
mismatch issues with emotion:

```js live=false
module.exports = {
  addons: ["@chakra-ui/storybook-addon"],
  features: {
    emotionAlias: false,
  },
}
```

The ColorMode Toggle moved to the Storybook toolbar together with a new layout
direction toggle (ltr/rtl).

A new helper function extracts the ArgTypes for a given Chakra UI component. You
can quickly preview all variants, sizes and colorSchemes of your components
which are present in your Chakra UI Theme.

```tsx
// button.stories.tsx
import { getThemingArgTypes } from "@chakra-ui/storybook-addon"
import { theme } from "<your-theme>"

export default {
  title: "Components / Forms / Button",
  argTypes: getThemingArgTypes(theme, "Button"),
}

interface StoryProps extends ThemingProps<"Button"> {}

export const Basic: StoryFn<StoryProps> = (props) => (
  <Button {...props}>Button</Button>
)
```

- Bump peer dependency to React and ReactDOM to >=18
- Replace the button on the corner with a toggle tool

**Toast** `v2.0.0`

- Removed dependency to @reach-ui/alert
- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- > Please note: There are **no breaking changes** to the hook `useToast`. There
  > are only breaking changes to `createStandaloneToast`.

### Breaking changes to `createStandaloneToast`

Chakra UI v1 rendered the toast container DOM element for you. In v2 you need to
render the `ToastContainer` in your application code. This allows you have only
one React root in your application.

#### @chakra-ui/react v1

```ts
import { createStandaloneToast } from "@chakra-ui/toast"

const toast = createStandaloneToast()
toast({ title: "Chakra UI" })
```

#### @chakra-ui/react v2

```tsx
import * as ReactDOM from "react-dom/client"
import { createStandaloneToast } from "@chakra-ui/toast"

const { ToastContainer, toast } = createStandaloneToast()

// render the ToastContainer in your React root
const rootElement = document.getElementById("root")
ReactDOM.createRoot(yourRootElement).render(
  <>
    <App />
    <ToastContainer />
  </>,
)

toast({ title: "Chakra UI" })
```

- Added support for custom icons in a toast:

```tsx
const toast = useToast()
return (
  <Button
    onClick={() => {
      toast({
        title: "Message me",
        icon: "💬",
      })
    }}
  >
    Show Toast with custom icon
  </Button>
)
```

- Added memoization to the toast function from `useToast`
- Bump peer dependency to React and ReactDOM to >=18

**Create React App Ts** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Gatsby Starter Default** `v1.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Chakra Nextjs** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Chakra Nextjs Ts** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Storybook Addon** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Accordion** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Anatomy** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Avatar** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Breadcrumb** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Button** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Removed the `isFullWidth` deprecation. Use `width=full` or `width=100%`

**Checkbox** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Removed the `isFullWidth` deprecation. Use `width=full` or `width=100%`
- Removed `defaultIsChecked`. Use `defaultChecked`

**Clickable** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Close Button** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Color Mode** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Removed references to `--chakra-ui-color-mode`. Use `data-theme` property
  instead

Allow user configure the storage key for the provider and script. We now export
a `createLocalStorageManager` and `createCookieStorageManager` functions.

```jsx live=false
const manager = createLocalStorageManager("{storageKey}")

function App({ Component, pageProps }) {
  return (
    <ChakraProvider colorModeManager={manager}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
```

Add better support for cookie storage to provide better SSG experience. To use
cookie script, you can set `type=cookie`.

> Pro tip: You can also configure the `storageKey` from script as well

```jsx live=false
import { ColorModeScript } from "@chakra-ui/react"
function Document() {
  return (
    <Html>
      <Head>
        <title>App</title>
      </Head>
      <Body>
        <ColorModeScript type="cookie" />
        <Main />
      </Body>
    </Html>
  )
}
```

Refactored color mode to behave consistently between provider and script. The
new precedence is as follows:

- Get the color mode value in the specified localStorage or cookie manager
- If value doesn't exist, use the `initialColorMode` value specified.
  - If the initial value is `system`, then we'll compute the color mode using
    `matchMedia`
  - Else, we use the initial value as is.
- If user specifies `useSystemColorMode: true`, then we'll subscribe to color
  mode changes from the operating system. It is no longer used to determine the
  initial color mode. To achieve that, please use `initialColorMode: "system"`

Removed `--chakra-ui-color-mode` CSS variable and use `data-theme` attribute on
the `html` element.

Added `color-scheme` to the `html` element to ensure native form-elements render
in the correct mode.

- Bump peer dependency to React and ReactDOM to >=18

**Control Box** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Counter** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Css Reset** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- When using the focus-visible package, you can now opt out of the automatic
  focus style override by adding `data-focus-visible-disabled` to a DOM element.
- Bump peer dependency to React and ReactDOM to >=18

**Descendant** `v3.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Editable** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Fix issue where `onCancel` was not called when the input is blurred and
  `submitOnBlur` is `false`
- Bump peer dependency to React and ReactDOM to >=18

**React Env** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Fix issue where `EnviromentProvider` causes suspense boundary to throw
  hydration errors.

Always render the `env` getter element to ensure consistent behavior in all
environments.

- Bump peer dependency to React and ReactDOM to >=18

**Focus Lock** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Form Control** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Hooks** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Removed `useEventCallback` hook

**Icon** `v3.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Icons** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Input** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Removed the `isFullWidth` deprecation. Use `width=full` or `width=100%`

**Layout** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Removed the `area` prop from `Grid` component. Should be passed to the
  `GridItem` instead.

**Live Region** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Media Query** `v3.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm

**Menu** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Modal** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Make `leastDestructiveRef` non-nullable
- Upgrade dependency react-remove-scroll
- Bump peer dependency to React and ReactDOM to >=18

**Number Input** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Removed the `isFullWidth` deprecation. Use `width=full` or `width=100%`

**Pin Input** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Popover** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Fixed an issue where the `Popover` closes when a `select` element is within it
  and the selection overflows the `Popover` boundaries.
- Add a reference to popover close button
- Bump peer dependency to React and ReactDOM to >=18

**Popper** `v3.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Fix issue where matchWidth doesn't work as expected due to the fixed
  `min-width: max-content` style attached to the element
- Bump peer dependency to React and ReactDOM to >=18

**Portal** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Progress** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Provider** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Radio** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Removed the `isFullWidth` deprecation. Use `width=full` or `width=100%`

**React Utils** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Select** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Removed the `isFullWidth` deprecation. Use `width=full` or `width=100%`

**Skeleton** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Skip Nav** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Slider** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Spinner** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Stat** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Styled System** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Removed the `d` style prop. Use `display` instead.
- Removed the `isTruncated` style prop. Use `noOfLines={1}` instead.

**Switch** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**System** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Table** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Tabs** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Tag** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Textarea** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Removed the `isFullWidth` deprecation. Use `width=full` or `width=100%`

**Theme** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Fix typescript errors
- Removed deprecated types.
- Improve accessibility of input placeholders
- Bump peer dependency to React and ReactDOM to >=18

**Tooltip** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Transition** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Utils** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Visually Hidden** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Cra Template** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Cra Template Typescript** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Gatsby Plugin** `v3.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Props Docs** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Test Utils** `v2.0.0`

- Bump all packages to next major for Chakra UI version 2.
- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Vite Ts** `v1.0.0`

- Omit `src` directory from being published to npm

**Theme Tools** `v2.0.0`

- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

**Cli** `v2.0.0`

- Omit `src` directory from being published to npm
- Bump peer dependency to React and ReactDOM to >=18

## 06-04-2022

`@chakra-ui/react@1.8.8`

**Menu** `v1.8.11`

- Fix issue where menu items cannot type `type=submit`
- Fix issue where Create React App template fails with newer versions of
  `framer-motion`

**Editable** `v1.4.2`

- Fix issue where editable preview remains interactive even when
  `isDisabled: true` is passed.

**Form Control** `v1.6.0`

- Introduced `optionalIndicator` for `FormLabel`

Similar to the `RequiredIndicator` the `OptionalIndicator` signalizes when a
field is optional.

**Hooks** `v1.9.1`

- Improve stability of `useBoolean` hook to ensure setter object reference stays
  the same

**Checkbox** `v1.7.1`

- Fix issue where Create React App template fails with newer versions of
  `framer-motion`
- Fix radio cursor when disabled

**Layout** `v1.8.0`

- Add support for vertical and horizontal spacing options in the Wrap component.

```jsx live=false
<Wrap spacingX="2" spacingY="4">
  <Box />
  <Box />
  <Box />
  <Box />
</Wrap>
```

> Falls back to the `spacing` prop for by default

**Theme** `v1.14.1`

- Fix radio cursor when disabled

**Transition** `v1.4.8`

- Fix intermittent Collapse component overflow initial/hidden issue

## 25-03-2022

**Tabs** `v1.6.9`

- Add height & width to the TabIndicator transition properties

**Checkbox** `v1.7.0`

- Add support for passing `inputProps` to underlying input element

**Radio** `v1.5.0`

- Add support for passing `inputProps` to underlying input element
- Add type for state returned by use-radio hook

**Editable** `v1.4.1`

- Call `setPrevValue` `onFocus` to avoid an outdated prev value when the field
  is controlled

**Layout** `v1.7.8`

- Fix buttons zIndex within LinkBox and usage of LinkOverlay
- Remove `noreferrer` attribute from link component

**Styled System** `v1.19.0`

- Updated `_dark` and `_light` pseudo selectors to allow semantic tokens to
  change with the `data-theme` attributes.
- Added `number` type for text underline offset of text decoration props

**Toast** `v1.5.8`

- use default options as well when providing options to useToast

**Hooks** `v1.9.0`

- Control whether Tooltip can be closed with Esc key

**Tooltip** `v1.5.0`

- Control whether Tooltip can be closed with Esc key

**System** `v1.12.0`

- Added `[data-theme]` to the CSS variables root selector. This allows the
  semantic tokens to change according to `data-theme="dark"` and
  `data-theme="light"` DOM element attributes.

**Modal** `v1.11.0`

- Add `onCloseComplete` prop to Modal which is called when all DOM nodes of the
  `Modal` are removed.

## 28-02-2022

**Anatomy** `v1.3.0`

- Add `textarea` part to `editableAnatomy`

**Cli** `v1.9.0`

- The CLI tokens command now includes semantic tokens in the generated
  ThemeTypings

**Editable** `v1.4.0`

- Added the component `EditableTextarea` to `Editable`. Use the textarea element
  to handle multi line text input in an editable context.

```tsx live=false
<Editable defaultValue="Change me" onChange={console.log}>
  <EditablePreview />
  <EditableTextarea />
</Editable>
```

**Layout** `v1.7.7`

- Fixed zIndex in LinkOverlay so that content in LinkBox can have an opacity
  below 1

**Color Mode** `v1.4.6`

- Adds a runtime safeguard for `ColorModeScript`.

**Theme** `v1.14.0`

- Add styles for new `textarea` element in `Editable`

**Media Query** `v2.0.4`

- Fixed an issue that undefined is returned when calling the hook
  `useBreakpoint` with `defaultValue` specified in SSR

- Fixed an issue where the value of `useBreakpointValue` in CSR did not match
  SSR.

**Hooks** `v1.8.5`

- Fixed an issue where the prop `isLazy` did not work as expected. This was
  achieved by updating the hook `useAnimationState`.

**Popover** `v1.11.7`

- Fixed an issue where the prop `isLazy` did not work as expected. This was
  achieved by updating the hook `useAnimationState`.

**Menu** `v1.8.9`

- Fixed bug where passing `null` as value of `icon` prop in `MenuOptionItem`
  still rendered the icon.

## 20-02-2022

`@chakra-ui/react@1.8.5`

Bumped patch version for every package to fix release process. Root cause was a
bug in our CI configuration.

## 20-02-2022

**Switch** `v1.3.6`

- Fixed a UI issue where the Switch component rendered a few pixels off the
  baseline.

**Media Query** `v2.0.2`

- Added props descriptions to Show / Hide components
- Fixed an issue where the hook `useBreakpoint` did not update after the first
  page load.
- Fixed an issue where the `useBreakpointValue` hook did not work as expected
  with custom breakpoints

**Checkbox** `v1.6.6`

- Add `FormControl` support for `useCheckbox`

**Styled System** `v1.18.0`

- Modify theme types to make it possible to customize token types via TypeScript
  module augmentation and declaration merging in addition to allowing
  customization via the Chakra CLI.

This makes it possible to do the following:

- Distribute custom types with a component library based on Chakra
- Customize theme types by hand
- Version control your theme types

To customize themes using the new mechanism, augment the `CustomThemeTypings`
type in a definitions file such as `types/chakra.d.ts`:

> ⚠️ NOTE: your `CustomThemeTypings` _must_ implement/extend `BaseThemeTypings`,
> otherwise the types will fall back to the default Chakra types (or custom
> output from **@chakra-ui/cli**)

```ts
import { BaseThemeTypings } from "@chakra-ui/styled-system";

type DefaultSizes = 'small' | 'medium' | 'large';

declare module "@chakra-ui/styled-system" {
  export interface CustomThemeTypings extends BaseThemeTypings {
    // Example custom `borders` tokens
    borders: 'none' | 'thin' | 'thick';
    // ...
    // Other custom tokens
    // ...
    components: {
      Button: {
        // Example custom component sizes and variants
        sizes: DefaultSizes;
        variants: 'solid' | 'outline' | 'wacky' | 'chill';
      };
      // ...
     }
  }
```

**Utils** `v1.10.3`

- Fixed an issue where `queryString()` created invalid media queries when min
  and max were set.

**Modal** `v1.10.8`

- Fix `useAriaHidden` hook dependency to make it work as expected

**Icon** `v2.0.4`

- Add missing word in comment of `CreateIconOptions`

**System** `v1.11.0`

- Allow all `JSX.IntrinsicElements` for the chakra factory. This allows to use
  [every DOM element](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/30a2f70db2f9ac223fd923ff1f8bcc175c082fd0/types/react/index.d.ts#L3111-L3288)
  with the shorthand version:

```jsx live=false
<chakra.header>Header</chakra.header>
<chakra.main>Main</chakra.main>
<chakra.footer>Many more</chakra.footer>
```

**Tag** `v1.2.6`

- Change order of aria-label prop on TagCloseButton to be over-writable

**Anatomy** `v1.2.4`

- Add a new multi style part `root` to the Accordion component. It is applied to
  the topmost DOM element.

**Accordion** `v1.4.7`

- Add a new multi style part `root` to the Accordion component. It is applied to
  the topmost DOM element.

**Theme** `v1.13.3`

- Add a new multi style part `root` to the Accordion component. It is applied to
  the topmost DOM element.

## 05-02-2022

`@chakra-ui/react@1.8.3`

- fixed an issue where the release process was not working

## 05-02-2022

`@chakra-ui/react@1.8.2`

- allow framer motion v6 as peer dependency

**Input** `v1.4.0`

- Add new prop `htmlSize` to `Input` to allow the usage of the native input
  attribute `size`.
- Apply theme styles for `InputLeftElement` and `InputRightElement`.

**Media Query** `v2.0.0`

- Support useMediaQuery for older browsers. Conditionally check if the
  MediaQueryList object supports the addEventListener() method, else fallback to
  the legacy .addListener() method.

**Cli** `v1.8.0`

- Fixed an internal version number mismatch
- When the
  [Chakra CLI](https://chakra-ui.com/docs/theming/advanced#theme-typings) fails
  to generate theme typings, it now exits with a status code of `1`. This
  resolves an issue where failures exited with a success status code.
- Increased scan depth for tokens in cli tooling

**Tooltip** `v1.4.5`

- Fix an issue where arrow tooltip background color only consider bg props. It
  considers `bg`, `background`, `bgColor` and `backgroundColor` now.
- allow framer motion v6 as peer dependency

**Accordion** `v1.4.5`

- allow framer motion v6 as peer dependency
- Add missing peer dependencies

**Checkbox** `v1.6.4`

- allow framer motion v6 as peer dependency
- Fixing a bug that happens when using the useCheckboxGroup hook with number
  values instead of string values

**Menu** `v1.8.5`

- allow framer motion v6 as peer dependency

**Modal** `v1.10.6`

- allow framer motion v6 as peer dependency

**Popover** `v1.11.3`

- allow framer motion v6 as peer dependency

**Switch** `v1.3.4`

- allow framer motion v6 as peer dependency
- Add missing peer dependencies

**Toast** `v1.5.3`

- allow framer motion v6 as peer dependency
- Fixed an issue where the `useToast` function returned a new object on every
  render.

**Transition** `v1.4.4`

- allow framer motion v6 as peer dependency

**Utils** `v1.10.1`

- Fixing a bug that happens when using the useCheckboxGroup hook with number
  values instead of string values

**System** `v1.10.2`

- Disallow props that do not exist in the prop interface

**Form Control** `v1.5.5`

- Remove redundant `useMemo` from `FormControl`

**Anatomy** `v1.2.2`

- Add missing peer dependencies

**Skeleton** `v1.2.8`

- Add missing peer dependencies

## 26-01-2022

**Color Mode** `v1.4.1`

- Fixed an issue where the ColorModeScript tried to access a non-existent
  variable

## 25-01-2022

`@chakra-ui/react@1.8.0`

**Number Input** `v1.4.0`

- Add support for custom `format`, `parse` and character validation callbacks.
- Fix issue where number input doesn't leave the spinning state when inc/dec
  button is disabled

**Styled System** `v1.17.0`

- Introducing **semantic tokens**

Semantic tokens provide the ability to create css variables which can change
with a CSS condition.

```tsx live=false
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const customTheme = extendTheme({
  colors: {
    900: "#171923",
  },
})

const App = () => (
  <ChakraProvider theme={customTheme}>
    <Text color="gray.900">will always be gray.900</Text>
  </ChakraProvider>
)
```

```tsx live=false
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const customTheme = extendTheme({
  colors: {
    50: "#F7FAFC",
    900: "#171923",
  },
  semanticTokens: {
    colors: {
      text: {
        default: "gray.900",
        _dark: "gray.50",
      },
    },
  },
})

const App = () => (
  <ChakraProvider theme={customTheme}>
    <Text color="text">
      will be gray.900 in light mode and gray.50 in dark mode
    </Text>
  </ChakraProvider>
)
```

```tsx live=false
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    red: {
      100: "#ff0010",
      400: "#ff0040",
      500: "#ff0050",
      700: "#ff0070",
      800: "#ff0080",
    },
  },
  semanticTokens: {
    colors: {
      error: "red.500", // create a token alias
      success: "red.100",
      primary: {
        // set variable conditionally with pseudo selectors like `_dark` and `_light`
        // use `default` to define fallback value
        default: "red.500",
        _dark: "red.400",
      },
      secondary: {
        default: "red.800",
        _dark: "red.700",
      },
    },
  },
})
```

- Updated the `_placeholderShown` selector
- Export TypeScript types ResponsiveObject and ResponsiveArray

**Theme** `v1.13.0`

- Introducing **semantic tokens**

Semantic tokens provide the ability to create css variables which can change
with a CSS condition.

```tsx live=false
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const customTheme = extendTheme({
  colors: {
    900: "#171923",
  },
})

const App = () => (
  <ChakraProvider theme={customTheme}>
    <Text color="gray.900">will always be gray.900</Text>
  </ChakraProvider>
)
```

```tsx live=false
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const customTheme = extendTheme({
  colors: {
    50: "#F7FAFC",
    900: "#171923",
  },
  semanticTokens: {
    colors: {
      text: {
        default: "gray.900",
        _dark: "gray.50",
      },
    },
  },
})

const App = () => (
  <ChakraProvider theme={customTheme}>
    <Text color="text">
      will be gray.900 in light mode and gray.50 in dark mode
    </Text>
  </ChakraProvider>
)
```

```tsx live=false
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    red: {
      100: "#ff0010",
      400: "#ff0040",
      500: "#ff0050",
      700: "#ff0070",
      800: "#ff0080",
    },
  },
  semanticTokens: {
    colors: {
      error: "red.500", // create a token alias
      success: "red.100",
      primary: {
        // set variable conditionally with pseudo selectors like `_dark` and `_light`
        // use `default` to define fallback value
        default: "red.500",
        _dark: "red.400",
      },
      secondary: {
        default: "red.800",
        _dark: "red.700",
      },
    },
  },
})
```

- refactoring(theme): Simplify exports
- Add entrypoints to the different parts of the theme (colors, fonts,
  components, spacing, etc.)

```jsx live=false
// Now you can use only colors from the theme
import colors from "@chakra-ui/theme/foundations/colors"
```

Here's a table of the theme parts and entrypoints

| Part        | Entrypoint                                  |
| ----------- | ------------------------------------------- |
| components  | `"@chakra-ui/theme/components"`             |
| foundations | `"@chakra-ui/theme/foundations"`            |
| colors      | `"@chakra-ui/theme/foundations/colors"`     |
| sizes       | `"@chakra-ui/theme/foundations/sizes"`      |
| spacing     | `"@chakra-ui/theme/foundations/spacing"`    |
| typography  | `"@chakra-ui/theme/foundations/typography"` |
| radius      | `"@chakra-ui/theme/foundations/radius"`     |
| shadows     | `"@chakra-ui/theme/foundations/shadows"`    |
| transition  | `"@chakra-ui/theme/foundations/transition"` |
| zIndex      | `"@chakra-ui/theme/foundations/z-index"`    |
| blur        | `"@chakra-ui/theme/foundations/blur"`       |
| borders     | `"@chakra-ui/theme/foundations/borders"`    |

**Color Mode** `v1.4.0`

- Introducing **semantic tokens**

Semantic tokens provide the ability to create css variables which can change
with a CSS condition.

```tsx live=false
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const customTheme = extendTheme({
  colors: {
    900: "#171923",
  },
})

const App = () => (
  <ChakraProvider theme={customTheme}>
    <Text color="gray.900">will always be gray.900</Text>
  </ChakraProvider>
)
```

```tsx live=false
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const customTheme = extendTheme({
  colors: {
    50: "#F7FAFC",
    900: "#171923",
  },
  semanticTokens: {
    colors: {
      text: {
        default: "gray.900",
        _dark: "gray.50",
      },
    },
  },
})

const App = () => (
  <ChakraProvider theme={customTheme}>
    <Text color="text">
      will be gray.900 in light mode and gray.50 in dark mode
    </Text>
  </ChakraProvider>
)
```

```tsx live=false
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    red: {
      100: "#ff0010",
      400: "#ff0040",
      500: "#ff0050",
      700: "#ff0070",
      800: "#ff0080",
    },
  },
  semanticTokens: {
    colors: {
      error: "red.500", // create a token alias
      success: "red.100",
      primary: {
        // set variable conditionally with pseudo selectors like `_dark` and `_light`
        // use `default` to define fallback value
        default: "red.500",
        _dark: "red.400",
      },
      secondary: {
        default: "red.800",
        _dark: "red.700",
      },
    },
  },
})
```

**System** `v1.10.0`

- Add React component `<CSSVars root=":host, :root" />` to allow rehoisting CSS
  vars
- Updated type `ThemingProps` to allow string values for the props `variant` and
  `size` even on components which are not in the default theme.

**Popover** `v1.11.2`

- Fix issue where the content of a lazy popover or menu gets unmounted before
  (framer-motion) animation ends leading to a janky user experience.

**Menu** `v1.8.4`

- Fix issue where the content of a lazy popover or menu gets unmounted before
  (framer-motion) animation ends leading to a janky user experience.

**Media Query** `v1.2.4`

- Update typings for useBreakpointValue parameter

**Hooks** `v1.8.0`

- Add `useAnimationState` hook to help track motion component animations. Used
  in popopover and menu lazy modes
- fix useConst types when using init function

**Cli** `v1.7.1`

- Update README to reflect the change of the default `--out` path to
  `node_modules/@chakra-ui/styled-system/dist/declarations/src/theming.types.d.ts`

**Slider** `v1.5.4`

- fix a minor edge-case for calculating the `index` in use-range-slider

**Button** `v1.5.3`

- Fixed ThemingProps typings for ButtonGroup
- Fixed an issue where the `iconSpacing` for the `<ButtonSpinner />` was
  hardcoded.

**Utils** `v1.10.0`

- Add helper function `flatten`

```ts
import { flatten } from "@chakra-ui/utils"

flatten({ space: [0, 1, 2, 4, 8, 16, 32] })
/** =>
{
  "space.0": 0,
  "space.1": 1,
  "space.2": 2,
  "space.3": 4,
  "space.4": 8,
  "space.5": 16,
  "space.6": 32,
}
*/
```

**Theme Tools** `v1.3.2`

- Allow style function types to be part of `StyleConfig` and `MultiStyleConfig`
  types to reflect the possible usage of style functions instead of style
  objects.

**Checkbox** `v1.6.3`

- Added a `CheckboxState` type to the `useCheckbox` hook to improve usability
  and documentation

## 06-01-2022

`@chakra-ui/react@1.7.5`

**Modal** `v1.10.4`

- Update `DrawerProps` type to include `ThemingProps` for the Drawer component

**Avatar** `v1.3.3`

- Added the prop `srcSet` to the `<Avatar />` and `<AvatarImage />` components
  to allow responsive image sources.
  [Read more on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset)

**Layout** `v1.7.1`

- ### Add support for `area` prop on `GridItem`

Deprecated `area` prop on `Grid` and added support for `area` prop to be used
with `GridItem` instead. This allows for usage of `GridItem`'s that have named
template areas to be used in conjunction with a `Grid` that has a defined
template area.

```jsx live=false
<Grid templateAreas='"one two three"'>
   <GridItem area='one'>one</Grid>
   <GridItem area='two'>two</Grid>
   <GridItem area='three'>three</Grid>
</Grid>
```

**Storybook Addon** `v1.0.1`

- Added dependency to @chakra-ui/icons

**System** `v1.9.1`

- Fixed an TypeScript issue where the ThemingProps type was too strict

## 02-01-2022

`@chakra-ui/react@1.7.4`

**Styled System** `v1.16.0`

- ### Add support peer pseudo style props

You can now style an element based on the state of its general sibling (marked
with `.peer` or `data-peer`) attribute.

```jsx live=false
<>
  <input type="checkbox" data-peer />
  <Box bg="white" _peerFocus={{ bg: "green.400" }} />
</>
```

The peer properties you can apply are `_peerHover`, `_peerFocus`,
`_peerFocusVisible`, `_peerActive`, `_peerInvalid`,
`_peerChecked`,`_peerFocusWithin`, `_peerPlaceholderShown`, `_peerDisabled`

### New style props

Added `_placeholderShown` pseudo props for styling elements when sibling inputs
have placeholder shown.

Added `_ltr` pseudo props for styling elements in LTR writing mode. This is
useful for products with RTL first approach.

Added `_mediaReduceMotion` pseudo props to apply reduce motion styles to
elements. This is useful when you need to remove CSS animations/transitions.

- Adds style props for CSS scroll behavior properties: `scrollPadding`,
  `scrollMargin`, `scrollSnapAlign`, etc...

Here's a full list of properties:

- **Scroll Behavior:** `scrollBehavior`, `scrollSnapAlign`, `scrollSnapStop`,
  `scrollSnapType`

- **Scroll Margin:** `scrollMargin`, `scrollMarginTop`, `scrollMarginBottom`,
  `scrollMarginLeft`, `scrollMarginRight`, `scrollMarginX`, `scrollMarginY`

- **Scroll Padding:** `scrollPadding`, `scrollPaddingTop`,
  `scrollPaddingBottom`, `scrollPaddingLeft`, `scrollPaddingRight`,
  `scrollPaddingX`, `scrollPaddingY`

**System** `v1.9.0`

- Use the feature flag `--strict-component-types` for `@chakra-ui/cli tokens` to
  generate strict component type for the theming props `variant` and `size`.

```bash
chakra-cli tokens --strict-component-types
```

```tsx live=false
// before
<Button variant="abc" />
// valid type but variant is not available in the theme

// after
<Button variant="abc" /> // invalid
// Type '"abc"' is not assignable to type '"link" | "outline" | "ghost" | "solid" | "unstyled" | undefined'.
```

**Cli** `v1.7.0`

- Use the feature flag `--strict-component-types` for `@chakra-ui/cli tokens` to
  generate strict component type for the theming props `variant` and `size`.

```bash
chakra-cli tokens --strict-component-types
```

```tsx live=false
// before
<Button variant="abc" />
// valid type but variant is not available in the theme

// after
<Button variant="abc" /> // invalid
// Type '"abc"' is not assignable to type '"link" | "outline" | "ghost" | "solid" | "unstyled" | undefined'.
```

- Fixed an issue where the cli fails when `prettier` is not installed
- Added token scales `blur`, `borderStyles` and `borderWidths`.

**Slider** `v1.5.3`

- Allow classNames specified on `Slider` and `SliderFilledTrack` to be added to
  the class list

**Hooks** `v1.7.2`

- Add a comment about `useState` alternative
- Fixed a issue where `useId` generated inconsistent id values between client
  and server (SSR).

**Storybook Addon** `v1.0.0`

- The official Storybook Addon for Chakra UI.

```sh
yarn add -D @chakra-ui/storybook-addon
```

```sh
npm i -D @chakra-ui/storybook-addon
```

Add the addon to your configuration in `.storybook/main.js`:

```js live=false
module.exports = {
  addons: ["@chakra-ui/storybook-addon"],
}
```

**Checkbox** `v1.6.2`

- Fix issue where focus styles persists when `isDisabled` is set to `true` and
  checkbox has focus.

**Radio** `v1.4.4`

- Add `aria-describedby` to the radio props to improve accessibility

**Menu** `v1.8.3`

- Omit `disabled` and `aria-disabled` props from `MenuItemProps` types

**Theme** `v1.12.3`

- Ensure consistent line height for `FormErrorMessage` and `FormHelperText`
- Fixed an issue where the `ModalFooter` was out of the viewport for
  `size="full"`.

**Editable** `v1.3.2`

- When the `Editable` component has its `startsWithEditView` set to `true`, then
  focus should be set to the `EditableInput` element when the component is
  mounted.

**Tooltip** `v1.4.3`

- Fix broken link in Tooltip's JSDoc comment

**Layout** `v1.7.0`

- Improve error message when using `ListItem` without wrapping in `List`.

**Media Query** `v1.2.3`

- `useBreakpointValue` returns the correct value on first tick, if `matchMedia`
  is available

**Test Utils** `v1.1.4`

- Upgrade `@testing-library/react-hooks` to test SSR. This was used to debug and
  fix issues with the `useId` hook.

## 09-12-2021

`@chakra-ui/react@1.7.3`

- Update storybook url configuration for `@chakra-ui/react` to
  [https://storybook.chakra-ui.com](https://storybook.chakra-ui.com)

**Layout** `v1.6.0`

- Add support for style props `gap`, `columnGap` and `rowGap`. Those CSS
  properties are valid in a grid or flex context

> For further information see
> [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/gap)

- Fix TS issue with Grid component due to the native `gap`, `rowGap` and
  `columnGap` we added to styled system.

**Styled System** `v1.15.0`

- Add support for style props `gap`, `columnGap` and `rowGap`. Those CSS
  properties are valid in a grid or flex context

> For further information see
> [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/gap)

- Fix issue where `bgGradient` parser doesn't work when a position is specified
- Fix issue where tokens autocomplete don't show up anymore except user runs the
  cli command.
- Fixed issue where multi-value `inset` property doesn't work.

**Menu** `v1.8.2`

- Fix issue where `enabled` TS type was exposed to popover and menu from
  `UsePopperProps`. This was resolved by omitting `enabled` from the type

**Popover** `v1.11.0`

- Fix issue where `enabled` TS type was exposed to popover and menu from
  `UsePopperProps`. This was resolved by omitting `enabled` from the type
- Fix issue where `Popover` will be `display:none` when inner element focused.
- Add `PopoverAnchor` component which allows you to set the `Popover` reference
  point without acting as a trigger.

```jsx live=false
<Popover>
  {/* triggers the popover to open/close */}
  <PopoverTrigger>
    <button>Trigger</button>
  </PopoverTrigger>
  {/* popover will be positioned relative to this */}
  <PopoverAnchor>
    <Box width="40px" height="40px" />
  </PopoverAnchor>
  <PopoverContent>Hello World</PopoverContent>
</Popover>
```

**Input** `v1.3.2`

- Fixed an issue where `InputGroup` passes undefined `size` and `variant` props
  which overrides the ones defined by default in a custom `Input` component.

**System** `v1.8.3`

- Allow retrieving breakpoint tokens when using useToken

**Theme** `v1.12.2`

- Fix issue where tokens autocomplete don't show up anymore except user runs the
  cli command.

**Toast** `v1.5.0`

- The `toast` function now exposes a `containerStyle` property you can use to
  override the default styles for the toast container.

```jsx live=false
function Example() {
  // Via instantiation
  const toast = useToast({
    position: "top",
    title: "Container style is customizable",
    containerStyle: {
      maxWidth: "100%",
    },
  })

  // Or via trigger
  return (
    <Button
      onClick={() => {
        toast({
          containerStyle: {
            maxWidth: "100%",
          },
        })
      }}
    >
      Click me to show toast with custom container style.
    </Button>
  )
}
```

- Fix TS issue with toast placement utility

**Tooltip** `v1.4.2`

- Prevent `onKeyDown` callback from de/registering on every call of `useTooltip`

**Media Query** `v1.2.2`

- Improved performance and behavior of `useMediaQuery` hook.

**Transition** `v1.4.2`

- Fixed issue where the `ref` of `Slider` returns `null` due to prop override

**Icon** `v2.0.0`

- Auto assign `key` when passing array of paths to `createIcon`

```jsx live=false
const HeartIcon = createIcon({
  displayName: "HeartIcon",
  path: [<path stroke="none" d="..." fill="none" />, <path d="..." />],
})
```

## 17-11-2021

**Props Docs** `v1.0.40`

- Fix issue where package doesn't include a `dist` folder and doesn't work when
  installed from npm.

**Radio** `v1.4.2`

- Add cursor `pointer` to the radio container

**Slider** `v1.5.2`

- Fixed a bug where a thumb would not move in case of stacked thumbs

**Color Mode** `v1.3.2`

- Fixed flaky color-mode test
- Fixed issue where `DarkMode` and `LightMode` elements rerenders their children
  even if the child is memoized.

`<LightMode>` and `<DarkMode>` components are now memoized to prevent
unnecessary rendering of their child components.

## 12-11-2021

`@chakra-ui/react@1.7.1`

- Update babel config to transpile soruces for older browsers. This fixes issues
  with CRA and Storybook.

**Cra Template Typescript** `v1.1.1`

- Bump TypeScript version

**Media Query** `v1.2.1`

- Fix issue where `useColorModePreference` returned incorrect values due to
  array destructuring.
- Update babel config to transpile soruces for older browsers. This fixes issues
  with CRA and Storybook.

## 09-11-2021

`@chakra-ui/react@1.7.0`

Update build system we use from a custom babel cli setup to
[preconstruct](https://preconstruct.tools/).

The previous build system transpiles the code in `src` directory to `dist/esm`
and `dist/cjs` keeping the same file structure. The new build system merges all
files in `src` and transpiles to a single `esm` and `cjs` file.

**Potential Breaking Change:** The side effect of this is that, if you imported
any function, component or hook using the **undocumented** approach like
`import { useOutsideClick } from "@chakra-ui/hooks/dist/use-outside-click"`,
you'll notice that the this doesn't work anymore.

Here's how to resolve it:

```jsx live=false
// Won't work 🎇
import { useOutsideClick } from "@chakra-ui/hooks/dist/use-outside-click"

// Works ✅
import { useOutsideClick } from "@chakra-ui/hooks"
```

If this affected your project, we recommend that you import hooks, functions or
components the way it's shown in the documentation. This will help keep your
project future-proof.

**Color Mode** `v1.3.0`

Fixed color mode behavior priority in the following order:

- If `useSystemColorMode` is `true`, the system's color mode will be used as
  default and we'll fallback to the `initialColorMode` if system color mode
  isn't resolved.

- If `--chakra-ui-color-mode` is defined through e.g. `ColorModeScript` this
  will be used.

- If local storage is used as the `colorModeManager` and a value is defined for
  `chakra-ui-color-mode`, this will be used.

- if `initialColorMode` is set to `system`, the system's color mode will be used
  as default and we'll fallback to the `initialColorMode` if system color mode
  isn't resolved.

- if `initialColorMode` is set to `'light'` or `'dark'`, the corresponding value
  will be used.

**Modal** `v1.10.0`, **Focus Lock** `v1.2.0`

- `react-focus-lock@2.5.1` includes a dependency update of `focus-lock` from
  `0.8.1` -> `0.9.1`. The change in `focus-lock` includes a fix for performance
  in JSDOM: https://github.com/theKashey/focus-lock/pull/24

JSDOM is used when testing react components in jest and other unit testing
frameworks. In particular, when used with `@testing-library/react` for
simulating real user input.

Locally tested on an Apple M1 Air using a moderately complex `<Modal>` component
(which contained inputs, `react-hook-form` usage, etc). Before this change:
20,149ms After this change: 2,347ms

Approx. 10x performance increase.

**Select** `v1.2.0`

- Fixed an styling issue where it was not possible to customize the icon spacing
  of the `Select` component.

**Theme** `v1.12.0`

- Fixed an styling issue where it was not possible to customize the icon spacing
  of the `Select` component.

**Slider** `v1.5.0`

- Fixed the bug in `RangeSlider` where an index out of bounds error would occur
  incase of stacked thumbs.

## 03-11-2021

`@chakra-ui/react@1.6.12`

- Allow usage of `framer-motion` 5.x in `peerDependency`

**Radio** `v1.3.13`

- Improve types defined for `getRadioprops`

**Checkbox** `v1.5.10`

- Allow usage of `framer-motion` 5.x in `peerDependency`

**Menu** `v1.7.8`

- Allow usage of `framer-motion` 5.x in `peerDependency`

**Modal** `v1.9.4`

- Allow usage of `framer-motion` 5.x in `peerDependency`

**Popover** `v1.9.1`

- Allow usage of `framer-motion` 5.x in `peerDependency`

**Theme** `v1.11.1`

- Allow usage of `framer-motion` 5.x in `peerDependency`

**Toast** `v1.3.4`

- Allow usage of `framer-motion` 5.x in `peerDependency`

**Tooltip** `v1.3.14`

- Allow usage of `framer-motion` 5.x in `peerDependency`

**Transition** `v1.3.8`

- Allow usage of `framer-motion` 5.x in `peerDependency`

**Media Query** `v1.1.5`

- Corrected eslint errors.
- Fix an issue where the `useMediaQuery` was not updating the array of booleans
  correctly when resizing the viewport.

It also removes deprecated calls `addListener` and `removeListener` in favor of
the recommended `addEventListener` and `removeEventListener` calls.

**Color Mode** `v1.2.0`

Added possibility to use the system preferred color scheme as value for
`initialColorMode`, while still respecting a user's previous choice.

As long as the user does not manually select a color mode through a website
interaction, the theme will change when the system preference changes.

This would easily allow for an implementation where the user can choose between
`light`, `dark` and `system` by simply setting the `initialColorMode` setting to
`system` and presenting the user with the three options.

**Popper** `v2.3.1`

- Remove default `[]` value for modifiers and moved it into `createPopper`
  definition. This allows memoized modifiers to work correctly in user-land when
  used with `useCallback`.

## 31-10-2021

`@chakra-ui/react@1.6.11`

**Anatomy** `v1.1.0`

- Add `closeButton` to popover component parts

**Styled System** `v.1.13.0`

- Add `_groupFocusVisible` pseudo style props

**Breadcrumb** `v1.2.10`

- `href` attribute will no longer be set on the inner element of the
  `BreadcrumbLink` if the parent `BreadcrumbItem` has `isCurrentPage` prop set
  to `true`. Such a `BreadcrumbLink` is not an actual link and it ends up being
  a span (by default).

**Color Mode** `v1.1.14`

- Use the correct owner document when appending styles to `document.body`

**Hooks** `v.1.6.2`

- Fix potential infinite loop in `useDisclosure`'s `onOpen` and `onClose`
  callbacks. The fix is to wrap the callbacks in `useCallbackRef`

**Menu** `v1.7.7`

- Fixed an error where the `onOpen` was called multiple/infinite times
- Fix issue where `computePositionOnMount` didn't work without explict value

**Radio** `v1.3.12`

- Fix issue where props are duplicated on child label and span elements
- Removed `aria-readonly` from checkbox in favor of WCAG `4.1.2`

**Utils** `v1.8.4`

- Use `fromEntries` polyfill from `@chakra-ui/utils`

**Switch** `v1.2.12`

- Fix issue where focusing the `Switch` could lead to unexpected page scrolls.

**System** `v1.7.5`

- Fixed a bug in `useToken` where it wasn't possible to resolve some tokens
  which contain dots like `useToken('space','1.5')`

**Gatsby Plugin** `2.0.2`

- Update `peerDependencies` to support new version

## 14-10-2021

`@chakra-ui/react@1.6.10`

**Radio** `v1.3.11`

- Add support for styling the container element based on the radio state

**Popover** `v1.8.5`

- Fix issue where `computePositionOnMount` didn't work without explict value

**Utils** `v1.8.3`

- Fixed iframe bug on firefox when using `getRelatedTarget` function
- Fix issue where pan-event utils don't work within iframe

**Hooks** `v1.6.1`

- Forward `threshold` options from `usePanSession` to `PanSession` class

**Slider** `v1.4.1`

- Fix issue where value can't be changed when range-slider thumbs are stacked

**Modal** `v1.9.2`

- Fix issue where modal doesn't close when the escape key is pressed and
  `closeOnOverlayClick` is `false`

**Cli** `v1.5.3`

- Fixed an issue where the CLI tokens command exited unexpectedly with:
  `SyntaxError: Cannot use import statement outside a module`

**Checkbox** `v1.5.8`

- Fix issue where `tabIndex` property isn't passed to the underlying input
  element

## 05-10-2021

**Button** `v1.4.4`

- Added missing `@chakra-ui/react-utils` import

**Slider** `v1.4.0`

- Move hard-coded styles to slider's theme
- Add support for multithumb slider. We now have `useRangeSlider`, `RangeSlider`
  and `RangeSlider*` components

```jsx live=false
<RangeSlider>
  <RangeSliderTrack>
    <RangeSliderFilledTrack />
  </RangeSliderTrack>
  <RangeSliderThumb index={0} />
  <RangeSliderThumb index={1} />
</RangeSlider>
```

**Transition** `v1.3.5`

- Updated transition variants for drawer animations to prevent it from
  disappearing when placement conditionally changes

**Cli** `v1.5.2`

- Fixed an issue where the CLI failed with
  `SyntaxError: JSON5: invalid character`.

**Theme** `v1.10.3`

- Refactor slider theme from slider.tsx to slider's theme

**Toast** `v1.3.1`

- Allow alerts rendered by useToast and createStandaloneToast to be discovered
  by role and accessible name (e.g. using Testing Library
  [ByRole](https://testing-library.com/docs/queries/byrole/)).

## 20-09-2021

**Theme Tools** `v1.2.1`

- Replace `tinycolor2` with `@ctrl/tinycolor` to get better tree-shaking
  benefits

**Theme** `v1.10.2`

- Replace `tinycolor2` with `@ctrl/tinycolor` to get better tree-shaking
  benefits

**Checkbox** `v1.5.7`

- Add state `data-*` attributes to the checkbox `container` to allow user style
  the `_checked`, `_invalid` and `_disabled` states

**Slider** `v1.3.0`

- Add `RTL` support by using the theme's direction ("ltr" or "rtl") to set the
  default `isReversed` property when the `orientation` is `horizontal`

**Modal** `v1.9.0`

- **Drawer:** Add support for RTL-aware placement values. You can now pass
  `start` and `end` values. The drawer will use `left/right` placement depending
  on the specified `theme.direction` value.
- **Drawer**: omit the `motionPreset` prop type since `Drawer` only implements
  the `Slide` transition, unlike `Modal` that allows you switch its motion
  preset.

**Image** `v1.0.20`

- Fix issue where onload doesn't get called when using srcset
- If the user doesn't provide a `fallbackSrc` or a `fallback` `ignoreFallback`
  is applied by default

**Anatomy** `v1.0.1`

- Add missing breadcrumb part
- Add container part to checkbox

**Popper** `v2.3.0`

- `usePopper` now accepts a `direction` prop so it can handle placement for RTL
  languages. Values such as `top-start`, `top-end`, `bottom-start` and
  `bottom-end` will be flipped depending on the theme's direction value.

In addition to the default `popper.js` placement, you can pass `start-start`,
`start-end`, `end-start` and `end-end`. This will resolve to the equivalent
`popper.js` placement as well.

**Cli** `v1.5.1`

- Fixed an issue where the CLI did not resolve custom tsconfig paths.

🚨 Please note that only the first alias target from the string array will be
resolved.

```json live=false
// tsconfig.json
{
  //...
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@alias/*": ["target/*"]
      //           ^-- only the first target will be resolved
    }
  }
}
```

**Avatar** `v1.2.10`

- Fix issue where avatar blinks during API call due to its fallback logic. You
  can disable the fallback logic by setting `ignoreFallback`, just like you can
  with the `Image` component

**Toast** `v1.3.0`

- Add support for RTL-aware `position` values. You can now use `top-start`,
  `top-end`, `bottom-start` and `bottom-end` values. The toast will flip
  depending on the `direction` provided in the theme.

**Provider** `v1.6.8`

- Resolve dependency issues caused by previous release
- Add `ChakraProviderProps` type what was removed in previous release

**Menu** `v1.7.4`

- Fix issue where keyboard navigation doesn't work when `MenuButton` isn't
  rendered. This is useful in scenarios where you want the menu to be triggered
  by a command or right-click.

**Button** `v1.4.3`

- Fix issue where composing `Button` with framer-motion's `motion` factory
  breaks animation/transition

**Select** `v1.1.15`

- The disabled state of the `SelectIcon` can be reflected by a disabled
  `FormControl` or by the `isDisabled`-flag of the `select` field

## 29-08-2021

`@chakra-ui/react@1.6.7`

- Move ChakraProvider to a separate package `@chakra-ui/provider`
- Loosen types of `extendTheme` to allow recent TS compiler to work and avoid
  `Type instantiation is excessively deep and possibly infinite` errors.

This might lead to a slightly degraded autocomplete experience when extended the
theme but we promise to revisit the typings and API very soon.

> In the meantime, please use `ThemeOverrides` type to provide

**Slider** `v1.2.9`

- Fix issue where slider thumb gets focus when `onChangeEnd` changes.
- Call `onChangeStart`/ `onChangeEnd` when clicking somewhere in the
  `SliderTrack` without dragging the `DragHandle`

**Skeleton** `v1.1.18`

- Don't animate when skeleton was previously loaded

**System** `v1.7.3`

- Update `useStyleConfig` to read parts array from the new anatomy class

**Theme Tools** `v1.2.0`

- Add new helpers to the `theme-tools` package to make the process of creating
  component themes less cumbersome.

- `cssVar` - function to create css vars
- `calc` - function that makes it easy to create the css calc string
- `anatomy`- function to define and extend component parts

Creating a CSS variable in the theme

```jsx live=false
import { cssVar, calc } from "@chakra-ui/theme-tools"

const $width = cssVar("slider-width")
const $height = cssVar("slider-height")

const $diff = calc($width).subtract($height).toString()

$width.variable // => '--slider-width'
$width.reference // => 'var(--slider-width)'
```

Create a component anatomy

```jsx live=false
import { anatomy }  from "@chakra-ui/theme-tools"
import type { PartsStyle } from "@chakra-ui/theme-tools"

const btn = anatomy("button").parts("label", "container")

const newBtn = btn.extend("icon") //  extend button to include icon part

// Using the anatomy in component theme
const baseStyle: PartsStyle<typeof newBtn> = {
  // auto-complete for the component parts
  icon: {...},
  label: {...}
}
```

Added `PartsStyleObject` and `PartStyleFunction` types for easy creation of
type-safe, multipart component styles.

**Radio** `v1.3.10`

- Add `isDisabled` to `RadioGroup` to make it possible to disable all `Radio`
  inside `RadioGroup`
- Add `isFocusable` to `RadioGroup` to make it possible to define the
  `focusable`-state for all `Radio` inside a `RadioGroup`

**Provider** `v1.6.7`

- Move ChakraProvider to a separate package `@chakra-ui/provider`

**Hooks** `v1.6.0`

- Added an enabled prop to the `useOutsideClick` hook to conditionally attach
  event handlers.

- Updated the `useMenu` hook to only enable the `useOutsideClick` hook when the
  menu is open.

**Toast** `v1.2.11`

- Add correct variant type to `UseToastOptions`

**Layout** `v1.4.9`

- Fix url for `LinkBox` component

**Theme** `v1.10.1`

- Added `overview:"visible"` to `baseStyle` of `TagLabel` to avoid clipped text

## 09-08-2021

`@chakra-ui/react@1.6.6`

**Form Control** `v1.4.0`

- Added a `container` part to the `FormControl` component theme, allowing the
  root FormControl element to be themed.

```jsx live=false
import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        // create a variant named "custom"
        custom: {
          // style the root `FormControl` element
          container: {
            color: "white",
            bg: "blue.900",
          },
        },
      },
    },
  },
})
```

- Remove code that was added as a workaround for pre-releases of React
  concurrent mode.

- If an `aria-describedby` property is passed it will be joined with the id's
  from helper text and error message instead of being overwritten.

**Theme** `v1.10.0`

- Added a container part to the FormControl component theme, allowing the root
  FormControl element to be themed.

- Fixed issue where modals with `size=full` have vertical margins.

**Button** `v1.4.2`

Resolved an issue where a `Button` in loading state didn't consider the width of
`leftIcon` and `rightIcon`, resulting in layout shifts when the button leaves
the loading state. Buttons now render with the same width regardless of state.

**Checkbox** `v1.5.5`

Remove code that was added as a workaround for pre-releases of React concurrent
mode.

**Layout** `v1.4.8`

**Stack**: Ensure that when cloning children, their provided keys are preferred
over index. This prevents them from being destroyed and recreated when a child's
position in the list changes.

**Menu** `v1.7.2`

MenuList scroll to next MenuItem on keyboard navigation when there is a defined
maxHeight on MenuList.

Fix issues when rendering chakra components in different window

**NumberInput** `v1.2.9`

Remove code that was added as a workaround for pre-releases of React concurrent
mode.

**Radio** `v1.3.9`

Remove code that was added as a workaround for pre-releases of React concurrent
mode.

**Slider** `v1.2.8`

Fix issue where slider thumb doesn't show active state in firefox

**Stat** `v1.1.12`

Add container part to Stat styleConfig

**Styled System** `v1.12.2`

- Corrected `parseGradient` function so that it checks for CSS functions.
  Previously, using the CSS calc function would result in invalid CSS being
  generated. The expectation is that:

```jsx live=false
<Heading bgGradient="linear(to-r, green.200, pink.500 calc(20px + 20px))">
  Chakra-UI: Create accessible React apps with speed
</Heading>
functions similar to linear-gradient which handles using a CSS function

<Heading
  bgImage="linear-gradient(
    to right,
    var(--chakra-colors-green-200)),
    var(--chakra-colors-pink-500 calc(20px + 20px))"
>
  Chakra-UI: Create accessible React apps with speed
</Heading>
```

- Grid props type definitions now correctly reflect the implemented behavior in
  regard to tokens.

**System** `v1.7.2`

Fix type definitions for `apply` prop. The `apply` prop supports responsive
styles:

```jsx live=false
// Before: type error, expects `string` for `apply`
<Text apply={{ sm: 'styles.h3', lg: 'styles.h4' }}>

// After: no type error, expects `ResponsiveValue<string>` for `apply`
<Text apply={{ sm: 'styles.h3', lg: 'styles.h4' }}>
```

**Tooltip** `v1.3.9`

Fix tooltips not closing when `openDelay` is set

**Utils** `v1.8.2`

- Remove code that was added as a workaround for pre-releases of React
  concurrent mode.
- Fix issues when rendering chakra components in different window

## 08-07-2021

`@chakra-ui/react@1.6.5`

**CLI** `@1.5.0`

- Enable esModuleInterop for `chakra-cli tokens`
- Token generation supports non valid JS keys for components

**Utils** `v@1.8.1`

- Fixed a circular dependency which was causing warnings when bundling Chakra
  with `rollup`.

**System** `v@1.7.1`

- Fix issue where undefined style props (such as `borderRadius`) would not
  fallback to the default styles

## 16-06-2021

`@chakra-ui/react@1.6.4`

**Button** `v1.4.0`

- Add `className` prop to button load spinner.
- Update transitions to use theme tokens and remove outline transitions.

**Media Query** `v1.1.0`

- `useBreakpointValue()` now supports receiving a `defaultBreakpoint` as the
  second argument to support SSR/SSG.

**Styled System** `v1.12.0`

- Added the `_activeStep` pseudoselector which is applied when
  `aria-current="step"`.
  [See the `wai-aria` documentation](https://www.w3.org/TR/wai-aria-1.2/#aria-current)

**System** `v1.7.0`

- The `styled` function allows a functional `baseStyle` property.

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

- The `tokens` command now supports generating theme token type definitions from
  a Chakra UI theme published as a package:

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

- Update transitions to use theme tokens and remove outline transitions.

**Hooks** `v1.5.3`

- Fix inconsisent id generation between client and server.

**Menu** `v1.6.4`

- Fix issue where `closeOnSelect` won't work sometimes.
- Update transitions to use theme tokens and remove outline transitions.

**Popover** `v1.7.2`

- Fix issue where arrowshadowcolor didn't work.

**React** `v1.6.4`

- Fix inconsisent id generation between client and server.

**Stat** `v1.1.10`

- Export TypeScript interface `StatGroupProps`.

**Tabs** `v1.5.2`

- Render tab indicator at the correct position.
- Update transitions to use theme tokens and remove outline transitions.

**Theme** `v1.9.1`

- Fix an issue where the distance to the next element below a textarea was too
  large in some browsers.
- Update transitions to use theme tokens and remove outline transitions.

**Toast** `v1.2.8`

- Resolved an issue where `overflowX` couldn't be used within a toast's `title`
  or `description` by adding `maxWidth="100%"` to the containing div.

**Transition** `v1.3.2`

- Fixed an issue in the Collapse transition's enter animation in case of
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

- Added ring style props to make it easier to style an element's focus ring
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

- Added css variable based API to apply css filter properties (blur,
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

- Added css variable based API to apply css transform properties (translateX,
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

- Add blur token values for `filter` and `backdropFilter`.

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

- Fix issue where FormLabel could not be used without form-control.

**Menu** `v1.6.2`

- Fix issue where typeahead overrides input keydown.

**React** `v1.6.2`

- `ChakraProvider` now accepts the prop `cssVarsRoot` which defaults to
  `:host, :root`.

**System** `v1.6.6`

- Attach CSS vars to `:host, :root` to fix usage in shadow dom.

**Transition** `v1.3.1`

- Fix issue where `onAnimationComplete` is not forwarded to motion element.

## 04-05-2021

`@chakra-ui/react@1.6.1`

**Popover** `v1.7.0`

- Add an export for `usePopoverContext` hook.

**Transition** `v1.3.0`

- Add support for tweaking the enter-exit transitions. Affected components:
  `Fade`, `Slide`, `SlideFade`, `SlideScale`, `Collapse`.

```jsx live=false
<Fade
  transition={{
    enter: { duration: 0.3 },
    exit: { duration: 0.1 },
  }}
/>
```

- Fix issue where `Collapse` animation hide overflow when it expands. Collapse
  transition how shows overflow when it's expanded and hides overflow when it's
  collapsed.

- Add support for `delay` prop for all transition components.

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

- Add types for the return value of `pipe` function.
- Update user agent assertions.
- Add walkObject helper to iterate over all keys including nested.

**React Env** `v1.0.4`

- Update mock window.

**Menu** `v1.6.1`

- Fix issue where `closeOnSelect` didn't work for menuitem options.

**Modal** `v1.8.5`

- Fix types for modal overlay fade config.

**Slider** `v1.2.5`

- Fix issue where `onChangeStart` doesnt get called.
- Fix issue where slider thumb remains tabbable when `isDisabled={true}`.
- Fix issue where `onChangeEnd` doesn't get called when you click anywhere on
  the track.

**Styled System** `v1.10.5`

- Refactored the creation of the theme css vars.

## 23-04-2021

`@chakra-ui/react@1.6.0`

**Gatsby Plugin** `v2.0.0`

- Upgrading to this new major version is recommended for everyone as it fixes
  hot reloading in Gatsby (Fast Refresh). In the previous version changes to the
  shadowed theme.js file didn't trigger automatic reloading, and a manual reload
  was necessary.

- The `isUsingColorMode` option was removed. The `ChakraProvider` will always
  use the `ColorModeProvider`.
- The `isResettingCSS` option was renamed to `resetCSS`. Those changes were made
  to use the current ChakraProvider and align the prop names.

Improvements

- Use `ChakraProvider` instead of the outdated `ThemeProvider` pattern.
- Add `initialColorMode` to the `ColorModeScript`.
- Allow Fast Refresh reloading of all theme files.
- Set stricter `peerDependency` on `gatsby` (to ^2.29.3 || ^3.0.0).

**Accordion** `v1.3.0`

- Update tabs and accordion to use updated descendants logic.

**Menu** `v1.6.0`

- Update menu to use new descendants logic.
- Fix issue where menu doesn't select menu item when the first item is disabled.
- Fix issue where menu doesn't work when an input is used within it.
- Fix issue where menu button doesn't work with truncated text.

**Pin Input** `v1.6.0`

- Update pin-input to use the new descendants logic.

**React** `v1.6.0` & **Theme** `v1.8.4`

- The `extendTheme` function allows you to pass multiple overrides or
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

- Update tabs and accordion to use updated descendants logic.
- Add support for RTL keyboard navigation.

**Utils** `v1.7.0`

- Add `pipe` function.
- Add generic to `isFunction` guard.

**Button** `v1.3.1`

- Resolved an issue where the `type` prop of the `Button` component was set to
  `undefined`.

**Progress** `v1.1.8`

- Fix hyperlink to docs.

**React Utils** `v1.1.2`

- Update types for `mergeRefs` to include null.

**Gatsby Starter Default** `v0.3.0`

- Updates to Gatsby-related documentation to account for the breaking changes
  made in PR #3841. The "Providers" section from the Gatsby guide was removed as
  the plugin itself handles everything already.

## 19-04-2021

`@chakra-ui/react@1.5.2`

**Button** `v1.3.0`

- Added `spinnerPlacement` prop to allow changing the spinner placement for the
  button when `isLoading` is `true`. Spinner placement can be either `start` or
  `end`.

```jsx live=false
<Button isLoading spinnerPlacement="end">
  Click me
</Button>
```

**Checkbox** `v1.5.0`

- Add `isDisabled` prop to `CheckboxGroup`.

**Hooks** `v1.5.0`

- Add pan session hook `usePanGesture` for detecting pan gestures.
- Update `useLatestRef` to inline value updates. Not concurrent mode safe but
  works for now.
- Add `useEventListenerMap` to provide an elegant way of attaching several
  pointer event to the `document` or an element.

**Menu** `v1.5.0` & **Popover** `v1.6.0` & **Tabs** `v1.4.0`

- This change restores the behavior of the `isLazy` prop (which was broken by
  the previous release) and adds a new `lazyBehavior` prop which configures the
  behavior of `isLazy`.

If you'd like the content of tab panel, popover and menu components to be
unmounted when not selected or opened, please continue to use `isLazy`. This is
the default behavior.

If you'd like the content of tab panel, popover and menu components to remain
mounted (but hidden) after it was previously selected or opened, use
`lazyBehavior="keepMounted"` in combination with `isLazy`.

**Utils** `v1.6.0`

- Add lazy content utility for disclosure components like popover, menu, tab,
  etc.
- Add pan session class to handle pan gestures. This is used in the slider logic
  and sharable with vue library.
- Perfomance: Throttle pan move events to once per frame which improves the
  slider's `onChange` call performance.
- Update types for internal pointer event.

**React Env** `v1.0.2`

- Fix bug where `EnvProvider` breaks SSR.

**Modal** `v1.8.3` & **Theme** `v1.8.3`

- Fixed an issue where the modal exceeded the viewport height on iOS.

**Slider** `v1.2.3`

- Fix issue where slider doesnt work after first slide.
- Avoid exccess `onChange` calls.

**Stat** `v1.1.7`

- Fixed a11y issue related to `StatHelpText`. It was using an invalid `dl` child
  tag.

**Styled System** `v1.10.3`

- Fixed an issue where thtransition props are not resolved correctly.

## 13-04-2021

`@chakra-ui/react@1.5.1`

**Hooks** `v1.4.0`

- Add support for passing function that returns element to `useEventListener`
  and `usePointerEvent`.

**Menu** `v1.4.0`

- Add `closeOnSelect` to `MenuItem` and `MenuItemOption`.
- Do not unmount menu list after first render.
- Use prop getter from use-popper to prevent ssr content jump.

**Transition** `v1.2.0`

- Allow custom transition variants.

**Button** `v1.2.2`

- Fix alignment of icon inside button.
- Update button group styles to use rtl-friendly equivalent.

**Clickable** `v1.1.2`

- Add missing dependency issue of `@chakra-ui/react-util`.

**Editable** `v1.1.2`

- Update focus-on-mousedown util to avoid memory leak.

**React Env** `v1.0.1`

- Fix issue where window could be null Skip logic when `environment` prop is
  passed.

**Input** `v1.2.2`

- Remove unused padding-x from input element.

- Update input addon and element style handling.

**Layout** `v1.4.2`

- Fix RTL styles for OrderedList and UnorderedList.

**Popover** `v1.5.1`

- Fix RTL styles for close button.

- Do not unmount lazy popovers after first render.

- Update focus-onmousedown to avoid memory leak.

- Use prop-getters from use-popper to prevent ssr content shift.

**Popper** `v2.1.1`

- Update README for the `popper.js` wrapper.

**Progress** `v1.1.6`

- Fix an issue where `CircularProgress` with `isIndeterminate` doesn't show the
  indicator

**React** `v1.5.1`

- Fixed typing issues for `extendTheme` where variant overrides lead to an TS
  error.

- Add `EnvironmentProvider` to `ChakraProvider` for better window and document
  detection across hooks and components.

**Spinner** `v1.1.6`

- Fix issue where spinner base-style cant be overriden.

**System** `v1.6.2`

- Allow passing custom props to `useStyleConfig`.
- Add missing dependency issue of `@chakra-ui/react-utils`.

**Tabs** `v1.3.2`

- Do not unmount lazy tabs when unselected.

**Theme** `v1.8.2`

- Changes incorrect `panel` part name in `Progress` theme file to `label`.

- Update input, alert and tabs RTL styles.

**Toast** `v1.2.3`

- Fix RTL styles for toast component.

**Tool tip** `v1.2.3`

- Use prop-getters from use-popper to prevent ssr content shift.
- Add missing dependency issue of `@chakra-ui/react-utils`.

**Utils** `v1.5.2`

- update type signature for `px` function.

## 07-04-2021

`@chakra-ui/react@1.5.0`

**React** `v1.5.0`

- Bump package as minor.
- Resolved a peer dependency resolution issue reported by yarn2, npm7, and other
  more modern package managers.

**Popover** `v1.5.0`

- Return prop getters for popover header and body and use ref callback to
  determine element's presense instead of useEffect.
  [#3733](https://github.com/chakra-ui/chakra-ui/pull/3733)

- Add support for `rootProps` to `PopoverContent` to allow passing props to
  popover's positioner.
- Make it possible to add custom motion `variants` so users can orchestrate
  custom transitions.
- Move popover arrow shadow color computation to popover's theme.
- Update import of shared utils from `react-utils` to `utils`.

**Popper** `v2.1.0`

- Add prop getters for popper and arrow for better ssr support.
- Replace `utils` dependency with `react-utils`.

**Table** `v1.2.0`

- Add `TableContainer` component to help tables scroll horizontally when
  overflowing.

```jsx live=false
<TableContainer>
  <Table>
    {...}
  </Table>
</TableContainer>
```

**Checkbox** `v1.4.1`, **Radio** `v1.3.1`

- Update import of shared utils from `react-utils` to `utils`.
- Replace `withFlushSync` with `scheduleMicrotask` callback to prevent ReactDOM
  warning.

**Form Control** `v1.3.1`

- Refactor form label to use prop getter instead of hook for better consistency.
- Replace `withFlushSync` with `scheduleMicrotask` callback to prevent ReactDOM
  warning when an element us focused by calling `.focus()`. This works as well
  in concurrent mode.

**Modal** `v1.8.1`

- Resolved a peer dependency resolution issue reported by yarn2, npm7, and other
  more modern package managers.
- Omit scroll-behavior from drawer props.

**Number Input** `v1.2.1`

- Replace `withFlushSync` with `scheduleMicrotask` callback to prevent ReactDOM
  warning.

**Progress** `v1.1.5`

- Fix issue in safari where circular progress indicator shows a tiny bit when
  value is `0`.

**React Utils** `v1.1.1`

- Update prop getter v2 type to take second parameter.
- Update import of shared utils from `react-utils` to `utils`.
- Replace `withFlushSync` with `scheduleMicrotask` callback to prevent ReactDOM
  warning.

**Select** `v1.1.5`

- Fix RTL styles for select field to use `paddingEnd` instead of `pr`.

**Theme** `v1.8.1`

Popover

- Moved `maxW` from popover's `popper` to `content` to allow for better control
  of the popover's width.
- Use `width` instead of `maxW` to allow users more control of popover's width.
- Use `--popover-bg` css property to control popover and arrow background.

```jsx live=false
<PopoverContent style={{ "--popover-bg": "purple" }}>
  <PopoverArrow />
</PopoverContent>
```

- Add popover arrow shadow color.

Select

- Update select icon to use insetEnd instead of right for RTL.

Skip Link

- Update styles to use insetStart instead of left for RTL.

Table

Update text align attribute to use end instead of right for RTL.

**Theme Tools** `v1.1.3` & **Transition** `v1.1.2`

- Fix issue where `warn` doesn't get called.

**Toast** `v1.2.2`

- Take into account safe area insets for Toasts.

**Tooltip** `v1.3.1`

- Resolved a peer dependency resolution issue reported by yarn2, npm7, and other
  more modern package managers.

**Utils** `v1.5.1`

- Update import of shared utils from `react-utils` to `utils`.
- Replace `withFlushSync` with `scheduleMicrotask` callback to prevent ReactDOM
  warning.
- Import types for `warn` function.

## 30-03-2021

`@chakra-ui/react@1.4.2`

**Accordion** `v1.2.0`

- Extract all react based utilities and types to `@chakra-ui/react-utils`.

**Avatar** `v1.2.0`

- Fix RTL styles.

**Checkbox** `v1.4.0`

- Add `getRootProps` to `useCheckbox` hook to manage props passed to checkbox
  container.

- Forward `onFocus`, `onBlur` and `aria-\*` props to the input element for
  better integration with form libraries.

- Ensure the checkbox works when the root element is not label. This helps to
  fix the current accessibility issues with the Switch component when wrapped
  within `FormControl`.

**Counter** `v1.1.0`

- Expose `setValue` function to allow update state without calling `onChange`.
- Fix issue where `onChange` is called when value did not change.

**Form Control** `v1.3.0`

- Refactor `useFormControlProvider` to return prop getters `getHelpTextProps`,
  `getErrorMessageProps`, and `getRootProps`.

- Detect helper text and error message using ref callback instead of
  `useLayoutEffect`.

- Update `aria-describedby` id to include feedbackId only when `isInvalid` is
  true.

- Create `useFormControlProps` to provide a way to get the resolved form control
  props `isInvalid`, `isDisabled`, instead of HTML attributes. This will make it
  easier to integrate with number-input, checkbox, and switch.
- Fix concurrent mode issue with setting state in focus event handler. We use
  withFlushSync helper to achieve this.

**Hooks** `v1.3.0`

- useControllableState: The onChange callback will be called only if the new
  value isn't equal to the current one.

**Layout** `v1.4.0`

- Remove redundant role attribute from divider.
- Fixed the bug where a margin- bottom would get applied to `direction=row `of
  stack when using responsive props.

- Fix issue where AbsoluteCenter doesn't have `position: absolute`.

**Number Input** `v1.2.0`

- Forward `aria-\*` props to the input element.

- Fix issue where `onChange` was called on mount.
- Fix issue where `onBlur` was called twice.
- Memoize all callback props `onFocus`, `onBlur`, `getAriaValueText`.
- Refactor implicit `useFormControl` logic to be called from NumberInput
  instead.

- Call `setFocused.on` with `ReactDOM.flushSync` to prevent concurrent mode
  issue where setting state in onFocus affects onChange event handler.

**Styled System** `v1.1.0`

- Add support for css variable tokens. This means you can create a css variable
  and reference value in the tokens.

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

- Fixed an issue where the `StylesProvider` export was not working in every
  environment.

- Add style config for upcoming `rotateX`, `rotateY`, `scaleX`, `scaleY` style
  props.

**Theme** `v1.8.0`

- Remove 0 token value from spacing tokens. 0 maps to 0 and there's no need to
  create a css custom property for that.

**Switch**

- Add container part
- Use css vars to handle styles
- Fix RTL styles

**Stat, Table**

- Fix RTL styles

**Utils** `v1.5.0`

- Add `withFlushSync` function wrapper to help resolve concurrent mode and
  onFocus state issues.

**Toast** `v1.2.1`

- Bump `@reach/alert` to fix yarn pnp issue.

## 21-03-2021

`@chakra-ui/react@1.4.1`

**Styled System** `v1.9.1`

- Fix issue where `textStyle` doesn't get applied.

## 20-03-2021

`@chakra-ui/react@1.4.0`

**React** `v1.4.0`

- Added support for `framer-motion` v4.

**Popper** `v2.0.0`

- Refactor the positioning logic to improve stability and leverage CSS custom
  properties.

**Styled System** `v1.9.0`

- Fix issue where responsive styles defined in text styles not overridden by
  style props.
- Fix issue where `toCSSVars` omitted the transition tokens.
- Fix issue where RTL property keys are incorrect due to `config.property`
  mutation.
- Added typings for the theme prop in `ThemingPropsThunk` and export a
  standalone type ThemeComponentProps. ThemingPropsThunk
- Update `mx` and `px` to use logical properties. Instead of mapping to
  `marginLeft` and `marginRight`, it maps to `marginInlineStart` and
  `marginInlineEnd`. Same for `px`.

**CLI** `v1.3.0`

- Add support for text style and layer style theme type generation to
  `@chakra-ui/cli`.

**Color Mode** `v1.1.2`

- Memoize the context value for `ColorModeProvider`.

**Editable** `v1.1.3`

- Fix issue where blur/submit fires unexpectedly if `submitOnBlur` is true and
  you try to click the cancel button.

**Radio** `v1.2.5`

- Fix issue where controlled radio group can't be cleared.
- Fix `onChange` type for use-radio-group props.

**Tag** `v1.1.3`

- Add `aria-label` to tag close button.

**Gatsby Plugin** `v1.0.2`

- Update peer-dependency range for gatsby to support the latest.

**Popover** `v1.3.0`

- Fix issue (for Safari and Firefox) where popover doesn't close when you click
  the trigger and popover is open.

## 05-03-2021

`@chakra-ui/react@1.3.4`

**System** `v1.4.0`

- Add support for CSS Variables to the core of Chakra.
- Improve style computation performance by 2.5x.
- Adds support for main in chakra factory

**Styled System** `v1.8.0`

- Add support for CSS Variables to the core of Chakra.
- Improve style computation performance by 2.5x.

**Theme** `v1.7.0`

- Add new config property cssVarPrefix to add a custom prefix for CSS variables.
  It defaults to `chakra`.
- TabPanels component can now be styled from Tabs component theme, specifying
  the tabpanels part.
- Fix full size modal with y-overflowing content behaviour
- Fix border styles for alert and number input
- Provide proper typings for `ThemeOverride.components`.
- Resolved an issue where optgroup in dark mode was unreadable on browsers that
  allow select contents styling.

**Theme Tools** `v1.1.0`

- Update implementation of create-breakpoints to reduce code logic. Add
  deprecation message

**Hooks** `v1.1.5`

- Add support to format - Optional string. Set the MIME type of what you want to
  copy as. Use text/html to copy as HTML, text/plain to avoid inherited styles
  showing when pasted into rich text editor.

**Layout** `v1.3.2`

- SimpleGrid: Avoid grid blow by adding `minmax(0, 1fr)`.
- Simplify wrap style management to use CSS custom properties.

**Popper** `v1.1.5`

- Make the react-popper state in sync with the internal popper instance state

**React** `v1.3.4`

- Fixed an issue where extending the theme with custom breakpoints with
  `strictNullChecks: false` in tsconfig.json lead to an error.

**Select** `v1.1.2`

- Resolved an issue where optgroup in dark mode was unreadable on browsers that
  allow select contents styling.

**Slider** `v1.1.2`

- onChangeEnd won't be called if value doesn't change.

## 13-02-2021

`@chakra-ui/react@1.3.3`

**Color Mode** `v1.1.0`

- You can now customize the `nonce` of the `<script>` that `ColorModeScript`
  creates by passing `nonce` prop.

**Focus Lock** `v1.1.0`

- Upgrade to react-remove-scroll@2.4.1 and react-focus-lock@2.5.0 to fix React
  17 peer dependencies compatibility.

**Checkbox** `v1.2.3` & **Radio** `v1.2.3`

- Improve the semantic HTML structure of checkbox.

**Popper** `v1.1.4`

- The popper.js instance is now created only once it is actually needed for
  positioning.

**React** `v1.3.3`

- The extendTheme function uses the type Theme again.

**Theme** `v1.6.2`

- Export Recursive\* types from theme, styled-system.
- Bring back the TS type Theme export and deprecated DefaultChakraTheme.
- Allow halved values in design token in spacing as mentioned in the documents.

**CLI** `v1.2.1`

- CLI tokens command now ignores TS errors in your theme file.

## 06-02-2021

`@chakra-ui/react@1.3.2`

**Pin Input** `v1.4.0`

- Resolved an issue where completing character entry in PinInput failed to call
  `onComplete`.

**React** `v1.3.0`

- Introducing a generic TypeScript type `ChakraTheme` to improve the
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

- Fixed issue in `extendTheme` where overrides defined as function replaced all
  base styles defined as a plain object.
- Fixed an issue where the TypeScript types were too narrow for component
  defaultProps and ComponentMultiStyleConfig.

**Styled System** `v1.7.0`

- Theme Typings: Add autocomplete for negative space values.
- Add support for `textStyle` and `layerStyle` in styled-system package. This
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

- Refactored `apply` prop handling to use the style config pattern instead of
  add it imperatively.
- Allow numbers for `borderTop` and provide autocomplete for `fontWeight` prop.
- Support negative scale values for css variables.

**System** `v1.3.0`

- Add support for responsive values when using `apply`, `textStyle` and
  `layerStyle`.

**Theme** `v1.6.0`

- Fixed an issue where a `Tooltip` with negative `gutter` causes flickering on
  hover.
- Fixed an issue in Firefox where `Input` overflows it's flex container.

**CLI** `v1.2.0`

- Theme Typings: Add autocomplete for negative space values

**Accordion** `v1.1.2` & **Avatar** `v1.1.2` & **Button** `v1.1.2` &
**Checkbox** `v1.2.2` & **Radio** `v1.2.2`

- Provide better typings for `size` and `variant` for `AvatarGroup`,
  `CheckboxGroup`, `ButtonGroup`, and `RadioGroup`

**Color Mode** `v1.0.7`

- Fix issue where reading from localStorage maybe fail due to several reasons
  (SecurityError, Uncaught DOMException, TypeError, etc.)

**Input** `v1.1.1`

- Fixed the typo in `InputProps` interface due to which theming types were not
  correct.

**Tool tip** `v1.1.1`

- Fixed an issue where a `Tooltip` with negative `gutter` causes flickering on
  hover.

## 31-01-2021

`@chakra-ui/react@1.2.1`

**System** `v1.2.1`

- Allow string values for ThemingProps['colorScheme']

**CLI** `v1.1.0`

- Add minor bump for adding subcommand tokens to generate Theme Typings &
  Republished with version 1.1.0.

## 31-01-2021

`@chakra-ui/react@1.2.0`

**Color Mode** `v1.0.6`

- `useColorModeValue` defaults to light mode on first render if system color
  mode is used.

**Hooks** `v1.1.3`

- Update reference to document.addEventListener to detect owner document based
  on ref passed. This would help detect outside click currently from within an
  iframe.

**Layout** `v1.3.0`

- Update transform style for AbsoluteCenter when axis is both
- Add `shouldWrapChildren` to Wrap component to make it possible use Wrap
  directly without thinking about WrapItem.
- Update `LinkBox` and `LinkOverlay` components and make them public in docs.

**Menu** `v1.1.0`

- The `MenuItem` now accepts a `commandSpacing` prop that can be used to adjust
  the space between the command and label.
- Add support `rootProps` to `MenuList` so it's possible override the styles for
  root container for menu list. Common use case is to change the applied zIndex
  of the menulist.
- Make it possible to override `zIndex` by passing props to `MenuList`.

**Modal** `v1.5.0` & **Tool tip** `v1.1.0`

- Add support for forwarding props to the underlying Portal component. Pass the
  portalProps prop to achieve this.
- `containerRef`: ref for the element where to mount the portal.
- `appendToParentPortal`: If false, it'll opt out of portal nesting.

**Portal** `v1.1.0`

- Add support for `appendToParentPortal={false}` to opt out of nested portals.
- Fix issue with portal zIndex container where it renders elements outside of
  view.
- Renamed `getContainer `prop to `containerRef` to make it possible to pass the
  ref directly. This affects the `Modal` component primarily.

**Styled System** `v1.6.0`

- Fix issue where CSS color names are not passed correctly.
- Improved theme typing in order to provide a better autocomplete experience.

**Tabs** `v1.1.0`

- The `useTabsContext` hook is now exported and can be used in user land.

**Theme** `v1.5.0`

- Add `8xl` to size tokens.

## 24-01-2021

`@chakra-ui/react@1.1.6`

**Layout** `v1.2.0`

- Add AbsoluteCenter component to help manage centering of an element relative
  to its parent dimensions

**Pin Input** `v1.2.0`

- Added an `otp` flag to `PinInput` that sets the autoComplete value of
  PinInputField to "one-time-code"

**Hooks** `v1.1.2`

- Fixed issue where using an uncontrolled RadioGroup without a defaultValue
  causes multiple radio options can be selected

**Portal** `v1.0.6`

- Fixed portal z-index wrapper squashing portaled elements

**Popover** `v1.1.0`

- Add `flip` prop to Popover to change the placement when it is scheduled to
  overflow a given boundary

## 17-01-2021

`@chakra-ui/react@1.1.5`

**Popper** `v1.1.0`

- Added enabled property to `usePopper`. Popper won't be updated while it is set
  to false. Menu now uses this option to not update its position while it's
  closed.

**Styled System** `v1.5.0`

- Move `srOnly` prop to styled system props. This will deprecate the need for
  the visually hidden package. Less is more!

```jsx live=false
  // If `true`, hide an element visually without hiding it from screen readers.
  <Box srOnly>Visually hidden</Box>

  // If `focusable`, the sr-only styles will be undone, making the element visible to sighted users as well as screen readers.
  <Box srOnly _active={{ srOnly: "focusable" }}>Visually hidden but shown on focus
  </Box>
```

- Add `polyfill` for inset style prop as the CSS inset doesn't work in Safari
  Add missing style props for grid and flex layouts: gridTemplate, gridRowStart,
  gridRowEnd, flexFlow, clipPath

**Checkbox** `v1.1.2`

- Update styles to use css logical style props

**Hooks** `v1.1.1`

- Resolved an issue where event handlers for certain components were removed
  after the first event occurred.
- Fixed SSR issue with useId hook.

**Menu** `v1.0.5`

- Update styles to use css logical style props
- Added enabled property to usePopper. Popper won't be updated while it is set
  to false. Menu now uses this option to not update its position while it's
  closed.

**Popover** `v1.0.7`

- Popover now won't update its popper position while it's closed.

**Portal** `v1.0.5`

- Fixed issue where adding `portalZIndex` to `ChakraProvider` makes app unusable

**Progress** `v1.0.5`

- You can now override linear progress component's border radius in the theme.

**Radio** `v1.1.2`

- Update styles to use css logical style props.

## 11-01-2021

`@chakra-ui/react@1.1.4`

**Hooks** `v1.1.0`

- Added `useCallbackRef` hook for persisting a value between renders and
  updating it if it changes.
- Deprecated `useLatestRef`, `useEventCallback`, and `useMouseDownRef`. These
  functions will be removed in a future major version.

## 10-01-2021

`@chakra-ui/react@1.1.3`

**Styled System** `v1.4.0`

- Fixed a bug where `rgb` values in `bgGradient` did not work correctly
- Due to Safari not support css logical properties for `right`, and `left`, we
  added polyfill for these css logical properties.
- Add support for css media query and dark class selectors.

**Theme** `v1.4.0`

- Add the `2xl` breakpoint to the theme which maps to `96em` or `1536px`.

**Media Query** `v1.0.3`

- Fixed `useBreakpoinValue` infinite loop due to bug in `createMediaQueries`.

**Portal** `v1.0.3`

- Fixed issue where elements within portal used in an iframe got rendered
  outside of the iframe. Portal now smartly detects its document owner and
  attaches its node to the correct document.body
- Removed extra DOM node `PortalManager` creates. Less is more!

**Skeleton** `v1.0.7`

- Fixed a bug where SkeletonText kept its fixed dimensions when isLoaded is
  true.

**Tabs** `v1.0.4`

- Fixed issue where Tab button no longer has `aria-selected="false"` when it is
  inactive.

## 03-01-2021

`@chakra-ui/react@1.1.1`

**Button** `v1.0.3`

- Update the style props applied for `leftIcon` and `rightIcon` to support RTL.
  Changed `ml` and `mr` to marginStart and marginEnd respectively.
- Update the style props applied when isLoading is `true`. Changed `marginRight`
  to `marginEnd`.

**Stack**

- Update `directionStyles` to use logical CSS properties for RTL support.
- Changed `marginLeft` and `marginRight` to `marginStart` and `marginEnd`
  respectively.

**Styled System** `v1.3.1`

- Add missing `borderStart`, and `borderEnd` types for for style and color.
- Sort `Object.assign` keys in `configs/border.ts` for better readability.

Other RTL fixes:

- Alignment for the close icon for `Tag`, `Modal`, and `Drawer` components to
  support RTL.
- Add RTL storybook toolbar to make it easy to test RTL layouts.

## 28-12-2020

`@chakra-ui/react@1.1.0`

**React** `v1.1.0`

- Add gradient support to chakra style props :sparkles: see
  https://chakra-ui.com/docs/features/gradient for more information
- Add rtl support :sparkles: see https://chakra-ui.com/docs/features/rtl-support
  for more information
- Improve `extendTheme` typings & accept optional second argument `baseTheme`.

**Checkbox** `v1.1.0`

- Deprecated the `defaultIsChecked` prop in favor of `defaultChecked`.

**Radio** `v1.1.0`

- Deprecated the `defaultIsChecked` prop in favor of `defaultChecked`.
- Resolved an issue where uncontrolled Radio components used outside of
  RadioGroup were not working.

**Styled System** `v1.3.0`

- Improved performance

**Pin Input** `v1.1.2`

- Resolved an issue where PinInputField rendered an input with
  `autocomplete="not-allowed"` instead of `autocomplete="off"`.

**Skeleton** `v1.0.4`

- `SkeletonText` now accepts the props `fadeDuration` and `speed` and animates
  its children, like the `Skeleton` component.

## 18-12-2020

`@chakra-ui/react@1.0.4`

⚠️ Peer dep version bump! framer-motion is now at 3.0.0

**Form Control** `v1.1.0`

- Add support for controlling focus lock across frames.
- Removed isLoading prop from FormControl out of a lack of need.
- Fixed an issue where FormHelperText was not rendering when parent
  FormControl.isInvalid was set.

**Modal** `v1.3.0`

- Add support for controlling focus lock across frames.

**Styled System** `v1.2.0`

- Add suppotr for css logical properties and direction in the theme for future
  RTL optimizations.

**Pin Input** `v1.1.1`

- Fixed an issue where copy pasting didnt work.

**Number Input** `v1.0.3`

- Fixed an issue where input didnt work with form libraries that rely on ref
  (e.g. react-hook-form).
- Added support to override `type` and `pattern` props.

**Input** `v1.0.3`

- Fixed an issue where removing an element didnt reset the padding.

**Skeleton** `v1.0.3`

- Fixed an issue where Skeleton.isLoading would fade the skeleton even if
  isLoading is true.

**Theme** `v1.2.2`

- Focus outline > isInvalid outline (affects all components extending from
  Input, e.g. Select, PinInput, ...)

**Utils** `v1.0.2`

- Custom breakpoints beginning with a number are now working

## 08-12-2020

`@chakra-ui/react@1.0.3`

**Pin Input** `v1.1.0`

- Internals reworked.
- Added support for type prop (`alphanumeric` | `number`).
- Added `mask` prop to provide similar utility like input type password.

**Alert** `v1.0.2`

- `Alert` now colorScheme aware (overrideable via status).

**Close Button** `v1.0.2`

- Resolved an issue where `DrawerCloseButton` was not receiving its base styles
  when it was passed other styles through the `__css` property, breaking the
  button's positioning.

**React** `v1.0.3`

- Fix too narrow TypeScript type for theme override.

## 03-12-2020

`@chakra-ui/react@1.0.2`

**Docs**

- The search functionality has returned! https://chakra-ui.com/

**Layout** `v1.1.0`

- `Divider`, `Container`, `List`, `ListItem` and `ListIcon` are now themable.

**Modal** `v1.2.0`

- `ModalCloseButton` is now themable.

**Theme** `v1.2.0`

- `AlertIcon` no longer shrinks if alert contains long text.
- Added theme support for above mentioned layout components.

**Toast** `v1.1.0`

- Allow React.ReactNode as type for title.

**Form Control** `v1.0.2`

- Remove dead props on type.

**Number Input** `v1.0.2`

- `NumberInput` is now form-control props agnostic, like Input and Select do.

**Radio** `v1.0.2`

- `Radio`is now form-control props agnostic, like Input and Select do.

**React** `v1.0.2`

- Improved types for extendTheme.

**Transition** `v1.0.2`

- Children now consistently render if "in" was true on initial render.
