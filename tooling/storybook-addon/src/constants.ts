export const ADDON_ID = "@chakra-ui/storybook-addon"

export const STORAGE_KEY = {
  colorMode: "chakra-ui-color-mode",
  direction: "chakra-ui-direction",
}

export const TOOLS = {
  COLOR_MODE: `${ADDON_ID}/color-mode`,
  WRITING_DIRECTION: `${ADDON_ID}/dir`,
}

export const EVENTS = {
  TOGGLE_COLOR_MODE: `${ADDON_ID}/toggleColorMode`,
  TOGGLE_DIRECTION: `${ADDON_ID}/toggleDirection`,
}

export type AddonState = {
  direction: "ltr" | "rtl"
  colorMode: string
}
