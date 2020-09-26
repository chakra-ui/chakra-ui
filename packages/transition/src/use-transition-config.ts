import { SystemStyleObject, useTheme } from "@chakra-ui/system"
import {
  Dict,
  memoizedGet as get,
  runIfFn,
  createContext,
} from "@chakra-ui/utils"
import * as React from "react"
import { TransitionConfig, transitionConfigToCSS } from "./transition-config"

type MaybeTransitionConfig =
  | { [part: string]: TransitionConfig }
  | ((props: Dict) => { [part: string]: TransitionConfig })
  | undefined

type Timeout = TransitionConfig["timeout"]

type PartTransition = Dict<{
  styles: SystemStyleObject
  timeout: NonNullable<Timeout>
  className: string
}>

export function useTransitionConfig(
  themeKey: string,
  props: Dict,
  classNames?: Dict<string>,
) {
  const theme = useTheme()
  const path = `components.${themeKey}.transition`

  const defaultConfig = get(theme, path)
  const configObjectOrFn = (props.transitionConfig ||
    defaultConfig) as MaybeTransitionConfig
  const config = runIfFn(configObjectOrFn, props)

  const partsTransitionRef = React.useRef<PartTransition>({})

  return React.useMemo(() => {
    if (config) {
      const partsTransition: PartTransition = {}

      for (const part in config) {
        const { timeout = 0 } = config[part]
        const className = classNames?.[part] ?? themeKey.toLowerCase()
        const styles = transitionConfigToCSS(config[part], className)
        partsTransition[part] = { styles, timeout, className }
      }

      const prevTransitionString = JSON.stringify(partsTransitionRef.current)
      const nextTransitionString = JSON.stringify(partsTransition)

      if (nextTransitionString !== prevTransitionString) {
        partsTransitionRef.current = partsTransition
      }
    }

    return partsTransitionRef.current
  }, [classNames, config, themeKey])
}

export type UseTransitionConfigReturn = ReturnType<typeof useTransitionConfig>

export type TransitionConfigProps = {
  transitionConfig?: Record<string, TransitionConfig>
}

const [TransitionsProvider, useTransitions] = createContext<
  UseTransitionConfigReturn
>({
  errorMessage:
    "useTransitions: `context` is undefined or null. Seems you forgot to wrap the components within <TransitionsProvider />",
})

export { TransitionsProvider, useTransitions }
