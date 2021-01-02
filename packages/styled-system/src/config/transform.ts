import * as CSS from "csstype"
import { Config, createParser, system } from "../core"
import { Length, ResponsiveValue } from "../utils"
import { ThemeTypings } from ".."

const config: Config = {
  transform: true,
  transformOrigin: true,
}

export interface TransformProps<Theme extends ThemeTypings = ThemeTypings> {
  /**
   * The CSS `transform` property
   */
  transform?: ResponsiveValue<CSS.Property.Transform>
  /**
   * The CSS `transform-origin` property
   */
  transformOrigin?: ResponsiveValue<
    Theme["sizes"] | CSS.Property.TransformOrigin<Length>
  >
}

export const transform = system(config)
export const transformParser = createParser(config)
