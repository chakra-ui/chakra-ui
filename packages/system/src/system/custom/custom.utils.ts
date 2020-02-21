import { config } from "./custom"
import { isObject, memoizeOne } from "@chakra-ui/utils"

const transformProp = memoizeOne((prop: string, propValue: any): object => {
  const configKeys: string[] = Object.keys(config)
  const result: Record<string, any> = {}

  if (configKeys.includes(prop)) {
    const { properties, property } = config[prop]
    if (properties) {
      properties.forEach((prop: string) => (result[prop] = propValue))
    }
    if (property) {
      result[property] = propValue
    }
    if (config[prop] === true) {
      result[prop] = propValue
    }
  } else {
    result[prop] = propValue
  }
  return result
})

export const transformProps = (props: any): object => {
  //@ts-ignore
  let result: Record<string, any> = null
  for (const prop in props) {
    if (isObject(props[prop])) {
      result = { ...result, [prop]: transformProps(props[prop]) }
    } else {
      result = { ...result, ...transformProp(prop, props[prop]) }
    }
  }
  return result
}

export default transformProps
