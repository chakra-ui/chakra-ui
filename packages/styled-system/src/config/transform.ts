import * as CSS from "csstype"
import { createParser, Config, system } from "../core"
import { Length, ResponsiveValue } from "../utils"
import { PropsPath } from "../utils.types"
import { ChakraTheme } from ".."

const config: Config = {
  transform: true,
  transformOrigin: true,
}

export interface TransformProps<Theme extends ChakraTheme = ChakraTheme> {
  /**
   * The CSS `transform` property
   */
  transform?: ResponsiveValue<CSS.Property.Transform>
  /**
   * The CSS `transform-origin` property
   */
  transformOrigin?: ResponsiveValue<
    CSS.Property.TransformOrigin<Length> & PropsPath<Theme["sizes"]>
  >
}

export const transform = system(config)
export const transformParser = createParser(config)
