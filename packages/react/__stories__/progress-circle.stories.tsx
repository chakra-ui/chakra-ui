import { ProgressCircle, chakra } from "../src"

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
  <ProgressCircle.Root value={20}>
    <ProgressCircle.Circle>
      <ProgressCircle.Track />
      <ProgressCircle.Range />
    </ProgressCircle.Circle>
  </ProgressCircle.Root>
)

export const RoundCap = () => (
  <ProgressCircle.Root value={20}>
    <ProgressCircle.Circle>
      <ProgressCircle.Track />
      <ProgressCircle.Range strokeLinecap="round" />
    </ProgressCircle.Circle>
  </ProgressCircle.Root>
)

export const Customized = () => (
  <ProgressCircle.Root value={20}>
    <ProgressCircle.Circle>
      <ProgressCircle.Track stroke="red.300" />
      <ProgressCircle.Range strokeLinecap="round" stroke="pink.800" />
    </ProgressCircle.Circle>
  </ProgressCircle.Root>
)

export const Indeterminate = () => (
  <ProgressCircle.Root value={null}>
    <ProgressCircle.Circle>
      <ProgressCircle.Track />
      <ProgressCircle.Range />
    </ProgressCircle.Circle>
  </ProgressCircle.Root>
)
