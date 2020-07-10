import * as CSS from "csstype"
import { createParser, Config, system } from "@styled-system/core"
import { Length, ResponsiveValue } from "../utils"

const config: Config = {
  gridGap: {
    property: "gridGap",
    scale: "space",
  },
  gridColumnGap: {
    property: "gridColumnGap",
    scale: "space",
  },
  gridRowGap: {
    property: "gridRowGap",
    scale: "space",
  },
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridAutoRows: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true,
  placeItems: true,
}

/**
 * Types for grid related CSS properties
 */
export interface GridProps {
  /**
   * The CSS `grid-gap` property
   */
  gridGap?: ResponsiveValue<CSS.GridGapProperty<Length>>
  /**
   * The CSS `grid-column-gap` property
   */
  gridColumnGap?: ResponsiveValue<CSS.GridColumnGapProperty<Length>>
  /**
   * The CSS `grid-row-gap` property
   */
  gridRowGap?: ResponsiveValue<CSS.GridRowGapProperty<Length>>
  /**
   * The CSS `grid-column` property
   */
  gridColumn?: ResponsiveValue<CSS.GridColumnProperty>
  /**
   * The CSS `grid-row` property
   */
  gridRow?: ResponsiveValue<CSS.GridRowProperty>
  /**
   * The CSS `grid-auto-flow` property
   */
  gridAutoFlow?: ResponsiveValue<CSS.GridAutoFlowProperty>
  /**
   * The CSS `grid-auto-columns` property
   */
  gridAutoColumns?: ResponsiveValue<CSS.GridAutoColumnsProperty<Length>>
  /**
   * The CSS `grid-auto-rows` property
   */
  gridAutoRows?: ResponsiveValue<CSS.GridAutoRowsProperty<Length>>
  /**
   * The CSS `grid-template-columns` property
   */
  gridTemplateColumns?: ResponsiveValue<CSS.GridTemplateColumnsProperty<Length>>
  /**
   * The CSS `grid-template-rows` property
   */
  gridTemplateRows?: ResponsiveValue<CSS.GridTemplateRowsProperty<Length>>
  /**
   * The CSS `grid-template-areas` property
   */
  gridTemplateAreas?: ResponsiveValue<CSS.GridTemplateAreasProperty>
  /**
   * The CSS `grid-areas` property
   */
  gridArea?: ResponsiveValue<CSS.GridAreaProperty>
  /**
   * The CSS `place-items` property
   */
  placeItems?: ResponsiveValue<CSS.PlaceItemsProperty>
}

export const grid = system(config)
export const gridParser = createParser(config)
