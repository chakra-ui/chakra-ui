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
    <TimelineRoot mt="10" mb="6" size="xl">
      {Children.map(props.children, (child, index) => {
        return (
          <TimelineItem>
            <TimelineConnector>
              <TimelineIndicator rounded="md">{index + 1}</TimelineIndicator>
            </TimelineConnector>
            <TimelineContent
              maxW="calc(100% - 50px)"
              flex="1"
              pb="8"
              gap="0"
              css={{
                "& > :is(h3, h4, h5)": {
                  marginTop: "0",
                  "& + p": { marginBottom: "0" },
                  "& + p + p": { marginBottom: "0" },
                },
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
