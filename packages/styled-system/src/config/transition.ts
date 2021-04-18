import * as CSS from "csstype"
import { Config } from "../prop-config"
import { ResponsiveValue, t } from "../utils"

export const transition: Config = {
  transition: true,
  transitionDuration: t.transitionDuration("transitionDuration"),
  transitionProperty: t.transitionProperty("transitionProperty"),
  transitionTimingFunction: t.transitionEasing("transitionTimingFunction"),
}

export interface TransitionProps {
  /**
   * The CSS `transition` property
   */
  transition?: ResponsiveValue<CSS.Property.Transition>
  /**
   * The CSS `transition-property` property
   */
  transitionProperty?: ResponsiveValue<CSS.Property.TransitionProperty>
  /**
   * The CSS `transition-timing-function` property
   */
  transitionTimingFunction?: ResponsiveValue<CSS.Property.TransitionTimingFunction>
  /**
   * The CSS `transition-duration` property
   */
  transitionDuration?: ResponsiveValue<string>
}
