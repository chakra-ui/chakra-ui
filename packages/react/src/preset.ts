import { defaultBaseConfig } from "@chakra-ui/panda-preset"
import { type SystemConfig, createSystem, mergeConfigs } from "./styled-system"
import { defaultThemeConfig } from "./theme"

export const defaultConfig = mergeConfigs(
  defaultBaseConfig as SystemConfig,
  defaultThemeConfig,
)

export const defaultSystem = createSystem(defaultConfig)

export { defaultSystem as system }
