import * as CSS from "csstype"
import { createParser } from "../create-parser"
import { Config, Length, ResponsiveValue } from "../utils"

const config: Config = {
  animation: true,
  appearance: true,
  transform: true,
  transformOrigin: true,
  visibility: true,
  userSelect: true,
  pointerEvents: true,
  cursor: true,
  resize: true,
  transition: true,
  transitionProperty: true,
  transitionDuration: true,
  transitionTimingFunction: true,
  objectFit: true,
  objectPosition: true,
  float: true,
  willChange: true,
  listStyleType: true,
  listStylePosition: true,
  listStyleImage: true,
}

export interface OtherProps {
  /**
   * The CSS `animation` property
   */
  animation?: ResponsiveValue<CSS.AnimationProperty>
  /**
   * The CSS `appearance` property
   */
  appearance?: ResponsiveValue<CSS.AppearanceProperty>
  /**
   * The CSS `transform` property
   */
  transform?: ResponsiveValue<CSS.TransformProperty>
  /**
   * The CSS `transform-origin` property
   */
  transformOrigin?: ResponsiveValue<CSS.TransformOriginProperty<Length>>
  /**
   * The CSS `visibility` property
   */
  visibility?: ResponsiveValue<CSS.VisibilityProperty>
  /**
   * The CSS `user-select` property
   */
  userSelect?: ResponsiveValue<CSS.UserSelectProperty>
  /**
   * The CSS `pointer-events` property
   */
  pointerEvents?: ResponsiveValue<CSS.PointerEventsProperty>
  /**
   * The CSS `cursor` property
   */
  cursor?: ResponsiveValue<CSS.CursorProperty>
  /**
   * The CSS `resize` property
   */
  resize?: ResponsiveValue<CSS.ResizeProperty>
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
  /**
   * The CSS `object-fit` property
   */
  objectFit?: ResponsiveValue<CSS.ObjectFitProperty>
  /**
   * The CSS `object-psition` property
   */
  objectPosition?: ResponsiveValue<CSS.ObjectPositionProperty<Length>>
  /**
   * The CSS `float` property
   */
  float?: ResponsiveValue<CSS.FloatProperty>
  /**
   * The CSS `will-change` property
   */
  willChange?: ResponsiveValue<CSS.WillChangeProperty>
  /**
   * The CSS `list-style-type` property
   */
  listStyleType?: ResponsiveValue<CSS.ListStyleTypeProperty>
  /**
   * The CSS `list-style-position` property
   */
  listStylePosition?: ResponsiveValue<CSS.ListStylePositionProperty>
  /**
   * The CSS `list-style-image` property
   */
  listStyleImage?: ResponsiveValue<CSS.ListStyleImageProperty>
}

export const others = createParser(config)
