import { Renderer, ProjectAnnotations } from "@storybook/types"
import { ChakraProviderDecorator } from "./utils/provider-decorator"

const preview: ProjectAnnotations<Renderer> = {
  decorators: [ChakraProviderDecorator],
}

export default preview
