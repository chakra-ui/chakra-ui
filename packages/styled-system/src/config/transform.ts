import * as CSS from "csstype"
import { Config } from "../utils/prop-config"
import { Length, t, Token, transforms } from "../utils"

export const transform: Config = {
  clipPath: true,
  transform: t.propT("transform", transforms.transform),
  transformOrigin: true,
  translateX: t.spaceT("--chakra-translate-x"),
  translateY: t.spaceT("--chakra-translate-y"),
  skewX: t.degreeT("--chakra-skew-x"),
  skewY: t.degreeT("--chakra-skew-y"),
  scaleX: t.prop("--chakra-scale-x"),
  scaleY: t.prop("--chakra-scale-y"),
  scale: t.prop(["--chakra-scale-x", "--chakra-scale-y"]),
  rotate: t.degreeT("--chakra-rotate"),
}

export interface TransformProps {
  /**
   * The CSS `transform` property
   */
  transform?: Token<CSS.Property.Transform | "auto" | "auto-gpu">
  /**
   * The CSS `transform-origin` property
   */
  transformOrigin?: Token<CSS.Property.TransformOrigin | number, "sizes">
  /**
   * The CSS `clip-path` property.
   *
   * It creates a clipping region that sets what part of an element should be shown.
   */
  clipPath?: Token<CSS.Property.ClipPath>
  /**
   * Translate value of an elements in the x-direction.
   * - Only works if `transform=auto`
   * - It sets the value of `--chakra-translate-x`
   */
  translateX?: Token<Length>
  /**
   * Translate value of an elements in the y-direction.
   * - Only works if `transform=auto`
   * - It sets the value of `--chakra-translate-y`
   */
  translateY?: Token<Length>
  /**
   * Sets the rotate value of the element
   */
  rotate?: Token<Length>
  /**
   * Skew value of an elements in the x-direction.
   * - Only works if `transform=auto`
   * - It sets the value of `--chakra-skew-x`
   */
  skewX?: Token<Length>
  /**
   * Skew value of an elements in the y-direction.
   * - Only works if `transform=auto`
   * - It sets the value of `--chakra-skew-y`
   */
  skewY?: Token<Length>
  /**
   * Scale value of an elements in the x-direction.
   * - Only works if `transform=auto`
   * - It sets the value of `--chakra-scale-x`
   */
  scaleX?: Token<Length>
  /**
   * Scale value of an elements in the y-direction.
   * - Only works if `transform=auto`
   * - It sets the value of `--chakra-scale-y`
   */
  scaleY?: Token<Length>
  /**
   * Sets the scale value of the element
   */
  scale?: Token<Length>
}
