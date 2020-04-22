import * as CSS from "csstype"
import { createParser } from "../create-parser"
import { Config, Length, Prop } from "../utils"

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
  gridGap?: Prop<CSS.GridGapProperty<Length>>
  /**
   * The CSS `grid-column-gap` property
   */
  gridColumnGap?: Prop<CSS.GridColumnGapProperty<Length>>
  /**
   * The CSS `grid-row-gap` property
   */
  gridRowGap?: Prop<CSS.GridRowGapProperty<Length>>
  /**
   * The CSS `grid-column` property
   */
  gridColumn?: Prop<CSS.GridColumnProperty>
  /**
   * The CSS `grid-row` property
   */
  gridRow?: Prop<CSS.GridRowProperty>
  /**
   * The CSS `grid-auto-flow` property
   */
  gridAutoFlow?: Prop<CSS.GridAutoFlowProperty>
  /**
   * The CSS `grid-auto-columns` property
   */
  gridAutoColumns?: Prop<CSS.GridAutoColumnsProperty<Length>>
  /**
   * The CSS `grid-auto-rows` property
   */
  gridAutoRows?: Prop<CSS.GridAutoRowsProperty<Length>>
  /**
   * The CSS `grid-template-columns` property
   */
  gridTemplateColumns?: Prop<CSS.GridTemplateColumnsProperty<Length>>
  /**
   * The CSS `grid-template-rows` property
   */
  gridTemplateRows?: Prop<CSS.GridTemplateRowsProperty<Length>>
  /**
   * The CSS `grid-template-areas` property
   */
  gridTemplateAreas?: Prop<CSS.GridTemplateAreasProperty>
  /**
   * The CSS `grid-areas` property
   */
  gridArea?: Prop<CSS.GridAreaProperty>
  /**
   * The CSS `place-items` property
   */
  placeItems?: Prop<CSS.PlaceItemsProperty>
}

export const grid = createParser(config)
