/* eslint-disable */
import type { FunctionComponent } from "react"
import type { GridItemProperties } from "../patterns/grid-item"
import type { HTMLChakraProps } from "../types/jsx"
import type { DistributiveOmit } from "../types/system-types"

export interface GridItemProps
  extends
    GridItemProperties,
    DistributiveOmit<HTMLChakraProps<"div">, keyof GridItemProperties> {}

export declare const GridItem: FunctionComponent<GridItemProps>
