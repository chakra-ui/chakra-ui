import { chakra } from "../system"
import { CircularProgress, CircularProgressLabel } from "."

export default {
  title: "Components / Feedback / Circular Progress",
  decorators: [
    (story: Function) => (
      <chakra.div maxW="500px" mt="40px" mx="auto">
        {story()}
      </chakra.div>
    ),
  ],
}

export const basic = () => (
  <CircularProgress trackColor="gray.200" size="120px" value={20} />
)

export const withSize = () => <CircularProgress size="120px" value={60} />

export const withThickness = () => (
  <CircularProgress size="120px" value={60} thickness="3px" />
)

export const withLabel = () => (
  <CircularProgress size="120px" value={60}>
    <CircularProgressLabel>60%</CircularProgressLabel>
  </CircularProgress>
)

export const circularIndeterminate = () => (
  <CircularProgress
    capIsRound
    trackColor="transparent"
    size="50px"
    isIndeterminate
    value={3}
  />
)

export const withZeroValue = () => <CircularProgress value={0} />
