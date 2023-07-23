import { Renderer, ProjectAnnotations } from "@storybook/types"
import { ChakraProviderDecorator } from "./ChakraProviderDecorator"

const preview: ProjectAnnotations<Renderer> = {
  decorators: [ChakraProviderDecorator],
}

export default preview
