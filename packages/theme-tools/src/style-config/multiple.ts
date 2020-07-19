import { SystemStyleObject } from "@chakra-ui/system"
import { Dict } from "@chakra-ui/utils"

export interface MultiStyleConfig<
  P,
  B extends PartsFn<P>,
  S extends Base<P>,
  V extends Base<P>
> {
  parts: P
  baseStyle?: B
  sizes?: S
  variants?: V
  defaultProps?: {
    colorScheme?: string
    size?: keyof S
    variant?: keyof V
  }
}

type PartsStyle<P> = {
  [K in keyof P]?: SystemStyleObject
}

type PartsFn<P> = PartsStyle<P> | ((props: Dict) => PartsStyle<P>)

type Base<P> = {
  [value: string]: PartsFn<P> | undefined
}

export function multiStyleConfig<
  P,
  B extends PartsFn<P>,
  S extends Base<P>,
  V extends Base<P>
>(config: MultiStyleConfig<P, B, S, V>) {
  return config as MultiStyleConfig<P, B, S, V> & {
    propTypes: { variant?: keyof V; size?: keyof S; colorScheme?: string }
  }
}
