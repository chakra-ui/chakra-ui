import { Box } from "@chakra-ui/react"

export const BoxWithPseudoProps = () => {
  return (
    <Box bg="tomato" w="100%" p="4" color="white" _hover={{ bg: "green" }}>
      This is the Box
    </Box>
  )
}
