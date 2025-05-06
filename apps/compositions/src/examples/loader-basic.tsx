import { HStack, Loader } from "@sh3yk0-ui/react"

export const LoaderBasic = () => {
  return (
    <HStack textStyle="sm" fontWeight="medium">
      <Loader text="Loading...">Click me</Loader>
    </HStack>
  )
}
