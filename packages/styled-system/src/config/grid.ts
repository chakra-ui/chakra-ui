import * as CSS from "csstype"
import { createParser, Config, system } from "../core"
import { Length, ResponsiveValue, t } from "../utils"
import { ThemeTypings } from "../theming.types"

const config: Config = {
  gridGap: t.space("gridGap"),
  gridColumnGap: t.space("gridColumnGap"),
  gridRowGap: t.space("gridRowGap"),
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridColumnStart: true,
  gridColumnEnd: true,
  gridRowStart: true,
  gridRowEnd: true,
  gridAutoRows: true,
  gridTemplate: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true,
}

export interface GridProps {
  /**
   * The CSS `grid-gap` property.
   *
   * It defines the gaps (gutters) between rows and columns
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-gap)
   */
  gridGap?: ResponsiveValue<
    ThemeTypings["sizes"] | CSS.Property.GridGap<Length>
  >
  /**
   * The CSS `grid-column-gap` property.
   *
   * It defines the size of the gap (gutter) between an element's columns.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap)
   */
  gridColumnGap?: ResponsiveValue<
    ThemeTypings["sizes"] | CSS.Property.GridColumnGap<Length>
  >
  /**
   * The CSS `grid-row-gap` property.
   *
   * It defines the size of the gap (gutter) between an element's grid rows.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap)
   */
  gridRowGap?: ResponsiveValue<
    ThemeTypings["sizes"] | CSS.Property.GridRowGap<Length>
  >
  /**
   * The CSS `grid-column` property.
   *
   * It specifies a grid item’s start position within the grid column by
   * contributing a line, a span, or nothing (automatic) to its grid placement
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start)
   */
  gridColumnStart?: ResponsiveValue<CSS.Property.GridColumnStart>
  /**
   * The CSS `grid-row-start` property
   *
   * It specifies a grid item’s start position within the grid row by
   * contributing a line, a span, or nothing (automatic) to its grid placement,
   * thereby specifying the `inline-start` edge of its grid area.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-start)
   */
  gridRowStart?: ResponsiveValue<CSS.Property.GridRowStart>
  /**
   * The CSS `grid-row-end` property
   *
   * It specifies a grid item’s end position within the grid row by
   * contributing a line, a span, or nothing (automatic) to its grid placement,
   * thereby specifying the `inline-end` edge of its grid area.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-end)
   */
  gridRowEnd?: ResponsiveValue<CSS.Property.GridRowEnd>
  /**
   * The CSS `grid-template` property.
   *
   * It is a shorthand property for defining grid columns, rows, and areas.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template)
   */
  gridTemplate?: ResponsiveValue<CSS.Property.GridTemplate>
  /**
   * The CSS `grid-column` property
   *
   * It specifies a grid item’s end position within the grid column by
   * contributing a line, a span, or nothing (automatic) to its grid placement,
   * thereby specifying the block-end edge of its grid area.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-end)
   */
  gridColumnEnd?: ResponsiveValue<CSS.Property.GridColumnEnd>
  /**
   * The CSS `grid-column` property.
   *
   * It specifies a grid item's size and location within a grid column
   * by contributing a line, a span, or nothing (automatic) to its grid placement,
   * thereby specifying the `inline-start` and `inline-end` edge of its grid area.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column)
   */
  gridColumn?: ResponsiveValue<CSS.Property.GridColumn>
  /**
   * The CSS `grid-row` property
   *
   * It specifies a grid item’s size and location within the grid row
   * by contributing a line, a span, or nothing (automatic) to its grid placement,
   * thereby specifying the `inline-start` and `inline-end` edge of its grid area.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row)
   */
  gridRow?: ResponsiveValue<CSS.Property.GridRow>
  /**
   * The CSS `grid-auto-flow` property
   *
   * It controls how the auto-placement algorithm works,
   * specifying exactly how auto-placed items get flowed into the grid.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow)
   */
  gridAutoFlow?: ResponsiveValue<CSS.Property.GridAutoFlow>
  /**
   * The CSS `grid-auto-columns` property.
   *
   * It specifies the size of an implicitly-created grid column track or pattern of tracks.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns)
   */
  gridAutoColumns?: ResponsiveValue<
    ThemeTypings["sizes"] | CSS.Property.GridAutoColumns<Length>
  >
  /**
   * The CSS `grid-auto-rows` property.
   *
   * It specifies the size of an implicitly-created grid row track or pattern of tracks.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-rows)
   */
  gridAutoRows?: ResponsiveValue<
    ThemeTypings["sizes"] | CSS.Property.GridAutoRows<Length>
  >
  /**
   * The CSS `grid-template-columns` property
   *
   * It defines the line names and track sizing functions of the grid columns.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns)
   */
  gridTemplateColumns?: ResponsiveValue<
    ThemeTypings["sizes"] | CSS.Property.GridTemplateColumns<Length>
  >
  /**
   * The CSS `grid-template-rows` property.
   *
   * It defines the line names and track sizing functions of the grid rows.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows)
   */
  gridTemplateRows?: ResponsiveValue<
    ThemeTypings["sizes"] | CSS.Property.GridTemplateRows<Length>
  >
  /**
   * The CSS `grid-template-areas` property.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas)
   */
  gridTemplateAreas?: ResponsiveValue<CSS.Property.GridTemplateAreas>
  /**
   * The CSS `grid-areas` property.
   *
   * It specifies a grid item’s size and location within a grid by
   * contributing a line, a span, or nothing (automatic)
   * to its grid placement, thereby specifying the edges of its grid area.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area)
   */
  gridArea?: ResponsiveValue<CSS.Property.GridArea>
}

export const grid = system(config)
export const gridParser = createParser(config)
