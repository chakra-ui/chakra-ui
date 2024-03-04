import { CircularProgress } from "../src/components/progress-circular"
import { chakra } from "../src/styled-system"

export default {
  title: "Feedback / Circular Progress",
  decorators: [
    (story: Function) => (
      <chakra.div maxW="500px" mt="40px" mx="auto">
        {story()}
      </chakra.div>
    ),
  ],
}

export const basic = () => (
  <CircularProgress.Root trackColor="gray.200" size="120px" value={20}>
    <CircularProgress.Circle>
      <CircularProgress.Track />
      <CircularProgress.FilledTrack />
    </CircularProgress.Circle>
  </CircularProgress.Root>
)

export const withSize = () => {
  return (
    <CircularProgress.Root size="120px" value={60}>
      <CircularProgress.Circle>
        <CircularProgress.Track />
        <CircularProgress.FilledTrack />
      </CircularProgress.Circle>
    </CircularProgress.Root>
  )
}

export const withThickness = () => (
  <CircularProgress.Root size="120px" value={60} thickness="3px">
    <CircularProgress.Circle>
      <CircularProgress.Track />
      <CircularProgress.FilledTrack />
    </CircularProgress.Circle>
    <CircularProgress.ValueText>20%</CircularProgress.ValueText>
  </CircularProgress.Root>
)

export const withValueText = () => (
  <CircularProgress.Root size="120px" value={60}>
    <CircularProgress.Circle>
      <CircularProgress.Track />
      <CircularProgress.FilledTrack />
    </CircularProgress.Circle>
    <CircularProgress.ValueText>60%</CircularProgress.ValueText>
  </CircularProgress.Root>
)

export const circularIndeterminate = () => (
  <CircularProgress.Root
    capIsRound
    trackColor="transparent"
    size="50px"
    isIndeterminate
    value={3}
  >
    <CircularProgress.Circle>
      <CircularProgress.Track />
      <CircularProgress.FilledTrack />
    </CircularProgress.Circle>
  </CircularProgress.Root>
)

export const withZeroValue = () => (
  <CircularProgress.Root value={0}>
    <CircularProgress.Circle>
      <CircularProgress.Track />
      <CircularProgress.FilledTrack />
    </CircularProgress.Circle>
  </CircularProgress.Root>
)
