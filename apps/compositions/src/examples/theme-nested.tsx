import { Box, Button, Theme } from "@chakra-ui/react"

export const ThemeNested = () => {
  return (
    <Box>
      <Box p="8" borderWidth="1px">
        Hello Normal <Button>Click me</Button>
        <Theme appearance="dark" colorPalette="red">
          <Box p="8" borderWidth="1px">
            Hello Dark <Button>Click me</Button>
            <Theme appearance="light" colorPalette="pink">
              <Box p="8" borderWidth="1px">
                Hello Light <Button>Click me</Button>
              </Box>
            </Theme>
          </Box>
        </Theme>
      </Box>
    </Box>
  )
}
