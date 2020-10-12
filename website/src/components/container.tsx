import { Box, BoxProps } from "@chakra-ui/core"

export const Container = (props: BoxProps): JSX.Element => (
  <Box w="full" pb="12" pt="3" mx="auto" maxW="1200px" px={6} {...props} />
)
