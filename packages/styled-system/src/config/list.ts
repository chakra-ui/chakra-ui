import * as CSS from "csstype"
import { Config } from "../utils/prop-config"
import { ResponsiveValue, t } from "../utils"

export const list: Config = {
  listStyleType: true,
  listStylePosition: true,
  listStylePos: t.prop("listStylePosition"),
  listStyleImage: true,
  listStyleImg: t.prop("listStyleImage"),
}

export interface ListProps {
  listStyleType?: ResponsiveValue<CSS.Property.ListStyleType>
  /**
   * The CSS `list-style-position` property
   */
  listStylePosition?: ResponsiveValue<CSS.Property.ListStylePosition>
  /**
   * The CSS `list-style-position` property
   */
  listStylePos?: ResponsiveValue<CSS.Property.ListStylePosition>
  /**
   * The CSS `list-style-image` property
   */
  listStyleImage?: ResponsiveValue<CSS.Property.ListStyleImage>
  /**
   * The CSS `list-style-image` property
   */
  listStyleImg?: ResponsiveValue<CSS.Property.ListStyleImage>
}
