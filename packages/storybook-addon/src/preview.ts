import { Renderer, ProjectAnnotations } from "@storybook/types"
import { Provider } from "./utils/provider"

const preview: ProjectAnnotations<Renderer> = {
  decorators: [Provider],
}

export default preview
