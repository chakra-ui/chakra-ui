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

export const WithContentBefore = () => {
  return (
    <Timeline.Root maxW="300px">
      <Timeline.Item>
        <Box whiteSpace="nowrap" pe="var(--timeline-size)">
          Nov 1994
        </Box>
        <Box>
          <Timeline.Indicator>1</Timeline.Indicator>
          <Timeline.Separator />
        </Box>
        <Timeline.Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Box whiteSpace="nowrap" pe="var(--timeline-size)">
          Feb 2003
        </Box>
        <Box>
          <Timeline.Indicator>2</Timeline.Indicator>
          <Timeline.Separator />
        </Box>
        <Timeline.Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Box whiteSpace="nowrap" pe="var(--timeline-size)">
          Dec 2013
        </Box>
        <Box>
          <Timeline.Indicator>3</Timeline.Indicator>
          <Timeline.Separator />
        </Box>
        <Timeline.Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Timeline.Content>
      </Timeline.Item>
    </Timeline.Root>
  )
}
