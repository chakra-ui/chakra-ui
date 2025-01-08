import { Box, Center, Flex, Text } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "compositions/ui/menu"

export const MenuWithHideWhenDetached = () => {
  return (
    <Center minH="sm">
      <Flex
        w="300px"
        h="full"
        overflowX="auto"
        gapX="6"
        p="4"
        borderWidth="1px"
        bg="bg.subtle"
      >
        {[...Array(6).keys()].map((x) => (
          <Box layerStyle="fill.surface" p="4" borderRadius="md" key={x}>
            <Text>Item{x}</Text>
          </Box>
        ))}
        <Box>
          <MenuRoot positioning={{ hideWhenDetached: true }}>
            <MenuTrigger asChild>
              <Box as="button" bg="green.100" p="4" borderRadius="md">
                Menu
              </Box>
            </MenuTrigger>
            <MenuContent>
              <MenuItem value="new-txt">New Text File</MenuItem>
              <MenuItem value="new-file">New File...</MenuItem>
              <MenuItem value="new-win">New Window</MenuItem>
              <MenuItem value="open-file">Open File...</MenuItem>
              <MenuItem value="export">Export</MenuItem>
            </MenuContent>
          </MenuRoot>
        </Box>
      </Flex>
    </Center>
  )
}
