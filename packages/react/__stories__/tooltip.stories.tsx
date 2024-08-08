import type { Meta } from "@storybook/react"
import { TooltipBasic } from "compositions/examples/tooltip-basic"
import { TooltipControlled } from "compositions/examples/tooltip-controlled"
import { TooltipMultiple } from "compositions/examples/tooltip-multiple"
import { TooltipWithArrow } from "compositions/examples/tooltip-with-arrow"
import { TooltipWithCustomBg } from "compositions/examples/tooltip-with-custom-bg"
import { TooltipWithDelay } from "compositions/examples/tooltip-with-delay"
import { TooltipWithDisabled } from "compositions/examples/tooltip-with-disabled"
import { TooltipWithInteractive } from "compositions/examples/tooltip-with-interactive"
import { TooltipWithOffset } from "compositions/examples/tooltip-with-offset"
import { TooltipWithPlacement } from "compositions/examples/tooltip-with-placement"
import { Box } from "../src"

export default {
  title: "Components / Tooltip",
  decorators: [
    (Story: any) => (
      <Box maxWidth="400px" mx="auto" mt="200px">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export const Basic = () => {
  return <TooltipBasic />
}

export const Controlled = () => {
  return <TooltipControlled />
}

export const Multiple = () => {
  return <TooltipMultiple />
}

export const WithArrow = () => {
  return <TooltipWithArrow />
}

export const WithDelay = () => {
  return <TooltipWithDelay />
}

export const WithDisabled = () => {
  return <TooltipWithDisabled />
}

export const WithInteractive = () => {
  return <TooltipWithInteractive />
}

export const WithOffset = () => {
  return <TooltipWithOffset />
}

export const WithPlacement = () => {
  return <TooltipWithPlacement />
}

export const WithCustomBg = () => {
  return <TooltipWithCustomBg />
}
