import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export interface TransformInfo {
  name: string
  description: string
  path: string
}

export const transforms: Record<string, TransformInfo> = {
  // Component transforms
  accordion: {
    name: "accordion",
    description: "Transform Accordion to compound components",
    path: path.join(__dirname, "../transforms/components/accordion.ts"),
  },
  alert: {
    name: "alert",
    description: "Transform Alert to compound components",
    path: path.join(__dirname, "../transforms/components/alert.ts"),
  },
  button: {
    name: "button",
    description: "Transform Button component props",
    path: path.join(__dirname, "../transforms/components/button.ts"),
  },
  checkbox: {
    name: "checkbox",
    description: "Transform Checkbox to compound components",
    path: path.join(__dirname, "../transforms/components/checkbox.ts"),
  },
  "collapse-to-collapsible": {
    name: "collapse-to-collapsible",
    description: "Transform Collapse to Collapsible",
    path: path.join(
      __dirname,
      "../transforms/components/collapse-to-collapsible.ts",
    ),
  },
  drawer: {
    name: "drawer",
    description: "Transform Drawer to compound components",
    path: path.join(__dirname, "../transforms/components/drawer.ts"),
  },
  editable: {
    name: "editable",
    description: "Transform Editable props",
    path: path.join(__dirname, "../transforms/components/editable.ts"),
  },
  "icon-button": {
    name: "icon-button",
    description: "Transform IconButton props",
    path: path.join(__dirname, "../transforms/components/icon-button.ts"),
  },
  input: {
    name: "input",
    description: "Transform Input component props",
    path: path.join(__dirname, "../transforms/components/input.ts"),
  },
  link: {
    name: "link",
    description: "Transform Link isExternal prop",
    path: path.join(__dirname, "../transforms/components/link.ts"),
  },
  menu: {
    name: "menu",
    description: "Transform Menu to compound components",
    path: path.join(__dirname, "../transforms/components/menu.ts"),
  },
  "modal-to-dialog": {
    name: "modal-to-dialog",
    description: "Transform Modal to Dialog",
    path: path.join(__dirname, "../transforms/components/modal-to-dialog.ts"),
  },
  "number-input": {
    name: "number-input",
    description: "Transform NumberInput to compound components",
    path: path.join(__dirname, "../transforms/components/number-input.ts"),
  },
  "pin-input": {
    name: "pin-input",
    description: "Transform PinInput props",
    path: path.join(__dirname, "../transforms/components/pin-input.ts"),
  },
  progress: {
    name: "progress",
    description: "Transform Progress to compound components",
    path: path.join(__dirname, "../transforms/components/progress.ts"),
  },
  "radio-group": {
    name: "radio-group",
    description: "Transform RadioGroup to compound components",
    path: path.join(__dirname, "../transforms/components/radio-group.ts"),
  },
  "select-to-native-select": {
    name: "select-to-native-select",
    description: "Transform Select to NativeSelect",
    path: path.join(
      __dirname,
      "../transforms/components/select-to-native-select.ts",
    ),
  },
  slider: {
    name: "slider",
    description: "Transform Slider to compound components",
    path: path.join(__dirname, "../transforms/components/slider.ts"),
  },
  spinner: {
    name: "spinner",
    description: "Transform Spinner props",
    path: path.join(__dirname, "../transforms/components/spinner.ts"),
  },
  stack: {
    name: "stack",
    description: "Transform Stack spacing to gap",
    path: path.join(__dirname, "../transforms/components/stack.ts"),
  },
  table: {
    name: "table",
    description: "Transform Table to compound components",
    path: path.join(__dirname, "../transforms/components/table.ts"),
  },
  tabs: {
    name: "tabs",
    description: "Transform Tabs to compound components",
    path: path.join(__dirname, "../transforms/components/tabs.ts"),
  },
  tag: {
    name: "tag",
    description: "Transform Tag to compound components",
    path: path.join(__dirname, "../transforms/components/tag.ts"),
  },
  tooltip: {
    name: "tooltip",
    description: "Transform Tooltip props",
    path: path.join(__dirname, "../transforms/components/tooltip.ts"),
  },

  // Props transforms
  "rename-boolean-props": {
    name: "rename-boolean-props",
    description: "Rename boolean props (isOpen -> open, etc.)",
    path: path.join(__dirname, "../transforms/props/rename-boolean-props.ts"),
  },
  "color-palette": {
    name: "color-palette",
    description: "Transform colorScheme to colorPalette",
    path: path.join(__dirname, "../transforms/props/color-palette.ts"),
  },
  "style-props": {
    name: "style-props",
    description: "Transform style props (noOfLines -> lineClamp, etc.)",
    path: path.join(__dirname, "../transforms/props/style-props.ts"),
  },
  "gradient-props": {
    name: "gradient-props",
    description: "Transform gradient props",
    path: path.join(__dirname, "../transforms/props/gradient-props.ts"),
  },
  "nested-styles": {
    name: "nested-styles",
    description: "Transform sx/__css to css prop",
    path: path.join(__dirname, "../transforms/props/nested-styles.ts"),
  },
}

// Default transforms to run during upgrade
export const upgradeTransforms = [
  "rename-boolean-props",
  "color-palette",
  "style-props",
  "accordion",
  "alert",
  "button",
  "checkbox",
  "collapse-to-collapsible",
  "drawer",
  "editable",
  "icon-button",
  "input",
  "link",
  "menu",
  "modal-to-dialog",
  "number-input",
  "pin-input",
  "progress",
  "radio-group",
  "select-to-native-select",
  "slider",
  "spinner",
  "stack",
  "table",
  "tabs",
  "tag",
  "tooltip",
  "gradient-props",
  "nested-styles",
]
