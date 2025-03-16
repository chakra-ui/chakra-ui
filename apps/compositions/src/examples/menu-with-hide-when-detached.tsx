import { Box, Center, Flex, Menu, Portal, Text } from "@chakra-ui/react"

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
          <Menu.Root positioning={{ hideWhenDetached: true }}>
            <Menu.Trigger asChild>
              <Box as="button" bg="green.100" p="4" borderRadius="md">
                Menu
              </Box>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="new-txt">New Text File</Menu.Item>
                  <Menu.Item value="new-file">New File...</Menu.Item>
                  <Menu.Item value="new-win">New Window</Menu.Item>
                  <Menu.Item value="open-file">Open File...</Menu.Item>
                  <Menu.Item value="export">Export</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Box>
      </Flex>
    </Center>
  )
}
