/* eslint-disable */
import type { FunctionComponent } from "react"
import type { BleedProperties } from "../patterns/bleed"
import type { HTMLStyledProps } from "../types/jsx"
import type { DistributiveOmit } from "../types/system-types"

export interface BleedProps
  extends
    BleedProperties,
    DistributiveOmit<HTMLStyledProps<"div">, keyof BleedProperties> {}

export declare const Bleed: FunctionComponent<BleedProps>
