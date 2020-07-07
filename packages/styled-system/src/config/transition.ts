import { Config, createParser } from "@styled-system/core"
import * as CSS from "csstype"
import { ResponsiveValue } from "../utils"

const config: Config = {
  transition: true,
  transitionProperty: true,
  transitionDuration: true,
  transitionTimingFunction: true,
}

export interface TransitionProps {
  /**
   * The CSS `transition` property
   */
  transition?: ResponsiveValue<CSS.TransitionProperty>
  /**
   * The CSS `transition-property` property
   */
  transitionProperty?: ResponsiveValue<CSS.TransitionPropertyProperty>
  /**
   * The CSS `transition-timing-function` property
   */
  transitionTimingFunction?: ResponsiveValue<
    CSS.TransitionTimingFunctionProperty
  >
  /**
   * The CSS `transition-duration` property
   */
  transitionDuration?: ResponsiveValue<string>
}

export const transition = createParser(config)
