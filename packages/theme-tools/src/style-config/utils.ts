import { styleConfig } from "./single"
import { multiStyleConfig } from "./multiple"
import { Dict } from "@chakra-ui/utils"

const applyStyleConfigs = (theme: Dict) => {
  Object.keys(theme.components).forEach((component) => {
    const config = theme.components[component]

    if (config.parts) {
      theme.components[component] = multiStyleConfig(config)
    } else {
      theme.components[component] = styleConfig(config)
    }
  })

  return theme
}

export { applyStyleConfigs }
