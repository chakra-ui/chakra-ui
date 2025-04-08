import { Timeline } from "@chakra-ui/react"
import { Children, isValidElement } from "react"

export const Steps = (props: React.PropsWithChildren<{}>) => {
  return (
    <Timeline.Root mt="10" mb="6" size="xl">
      {Children.map(props.children, (child, index) => {
        return (
          <Timeline.Item>
            <Timeline.Connector>
              <Timeline.Separator />
              <Timeline.Indicator rounded="md">{index + 1}</Timeline.Indicator>
            </Timeline.Connector>
            <Timeline.Content
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
            </Timeline.Content>
          </Timeline.Item>
        )
      })}
    </Timeline.Root>
  )
}
