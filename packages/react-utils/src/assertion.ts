import { isObject } from "@chakra-ui/utils"
import * as React from "react"

export function isInputEvent(value: any): value is React.ChangeEvent {
  return value && isObject(value) && isObject(value.target)
}
