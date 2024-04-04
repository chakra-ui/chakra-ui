import { defaultBaseConfig } from "./preset-base"
import { createSystem, mergeConfigs } from "./styled-system"
import { defaultThemeConfig } from "./theme"

export const defaultConfig = mergeConfigs(defaultBaseConfig, defaultThemeConfig)

export const defaultSystem = createSystem(defaultConfig)

export { defaultSystem as system }
