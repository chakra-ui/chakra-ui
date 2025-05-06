import { Box } from "@sh3yk0-ui/react"

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
