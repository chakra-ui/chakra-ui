import {
  getComponentPropMappings,
  tooltipMappings,
} from "../../utils/component-mappings"
import { createComponentTransform } from "../../utils/create-component-transform"

export default createComponentTransform({
  componentMappings: tooltipMappings,
  propMappings: getComponentPropMappings("tooltip"),
})
