/* eslint-disable */
import type { FunctionComponent } from "react"
import type { AspectRatioProperties } from "../patterns/aspect-ratio"
import type { HTMLChakraProps } from "../types/jsx"
import type { DistributiveOmit } from "../types/system-types"

export interface AspectRatioProps
  extends
    AspectRatioProperties,
    DistributiveOmit<
      HTMLChakraProps<"div">,
      keyof AspectRatioProperties | "aspectRatio"
    > {}

export declare const AspectRatio: FunctionComponent<AspectRatioProps>
