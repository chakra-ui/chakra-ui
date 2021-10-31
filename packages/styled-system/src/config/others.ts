import { memoizedGet as get } from "@chakra-ui/utils"
import { Config } from "../utils/prop-config"
import { ResponsiveValue, Token } from "../utils/types"

const srOnly = {
  border: "0px",
  clip: "rect(0, 0, 0, 0)",
  width: "1px",
  height: "1px",
  margin: "-1px",
  padding: "0px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "absolute",
}

const srFocusable = {
  position: "static",
  width: "auto",
  height: "auto",
  clip: "auto",
  padding: "0",
  margin: "0",
  overflow: "visible",
  whiteSpace: "normal",
}

const getWithPriority = (theme: any, key: any, styles: any) => {
  const result = {}
  const obj = get(theme, key, {})
  for (const prop in obj) {
    const isInStyles = prop in styles && styles[prop] != null
    if (!isInStyles) result[prop] = obj[prop]
  }
  return result
}

export const others: Config = {
  srOnly: {
    transform(value) {
      if (value === true) return srOnly
      if (value === "focusable") return srFocusable
      return {}
    },
  },
  layerStyle: {
    processResult: true,
    transform: (value, theme, styles) =>
      getWithPriority(theme, `layerStyles.${value}`, styles),
  },
  textStyle: {
    processResult: true,
    transform: (value, theme, styles) =>
      getWithPriority(theme, `textStyles.${value}`, styles),
  },
  apply: {
    processResult: true,
    transform: (value, theme, styles) => getWithPriority(theme, value, styles),
  },
}

export interface OtherProps {
  /**
   * If `true`, hide an element visually without hiding it from screen readers.
   *
   * If `focusable`, the sr-only styles will be undone, making the element visible
   * to sighted users as well as screen readers.
   */
  srOnly?: true | "focusable"
  /**
   * The layer style object to apply.
   * Note: Styles must be located in `theme.layerStyles`
   */
  layerStyle?: Token<string & {}, "layerStyles">
  /**
   * The text style object to apply.
   * Note: Styles must be located in `theme.textStyles`
   */
  textStyle?: Token<string & {}, "textStyles">
  /**
   * Apply theme-aware style objects in `theme`
   *
   * @example
   * ```jsx
   * <Box apply="styles.h3">This is a div</Box>
   * ```
   *
   * This will apply styles defined in `theme.styles.h3`
   */
  apply?: ResponsiveValue<string>
}
