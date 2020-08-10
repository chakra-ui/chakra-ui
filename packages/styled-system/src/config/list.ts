import { Config, createParser, system } from "@styled-system/core"
import * as CSS from "csstype"
import { ResponsiveValue } from "../utils"

const config: Config = {
  listStyleType: true,
  listStylePosition: true,
  listStylePos: {
    property: "listStylePosition",
  },
  listStyleImage: true,
  listStyleImg: {
    property: "listStyleImage",
  },
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

export const list = system(config)
export const listParser = createParser(config)
