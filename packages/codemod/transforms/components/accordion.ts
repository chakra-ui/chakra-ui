import {
  accordionMappings,
  getComponentPropMappings,
} from "../../utils/component-mappings"
import { createComponentTransform } from "../../utils/create-component-transform"

export default createComponentTransform({
  componentMappings: accordionMappings,
  propMappings: getComponentPropMappings("accordion"),
})
