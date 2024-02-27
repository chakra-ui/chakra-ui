import { mergeWith } from "@chakra-ui/utils"
import { SystemConfig } from "./types"

export const defineSystem = (config: SystemConfig) => config

export const mergeSystem = (
  config: SystemConfig,
  ...configs: SystemConfig[]
) => {
  mergeWith(config, ...configs, (srcValue: any, newValue: any) => {
    if (newValue === undefined) return srcValue ?? []
    if (srcValue === undefined) return [newValue]
    if (Array.isArray(srcValue)) return [newValue, ...srcValue]
    return [newValue, srcValue]
  })
}
