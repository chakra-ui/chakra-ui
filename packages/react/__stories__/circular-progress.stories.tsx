import { CircularProgress, chakra } from "../src"

export default {
  title: "Components / Progress - Circular",
  decorators: [
    (story: Function) => (
      <chakra.div maxW="500px" mt="40px" mx="auto">
        {story()}
      </chakra.div>
    ),
  ],
}

export const Basic = () => (
  <CircularProgress.Root value={20} valuePlacement="center">
    <CircularProgress.ValueText>20%</CircularProgress.ValueText>
    <CircularProgress.Circle>
      <CircularProgress.Track />
      <CircularProgress.Range />
    </CircularProgress.Circle>
  </CircularProgress.Root>
)

export const RoundCap = () => (
  <CircularProgress.Root value={20} valuePlacement="center">
    <CircularProgress.ValueText>20%</CircularProgress.ValueText>
    <CircularProgress.Circle>
      <CircularProgress.Track />
      <CircularProgress.Range strokeLinecap="round" />
    </CircularProgress.Circle>
  </CircularProgress.Root>
)

export const Customized = () => (
  <CircularProgress.Root value={20} valuePlacement="center">
    <CircularProgress.ValueText>20%</CircularProgress.ValueText>
    <CircularProgress.Circle>
      <CircularProgress.Track stroke="red.300" />
      <CircularProgress.Range strokeLinecap="round" stroke="pink.800" />
    </CircularProgress.Circle>
  </CircularProgress.Root>
)

export const Indeterminate = () => (
  <CircularProgress.Root value={null}>
    <CircularProgress.Circle>
      <CircularProgress.Track />
      <CircularProgress.Range />
    </CircularProgress.Circle>
  </CircularProgress.Root>
)
