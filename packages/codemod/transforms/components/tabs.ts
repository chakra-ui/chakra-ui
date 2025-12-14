import {
  getComponentPropMappings,
  tabsMappings,
} from "../../utils/component-mappings"
import { createComponentTransform } from "../../utils/create-component-transform"

export default createComponentTransform({
  componentMappings: tabsMappings,
  propMappings: getComponentPropMappings("tabs"),
})
