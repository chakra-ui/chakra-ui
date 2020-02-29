import { get } from "./get"
import { isNull } from "@chakra-ui/utils"

export type Config =
  | null
  | true
  | {
      property?: string
      properties?: string[]
      scale?: string
      transform?: (value: any, scale: any) => any
      fallbackScale?: any
    }

export type ConfigObject = { [prop: string]: Config }

export function transformConfig(configs: ConfigObject, theme: any) {
  const result: any = {}
  Object.keys(configs).forEach(key => {
    const config = configs[key]

    if (isNull(config)) return

    if (config === true) {
      result[key] = { property: key }
      return
    }

    const { property, properties, scale, transform, fallbackScale } = config

    if (property) {
      result[key] = {
        property,
        ...(!!transform && { transform }),
        ...(!!scale && { scale: get(theme, scale, fallbackScale) }),
      }
      return
    }

    //@ts-ignore
    result[key] = properties.map(prop => ({
      property: prop,
      ...(!!transform && { transform }),
      ...(!!scale && { scale: get(theme, scale, fallbackScale) }),
    }))
  })

  return result
}
