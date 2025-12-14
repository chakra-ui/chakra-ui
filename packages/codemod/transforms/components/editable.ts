import {
  editableMappings,
  getComponentPropMappings,
} from "../../utils/component-mappings"
import { createComponentTransform } from "../../utils/create-component-transform"

export default createComponentTransform({
  componentMappings: editableMappings,
  propMappings: getComponentPropMappings("editable"),
})
