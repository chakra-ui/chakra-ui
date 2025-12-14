import {
  drawerMappings,
  getComponentPropMappings,
} from "../../utils/component-mappings"
import { createComponentTransform } from "../../utils/create-component-transform"

export default createComponentTransform({
  componentMappings: drawerMappings,
  propMappings: getComponentPropMappings("drawer"),
})
