import * as CSS from "csstype"
import { createParser, Config, system } from "../core"
import { Token, t } from "../utils"
import { transformGradient } from "../utils/parse-gradient"

function transformBgClip(value: string) {
  return value === "text"
    ? { color: "transparent", backgroundClip: "text" }
    : { backgroundClip: value }
}

const config: Config = {
  bg: t.colors("background"),
  bgColor: t.colors("backgroundColor"),
  background: t.colors("background"),
  backgroundColor: t.colors("backgroundColor"),
  backgroundImage: true,
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  backgroundAttachment: true,
  backgroundBlendMode: true,
  backgroundClip: {
    property: "&",
    transform: transformBgClip,
  },
  bgImage: t.prop("backgroundImage"),
  bgImg: t.prop("backgroundImage"),
  bgBlendMode: t.prop("backgroundBlendMode"),
  bgSize: t.prop("backgroundSize"),
  bgPosition: t.prop("backgroundPosition"),
  bgPos: t.prop("backgroundPosition"),
  bgRepeat: t.prop("backgroundRepeat"),
  bgAttachment: t.prop("backgroundAttachment"),
  bgGradient: {
    property: "backgroundImage",
    transform: transformGradient,
  },
  bgClip: {
    property: "&",
    transform: transformBgClip,
  },
}

export interface BackgroundProps {
  /**
   * The CSS `background` property
   */
  bg?: Token<CSS.Property.Color, "colors">
  /**
   * The CSS `background-clip` property
   */
  bgClip?: Token<CSS.Property.BackgroundClip | "text">
  /**
   * The CSS `background-clip` property
   */
  backgroundClip?: Token<CSS.Property.BackgroundClip | "text">
  /**
   * The CSS `background` property
   */
  background?: Token<CSS.Property.Color, "colors">
  /**
   * The CSS `background-color` property
   */
  bgColor?: Token<CSS.Property.Color, "colors">
  /**
   * The CSS `background-color` property
   */
  backgroundColor?: Token<CSS.Property.Color, "colors">
  /**
   * The CSS `background-image` property
   */
  backgroundImage?: Token<CSS.Property.BackgroundImage>
  /**
   * The background-gradient shorthand
   */
  bgGradient?: Token<CSS.Property.BackgroundImage>
  /**
   * The CSS `background-blend-mode` property
   */
  backgroundBlendMode?: Token<CSS.Property.BackgroundBlendMode>
  /**
   * The CSS `background-blend-mode` property
   */
  bgBlendMode?: Token<CSS.Property.BackgroundBlendMode>
  /**
   * The CSS `background-size` property
   */
  backgroundSize?: Token<CSS.Property.BackgroundSize | number>
  /**
   * The CSS `background-position` property
   */
  bgPos?: Token<CSS.Property.BackgroundPosition | number>
  /**
   * The CSS `background-position` property
   */
  backgroundPosition?: Token<CSS.Property.BackgroundPosition | number>
  /**
   * The CSS `background-image` property
   */
  bgImage?: Token<CSS.Property.BackgroundImage>
  /**
   * The CSS `background-image` property
   */
  bgImg?: Token<CSS.Property.BackgroundImage>
  /**
   * The CSS `background-repeat` property
   */
  bgRepeat?: Token<CSS.Property.BackgroundRepeat>
  /**
   * The CSS `background-repeat` property
   */
  backgroundRepeat?: Token<CSS.Property.BackgroundRepeat>
  /**
   * The CSS `background-size` property
   */
  bgSize?: Token<CSS.Property.BackgroundSize | number>
  /**
   * The CSS `background-attachment` property
   */
  bgAttachment?: Token<CSS.Property.BackgroundAttachment>
  /**
   * The CSS `background-attachment` property
   */
  backgroundAttachment?: Token<CSS.Property.BackgroundAttachment>
  /**
   * The CSS `background-position` property
   */
  bgPosition?: Token<CSS.Property.BackgroundPosition | number>
}

export const background = system(config)
export const backgroundParser = createParser(config)
