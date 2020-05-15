import * as CSS from "csstype"
import { createParser } from "../create-parser"
import { Config, Length, Prop } from "../utils"

/**
 * The parser configuration for common background properties
 */
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
  bgBlendMode: {
    property: "backgroundBlendMode",
  },
  bgSize: {
    property: "backgroundSize",
  },
  bgPosition: {
    property: "backgroundPosition",
  },
  bgRepeat: {
    property: "backgroundRepeat",
  },
  bgAttachment: {
    property: "backgroundAttachment",
  },
}

/**
 * The prop types for background properties listed above
 */
export interface BackgroundProps {
  /**
   * The CSS `background` property
   */
  bg?: Prop<CSS.BackgroundProperty<Length>>
  /**
   * The CSS `background` property
   */
  background?: Prop<CSS.BackgroundProperty<Length>>
  /**
   * The CSS `background-color` property
   */
  bgColor?: Prop<CSS.BackgroundColorProperty>
  /**
   * The CSS `background-color` property
   */
  backgroundColor?: Prop<CSS.BackgroundColorProperty>
  /**
   * The CSS `background-image` property
   */
  backgroundImage?: Prop<CSS.BackgroundImageProperty>
  /**
   * The CSS `background-blend-mode` property
   */
  backgroundBlendMode?: Prop<CSS.BackgroundBlendModeProperty>
  /**
   * The CSS `background-blend-mode` property
   */
  bgBlendMode?: Prop<CSS.BackgroundBlendModeProperty>
  /**
   * The CSS `background-size` property
   */
  backgroundSize?: Prop<CSS.BackgroundSizeProperty<Length>>
  /**
   * The CSS `background-position` property
   */
  backgroundPosition?: Prop<CSS.BackgroundPositionProperty<Length>>
  /**
   * The CSS `background-image` property
   */
  bgImage?: Prop<CSS.BackgroundImageProperty>
  /**
   * The CSS `background-repeat` property
   */
  bgRepeat?: Prop<CSS.BackgroundRepeatProperty>
  /**
   * The CSS `background-repeat` property
   */
  backgroundRepeat?: Prop<CSS.BackgroundRepeatProperty>
  /**
   * The CSS `background-size` property
   */
  bgSize?: Prop<CSS.BackgroundSizeProperty<Length>>
  /**
   * The CSS `background-attachment` property
   */
  bgAttachment?: Prop<CSS.BackgroundAttachmentProperty>
  /**
   * The CSS `background-attachment` property
   */
  backgroundAttachment?: Prop<CSS.BackgroundAttachmentProperty>
  /**
   * The CSS `background-position` property
   */
  bgPosition?: Prop<CSS.BackgroundPositionProperty<Length>>
}

/**
 * Create the parser for the config object
 */
export const background = createParser(config)
