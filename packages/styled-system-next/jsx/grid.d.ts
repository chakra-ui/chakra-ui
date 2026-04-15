/* eslint-disable */
import type { FunctionComponent } from "react"
import type { GridProperties } from "../patterns/grid"
import type { HTMLChakraProps } from "../types/jsx"
import type { DistributiveOmit } from "../types/system-types"

export interface GridProps
  extends
    GridProperties,
    DistributiveOmit<HTMLChakraProps<"div">, keyof GridProperties> {}

export declare const Grid: FunctionComponent<GridProps>
