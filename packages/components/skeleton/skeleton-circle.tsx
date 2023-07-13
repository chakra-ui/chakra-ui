import { SkeletonProps, Skeleton } from "./skeleton"

/**
 * `SkeletonCircle` is used to display the loading state in the form of a circular avatar.
 *
 * @see Docs https://chakra-ui.com/docs/components/skeleton
 */

export const SkeletonCircle: React.FC<SkeletonProps> = ({
  size = "2rem",
  ...rest
}) => <Skeleton borderRadius="full" boxSize={size} {...rest} />

SkeletonCircle.displayName = "SkeletonCircle"
