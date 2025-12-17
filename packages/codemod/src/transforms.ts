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
  button: {
    name: "button",
    description: "Transform Button component props",
    path: path.join(__dirname, "../transforms/components/button.ts"),
  },
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

export const upgradeTransforms = [
  "rename-boolean-props",
  "color-palette",
  "style-props",
  "accordion",
  "alert",
  "button",
  "gradient-props",
  "nested-styles",
]
