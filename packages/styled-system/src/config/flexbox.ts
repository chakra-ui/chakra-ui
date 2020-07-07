import * as CSS from "csstype"
import { createParser, Config } from "@styled-system/core"
import { ResponsiveValue, Length } from "../utils"

const config: Config = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: true,
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: {
    property: "flexBasis",
    scale: "sizes",
  },
  justifySelf: true,
  alignSelf: true,
  order: true,
  flexDir: {
    property: "flexDirection",
  },
}

/**
 * Types for flexbox related CSS properties
 */
export interface FlexboxProps {
  /**
   * The CSS `align-items` property
   */
  alignItems?: ResponsiveValue<CSS.AlignItemsProperty>
  /**
   * The CSS `align-content` property
   */
  alignContent?: ResponsiveValue<CSS.AlignContentProperty>
  /**
   * The CSS `justify-items` property
   */
  justifyItems?: ResponsiveValue<CSS.JustifyItemsProperty>
  /**
   * The CSS `justify-content` property
   */
  justifyContent?: ResponsiveValue<CSS.JustifyContentProperty>
  /**
   * The CSS `flex-wrap` property
   */
  flexWrap?: ResponsiveValue<CSS.FlexWrapProperty>
  /**
   * The CSS `flex-basis` property
   */
  flexBasis?: ResponsiveValue<CSS.FlexBasisProperty<Length>>
  /**
   * The CSS `flex-direction` property
   */
  flexDirection?: ResponsiveValue<CSS.FlexDirectionProperty>
  /**
   * The CSS `flex-direction` property
   */
  flexDir?: ResponsiveValue<CSS.FlexDirectionProperty>
  /**
   * The CSS `flex` property
   */
  flex?: ResponsiveValue<CSS.FlexProperty<Length>>
  /**
   * The CSS `justify-self` property
   */
  justifySelf?: ResponsiveValue<CSS.JustifySelfProperty>
  /**
   * The CSS `align-self` property
   */
  alignSelf?: ResponsiveValue<CSS.AlignSelfProperty>
  /**
   * The CSS `order` property
   */
  order?: ResponsiveValue<CSS.GlobalsNumber>
  /**
   * The CSS `flex-grow` property
   */
  flexGrow?: ResponsiveValue<CSS.GlobalsNumber>
  /**
   * The CSS `flex-shrink` property
   */
  flexShrink?: ResponsiveValue<CSS.GlobalsNumber>
}

export const flexbox = createParser(config)
