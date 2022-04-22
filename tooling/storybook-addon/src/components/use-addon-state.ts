import { useUpdateEffect } from "@chakra-ui/react"
import addons from "@storybook/addons"
import { useAddonState, useParameter } from "@storybook/api"
import { AddonState, ADDON_ID, EVENTS, STORAGE_KEY } from "../constants"

function getLocalStorage(key: string) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null")
  } catch (e) {
    return null
  }
}

function setLocalStorage(key: string, value: any) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    // noop
  }
}

export function getPersistedState(): AddonState {
  return {
    colorMode: getLocalStorage(STORAGE_KEY.colorMode),
    direction: getLocalStorage(STORAGE_KEY.direction),
  }
}

export function useChakraParameter(): AddonState {
  return useParameter("chakra")
}

export function useChakraAddonState() {
  const persisted = getPersistedState()
  const [state, setState] = useAddonState<AddonState>(ADDON_ID, persisted)
  const channel = addons.getChannel()

  const toggleColorMode = () => {
    const colorMode = state.colorMode === "dark" ? "light" : "dark"
    setState((state) => ({ ...state, colorMode }))
    channel.emit(EVENTS.TOGGLE_COLOR_MODE, colorMode)
  }

  const toggleDirection = () => {
    const direction = state.direction === "ltr" ? "rtl" : "ltr"
    setState((state) => ({ ...state, direction }))
    channel.emit(EVENTS.TOGGLE_DIRECTION, direction)
  }

  useUpdateEffect(() => {
    // set storage
    setLocalStorage(STORAGE_KEY.colorMode, state.colorMode)
    setLocalStorage(STORAGE_KEY.direction, state.direction)

    // set `dir` on html element
    setTimeout(() => {
      const $el = document.getElementById("storybook-preview-iframe")
      const el = $el as HTMLIFrameElement
      el.contentDocument!.dir = state.direction
    })
  }, [state])

  return {
    ...state,
    toggleColorMode,
    toggleDirection,
  }
}
