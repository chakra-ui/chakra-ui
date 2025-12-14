import {
  getComponentPropMappings,
  radioGroupMappings,
} from "../../utils/component-mappings"
import { createComponentTransform } from "../../utils/create-component-transform"

export default createComponentTransform({
  componentMappings: radioGroupMappings,
  propMappings: getComponentPropMappings("radio-group"),
})
