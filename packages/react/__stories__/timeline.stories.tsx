import { TimelineWithContentBefore } from "compositions/examples/timeline-with-content-before"
import { Box, Timeline } from "../src"

export default {
  title: "Components / Timeline",
  decorators: [(story: Function) => <Box padding="40px">{story()}</Box>],
}

export const Basic = () => {
  return (
    <Timeline.Root maxW="300px">
      <Timeline.Item>
        <Timeline.Indicator>1</Timeline.Indicator>
        <Timeline.Separator />
        <Timeline.Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Indicator>2</Timeline.Indicator>
        <Timeline.Separator />
        <Timeline.Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Indicator>3</Timeline.Indicator>
        <Timeline.Separator />
        <Timeline.Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Timeline.Content>
      </Timeline.Item>
    </Timeline.Root>
  )
}

export const WithContentBefore = {
  render() {
    return <TimelineWithContentBefore />
  },
}
