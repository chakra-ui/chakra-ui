import { For, Stack, chakra } from "../src"
import { Progress } from "../src/components/progress"

export default {
  title: "Feedback / Linear Progress",
  decorators: [
    (story: Function) => (
      <chakra.div maxW="500px" mt="40px" mx="auto">
        {story()}
      </chakra.div>
    ),
  ],
}

export const basic = () => (
  <Progress.Root value={50}>
    <Progress.Track>
      <Progress.FilledTrack />
    </Progress.Track>
  </Progress.Root>
)

export const withColorScheme = () => (
  <Progress.Root colorScheme="pink" value={20}>
    <Progress.Track>
      <Progress.FilledTrack />
    </Progress.Track>
  </Progress.Root>
)

export const indeterminate = () => (
  <Progress.Root margin="20px" colorScheme="cyan" size="xs" isIndeterminate>
    <Progress.Track>
      <Progress.FilledTrack />
    </Progress.Track>
  </Progress.Root>
)

export const withLabel = () => (
  <Progress.Root value={60}>
    <Progress.Track>
      <Progress.FilledTrack>
        <Progress.ValueText>60%</Progress.ValueText>
      </Progress.FilledTrack>
    </Progress.Track>
  </Progress.Root>
)

export const withAnimation = () => (
  <Progress.Root colorScheme="green" hasStripe isAnimated value={20}>
    <Progress.Track>
      <Progress.FilledTrack />
    </Progress.Track>
  </Progress.Root>
)

export const withStripe = () => (
  <Progress.Root colorScheme="green" hasStripe value={20}>
    <Progress.Track>
      <Progress.FilledTrack />
    </Progress.Track>
  </Progress.Root>
)

export const withSizes = () => (
  <Stack>
    <For each={["xs", "sm", "md", "lg"]}>
      {(size) => (
        <Progress.Root key={size} size={size} value={20}>
          <Progress.Track>
            <Progress.FilledTrack />
          </Progress.Track>
        </Progress.Root>
      )}
    </For>
  </Stack>
)

export const withCustomBorderRadius = () => (
  <Progress.Root value={20}>
    <Progress.Track borderRadius="4px">
      <Progress.FilledTrack borderRadius="4px" />
    </Progress.Track>
  </Progress.Root>
)
