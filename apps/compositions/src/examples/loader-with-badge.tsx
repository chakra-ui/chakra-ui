import { Badge, Loader } from "@sh3yk0-ui/react"

export const LoaderWithBadge = () => {
  return (
    <Badge>
      <Loader text="Loading...">Click me</Loader>
    </Badge>
  )
}
