import { Config, createParser, system } from "@styled-system/core"
import * as CSS from "csstype"
import { ResponsiveValue } from "../utils"

const config: Config = {
  transition: true,
  transitionDuration: {
    property: "transitionDuration",
    scale: "transition.duration",
  },
  transitionProperty: {
    property: "transitionProperty",
    scale: "transition.property",
  },
  transitionTimingFunction: {
    property: "transitionTimingFunction",
    scale: "transition.timingFunction",
  },
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

export const transition = system(config)
export const transitionParser = createParser(config)
