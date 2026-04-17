/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface SkipNavLinkVariant {}

type SkipNavLinkVariantMap = {
  [key in keyof SkipNavLinkVariant]: Array<SkipNavLinkVariant[key]>
}

export type SkipNavLinkVariantProps = {
  [key in keyof SkipNavLinkVariant]?:
    | ConditionalValue<SkipNavLinkVariant[key]>
    | undefined
}

export interface SkipNavLinkRecipe {
  __type: SkipNavLinkVariantProps;
  (props?: SkipNavLinkVariantProps): string
  raw: (props?: SkipNavLinkVariantProps) => SkipNavLinkVariantProps
  variantMap: SkipNavLinkVariantMap
  variantKeys: Array<keyof SkipNavLinkVariant>
  splitVariantProps<Props extends SkipNavLinkVariantProps>(
    props: Props,
  ): [
    SkipNavLinkVariantProps,
    Pretty<DistributiveOmit<Props, keyof SkipNavLinkVariantProps>>,
  ]
  getVariantProps: (props?: SkipNavLinkVariantProps) => SkipNavLinkVariantProps
}

export declare const skipNavLink: SkipNavLinkRecipe
