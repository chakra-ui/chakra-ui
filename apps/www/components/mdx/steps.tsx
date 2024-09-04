import {
  TimelineConnector,
  TimelineContent,
  TimelineIndicator,
  TimelineItem,
  TimelineRoot,
} from "compositions/ui/timeline"
import { Children, isValidElement } from "react"

export const Steps = (props: React.PropsWithChildren<{}>) => {
  return (
    <TimelineRoot mt="10" mb="6">
      {Children.map(props.children, (child, index) => {
        return (
          <TimelineItem>
            <TimelineConnector>
              <TimelineIndicator rounded="md">{index + 1}</TimelineIndicator>
            </TimelineConnector>
            <TimelineContent
              maxW="calc(100% - 40px)"
              flex="1"
              pb="10"
              css={{
                "& > :is(h3, h4, h5)": { marginTop: "0" },
              }}
            >
              {isValidElement(child) ? child.props.children : child}
            </TimelineContent>
          </TimelineItem>
        )
      })}
    </TimelineRoot>
  )
}
