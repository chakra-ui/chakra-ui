import { Badge, HStack, Skeleton } from "@sh3yk0-ui/react"

export const SkeletonWithChildren = () => {
  return (
    <HStack gap="4">
      <Skeleton asChild loading={true}>
        <Badge>Select</Badge>
      </Skeleton>

      <Skeleton loading={false}>
        <Badge>Select</Badge>
      </Skeleton>
    </HStack>
  )
}
