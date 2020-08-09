import * as CSS from "csstype"
import { createParser, Config, system } from "@styled-system/core"
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
  animation?: ResponsiveValue<CSS.Property.Animation>
  /**
   * The CSS `appearance` property
   */
  appearance?: ResponsiveValue<CSS.Property.Appearance>
  /**
   * The CSS `visibility` property
   */
  visibility?: ResponsiveValue<CSS.Property.Visibility>
  /**
   * The CSS `user-select` property
   */
  userSelect?: ResponsiveValue<CSS.Property.UserSelect>
  /**
   * The CSS `pointer-events` property
   */
  pointerEvents?: ResponsiveValue<CSS.Property.PointerEvents>
  /**
   * The CSS `cursor` property
   */
  cursor?: ResponsiveValue<CSS.Property.Cursor>
  /**
   * The CSS `resize` property
   */
  resize?: ResponsiveValue<CSS.Property.Resize>
  /**
   * The CSS `object-fit` property
   */
  objectFit?: ResponsiveValue<CSS.Property.ObjectFit>
  /**
   * The CSS `object-psition` property
   */
  objectPosition?: ResponsiveValue<CSS.Property.ObjectPosition<Length>>
  /**
   * The CSS `float` property
   */
  float?: ResponsiveValue<CSS.Property.Float>
  /**
   * The CSS `will-change` property
   */
  willChange?: ResponsiveValue<CSS.Property.WillChange>
}

export const others = system(config)
export const othersParser = createParser(config)
