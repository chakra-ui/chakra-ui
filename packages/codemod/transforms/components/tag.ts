import {
  getComponentPropMappings,
  tagMappings,
} from "../../utils/component-mappings"
import { createComponentTransform } from "../../utils/create-component-transform"

export default createComponentTransform({
  componentMappings: tagMappings,
  propMappings: getComponentPropMappings("tag"),
})
