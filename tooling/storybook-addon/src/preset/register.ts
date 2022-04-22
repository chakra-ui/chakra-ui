import { addons, types } from "@storybook/addons"
import { ColorModeTool, DirectionTool } from "../components"
import { TOOLS, ADDON_ID } from "../constants"

addons.register(ADDON_ID, () => {
  addons.add(TOOLS.COLOR_MODE, {
    type: types.TOOL,
    id: TOOLS.COLOR_MODE,
    title: "Color Mode",
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: ColorModeTool,
  })

  addons.add(TOOLS.WRITING_DIRECTION, {
    type: types.TOOL,
    id: TOOLS.WRITING_DIRECTION,
    title: "Writing Direction",
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: DirectionTool,
  })
})
