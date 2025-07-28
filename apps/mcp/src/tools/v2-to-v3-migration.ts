import { z } from "zod"
import type { Tool } from "../lib/types.js"

interface MigrationScenario {
  name: string
  description: string
  before: string
  after: string
}

const MIGRATION_SCENARIOS: Record<string, MigrationScenario> = {
  spacing_to_gap: {
    name: "Spacing to Gap",
    description: "Replace 'spacing' prop with 'gap' prop in Stack components",
    before: `<Stack spacing={4}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Stack>`,
    after: `<Stack gap={4}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Stack>`,
  },

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
    after: `import { Provider } from "@/components/ui/provider"

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
<Accordion defaultIsOpen />`,
    after: `<Modal open={isOpen} onClose={onClose}>
  <ModalContent>
    <ModalHeader>Title</ModalHeader>
  </ModalContent>
</Modal>

<Input disabled required invalid />
<Accordion defaultOpen />`,
  },

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

  spinner_props: {
    name: "Spinner Props",
    description:
      "Update Spinner component props: thickness → borderWidth, speed → animationDuration",
    before: `<Spinner thickness="2px" speed="0.5s" />`,
    after: `<Spinner borderWidth="2px" animationDuration="0.5s" />`,
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

  button_isActive_prop: {
    name: "Button isActive Prop",
    description: "Replace isActive prop with data-active attribute",
    before: `<Button isActive>Click me</Button>`,
    after: `<Button data-active>Click me</Button>`,
  },

  link_isExternal_prop: {
    name: "Link isExternal Prop",
    description: "Replace isExternal prop with explicit target and rel props",
    before: `<Link isExternal>Click me</Link>`,
    after: `<Link target="_blank" rel="noopener noreferrer">
  Click me
</Link>`,
  },

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

<Alert colorPalette="red">
  <AlertIcon />
  Alert message
</Alert>

<Badge colorPalette="green">New</Badge>`,
  },

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

  color_mode_changes: {
    name: "Color Mode Changes",
    description:
      "Replace ColorModeProvider/useColorMode with next-themes, remove LightMode/DarkMode/ColorModeScript components, replace useColorModeValue with useTheme",
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
    after: `import { useTheme } from "next-themes"

const { theme, setTheme } = useTheme()
const bg = theme === 'light' ? 'white' : 'gray.800'

// Use className for forced themes
<Box className="light">
  <Box>Always light</Box>
</Box>
<Box className="dark">
  <Box>Always dark</Box>
</Box>`,
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
        const migrationInfo = Reflect.get(MIGRATION_SCENARIOS, scenario)
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                name: migrationInfo.name,
                description: migrationInfo.description,
                before: migrationInfo.before,
                after: migrationInfo.after,
              }),
            },
          ],
        }
      },
    )
  },
}
