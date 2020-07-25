import { SystemStyleObject } from "@chakra-ui/system"
import { Dict } from "@chakra-ui/utils"

export interface StyleConfig<B extends BaseFn, S extends Base, V extends Base> {
  baseStyle?: B
  sizes?: S
  variants?: V
  defaultProps?: {
    colorScheme?: string
    size?: keyof S
    variant?: keyof V
  }
}

type BaseFn = SystemStyleObject | ((props: Dict) => SystemStyleObject)

type Base = {
  [value: string]: BaseFn | undefined
}

export function styleConfig<B extends BaseFn, S extends Base, V extends Base>(
  config: StyleConfig<B, S, V>,
) {
  return config as StyleConfig<B, S, V> & {
    propTypes: { variant?: keyof V; size?: keyof S; colorScheme?: string }
  }
}
