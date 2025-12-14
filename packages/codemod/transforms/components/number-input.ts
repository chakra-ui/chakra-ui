import {
  getComponentPropMappings,
  numberInputMappings,
} from "../../utils/component-mappings"
import { createComponentTransform } from "../../utils/create-component-transform"

export default createComponentTransform({
  componentMappings: numberInputMappings,
  propMappings: getComponentPropMappings("number-input"),
})
