import { Stack } from "@chakra-ui/react"
import { Skeleton } from "compositions/ui/skeleton"

export const SkeletonBasic = () => {
  return (
    <Stack alignSelf="stretch">
      <Skeleton height="6" />
    </Stack>
  )
}
