import { Dict } from "@chakra-ui/utils"
import { Properties } from "csstype"

export type ObjectOrArray<T> = T[] | { [K: string]: T | ObjectOrArray<T> }

type Props = {
  theme?: Dict
  [x: string]: any
}

export interface StyleFunction {
  (value: any, scale: any, props: Props): Dict | undefined
  scale?: any
  defaults?: any
}

export interface Parser {
  (props: Dict): Dict
  config: PropConfig
  propNames: string[]
  cache: Map<string, any>
  [k: string]: any
}

export type Scale = ObjectOrArray<number | string>

export interface PropConfig {
  property?: keyof Properties | "&"
  properties?: Array<keyof Properties>
  scale?: string
  defaultScale?: Scale
  transform?(value: any, scale: any, props: Props): any
  processResult?: boolean
}

export interface Config {
  [propName: string]: PropConfig | true
}
