import { addons, types } from "@storybook/manager-api"
import { ColorModeTool } from "./utils/color-mode-tool"
import {
  ADDON_ID,
  COLOR_MODE_TOOL_ID,
  DIRECTION_TOOL_ID,
} from "./utils/constants"
import { DirectionTool } from "./utils/direction-tool"

addons.register(ADDON_ID, () => {
  const match = ({ viewMode }: { viewMode?: string }) =>
    Boolean(viewMode && viewMode.match(/^(story|docs)$/))

  addons.add(DIRECTION_TOOL_ID, {
    type: types.TOOL,
    title: "Direction",
    render: DirectionTool,
    match,
  })

  addons.add(COLOR_MODE_TOOL_ID, {
    type: types.TOOL,
    title: "Color Mode",
    render: ColorModeTool,
    match,
  })
})
