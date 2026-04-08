/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface ContainerVariant {
  centerContent: boolean
  fluid: boolean
}

type ContainerVariantMap = {
  [key in keyof ContainerVariant]: Array<ContainerVariant[key]>
}

export type ContainerVariantProps = {
  [key in keyof ContainerVariant]?:
    | ConditionalValue<ContainerVariant[key]>
    | undefined
}

export interface ContainerRecipe {
  __type: ContainerVariantProps;
  (props?: ContainerVariantProps): string
  raw: (props?: ContainerVariantProps) => ContainerVariantProps
  variantMap: ContainerVariantMap
  variantKeys: Array<keyof ContainerVariant>
  splitVariantProps<Props extends ContainerVariantProps>(
    props: Props,
  ): [
    ContainerVariantProps,
    Pretty<DistributiveOmit<Props, keyof ContainerVariantProps>>,
  ]
  getVariantProps: (props?: ContainerVariantProps) => ContainerVariantProps
}

export declare const container: ContainerRecipe
