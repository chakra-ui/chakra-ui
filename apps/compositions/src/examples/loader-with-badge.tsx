import { Badge, Loader } from "@chakra-ui/react"

export const LoaderWithBadge = () => {
  return (
    <Badge>
      <Loader text="Loading...">Click me</Loader>
    </Badge>
  )
}
