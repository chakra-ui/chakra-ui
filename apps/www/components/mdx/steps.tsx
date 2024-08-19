import { Timeline } from "@chakra-ui/react"
import { Children, isValidElement } from "react"

export const Steps = (props: React.PropsWithChildren<{}>) => {
  return (
    <Timeline.Root mt="10" mb="6">
      {Children.map(props.children, (child, index) => {
        return (
          <Timeline.Item>
            <Timeline.Separator />
            <Timeline.Indicator rounded="md">{index + 1}</Timeline.Indicator>
            <Timeline.Content
              ps="2"
              pb="10"
              width="full"
              css={{ "& > :is(h3, h4, h5)": { marginTop: "0" } }}
            >
              {isValidElement(child) ? child.props.children : child}
            </Timeline.Content>
          </Timeline.Item>
        )
      })}
    </Timeline.Root>
  )
}
