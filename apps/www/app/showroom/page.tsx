import { PageProps } from "@/.next/types/app/layout"
import {
  ExampleCode,
  ExampleCodeWrapper,
  ExampleLinkTree,
  ExamplePreview,
} from "@/components/example"
import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react"
import { EmptyState } from "compositions/ui/empty-state"
import { LiaSlashSolid } from "react-icons/lia"

const tree = [
  { name: "Accordion", items: [{ name: "Basic", path: "accordion-basic" }] },
  {
    name: "Alert",
    items: [
      { name: "Basic", path: "alert-basic" },
      { name: "With Buttons", path: "alert-with-buttons" },
      { name: "With Status", path: "alert-with-status" },
    ],
  },
  {
    name: "Avatar",
    items: [
      { name: "Basic", path: "avatar-basic" },
      { name: "With Badge", path: "avatar-with-badge" },
    ],
  },
  {
    name: "Steps",
    items: [
      { name: "Basic", path: "steps-basic" },
      { name: "Vertical", path: "steps-vertical" },
      { name: "With Colors", path: "steps-with-colors" },
    ],
  },
  {
    name: "Select",
    items: [
      { name: "Basic", path: "select-basic" },
      { name: "With Avatar", path: "select-with-avatar" },
      { name: "With Overflow", path: "select-with-overflow" },
    ],
  },
  {
    name: "Menu",
    items: [
      { name: "Basic", path: "menu-basic" },
      { name: "Nested", path: "menu-nested" },
      { name: "With Group", path: "menu-with-group" },
      { name: "With Icon and Command", path: "menu-with-icon-and-command" },
      { name: "With Links", path: "menu-with-links" },
      { name: "With Submenu", path: "menu-with-submenu" },
      { name: "With Submenu - Dynamic", path: "menu-with-submenu-dynamic" },
    ],
  },
]

export default function Page(props: PageProps) {
  const { searchParams } = props
  const name = searchParams?.name
  return (
    <Stack
      height="100svh"
      overflow="hidden"
      padding="3"
      fontSize="sm"
      bg="bg.muted"
    >
      <Box as="header">
        <HStack justify="center" height="8">
          <Text fontWeight="medium">Chakra UI</Text>
          <LiaSlashSolid />
          <Text>Compositions</Text>
        </HStack>
      </Box>

      <Stack as="main" flex="1" h="90%">
        <Flex gap="4" flex="1" h="full">
          <Box width="240px" h="full">
            <ExampleLinkTree path={name} tree={tree} />
          </Box>

          <Box flex="1" h="full">
            <Flex
              align="flex-start"
              justify="center"
              px="8"
              pt="20"
              pb="8"
              borderWidth="1px"
              h="full"
              overflow="auto"
              bg="bg"
            >
              {name ? (
                <ExamplePreview name={name} />
              ) : (
                <EmptyState title="No Example Selected" />
              )}
            </Flex>
          </Box>

          <Box flex="1" h="full">
            <Box borderWidth="1px" h="full" bg="bg">
              {name ? (
                <ExampleCodeWrapper>
                  <ExampleCode name={name} />
                </ExampleCodeWrapper>
              ) : (
                <EmptyState title="No Example Selected" />
              )}
            </Box>
          </Box>
        </Flex>
      </Stack>
    </Stack>
  )
}
