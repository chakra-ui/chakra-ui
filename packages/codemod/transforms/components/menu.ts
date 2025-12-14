import {
  getComponentPropMappings,
  menuMappings,
} from "../../utils/component-mappings"
import { createComponentTransform } from "../../utils/create-component-transform"

export default createComponentTransform({
  componentMappings: menuMappings,
  propMappings: getComponentPropMappings("menu"),
})
