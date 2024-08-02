import { Box } from "@chakra-ui/react"

export const BoxWithAsProp = () => {
  return (
    <Box as="section" color="fg.subtle">
      This is a Box rendered as a section
    </Box>
  )
}
