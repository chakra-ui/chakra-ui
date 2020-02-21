import * as React from "react"
import getMediaQuery from "./get-media-query"
import { syncBodyClassName } from "./update-body-classname"
import useOSPreference from "./use-os-preference"
import useSyncTabs from "./use-sync-tabs"
import { ColorModeType, storage, storageKey } from "./constants"

type ColorModeReturn = [
  ColorModeType,
  React.Dispatch<React.SetStateAction<ColorModeType>>,
]

const ColorModeContext = React.createContext<ColorModeReturn | undefined>([
  "light",
  () => {},
])

export const useColorMode = () =>
  React.useContext(ColorModeContext) as ColorModeReturn

interface Props {
  mode?: ColorModeType
  children?: React.ReactNode
}

export const ColorModeProvider: React.FC = ({ children, mode }: Props) => {
  function initColorMode() {
    const mode = storage.get()
    if (mode) {
      syncBodyClassName(mode === "dark")
      return mode
    } else {
      const { isDark } = getMediaQuery()
      syncBodyClassName(isDark)
      return isDark ? "dark" : "light"
    }
  }

  const [colorMode, setColorMode] = React.useState<ColorModeType>(initColorMode)

  useSyncTabs(storageKey, setColorMode)

  useOSPreference(setColorMode)

  React.useEffect(() => {
    if (!colorMode) return
    storage.set(colorMode)
    syncBodyClassName(colorMode === "dark")
  }, [colorMode])

  //@ts-ignore
  const [manualMode, setManualMode] = React.useState<ColorModeType>(mode)

  const context: ColorModeReturn =
    typeof mode != "undefined"
      ? [manualMode, setManualMode]
      : [colorMode, setColorMode]

  return <ColorModeContext.Provider value={context} children={children} />
}

export const DarkMode = (props: Props) => (
  <ColorModeProvider mode="dark" {...props} />
)
export const LightMode = (props: Props) => (
  <ColorModeProvider mode="light" {...props} />
)
