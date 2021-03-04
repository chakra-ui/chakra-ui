import * as CSS from "csstype"
import { Config } from "../prop-config"
import { Token } from "../utils"

const templates = {
  auto: "var(--ck-transform)",
  "auto-gpu": "var(--ck-transform-gpu)",
}

export const transform: Config = {
  transform: {
    property: "transform",
    transform(value) {
      return templates[value] ?? value
    },
  },
  transformOrigin: true,
}

export interface TransformProps {
  /**
   * The CSS `transform` property
   */
  transform?: Token<CSS.Property.Transform | keyof typeof templates>
  /**
   * The CSS `transform-origin` property
   */
  transformOrigin?: Token<CSS.Property.TransformOrigin | number, "sizes">
}
