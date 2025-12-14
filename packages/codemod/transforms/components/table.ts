import {
  getComponentPropMappings,
  tableMappings,
} from "../../utils/component-mappings"
import { createComponentTransform } from "../../utils/create-component-transform"

export default createComponentTransform({
  componentMappings: tableMappings,
  propMappings: getComponentPropMappings("table"),
})
