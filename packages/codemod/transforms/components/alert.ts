import {
  alertMappings,
  getComponentPropMappings,
} from "../../utils/component-mappings"
import { createComponentTransform } from "../../utils/create-component-transform"

export default createComponentTransform({
  componentMappings: alertMappings,
  propMappings: getComponentPropMappings("alert"),
})
