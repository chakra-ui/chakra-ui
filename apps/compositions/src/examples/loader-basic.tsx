import { HStack, Loader } from "@chakra-ui/react"

export const LoaderBasic = () => {
  return (
    <HStack textStyle="sm" fontWeight="medium">
      <Loader text="Loading...">Click me</Loader>
    </HStack>
  )
}
