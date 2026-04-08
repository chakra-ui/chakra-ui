/* eslint-disable */
import type { FunctionComponent } from "react"
import type { ContainerProperties } from "../patterns/container"
import type { HTMLStyledProps } from "../types/jsx"
import type { DistributiveOmit } from "../types/system-types"

export interface ContainerProps
  extends
    ContainerProperties,
    DistributiveOmit<HTMLStyledProps<"div">, keyof ContainerProperties> {}

export declare const Container: FunctionComponent<ContainerProps>
