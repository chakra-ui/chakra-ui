import * as CSS from "csstype"
import type { Config } from "../utils/prop-config"
import { t, Token, transforms } from "../utils"

export const background: Config = {
  background: t.colors("background"),
  backgroundColor: t.colors("backgroundColor"),
  backgroundImage: t.propT("backgroundImage", transforms.bgImage),
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  backgroundAttachment: true,
  backgroundClip: { transform: transforms.bgClip },
  bgSize: t.prop("backgroundSize"),
  bgPosition: t.prop("backgroundPosition"),
  bg: t.colors("background"),
  bgColor: t.colors("backgroundColor"),
  bgPos: t.prop("backgroundPosition"),
  bgRepeat: t.prop("backgroundRepeat"),
  bgAttachment: t.prop("backgroundAttachment"),
  bgGradient: t.propT("backgroundImage", transforms.gradient),
  bgClip: { transform: transforms.bgClip },
}

Object.assign(background, {
  bgImage: background.backgroundImage,
  bgImg: background.backgroundImage,
})

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
