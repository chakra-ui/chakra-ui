import * as CSS from "csstype"
import { createParser } from "../create-parser"
import { Config, Prop, Length } from "../utils"

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
  alignItems?: Prop<CSS.AlignItemsProperty>
  /**
   * The CSS `align-content` property
   */
  alignContent?: Prop<CSS.AlignContentProperty>
  /**
   * The CSS `justify-items` property
   */
  justifyItems?: Prop<CSS.JustifyItemsProperty>
  /**
   * The CSS `justify-content` property
   */
  justifyContent?: Prop<CSS.JustifyContentProperty>
  /**
   * The CSS `flex-wrap` property
   */
  flexWrap?: Prop<CSS.FlexWrapProperty>
  /**
   * The CSS `flex-basis` property
   */
  flexBasis?: Prop<CSS.FlexBasisProperty<Length>>
  /**
   * The CSS `flex-direction` property
   */
  flexDirection?: Prop<CSS.FlexDirectionProperty>
  /**
   * The CSS `flex-direction` property
   */
  flexDir?: Prop<CSS.FlexDirectionProperty>
  /**
   * The CSS `flex` property
   */
  flex?: Prop<CSS.FlexProperty<Length>>
  /**
   * The CSS `justify-self` property
   */
  justifySelf?: Prop<CSS.JustifySelfProperty>
  /**
   * The CSS `align-self` property
   */
  alignSelf?: Prop<CSS.AlignSelfProperty>
  /**
   * The CSS `order` property
   */
  order?: Prop<CSS.GlobalsNumber>
  /**
   * The CSS `flex-grow` property
   */
  flexGrow?: Prop<CSS.GlobalsNumber>
  /**
   * The CSS `flex-shrink` property
   */
  flexShrink?: Prop<CSS.GlobalsNumber>
}

export const flexbox = createParser(config)
