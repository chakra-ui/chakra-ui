import { Box } from "@chakra-ui/react"

export const BoxWithBorder = () => {
  return (
    <Box
      p="4"
      borderWidth="1px"
      borderColor="border.disabled"
      color="fg.disabled"
    >
      Somewhat disabled box
    </Box>
  )
}
