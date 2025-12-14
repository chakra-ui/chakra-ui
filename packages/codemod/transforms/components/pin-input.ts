import {
  getComponentPropMappings,
  pinInputMappings,
} from "../../utils/component-mappings"
import { createComponentTransform } from "../../utils/create-component-transform"

export default createComponentTransform({
  componentMappings: pinInputMappings,
  propMappings: getComponentPropMappings("pin-input"),
})
