import * as CSS from "csstype"
import { createParser, Config } from "@styled-system/core"
import { ResponsiveValue, Length } from "../utils"

const config: Config = {
  bg: {
    property: "background",
    scale: "colors",
  },
  bgColor: {
    property: "backgroundColor",
    scale: "colors",
  },
  background: {
    property: "background",
    scale: "colors",
  },
  backgroundColor: {
    property: "backgroundColor",
    scale: "colors",
  },
  backgroundImage: true,
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  backgroundAttachment: true,
  backgroundBlendMode: true,
  bgImage: {
    property: "backgroundImage",
  },
  bgImg: {
    property: "backgroundImage",
  },
  bgBlendMode: {
    property: "backgroundBlendMode",
  },
  bgSize: {
    property: "backgroundSize",
  },
  bgPosition: {
    property: "backgroundPosition",
  },
  bgPos: {
    property: "backgroundPosition",
  },
  bgRepeat: {
    property: "backgroundRepeat",
  },
  bgAttachment: {
    property: "backgroundAttachment",
  },
}

export interface BackgroundProps {
  /**
   * The CSS `background` property
   */
  bg?: ResponsiveValue<CSS.BackgroundProperty<Length>>
  /**
   * The CSS `background` property
   */
  background?: ResponsiveValue<CSS.BackgroundProperty<Length>>
  /**
   * The CSS `background-color` property
   */
  bgColor?: ResponsiveValue<CSS.BackgroundColorProperty>
  /**
   * The CSS `background-color` property
   */
  backgroundColor?: ResponsiveValue<CSS.BackgroundColorProperty>
  /**
   * The CSS `background-image` property
   */
  backgroundImage?: ResponsiveValue<CSS.BackgroundImageProperty>
  /**
   * The CSS `background-blend-mode` property
   */
  backgroundBlendMode?: ResponsiveValue<CSS.BackgroundBlendModeProperty>
  /**
   * The CSS `background-blend-mode` property
   */
  bgBlendMode?: ResponsiveValue<CSS.BackgroundBlendModeProperty>
  /**
   * The CSS `background-size` property
   */
  backgroundSize?: ResponsiveValue<CSS.BackgroundSizeProperty<Length>>
  /**
   * The CSS `background-position` property
   */
  bgPos?: ResponsiveValue<CSS.BackgroundPositionProperty<Length>>
  /**
   * The CSS `background-position` property
   */
  backgroundPosition?: ResponsiveValue<CSS.BackgroundPositionProperty<Length>>
  /**
   * The CSS `background-image` property
   */
  bgImage?: ResponsiveValue<CSS.BackgroundImageProperty>
  /**
   * The CSS `background-image` property
   */
  bgImg?: ResponsiveValue<CSS.BackgroundImageProperty>
  /**
   * The CSS `background-repeat` property
   */
  bgRepeat?: ResponsiveValue<CSS.BackgroundRepeatProperty>
  /**
   * The CSS `background-repeat` property
   */
  backgroundRepeat?: ResponsiveValue<CSS.BackgroundRepeatProperty>
  /**
   * The CSS `background-size` property
   */
  bgSize?: ResponsiveValue<CSS.BackgroundSizeProperty<Length>>
  /**
   * The CSS `background-attachment` property
   */
  bgAttachment?: ResponsiveValue<CSS.BackgroundAttachmentProperty>
  /**
   * The CSS `background-attachment` property
   */
  backgroundAttachment?: ResponsiveValue<CSS.BackgroundAttachmentProperty>
  /**
   * The CSS `background-position` property
   */
  bgPosition?: ResponsiveValue<CSS.BackgroundPositionProperty<Length>>
}

export const background = createParser(config)
