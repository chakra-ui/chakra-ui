import { ProjectAnnotations, Renderer } from "@storybook/types"
import { Provider } from "./utils/provider"

const preview: ProjectAnnotations<Renderer> = {
  decorators: [Provider],
}

export default preview
