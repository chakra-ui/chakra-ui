/* eslint-disable */
import type { FunctionComponent } from "react"
import type { SpacerProperties } from "../patterns/spacer"
import type { HTMLChakraProps } from "../types/jsx"
import type { DistributiveOmit } from "../types/system-types"

export interface SpacerProps
  extends
    SpacerProperties,
    DistributiveOmit<HTMLChakraProps<"div">, keyof SpacerProperties> {}

export declare const Spacer: FunctionComponent<SpacerProps>
