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

  button_leftIcon_to_children: {
    name: "Button Left Icon to Children",
    description:
      "Replace 'leftIcon' prop with icon as first child in Button component",
    before: `<Button leftIcon={<Icon />}>
  Click me
</Button>`,
    after: `<Button>
  <Icon />
  Click me
</Button>`,
  },

  button_rightIcon_to_children: {
    name: "Button Right Icon to Children",
    description:
      "Replace 'rightIcon' prop with icon as last child in Button component",
    before: `<Button rightIcon={<Icon />}>
  Click me
</Button>`,
    after: `<Button>
  Click me
  <Icon />
</Button>`,
  },

  theme_configuration: {
    name: "Theme Configuration",
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

  provider_configuration: {
    name: "Provider Configuration",
    description: "Update provider setup from ChakraProvider to Provider",
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
)`,
  },

  boolean_prop_naming: {
    name: "Boolean Prop Naming",
    description: "Simplify boolean prop names (remove 'is' prefix)",
    before: `<Modal isOpen={isOpen} onClose={onClose}>
  <ModalContent>
    <ModalHeader>Title</ModalHeader>
  </ModalContent>
</Modal>`,
    after: `<Modal open={isOpen} onClose={onClose}>
  <ModalContent>
    <ModalHeader>Title</ModalHeader>
  </ModalContent>
</Modal>`,
  },

  form_control_to_field: {
    name: "FormControl to Field",
    description: "Replace FormControl with Field.Root and related components",
    before: `<FormControl>
  <Input />
  <FormErrorMessage>Required</FormErrorMessage>
</FormControl>`,
    after: `<Field.Root>
  <Input />
  <Field.ErrorText>Required</Field.ErrorText>
</Field.Root>`,
  },

  package_updates: {
    name: "Package Updates",
    description: "Remove unused packages and update dependencies",
    before: `npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion`,
    after: `npm uninstall @emotion/styled framer-motion
npm install @chakra-ui/react@latest @emotion/react@latest`,
  },

  spinner_props: {
    name: "Spinner Props",
    description:
      "Update Spinner component props: thickness to borderWidth, speed to animationDuration",
    before: `<Spinner thickness="2px" speed="0.5s" />`,
    after: `<Spinner borderWidth="2px" animationDuration="0.5s" />`,
  },

  icon_button_changes: {
    name: "IconButton Changes",
    description:
      "Update IconButton component: remove icon prop and isRounded prop",
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
      "Rename Collapse to Collapsible namespace, rename 'in' to 'open', and replace animateOpacity with keyframes animations",
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
      "Update pseudo selector prop names to follow new v3 naming conventions",
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

  style_props_text_truncation: {
    name: "Text Truncation Props",
    description: "Update text truncation prop names from v2 to v3",
    before: `<Text noOfLines={2}>
  Long text content that will be clamped to 2 lines
</Text>

<Text truncated>
  Text that will be truncated with ellipsis
</Text>`,
    after: `<Text lineClamp={2}>
  Long text content that will be clamped to 2 lines
</Text>

<Text truncate>
  Text that will be truncated with ellipsis
</Text>`,
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

  gradient_props: {
    name: "Gradient Props",
    description:
      "Gradient style prop simplified to gradient and gradientFrom and gradientTo props",
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

  colorPalette_usage: {
    name: "ColorPalette Usage in Any Component",
    description:
      "Use colorPalette prop in any component to create color-aware designs",
    before: `<Box bg="red.400">
  <Text color="red.600">Some text</Text>
</Box>`,
    after: `<Box colorPalette="red">
  <Box bg="colorPalette.400">Some box</Box>
  <Text color="colorPalette.600">Some text</Text>
</Box>`,
  },

  modal_to_dialog: {
    name: "Modal to Dialog",
    description: "Replace Modal with Dialog component and update props",
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
  <Portal>
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
        <Dialog.CloseTrigger asChild>
          <CloseButton size="sm" />
        </Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.Root>`,
  },

  boolean_props_convention: {
    name: "Boolean Props Convention",
    description: "Update boolean prop naming from 'is<X>' to '<x>' convention",
    before: `[isOpen, isDisabled, isRequired, isInvalid, defaultIsOpen, defaultOpen]`,
    after: `[open, disabled, required, invalid, defaultOpen]`,
  },

  checkbox_indeterminate_prop: {
    name: "Checkbox Indeterminate Prop",
    description: "Replace indeterminate prop with checked prop",
    before: `<Checkbox indeterminate />`,
    after: `<Checkbox.Root checked="indeterminate" />`,
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
