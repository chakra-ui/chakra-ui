import { z } from "zod"
import type { Tool } from "../lib/types.js"

interface MigrationScenario {
  name: string
  description: string
  before: string
  after: string
}

const MIGRATION_SCENARIOS: Record<string, MigrationScenario> = {
  // ==================== CORE FRAMEWORK & SETUP CHANGES ====================

  extend_theme_to_create_system: {
    name: "Extend Theme to Create System",
    description: "Update theme configuration from extendTheme to createSystem",
    before: `import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  fonts: {
    heading: \`'Figtree', sans-serif\`,
    body: \`'Figtree', sans-serif\`,
  },
})`,
    after: `import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: \`'Figtree', sans-serif\` },
        body: { value: \`'Figtree', sans-serif\` },
      },
    },
  },
})`,
  },

  package_json_updates: {
    name: "Package JSON Updates",
    description:
      "Remove framer-motion and @emotion/styled from package.jsonn if unused",
    before: `npm uninstall @emotion/styled framer-motion`,
    after: `The install the latest @emotion/react, next-themes, and @chakra-ui/react packages.`,
  },

  chakra_provider_configuration: {
    name: "Provider Configuration",
    description:
      "Update provider setup from ChakraProvider to Provider with snippets",
    before: `import { ChakraProvider } from "@chakra-ui/react"

export const App = ({ Component }) => (
  <ChakraProvider theme={theme}>
    <Component />
  </ChakraProvider>
)`,
    after: `Use the \`npx @chakra-ui/cli snippet add\` command to add the provider and color-mode snippets.
Then update the app to use the new provider.

import { Provider } from "@/components/ui/provider"

export const App = ({ Component }) => (
  <Provider>
    <Component />
  </Provider>
)

import { ColorModeProvider } from "@/components/ui/color-mode"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"

export function Provider(props) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}`,
  },

  color_mode_changes: {
    name: "Color Mode Changes",
    description: "Replace ColorModeProvider/useColorMode with next-themes",
    before: `import { 
  ColorModeProvider, 
  useColorMode, 
  useColorModeValue,
  LightMode,
  DarkMode,
  ColorModeScript 
} from "@chakra-ui/react"

const { colorMode, toggleColorMode } = useColorMode()
const bg = useColorModeValue('white', 'gray.800')

<ColorModeProvider>
  <LightMode>
    <Box>Always light</Box>
  </LightMode>
  <DarkMode>
    <Box>Always dark</Box>
  </DarkMode>
</ColorModeProvider>`,
    after: `import { useColorMode, useColorModeValue, LightMode, DarkMode } from "@/components/ui/color-mode"

const { colorMode, toggleColorMode } = useColorMode()
const bg = useColorModeValue('white', 'gray.800')

// Use className for forced themes
<Box className="light">
  Always light
</Box>
<Box className="dark">
  Always dark
</Box>`,
  },

  // ==================== MISSING COMPONENT MIGRATIONS ====================

  circular_progress_to_progress_circle: {
    name: "CircularProgress to ProgressCircle",
    description:
      "Replace CircularProgress with ProgressCircle compound component, update props: thickness → --thickness CSS variable, color → stroke prop on Range",
    before: `<CircularProgress 
  value={75} 
  thickness="4px" 
  color="blue.500" 
  size="lg"
  isIndeterminate={false}
/>

<CircularProgress isIndeterminate />`,
    after: `<ProgressCircle.Root value={75} size="lg">
  <ProgressCircle.Circle css={{ "--thickness": "4px" }}>
    <ProgressCircle.Track />
    <ProgressCircle.Range stroke="blue.500" />
  </ProgressCircle.Circle>
</ProgressCircle.Root>

<ProgressCircle.Root value={null} size="sm">
  <ProgressCircle.Circle>
    <ProgressCircle.Track />
    <ProgressCircle.Range />
  </ProgressCircle.Circle>
</ProgressCircle.Root>`,
  },

  progress_stripe_props: {
    name: "Progress Stripe Props",
    description:
      "Update Progress stripe properties: hasStripe → striped, isAnimated → animated",
    before: `<Progress hasStripe value={64} />

<Progress hasStripe isAnimated value={75} colorScheme="blue" />`,
    after: `<Progress.Root striped value={64}>
  <Progress.Track>
    <Progress.Range />
  </Progress.Track>
</Progress.Root>

<Progress.Root striped animated value={75} colorPalette="blue">
  <Progress.Track>
    <Progress.Range />
  </Progress.Track>
</Progress.Root>`,
  },

  text_props_changes: {
    name: "Text Props Changes",
    description:
      "Update Text component props: noOfLines → lineClamp, truncated → truncate",
    before: `<Text noOfLines={2}>
  "The quick brown fox jumps over the lazy dog" is an English-language pangram
</Text>

<Text truncated>
  This text will be truncated with ellipsis
</Text>

<Text noOfLines={[1, 2, 3]}>
  Responsive line clamping
</Text>`,
    after: `<Text lineClamp={2}>
  "The quick brown fox jumps over the lazy dog" is an English-language pangram
</Text>

<Text truncate>
  This text will be truncated with ellipsis
</Text>

<Text lineClamp={[1, 2, 3]}>
  Responsive line clamping
</Text>`,
  },

  stack_divider_changes: {
    name: "Stack Divider Changes",
    description:
      "Replace StackDivider with explicit Stack.Separator components between Stack items",
    before: `<VStack divider={<StackDivider borderColor="gray.200" />} spacing={4}>
  <Box h="40px" bg="yellow.200">1</Box>
  <Box h="40px" bg="tomato">2</Box>
  <Box h="40px" bg="pink.100">3</Box>
</VStack>

<HStack divider={<StackDivider />}>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
  <Text>Item 3</Text>
</HStack>`,
    after: `<VStack gap={4}>
  <Box h="40px" bg="yellow.200">1</Box>
  <Stack.Separator borderColor="gray.200" />
  <Box h="40px" bg="tomato">2</Box>
  <Stack.Separator borderColor="gray.200" />
  <Box h="40px" bg="pink.100">3</Box>
</VStack>

<HStack gap={4}>
  <Text>Item 1</Text>
  <Stack.Separator orientation="vertical" />
  <Text>Item 2</Text>
  <Stack.Separator orientation="vertical" />
  <Text>Item 3</Text>
</HStack>`,
  },

  // ==================== BOOLEAN PROPS STANDARDIZATION ====================

  boolean_prop_naming: {
    name: "Boolean Prop Naming",
    description:
      "Update boolean prop names: isOpen → open, isDisabled → disabled, isRequired → required, isInvalid → invalid, defaultIsOpen → defaultOpen",
    before: `<Modal isOpen={isOpen} onClose={onClose}>
  <ModalContent>
    <ModalHeader>Title</ModalHeader>
  </ModalContent>
</Modal>

<Input isDisabled isRequired isInvalid />
<Popover defaultIsOpen />`,
    after: `<Modal.Root open={isOpen}>
  <Modal.Content>
    <Modal.Header>Title</Modal.Header>
  </Modal.Content>
</Modal.Root>

<Input disabled required invalid />
<Popover.Root defaultOpen />`,
  },

  button_isActive_prop: {
    name: "Button isActive Prop",
    description: "Replace isActive prop with data-active attribute",
    before: `<Button isActive>Click me</Button>`,
    after: `<Button data-active="">Click me</Button>`,
  },

  link_isExternal_prop: {
    name: "Link isExternal Prop",
    description: "Replace isExternal prop with explicit target and rel props",
    before: `<Link isExternal>Click me</Link>`,
    after: `<Link target="_blank" rel="noopener noreferrer">
  Click me
</Link>`,
  },

  // ==================== COMPONENT-TO-COMPONENT RENAMES ====================

  divider_to_separator: {
    name: "Divider to Separator",
    description: "Rename Divider component to Separator",
    before: `import { Divider } from "@chakra-ui/react"

<Divider />
<Divider orientation="vertical" />`,
    after: `import { Separator } from "@chakra-ui/react"

<Separator />
<Separator orientation="vertical" />`,
  },

  collapse_to_collapsible: {
    name: "Collapse to Collapsible",
    description:
      "Replace Collapse with Collapsible component, change 'in' prop to 'open', wrap content in Collapsible.Content, and replace animateOpacity with keyframes animations",
    before: `<Collapse in={isOpen} animateOpacity>
  Some content
</Collapse>`,
    after: `<Collapsible.Root open={isOpen}>
  <Collapsible.Content>Some content</Collapsible.Content>
</Collapsible.Root>`,
  },

  // ==================== STYLE PROPS & THEMING CHANGES ====================

  style_props_pseudo_selectors: {
    name: "Style Props Pseudo Selectors",
    description:
      "Update pseudo selector prop names: _activeLink → _currentPage, _activeStep → _currentStep, _mediaDark → _osDark, _mediaLight → _osLight",
    before: `<Link _activeLink={{ color: "blue.500" }}>
  Active Link
</Link>

<Step _activeStep={{ bg: "blue.100" }}>
  Step content
</Step>

<Box _mediaDark={{ bg: "gray.800" }} _mediaLight={{ bg: "white" }}>
  Content
</Box>`,
    after: `<Link _currentPage={{ color: "blue.500" }}>
  Active Link
</Link>

<Step _currentStep={{ bg: "blue.100" }}>
  Step content
</Step>

<Box _osDark={{ bg: "gray.800" }} _osLight={{ bg: "white" }}>
  Content
</Box>`,
  },

  style_props_apply_removal: {
    name: "Apply Prop Removal",
    description: "Replace the removed apply prop with textStyle or layerStyle",
    before: `<Text apply="textStyles.heading">
  Heading text
</Text>

<Box apply="layerStyles.card">
  Card content
</Box>`,
    after: `<Text textStyle="heading">
  Heading text
</Text>

<Box layerStyle="card">
  Card content
</Box>`,
  },

  bg_gradient_props: {
    name: "Gradient Props",
    description:
      "Gradient style prop split into bgGradient, gradientFrom, and gradientTo props for better performance and type inference",
    before: `<Box bgGradient="linear(to-r, red.200, pink.500)" />

<Box bgGradient="linear(to-b, blue.100, blue.500)" />

<Box bgGradient="radial(circle, green.200, green.600)" />`,
    after: `<Box bgGradient="to-r" gradientFrom="red.200" gradientTo="pink.500" />

<Box bgGradient="to-b" gradientFrom="blue.100" gradientTo="blue.500" />

<Box bgGradient="circle" gradientFrom="green.200" gradientTo="green.600" />`,
  },

  colorScheme_to_colorPalette: {
    name: "ColorScheme to ColorPalette",
    description:
      "Replace 'colorScheme' prop with 'colorPalette' prop for better flexibility and avoiding HTML conflicts",
    before: `<Button colorScheme="blue">Click me</Button>

<Alert colorScheme="red">
  <AlertIcon />
  Alert message
</Alert>

<Badge colorScheme="green">New</Badge>`,
    after: `<Button colorPalette="blue">Click me</Button>

<Alert.Root colorPalette="red">
  <Alert.Indicator />
  Alert message
</Alert.Root>

<Badge colorPalette="green">New</Badge>`,
  },

  stack_spacing_to_gap: {
    name: "Stack Spacing to Gap",
    description:
      "In HStack, VStack, and Stack: replace 'spacing' prop with 'gap' prop",
    before: `<Stack spacing={4}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Stack>`,
    after: `<Stack gap={4}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Stack>`,
  },

  // ==================== BUTTON & ICON COMPONENTS ====================

  button_icon_to_children: {
    name: "Button Icon Props to Children",
    description:
      "Replace 'leftIcon' and 'rightIcon' props with icons as children in Button component",
    before: `<Button leftIcon={<Icon />}>
  Click me
</Button>

<Button rightIcon={<Icon />}>
  Click me
</Button>`,
    after: `<Button>
  <Icon />
  Click me
</Button>

<Button>
  Click me
  <Icon />
</Button>`,
  },

  icon_button_changes: {
    name: "IconButton Changes",
    description:
      "Update IconButton component: remove icon prop (use children), remove isRounded prop (use borderRadius='full')",
    before: `<IconButton
  icon={<SearchIcon />}
  isRounded
  aria-label="Search"
/>`,
    after: `<IconButton
  borderRadius="full"
  aria-label="Search"
>
  <SearchIcon />
</IconButton>`,
  },

  // ==================== FORM COMPONENTS ====================

  form_control_to_field: {
    name: "FormControl to Field",
    description:
      "Replace FormControl with Field.Root and related components: FormLabel → Field.Label, FormHelperText → Field.HelperText, FormErrorMessage → Field.ErrorText",
    before: `<FormControl isInvalid={isError}>
  <FormLabel>Email address</FormLabel>
  <Input type='email' />
  <FormHelperText>We'll never share your email.</FormHelperText>
  <FormErrorMessage>This field is required</FormErrorMessage>
</FormControl>`,
    after: `<Field.Root invalid={isError}>
  <Field.Label>Email address</Field.Label>
  <Input type='email' />
  <Field.HelperText>We'll never share your email.</Field.HelperText>
  <Field.ErrorText>This field is required</Field.ErrorText>
</Field.Root>`,
  },

  pin_input_changes: {
    name: "PinInput Changes",
    description:
      "Update PinInput: value/defaultValue use string[] instead of string, onChange → onValueChange, onComplete → onValueComplete, add PinInput.Control and PinInput.Label",
    before: `<PinInput defaultValue="123" onChange={onChange} onComplete={onComplete}>
  <PinInputField />
  <PinInputField />
  <PinInputField />
</PinInput>`,
    after: `<PinInput.Root defaultValue={["1", "2", "3"]} onValueChange={onValueChange} onValueComplete={onValueComplete}>
  <PinInput.Label>Enter PIN</PinInput.Label>
  <PinInput.Control>
    <PinInput.Input index={0} />
    <PinInput.Input index={1} />
    <PinInput.Input index={2} />
  </PinInput.Control>
</PinInput.Root>`,
  },

  number_input_changes: {
    name: "NumberInput Changes",
    description:
      "Update NumberInput: rename components to NumberInput.Control, NumberInput.IncrementTrigger, NumberInput.DecrementTrigger, onChange → onValueChange, onInvalid → onValueInvalid, remove parse/format props",
    before: `<NumberInput onChange={onChange} onInvalid={onInvalid} parse={parse} format={format}>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>`,
    after: `<NumberInput.Root onValueChange={onValueChange} onValueInvalid={onValueInvalid} formatOptions={formatOptions}>
  <NumberInput.Input />
  <NumberInput.Control>
    <NumberInput.IncrementTrigger />
    <NumberInput.DecrementTrigger />
  </NumberInput.Control>
</NumberInput.Root>`,
  },

  checkbox_component_changes: {
    name: "Checkbox Component Changes",
    description:
      "Refactor Checkbox to use compound components with Root, HiddenInput, Control, Indicator, and Label",
    before: `<Checkbox defaultChecked>Checkbox</Checkbox>`,
    after: `<Checkbox.Root defaultChecked>
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Checkbox</Checkbox.Label>
</Checkbox.Root>`,
  },

  radio_group_component_changes: {
    name: "Radio Group Component Changes",
    description:
      "Refactor RadioGroup to use compound components with Root, Item, ItemHiddenInput, ItemIndicator, and ItemText",
    before: `<RadioGroup defaultValue="2">
  <Radio value="1">Radio</Radio>
  <Radio value="2">Radio</Radio>
</RadioGroup>`,
    after: `<RadioGroup.Root defaultValue="2">
  <RadioGroup.Item value="1">
    <RadioGroup.ItemHiddenInput />
    <RadioGroup.ItemIndicator />
    <RadioGroup.ItemText />
  </RadioGroup.Item>
</RadioGroup.Root>`,
  },

  // ==================== SLIDER COMPONENTS ====================

  slider_props_changes: {
    name: "Slider Props Changes",
    description:
      "Update Slider: onChange → onValueChange, onChangeEnd → onValueChangeEnd, remove onChangeStart and isReversed props",
    before: `<Slider 
  defaultValue={30} 
  onChange={onChange}
  onChangeStart={onChangeStart}
  onChangeEnd={onChangeEnd}
  isReversed
>
  <SliderTrack>
    <SliderFilledTrack />
  </SliderTrack>
  <SliderThumb />
</Slider>`,
    after: `<Slider.Root 
  defaultValue={[30]} 
  onValueChange={onValueChange}
  onValueChangeEnd={onValueChangeEnd}
>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb index={0} />
  </Slider.Control>
</Slider.Root>`,
  },

  range_slider_to_slider: {
    name: "RangeSlider to Slider",
    description:
      "Replace RangeSlider with Slider component that accepts array values",
    before: `<RangeSlider defaultValue={[10, 30]}>
  <RangeSliderTrack>
    <RangeSliderFilledTrack />
  </RangeSliderTrack>
  <RangeSliderThumb index={0} />
  <RangeSliderThumb index={1} />
</RangeSlider>`,
    after: `<Slider.Root defaultValue={[10, 30]}>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumbs />
  </Slider.Control>
</Slider.Root>`,
  },

  // ==================== MODAL & DIALOG COMPONENTS ====================

  modal_to_dialog: {
    name: "Modal to Dialog",
    description:
      "Replace Modal with Dialog component and update props: isOpen → open, onClose → onOpenChange, isCentered → placement='center'",
    before: `<Modal isOpen={isOpen} onClose={onClose} isCentered>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Title</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      Content goes here
    </ModalBody>
    <ModalFooter>
      <Button onClick={onClose}>Close</Button>
    </ModalFooter>
  </ModalContent>
</Modal>`,
    after: `<Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Title</Dialog.Title>
      </Dialog.Header>
      <Dialog.Body>
        Content goes here
      </Dialog.Body>
      <Dialog.Footer>
        <Button onClick={onClose}>Close</Button>
      </Dialog.Footer>
      <Dialog.CloseTrigger />
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>`,
  },

  dialog_or_drawer_props_changes: {
    name: "Dialog and Drawer Props",
    description:
      "Update Dialog and Drawer props: isOpen → open, onChange → onOpenChange, blockScrollOnMount → preventScroll, closeOnEsc → closeOnEscape, closeOnOverlayClick → closeOnInteractOutside, initialFocusRef → initialFocusEl function, finalFocusRef → finalFocusEl function",
    before: `<Dialog 
  isOpen={isOpen} 
  onChange={onChange}
  blockScrollOnMount={true}
  closeOnEsc={true}
  closeOnOverlayClick={true}
  initialFocusRef={initialFocusRef}
  finalFocusRef={finalFocusRef}
>
  Content
</Dialog>`,
    after: `<Dialog.Root 
  open={isOpen} 
  onOpenChange={onOpenChange}
  preventScroll={true}
  closeOnEscape={true}
  closeOnInteractOutside={true}
  initialFocusEl={() => initialFocusRef.current}
  finalFocusEl={() => finalFocusRef.current}
>
  <Dialog.Content>Content</Dialog.Content>
</Dialog.Root>`,
  },

  // ==================== SELECTION COMPONENTS ====================

  select_to_native_select: {
    name: "Select to Native Select",
    description:
      "Replace Select with NativeSelect component using the new compound component pattern",
    before: `<Select placeholder='Select option' icon={<ChevronDownIcon />}>
  <option value='option1'>Option 1</option>
  <option value='option2'>Option 2</option>
  <option value='option3'>Option 3</option>
</Select>`,
    after: `<NativeSelect.Root size="sm" width="240px">
  <NativeSelect.Field placeholder="Select option">
    <option value='option1'>Option 1</option>
    <option value='option2'>Option 2</option>
    <option value='option3'>Option 3</option>
  </NativeSelect.Field>
  <NativeSelect.Indicator>
    <ChevronDownIcon />
  </NativeSelect.Indicator>
</NativeSelect.Root>`,
  },

  menu_component_changes: {
    name: "Menu Component Changes",
    description:
      "Update Menu component to use compound components: Menu → Menu.Root, MenuButton → Menu.Trigger, MenuList → Menu.Content, MenuItem → Menu.Item, wrap in Portal and Menu.Positioner",
    before: `<Menu>
  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
    Actions
  </MenuButton>
  <MenuList>
    <MenuItem>Download</MenuItem>
    <MenuItem>Create a Copy</MenuItem>
  </MenuList>
</Menu>`,
    after: `<Menu.Root>
  <Menu.Trigger asChild>
    <Button>
      Actions
      <ChevronDownIcon />
    </Button>
  </Menu.Trigger>
  <Portal>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="download">Download</Menu.Item>
        <Menu.Item value="copy">Create a Copy</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Portal>
</Menu.Root>`,
  },

  menu_context_changes: {
    name: "Menu Context Changes",
    description:
      "Update Menu render prop pattern to use Menu.Context instead of render prop function",
    before: `<Menu>
  {({ isOpen }) => (
    <>
      <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
        {isOpen ? "Close" : "Open"}
      </MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
        <MenuItem onClick={() => alert("Kagebunshin")}>Create a Copy</MenuItem>
      </MenuList>
    </>
  )}
</Menu>`,
    after: `<Menu.Root>
  <Menu.Context>
    {(menu) => (
      <Menu.Trigger asChild>
        <Button>
          {menu.open ? "Close" : "Open"}
          <ChevronDownIcon />
        </Button>
      </Menu.Trigger>
    )}
  </Menu.Context>
  <Portal>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="download">Download</Menu.Item>
        <Menu.Item value="copy" onSelect={() => alert("Kagebunshin")}>
          Create a Copy
        </Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Portal>
</Menu.Root>`,
  },

  menu_option_group_changes: {
    name: "Menu Option Group Changes",
    description:
      "Update MenuOptionGroup to use Menu.RadioItemGroup and Menu.CheckboxItemGroup for separate state handling",
    before: `<Menu>
  <MenuButton as={Button}>Trigger</MenuButton>
  <MenuList>
    <MenuOptionGroup defaultValue="asc" title="Order" type="radio">
      <MenuItemOption value="asc">Ascending</MenuItemOption>
      <MenuItemOption value="desc">Descending</MenuItemOption>
    </MenuOptionGroup>
    <MenuDivider />
    <MenuOptionGroup title="Country" type="checkbox">
      <MenuItemOption value="email">Email</MenuItemOption>
      <MenuItemOption value="phone">Phone</MenuItemOption>
      <MenuItemOption value="country">Country</MenuItemOption>
    </MenuOptionGroup>
  </MenuList>
</Menu>`,
    after: `<Menu.Root>
  <Menu.Trigger asChild>
    <Button>Trigger</Button>
  </Menu.Trigger>
  <Portal>
    <Menu.Positioner>
      <Menu.Content minW="10rem">
        <Menu.RadioItemGroup defaultValue="asc">
          <Menu.RadioItem value="asc">Ascending</Menu.RadioItem>
          <Menu.RadioItem value="desc">Descending</Menu.RadioItem>
        </Menu.RadioItemGroup>
        <Menu.CheckboxItemGroup defaultValue={["email"]}>
          <Menu.CheckboxItem value="email">Email</Menu.CheckboxItem>
          <Menu.CheckboxItem value="phone">Phone</Menu.CheckboxItem>
          <Menu.CheckboxItem value="country">Country</Menu.CheckboxItem>
        </Menu.CheckboxItemGroup>
      </Menu.Content>
    </Menu.Positioner>
  </Portal>
</Menu.Root>`,
  },

  // ==================== NAVIGATION & LAYOUT COMPONENTS ====================

  tabs_component_changes: {
    name: "Tabs Component Changes",
    description:
      "Update Tabs component structure: Tab → Tabs.Trigger, TabList → Tabs.List, TabPanel → Tabs.Content, TabPanels removed, value prop required on triggers and content",
    before: `<Tabs>
  <TabList>
    <Tab>One</Tab>
    <Tab>Two</Tab>
    <Tab>Three</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>one!</TabPanel>
    <TabPanel>two!</TabPanel>
    <TabPanel>three!</TabPanel>
  </TabPanels>
</Tabs>`,
    after: `<Tabs.Root>
  <Tabs.List>
    <Tabs.Trigger value="one">One</Tabs.Trigger>
    <Tabs.Trigger value="two">Two</Tabs.Trigger>
    <Tabs.Trigger value="three">Three</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="one">one!</Tabs.Content>
  <Tabs.Content value="two">two!</Tabs.Content>
  <Tabs.Content value="three">three!</Tabs.Content>
</Tabs.Root>`,
  },

  tabs_props_changes: {
    name: "Tabs Props Changes",
    description:
      "Update Tabs props: defaultIndex → defaultValue, index → value, onChange → onValueChange, isLazy → lazyMount and unmountOnExit",
    before: `<Tabs defaultIndex={0} index={0} onChange={(index) => {}} isLazy />`,
    after: `<Tabs.Root defaultValue={0} value={0} onValueChange={({ value }) => {}} lazyMount unmountOnExit />`,
  },

  accordion_component_changes: {
    name: "Accordion Component Changes",
    description:
      "Update Accordion component: allowMultiple → multiple, allowToggle → collapsible, index → value, defaultIndex → defaultValue, AccordionButton → Accordion.Trigger, AccordionIcon → Accordion.ItemIndicator",
    before: `<Accordion allowMultiple index={[0]} onChange={() => {}}>
  <AccordionItem>
    <AccordionButton>Section 1 title</AccordionButton>
    <AccordionPanel>Panel content</AccordionPanel>
  </AccordionItem>
</Accordion>`,
    after: `<Accordion multiple value={["0"]} onValueChange={() => {}}>
  <AccordionItem>
    <Accordion.Trigger>Section 1 title</Accordion.Trigger>
    <AccordionPanel>Panel content</AccordionPanel>
  </AccordionItem>
</Accordion>`,
  },

  // ==================== CONTENT DISPLAY COMPONENTS ====================

  table_component_renames: {
    name: "Table Component Renames",
    description:
      "Update Table components: TableContainer → Table.ScrollArea, Td/Th → Table.Cell/Table.ColumnHeader, isNumeric → textAlign='end'",
    before: `<TableContainer>
  <Table variant="simple">
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th>Product</Th>
        <Th isNumeric>Price</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>Item</Td>
        <Td isNumeric>$25.00</Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>`,
    after: `<Table.ScrollArea>
  <Table.Root size="sm">
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeader>Product</Table.ColumnHeader>
        <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>Item</Table.Cell>
        <Table.Cell textAlign="end">$25.00</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table.Root>
</Table.ScrollArea>`,
  },

  avatar_props_changes: {
    name: "Avatar Changes",
    description:
      "Update Avatar component: move image props to Avatar.Image, move fallback to Avatar.Fallback, move name prop to Avatar.Fallback",
    before: `<Avatar 
  name="John Doe" 
  src="/avatar.jpg"
  fallbackSrc="/fallback.jpg"
  size="lg"
>
  <AvatarBadge boxSize="1.25em" bg="green.500" />
</Avatar>`,
    after: `<Avatar.Root size="lg">
  <Avatar.Image src="/avatar.jpg" />
  <Avatar.Fallback name="John Doe" />
</Avatar.Root>`,
  },

  tag_component_changes: {
    name: "Tag Component Changes",
    description:
      "Update Tag component structure: Tag → Tag.Root, TagLabel → Tag.Label, TagLeftIcon → Tag.StartElement, TagRightIcon → Tag.EndElement, TagCloseButton → Tag.CloseTrigger",
    before: `<Tag>
  <TagLeftIcon boxSize="12px" as={AddIcon} />
  <TagLabel>Cyan</TagLabel>
  <TagRightIcon boxSize="12px" as={AddIcon} />
</Tag>

<Tag>
  <TagLabel>Green</TagLabel>
  <TagCloseButton />
</Tag>`,
    after: `<Tag.Root>
  <Tag.StartElement>
    <AddIcon />
  </Tag.StartElement>
  <Tag.Label>Cyan</Tag.Label>
  <Tag.EndElement>
    <AddIcon />
  </Tag.EndElement>
</Tag.Root>

<Tag.Root>
  <Tag.Label>Green</Tag.Label>
  <Tag.CloseTrigger />
</Tag.Root>`,
  },

  alert_component_changes: {
    name: "Alert Component Changes",
    description:
      "Update Alert component structure: AlertIcon → Alert.Indicator, wrap content in Alert.Content, and use compound component pattern with Alert.Root",
    before: `<Alert>
  <AlertIcon />
  <AlertTitle>Your browser is outdated!</AlertTitle>
  <AlertDescription>Your Chakra experience may be degraded.</AlertDescription>
</Alert>`,
    after: `<Alert.Root status="error">
  <Alert.Indicator />
  <Alert.Content>
    <Alert.Title>Invalid Fields</Alert.Title>
    <Alert.Description>
      Your form has some errors. Please fix them and try again.
    </Alert.Description>
  </Alert.Content>
</Alert.Root>`,
  },

  // ==================== UTILITY & INTERACTIVE COMPONENTS ====================

  spinner_props: {
    name: "Spinner Props",
    description:
      "Update Spinner component props: thickness → borderWidth, speed → animationDuration",
    before: `<Spinner thickness="2px" speed="0.5s" />`,
    after: `<Spinner borderWidth="2px" animationDuration="0.5s" />`,
  },

  skeleton_component_changes: {
    name: "Skeleton Component Changes",
    description:
      "Update Skeleton component: startColor and endColor props now use CSS variables, isLoaded prop is now loading with inverted boolean logic",
    before: `<Skeleton startColor="pink.500" endColor="orange.500" />

<Skeleton isLoaded>
  <span>Chakra ui is cool</span>
</Skeleton>`,
    after: `<Skeleton
  css={{
    "--start-color": "colors.pink.500",
    "--end-color": "colors.orange.500",
  }}
/>

<Skeleton loading={false}>
  <span>Chakra ui is cool</span>
</Skeleton>`,
  },

  editable_props_changes: {
    name: "Editable Props",
    description:
      "Replace Editable with Editable.Root and update props: finalFocusRef → finalFocusEl function, isDisabled → disabled, onSubmit → onValueCommit, onCancel → onValueRevert, onChange → onValueChange, startWithEditView → defaultEdit, submitOnBlur → submitMode",
    before: `<Editable
  finalFocusRef={finalFocusRef}
  isDisabled={isDisabled}
  onSubmit={onSubmit}
  onCancel={onCancel}
  onChange={onChange}
  startWithEditView={true}
  submitOnBlur={true}
  defaultValue="Edit me"
>
  <EditablePreview />
  <EditableInput />
</Editable>`,
    after: `<Editable.Root
  finalFocusEl={() => finalFocusRef.current}
  disabled={disabled}
  onValueCommit={onSubmit}
  onValueRevert={onCancel}
  onValueChange={onChange}
  defaultEdit={true}
  submitMode="blur"
  defaultValue="Edit me"
>
  <Editable.Preview />
  <Editable.Input />
</Editable.Root>`,
  },

  tooltip_component_changes: {
    name: "Tooltip Component Changes",
    description:
      "Update Tooltip component: closeOnEsc → closeOnEscape, closeOnMouseDown → closeOnPointerDown, placement/gutter/offset/arrow props moved to positioning prop on Tooltip.Root",
    before: `<Tooltip placement="top" />`,
    after: `<Tooltip.Root positioning={{ placement: "top" }} />`,
  },

  show_hide_component_changes: {
    name: "Show and Hide Component Changes",
    description:
      "Replace Show and Hide components with hideFrom and hideBelow props on Box or other components",
    before: `<Show below="md">
  This text appears only on screens md and smaller.
</Show>

<Hide below="md">
  This text hides at the "md" value screen width and smaller.
</Hide>`,
    after: `<Box hideBelow="md">
  This text hides at the "md" value screen width and smaller.
</Box>

<Box hideFrom="md">
  This text appears only on screens md and larger.
</Box>`,
  },
}

export const v2ToV3MigrationTool: Tool = {
  name: "v2_to_v3_code_review",
  description:
    "ALWAYS use this tool to review any generated code. This tool helps you get familiar with the new Chakra UI v3 API before/after code snippets for common migration scenarios to help avoid AI hallucination.",
  exec(server, { name, description }) {
    server.tool(
      name,
      description,
      {
        scenario: z
          .enum(Object.keys(MIGRATION_SCENARIOS) as [string, ...string[]])
          .describe("The migration scenario to get guidance for"),
      },
      async ({ scenario }) => {
        const json = Reflect.get(MIGRATION_SCENARIOS, scenario)
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(json),
            },
          ],
        }
      },
    )
  },
}
