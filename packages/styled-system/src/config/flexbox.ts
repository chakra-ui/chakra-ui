import * as CSS from "csstype"
import { createParser, Config, system } from "@styled-system/core"
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
  alignItems?: ResponsiveValue<CSS.Property.AlignItems>
  /**
   * The CSS `align-content` property
   */
  alignContent?: ResponsiveValue<CSS.Property.AlignContent>
  /**
   * The CSS `justify-items` property
   */
  justifyItems?: ResponsiveValue<CSS.Property.JustifyItems>
  /**
   * The CSS `justify-content` property
   */
  justifyContent?: ResponsiveValue<CSS.Property.JustifyContent>
  /**
   * The CSS `flex-wrap` property
   */
  flexWrap?: ResponsiveValue<CSS.Property.FlexWrap>
  /**
   * The CSS `flex-basis` property
   */
  flexBasis?: ResponsiveValue<CSS.Property.FlexBasis<Length>>
  /**
   * The CSS `flex-direction` property
   */
  flexDirection?: ResponsiveValue<CSS.Property.FlexDirection>
  /**
   * The CSS `flex-direction` property
   */
  flexDir?: ResponsiveValue<CSS.Property.FlexDirection>
  /**
   * The CSS `flex` property
   */
  flex?: ResponsiveValue<CSS.Property.Flex<Length>>
  /**
   * The CSS `justify-self` property
   */
  justifySelf?: ResponsiveValue<CSS.Property.JustifySelf>
  /**
   * The CSS `align-self` property
   */
  alignSelf?: ResponsiveValue<CSS.Property.AlignSelf>
  /**
   * The CSS `order` property
   */
  order?: ResponsiveValue<CSS.Property.Order>
  /**
   * The CSS `flex-grow` property
   */
  flexGrow?: ResponsiveValue<CSS.Property.FlexGrow>
  /**
   * The CSS `flex-shrink` property
   */
  flexShrink?: ResponsiveValue<CSS.Property.FlexShrink>
}

export const flexbox = system(config)
export const flexboxParser = createParser(config)
