import { defaultBaseConfig } from "./preset-base.ts"
import { createSystem, mergeConfigs } from "./styled-system/index.ts"
import { defaultThemeConfig } from "./theme/index.ts"

export const defaultConfig = mergeConfigs(defaultBaseConfig, defaultThemeConfig)

export const defaultSystem = createSystem(defaultConfig)

export { defaultSystem as system }
