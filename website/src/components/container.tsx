import React from "react"
import { Box, BoxProps } from "@chakra-ui/core"

export const Container = (props: BoxProps) => (
  <Box w="full" pb="12" pt="3" mx="auto" maxW="1000px" px={6} {...props} />
)

export default Container
