import {
  getComponentPropMappings,
  progressMappings,
} from "../../utils/component-mappings"
import { createComponentTransform } from "../../utils/create-component-transform"

export default createComponentTransform({
  componentMappings: progressMappings,
  propMappings: getComponentPropMappings("progress"),
})
