/* eslint-disable */
import type {
  DistributiveOmit,
  HTMLPandaProps,
  JsxStyleProps,
  Pretty,
} from "../types"

declare const isCssProperty: (value: string) => boolean

type CssPropKey = keyof JsxStyleProps
type OmittedCssProps<T> = Pretty<DistributiveOmit<T, CssPropKey>>

declare const splitCssProps: <T>(
  props: T,
) => [JsxStyleProps, OmittedCssProps<T>]

export { isCssProperty, splitCssProps }
