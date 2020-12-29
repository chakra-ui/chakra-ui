import * as CSS from "csstype"
import { createParser, Config, system } from "../core"
import { ResponsiveValue, t } from "../utils"
import { PropsPath } from "../utils.types"
import { ChakraTheme } from ".."

const config: Config = {
  boxShadow: t.shadows("boxShadow"),
  textShadow: t.shadows("textShadow"),
}

Object.assign(config, {
  shadow: config.boxShadow,
})

/**
 * Types for box and text shadow properties
 */
export interface ShadowProps<Theme extends ChakraTheme = ChakraTheme> {
  /**
   * The `box-shadow` property
   */
  boxShadow?: ResponsiveValue<
    CSS.Property.BoxShadow | (number & PropsPath<Theme["shadows"]>)
  >
  /**
   * The `box-shadow` property
   */
  shadow?: ResponsiveValue<
    CSS.Property.BoxShadow | (number & PropsPath<Theme["shadows"]>)
  >
  /**
   * The `text-shadow` property
   */
  textShadow?: ResponsiveValue<
    CSS.Property.TextShadow | (number & PropsPath<Theme["shadows"]>)
  >
}

export const shadow = system(config)
export const shadowParser = createParser(config)
