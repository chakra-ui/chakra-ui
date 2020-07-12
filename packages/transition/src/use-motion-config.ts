import { SystemStyleObject, useTheme } from "@chakra-ui/system"
import { Dict, get, runIfFn } from "@chakra-ui/utils"
import React from "react"
import { MotionConfig, motionConfigToCSS } from "./motion-config"

type MaybeMotionConfig =
  | MotionConfig
  | ((props: Dict) => MotionConfig)
  | undefined

export function useMotionConfig(
  themeKey: string,
  props: Dict,
  className?: string,
) {
  const theme = useTheme()
  const path = `components.${themeKey}.motion`

  const defaultConfig = get(theme, path)
  const configObjectOrFn = (props.motionConfig ||
    defaultConfig) as MaybeMotionConfig
  const config = runIfFn(configObjectOrFn, props)

  const partsMotionRef = React.useRef<Dict<SystemStyleObject>>({})

  return React.useMemo(() => {
    if (config) {
      const partsMotion: Record<string, SystemStyleObject> = {}

      for (const part in config) {
        partsMotion[part] = motionConfigToCSS(
          config[part],
          className ?? themeKey.toLowerCase(),
        )
      }

      const prevMotionString = JSON.stringify(partsMotionRef.current)
      const nextMotionString = JSON.stringify(partsMotion)

      if (nextMotionString !== prevMotionString) {
        partsMotionRef.current = partsMotion
      }
    }

    return partsMotionRef.current
  }, [className, config, themeKey])
}
