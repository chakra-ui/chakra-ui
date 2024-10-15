import { Timeline as ChakraTimeline } from "@chakra-ui/react"

export const TimelineRoot = ChakraTimeline.Root
export const TimelineContent = ChakraTimeline.Content
export const TimelineItem = ChakraTimeline.Item
export const TimelineIndicator = ChakraTimeline.Indicator
export const TimelineTitle = ChakraTimeline.Title
export const TimelineDescription = ChakraTimeline.Description

export const TimelineConnector = (props: ChakraTimeline.IndicatorProps) => {
  return (
    <ChakraTimeline.Connector>
      <ChakraTimeline.Separator />
      <ChakraTimeline.Indicator {...props} />
    </ChakraTimeline.Connector>
  )
}
