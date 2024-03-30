# v3 Migration Guide

## Changed

### General

- Changed Naming convention for boolean properties from `is<X>` to `<x>`

  - isOpen -> open
  - defaultIsOpen -> defaultOpen
  - isDisabled -> disabled
  - isInvalid -> invalid
  - isRequired -> required

- Introduce new `unstyled` prop to every component to allow for unstyled
  rendering of the component or its parts

### Changes to `Show` and `Hide`

We've removed the `Hide` component in favor of hidding elements using the
`hideFrom` media queries or explicitly setting `display: none` on the element.

The `Show` component is now used to explicitly render an element based on the
condition set it `when` property. It doesn't rely on media queries.

You can combine the `useMediaQuery()` hook and `Show` to achieve the previous
`Show` and `Hide` components.

### Wrap

- Changed `spacing` to `gap`
- Changed `spacingX` to `rowGap`
- Changed `spacingY` to `columnGap`
- Remove `shouldWrapChildren` in favor of using the `WrapItem` component
  explicitly

### Stack

- Change `spacing` to `gap`

### Removed `@chakra-ui/next-js` package

We've removed the `@chakra-ui/next-js` package in favor of using the `asChild`
prop for better flexibility.

To style the Next.js image component, you can use the `asChild` prop on the
`Box` component.

```jsx
<Box asChild>
  <NextImage />
</Box>
```

To style the Next.js link component, you can use the `asChild` prop on the

```jsx
<Link isExternal asChild>
  <NextLink />
</Link>
```

### Loosened `as` prop

We no longer infer the props from element passed via the `as` prop. This caused
a lot of slow typing issues and complexity in the codebase.

Prefer to use the `asChild` prop which offers better flexibility.

> The `asChild` pattern is inspired by Radix UI.

### Removed `forwardRef`

Due to the simplification of the `as` prop, we no longer provide a custom
`forwardRef`.

Prefer to use `forwardRef` from React directly.

### Theming

Renamed all `container` parts to `root`. Kindly update your theme to reflect

### Removed Components and Packages

- Removed `ControlBox` component
- Removed `@chakra-ui/icons` package. Prefer to use [`lucide-react`](https://lucide.dev/guide/packages/lucide-react) or
  `react-icons` instead.

### Root component and types

All root components and their respective types are now suffixed with `<X>.Root`
or `<X>Root`

- `Accordion` -> `Accordion.Root`
- `AccordionProps` -> `AccordionRootProps`
- `Checkbox` -> `Checkbox.Root`
- `CheckboxProps` -> `CheckboxRootProps`
- and so on...

### Accordion

- Rename `allowMultiple` to `multiple`
- Rename `allowToggle` to `collapsible`
- Rename `AccordionButton` to `Accordion.Trigger`
- Rename `AccordionPanel` to `Accordion.Content`
- Rename `AccordionIcon` to `Accordion.Indicator`. To render a custom icon, you
  can use the `Accordion.Indicator` component and pass the icon as children.

Before:

```tsx
<Accordion>
  <AccordionItem>
    <AccordionButton>
      <AccordionIcon />
    </AccordionButton>

    <AccordionPanel pb={4}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </AccordionPanel>
  </AccordionItem>
</Accordion>
```

After:

```tsx
<Accordion.Root>
  <Accordion.Item>
    <Accordion.Trigger>
      <Accordion.Indicator />
    </Accordion.Trigger>

    <Accordion.Content pb={4}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

### Avatar

Before:

```tsx
<Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
```

After:

```tsx
<Avatar.Root name="Dan Abrahmov" src="https://bit.ly/dan-abramov">
  <Avatar.Image />
  <Avatar.Fallback />
</Avatar.Root>
```

### Breadcrumb

- Explicitly render the `separator` via `Breadcrumb.Separator`.
- Pass custom separator as children to the `Breadcrumb.Separator` component
- Explicitly render list via `Breadcrumb.List`
- Explicitly render the ellipsis via `Breadcrumb.Ellipsis`
- To add `spacing`, set the `gap` on the list element
- `listProps` has been removed. Pass props directly to `Breadcrumb.List`

Before:

```tsx
<Breadcrumb spacing="4">
  <BreadcrumbItem>
    <BreadcrumbLink as={Link} to="/home" replace>
      Breadcrumb 1
    </BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
```

After:

```tsx
<Breadcrumb.Root>
  <Breadcrumb.List spacing="4">
    <Breadcrumb.Item>
      <Breadcrumb.Link asChild>
        <Link to="/home" replace>
          Breadcrumb 1
        </Link>
      </Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
  </Breadcrumb.List>
</Breadcrumb.Root>
```

### Checkbox

- Checkbox icon is now `Checkbox.Indicator` and can be used to customize the
  checkbox icon in the checked and indeterminate state.

Before:

```tsx
<Checkbox defaultChecked>My Checkbox</Checkbox>
```

After:

```tsx
<Checkbox.Root defaultChecked>
  <Checkbox.Control />
  <Checkbox.Label>My Checkbox</Checkbox.Label>
</Checkbox.Root>
```

### Progress

Before:

```tsx
<Progress value={50} />
```

After:

```tsx
<Progress.Root value={50}>
  <Progress.Track>
    <Progress.FilledTrack />
  </Progress.Track>
  <Progress.ValueText />
</Progress.Root>
```

- `ProgressLabel` is now assigned to `Progress.ValueText`. This means the theme
  key for the label is now `valueText`

- `ProgressLabel` should now be used to provide a label for the progress bar

### Circular Progress

Before:

```tsx
<CircularProgress value={50} />
```

After:

```tsx
<CircularProgress.Root value={50}>
  <CircularProgress.Circle>
    <CircularProgress.Track />
    <CircularProgress.FilledTrack />
  </CircularProgress.Circle>
</CircularProgress.Root>
```

- `CircularProgressLabel` is now assigned to `CircularProgress.ValueText`

- `CircularProgressLabel` should now be used to provide a label for the progress
  bar

### Tag

- `TagLeftIcon` and `TagRightIcon` are removed in favor of rendering the icon
  directly inside the `Tag` component.

### Tooltip

- Move `portalProps` to `Tooltip.Positioner`

Before:

```tsx
<Tooltip label="Hey there" hasArrow>
  <Button>Hover me</Button>
</Tooltip>
```

After:

```tsx
<Tooltip.Root placement="bottom">
  <Tooltip.Trigger asChild>
    <Button>Hover me</Button>
  </Tooltip.Trigger>
  <Tooltip.Positioner>
    <Tooltip.Content>
      <Tooltip.Arrow />
      Hey there
    </Tooltip.Content>
  </Tooltip.Positioner>
</Tooltip.Root>
```

However, you can still get back to the legacy API by creating a custom
component.

```tsx
import { Tooltip } from "@chakra-ui/react"

export type CustomTooltipProps = Tooltip.RootProps & {
  label?: string
  hasArrow?: boolean
}

const CustomTooltip = (props: Props) => {
  const { label, children, hasArrow, ...localProps } = props
  const [rootProps, contentProps] = Tooltip.splitProps(localProps)

  return (
    <Tooltip.Root placement="bottom" {...rootProps}>
      <Tooltip.Trigger asChild>
        {isValidElement(children) ? children : <span>{children}</span>}
      </Tooltip.Trigger>
      <Tooltip.Content {...contentProps}>
        {hasArrow && <Tooltip.Arrow />}
        {label}
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
```

- Remove `closeOnMouseDown`, use `closeOnPointerDown` instead
- Remove all `arrow*` props in favor of rendering the `Tooltip.Arrow` component

### FormControl -> Field

Form control has now been renamed to `Field` to better reflect its purpose as an
element that represents a form field.

```tsx
<Field.Root id="first-name" isRequired isInvalid>
  <Field.Label>First name</Field.Label>
  <Input placeholder="First Name" />
  <Field.HelpText>Keep it very short and sweet!</Field.HelpText>
  <Field.ErrorMessage>Your First name is invalid</Field.ErrorMessage>
</Field.Root>
```

HelperText has been renamed to `Field.HelpText` for brevity.

### Select -> NativeSelect

- Removed `focusBorderColor` and `errorBorderColor`, consider setting the
  `--focus-color` and `--error-color` css variables instead

- Renamed `SelectIcon` to `Select.Indicator`
- Move `value` and `onChange` to the `NativeSelect.Field` component

The `Select` component has been renamed to `NativeSelect` to better reflect its
purpose as a native select element, and give room for a custom select component.

The API has also changed significantly to make it more modular.

Before:

```tsx
<Select color="red.400">
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
</Select>
```

After:

```tsx
<NativeSelect.Root>
  <NativeSelect.Field color="pink.500" placeholder="Select option">
    <option value="Option 1">Option 1</option>
    <option value="Option 2">Option 2</option>
    <option value="Option 3">Option 3</option>
  </NativeSelect.Field>
  <NativeSelect.Icon />
</NativeSelect.Root>
```

### Modal -> Dialog

- The `Modal` component has been renamed to `Dialog` to better reflect its
  purpose as a dialog element.
- Removed `containerProps` in favor of rendering the `Dialog.Positioner`
  component to better control this element.
- Renamed `ModalOverlay` to `Dialog.Backdrop`

Before:

```tsx
<Modal>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Modal Title</ModalHeader>
    <ModalCloseButton />
    <ModalBody />
    <ModalFooter />
  </ModalContent>
</Modal>
```

After:

```tsx
<Dialog.Root>
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.Header>Dialog Title</Dialog.Header>
      <Dialog.CloseTrigger />
      <Dialog.Body />
      <Dialog.Footer />
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>
```

### Drawer

- Same changes as `Dialog` above
- Renamed `DrawerOverlay` to `Drawer.Backdrop`

### Alert Dialog

We've removed the `AlertDialog` component in favor of passing the
`role="alertdialog"` to the `Dialog` component.

### Popover

- `PopoverTrigger` now renders a `button` by default. Use the `asChild` to
  switch the trigger to a different element.

- `PopoverAnchor` now renders a `span` by default. Use the `asChild` to switch
  the anchor to a different element.

- Popover now requires the `Popover.Positioner` component to control the
  position of the popover.

- Removed `containerProps` in favor of rendering the `Popover.Positioner`
  component

Before:

```tsx
<Popover>
  <PopoverTrigger>
    <Button>Trigger</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverArrow />
    <PopoverCloseButton />
    <PopoverHeader>Confirmation!</PopoverHeader>
    <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
  </PopoverContent>
</Popover>
```

After:

```tsx
<Popover.Root>
  <Popover.Trigger asChild>
    <Button>Trigger</Button>
  </Popover.Trigger>
  <Popover.Positioner>
    <Popover.Content>
      <Popover.Arrow />
      <Popover.CloseTrigger />
      <Popover.Header>Confirmation!</Popover.Header>
      <Popover.Body>
        <p>Are you sure you want to have that milkshake?</p>
        <br />
        <button>Yes</button>
        <button>No</button>
      </Popover.Body>
    </Popover.Content>
  </Popover.Positioner>
</Popover.Root>
```

### Button

The `Button` component has been simplified to remove internal complexity.

**isLoading**

Removed `isLoading` prop in favor of rendering `Spinner` component

Before:

```tsx
<Button isLoading colorScheme="blue">
  Click me
</Button>
```

After:

```tsx
<Button disabled colorPalette="blue">
  <Spinner boxSize="1em" />
  Click me
</Button>
```

Alternative approach to keep the content width but center the spinner:

```tsx
<Button disabled variant="solid" colorPalette="blue">
  <AbsoluteCenter>
    <BeatLoader size={8} color="white" />
  </AbsoluteCenter>
  <Span opacity="0">Click me</Span>
</Button>
```

**leftIcon and rightIcon**

Removed `leftIcon` and `rightIcon` in favor of rendering an icon component
inlined with the button content.

> To implement `iconSpacing`, you can use the `gap` prop on the `Button`
> component.

Before:

```tsx
<Button leftIcon={<AddIcon />}>Click me</Button>
```

After:

```tsx
<Button>
  <AddIcon />
  Click me
</Button>
```

Removed `loadingText` in favor of updating the button content directly.

Before:

```tsx
<Button isLoading loadingText="Submitting">
  Click me
</Button>
```

After:

```tsx
<Button isDisabled>
  <Spinner boxSize="1em" />
  Submitting
</Button>
```

### Table

Renamed all table components to better reflect their purpose. This also affects
the theme keys.

- Renamed `TableContainer` to `Table.Overflow`
- Renamed `Td` to `Table.Cell`
- Renamed `Th` to `Table.ColumnHeader`
- Renamed `Tr` to `Table.Row`
- Renamed `Thead` to `Table.Header`
- Renamed `Tbody` to `Table.Body`
- Renamed `Tfoot` to `Table.Footer`
- Renamed `isNumeric` to `numeric`

### Menu

- Removed `rootProps` in favor of rendering the `Menu.Positioner` component
- Renamed `MenuButton` to `Menu.Trigger`

### List

- Removed `OrderedList` and `UnorderedList` in favor of using the `List`
  component with the `as` prop.

- To change the list style type, you can use the `styleType` prop on the `List`
  component.

## Added

### Typography components

We've added `Em` , `Strong`, `Quote` and `Span` components

### `For` component

The `For` component is a new component that allows you to render a list of items
using a render prop.

```tsx
import { For } from "@chakra-ui/react"

const Demo = () => {
  return (
    <For each={[1, 2, 3]} fallback={<div>No items</div>}>
      {(item) => <div key={item}>{item}</div>}
    </For>
  )
}
```

### Bleed component

The `Bleed` component applied a negative margin to allow content to bleed out
into the surrounding layout.

```tsx
export const Demo = () => (
  <Box padding="4" borderWidth="1px">
    <Bleed inline="4" bg="pink.100" padding="3">
      Some bleed
    </Bleed>
    <Box padding="4">Inner text</Box>
  </Box>
)
```

### Namespace components

You can import components by leveraging the dot notation.

```tsx
import { Accordion } from "@chakra-ui/react"

const Demo = () => {
  return (
    <Accordion.Root>
      <Accordion.Item>
        <Accordion.Trigger>Click me</Accordion.Trigger>
        <Accordion.Content>Panel content</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}
```

### `asChild` prop

Removed support for `as` prop due to the type complexity involved.

**Action:** Replace `asChild` in `chakra` factory and existing components.

```tsx
import { Button } from "@chakra-ui/react"

const Demo = () => {
  return (
    <Button asChild>
      <a href="#">Child</a>
    </Button>
  )
}
```

## Theming

### chakra factory

The `chakra` factory has been recipes to make it easier to style components
using recipes. Its API is inspired by Panda CSS and Stitches.

- Renamed `baseStyle` to `base`
- Removed `variants` and `sizes` in favor of defining them directly in the
  `variants` object
- Removed `sx` and `__css` in favor of using the `css` prop which can now take
  an array of styles, which will be merged together.

```tsx
import { chakra } from "@chakra-ui/react"

const Alert = chakra("div", {
  base: {
    lineHeight: "1",
    fontSize: "sm",
    rounded: 4,
    fontFamily: "Inter",
    color: "white",
  },
  variants: {
    variant: {
      default: { bg: "gray" },
      error: { bg: "red" },
      success: { bg: "green" },
      warning: { bg: "orange" },
    },
    sizes: {
      sm: { paddingX: 10, paddingY: 5 },
      md: { paddingX: 20, paddingY: 10 },
      lg: { paddingX: 30, paddingY: 15 },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
})
```

We've also removed support for functions in the theme object due to the
performance implications.

Consider the following approach instead:

- Use the `data-*` attribute to store dynamic values and style them using CSS
- Design the dynamic property/value in the recipe
- Leverage `compoundVariants` to create complex variants overrides

### Style Config

We've renamed `useStyleConfig` to `useRecipe`, and `useMultiStyleConfig` to
`useSlotRecipe`

Before:

```tsx
import { chakra, useStyleConfig } from "@chakra-ui/react"

function Alert(props) {
  const elementProps = omitThemingProps(props)
  const styles = useStyleConfig("Alert", props)
  return <chakra.div {...elementProps} __css={styles} />
}
```

After:

```tsx
import { chakra, useRecipe } from "@chakra-ui/react"

function Alert(props) {
  const recipe = useRecipe("Alert", props.recipe)
  const [variantProps, elementProps] = recipe.splitVariantProps(props)
  return <chakra.div {...elementProps} css={recipe(variantProps)} />
}
```

### Multi Style Config

Before:

```tsx
import { chakra, useMultiStyleConfig } from "@chakra-ui/react"

function Alert(props) {
  const elementProps = omitThemingProps(props)
  const styles = useMultiStyleConfig("Alert", props)
  return (
    <chakra.div __css={styles.root}>
      <chakra.p __css={styles.title}>Welcome</chakra.p>
    </chakra.div>
  )
}
```

After:

```tsx
import { chakra, useSlotRecipe } from "@chakra-ui/react"

function Alert(props) {
  const recipe = useSlotRecipe("Alert", props.recipe)
  const [variantProps, elementProps] = recipe.splitVariantProps(props)
  const styles = recipe(variantProps)
  return (
    <chakra.div css={styles.root}>
      <chakra.p css={styles.title}>Welcome</chakra.p>
    </chakra.div>
  )
}
```

### useTheme

TODO

Prefer to use `useChakraContext` instead of `useTheme` to access the theme and
much more.

### ThemingProps

- Changed to `RecipeProps` and `SlotRecipeProps` for better clarity

### Group

- No more `ButtonGroup`, prefer to use the generic `Group` component instead
- No more `InputGroup`, prefer generic `Group` and `Addon` components
- No more `InputLeftAddon` and `InputRightAddon`, prefer to use `Addon`
  component with `placement` prop

## IconButton

- Remove isRound in favor of passing `shape=pill`
- Prefer to use `children` over `icon` prop

## Blockquote

- Added new `Blockquote` component
- Docs: https://designsystem.utah.gov/library/components/textLayout/blockQuote

## Avatar

- Remove `max` prop in favor of userland control
- Remove excess label part
- Move image related props to `Avatar.Image` component
- Move fallback icon to `Avatar.Fallback` component
- Move `name` prop to `Avatar.Fallback` component

## Storybook Addon

We're removed the storybook addon in favor of using `@storybook/addon-themes`
and `withThemeByClassName` helper.

## InputAddon

- No more `InputLeftAddon` and `InputRightAddon`, prefer to use `InputAddon`
  component with the `Group` component

## InputElement

- No more `InputLeftElement` and `InputRightElement`, prefer to use
  `InputElement` component with the `Group` component and `placement` prop.

## InputGroup

- No more `InputGroup`, prefer generic `Group` component

## FormLabel

- Removed `requiredIndicator` and `optionalIndicator` in favor of using the
  `FormLabel.RequiredIndicator` with the `fallback` prop if needed

## Props

- `_activeLink` is now `_currentPage`
- `_activeStep` is now `_currentStep`
- No more `focusBorderColor` and `errorBorderColor`, consider setting the
  `--focus-color` and `--error-color` css variables instead

## Alert

- Remove `top-accent` and `left-accent` in favor adding `borderLeft` and
  `borderTop` directly to the `Alert` component
- Added new outline variant

## Tabs

- No more `soft-rounded` and `solid-rounded` variants
- The `enclosed` variant has been modified
- Added `plain` variant for usage with `Tabs.Indicator`
- Changed `isManual` to `activationMode=manual`

## General

- Default color palette is now gray for all components but you can configure
  this in your theme.

## Progress

- Move `hasStripe` and `isAnimated` to the `decoration` variant in recipe. Value
  can be either `striped` or `striped-animated`
- label or valueText no longer comes with a color by default, you can style
  yourself

## CloseButton

No longer exists. Prefer to use the `IconButton` component with your own icon.

## Skeleton

- Remove `SkeletonText` and `SkeletonCircle` in favor of using the `Skeleton`
  component and styling as needed
- Remove `fitContent` prop in favor of passing `width="fit-content"` directly to
  the `Skeleton` component
- Remove `startColor` and `endColor` prop in favor of using css variables

**Skeleton Text**

Before:

```tsx
<SkeletonText />
```

After:

```tsx
<Stack>
  <Skeleton height="40px" />
  <Skeleton height="40px" />
  <Skeleton width="40%" height="40px" />
</Stack>
```

**Skeleton Circle**

Before:

```tsx
<SkeletonCircle />
```

After:

```tsx
<Skeleton width="40px" height="40px" rounded="full" />
```

## Stepper

- Renamed `Stepper` to `Steps`
- Changed data attribute format
  - `data-status=complete` -> `data-complete` and style with `_complete`
  - `data-status=active` -> `data-current` and style with `_current`
  - `data-status=incomplete` -> `data-incomplete` and style with `_incomplete`
- Removed `StepIndicatorContent`, use the `Steps.Status` component to render a
  component based on status

Before:

```tsx
<Stepper index={activeStep}>
  {steps.map((step, index) => (
    <Step key={index}>
      <StepIndicator>
        <StepStatus
          complete={<StepIcon />}
          incomplete={<StepNumber />}
          active={<StepNumber />}
        />
      </StepIndicator>

      <Box flexShrink="0">
        <StepTitle>{step.title}</StepTitle>
        <StepDescription>{step.description}</StepDescription>
      </Box>

      <StepSeparator />
    </Step>
  ))}
</Stepper>
```

After:

```tsx
<Steps.Root index={activeStep}>
  {steps.map((step, index) => (
    <Steps.Item key={index}>
      <Steps.Indicator>
        <Steps.Status
          complete={<StepIcon />}
          incomplete={<StepNumber />}
          active={<StepNumber />}
        />
      </Steps.Indicator>

      <Box flexShrink="0">
        <Steps.Title>{step.title}</Steps.Title>
        <Steps.Description>{step.description}</Steps.Description>
      </Box>

      <Steps.Separator />
    </Steps.Item>
  ))}
</Stepper>
```

## Divider

- Rename to `Separator`
- Switch to `div` element for better layout control
- Simplify component to rely on `borderTopWidth` and `borderInlineStartWidth`
- To change the thickness reliably, set the `--divider-border-width` css
  variable

## Stack

- Remove `shouldWrapChildren` in favor of using the `StackItem` explicitly
- Rename `spacing` to `gap`
- Rename `divider` prop to `separator`

## NumberInput

- Rename `NumberInputStepper` to `NumberInput.Control`
- Rename `NumberInputStepperIncrement` to `NumberInput.IncrementTrigger`
- Rename `NumberInputStepperDecrement` to `NumberInput.DecrementTrigger`
- Remove `focusBorderColor` and `errorBorderColor`, consider setting the
  `--focus-color` and `--error-color` css variables instead

Before:

```tsx
<NumberInput>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
```

After:

```tsx
<NumberInput.Root>
  <NumberInput.Field />
  <NumberInput.Control>
    <NumberInput.IncrementTrigger />
    <NumberInput.DecrementTrigger />
  </NumberInput.Control>
</NumberInput.Root>
```

## PinInput

- Changed `value`, `defaultValue` and `onChange` to use `string[]` instead of
  `string`
- Add new `PinInput.Control` and `PinInput.Label` component parts
- `PinInput.Root` now renders a `div` element by default. Consider combining
  with `Stack` or `Group` for better layout control

## Image

- Now renders a native `img` without any fallback
- Remove `fallbackSrc` due to the SSR issues it causes
- Remove `useImage` hook
- Remove `Img` in favor of using the `Image` component directly

## Toast

There's been a significant change to the `Toast` component to make it more
flexible and easier to style.

- Removed `createStandaloneToasts`, `useToast` in favor of using `createToaster`
  to spawn toast in a specific position.
- With the `toast` returned from `createToaster`, you can now create toasts
  outside of the React tree.
- Toast now reads from its own recipe and all parts can be styled directly

Before:

```jsx
import { useToast } from "@chakra-ui/react"

const toast = useToast()

toast({
  title: "Account created.",
  description: "We've created your account for you.",
  status: "success",
})
```

After:

```jsx
const [ToastContainer, toast] = createToaster({
  placement: "bottom",
  render(toast) {
    return (
      <Toast.Transition>
        <Toast.Root status={toast.status}>
          <Toast.Title>{toast.title}</Toast.Title>
          <Toast.Description>{toast.description}</Toast.Description>
          <Box pos="absolute" top="1" insetEnd="1">
            <Toast.CloseTrigger asChild>
              <HiX />
            </Toast.CloseTrigger>
          </Box>
        </Toast.Root>
      </Toast.Transition>
    )
  },
})

toast({
  title: "Account created.",
  description: "We've created your account for you.",
  status: "success",
})
```

### Portal

- Remove `appendToParentPortal` prop in favor of using the `containerRef`
- Simplify the `Portal` component
- Remove `PortalManager` component

### Color Mode

- We've removed the `ColorModeProvider` and `useColorMode` in favor of using
  `next-themes` or similar libraries.
- Removed `LightMode`, `DarkMode` and `ColorModeScript` components
- Removed `useColorModeValue` in favor of using `useTheme` from `next-themes`

// TODO: Provide snippets

### Style Prop Changes

- `_activeLink` -> `_currentPage`
- `_activeStep` -> `_currentStep`
- `apply` is no longer supported, prefer creating a recipe using the `chakra`
  factory instead

### Stats

- Rename `StatArrow` to `Stat.Indicator`
- Rename `StatNumber` to `Stat.Value`

### Slider

- Now requires the `Slider.Control` to work properly
- Added new `Slider.ValueText` and `Slider.Label` components
