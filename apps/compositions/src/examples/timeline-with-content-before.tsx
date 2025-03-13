import { For, Stack, Timeline } from "@chakra-ui/react"

export const TimelineWithContentBefore = () => {
  return (
    <Stack gap="8">
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <Timeline.Root size={size} key={size}>
            <Timeline.Item>
              <Timeline.Content width="auto">
                <Timeline.Title whiteSpace="nowrap">Nov 1994</Timeline.Title>
              </Timeline.Content>
              <Timeline.Connector>
                <Timeline.Separator />
                <Timeline.Indicator>1</Timeline.Indicator>
              </Timeline.Connector>
              <Timeline.Content>
                <Timeline.Title>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Timeline.Title>
              </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item>
              <Timeline.Content width="auto">
                <Timeline.Title whiteSpace="nowrap">Nov 2010</Timeline.Title>
              </Timeline.Content>
              <Timeline.Connector>
                <Timeline.Separator />
                <Timeline.Indicator>2</Timeline.Indicator>
              </Timeline.Connector>
              <Timeline.Content>
                <Timeline.Title>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Timeline.Title>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline.Root>
        )}
      </For>
    </Stack>
  )
}
