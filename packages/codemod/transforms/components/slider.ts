import {
  getComponentPropMappings,
  sliderMappings,
} from "../../utils/component-mappings"
import { createComponentTransform } from "../../utils/create-component-transform"

export default createComponentTransform({
  componentMappings: sliderMappings,
  propMappings: getComponentPropMappings("slider"),
})
