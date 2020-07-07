import * as CSS from "csstype"
import { system, Config } from "@styled-system/core"
import { Length, ResponsiveValue } from "../utils"

const config: Config = {
  animation: true,
  appearance: true,
  visibility: true,
  userSelect: true,
  pointerEvents: true,
  cursor: true,
  resize: true,
  objectFit: true,
  objectPosition: true,
  float: true,
  willChange: true,
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
}

export const others = system(config)
