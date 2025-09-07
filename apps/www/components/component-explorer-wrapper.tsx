import { Box, Heading, Text } from "@chakra-ui/react"
import { ComponentExplorerSidebar } from "./component-explorer"
import { ExamplePreview } from "./example"

export async function ComponentExplorerWrapper({ name }: { name: string }) {
  return (
    <ComponentExplorer Component={<ExamplePreview name={name} />} name={name} />
  )
}

function ComponentExplorer({
  Component,
  name,
}: {
  Component: React.ReactNode
  name: string
}) {
  return (
    <Box
      display="grid"
      gridTemplateColumns="1fr 260px"
      minH="480px"
      border="1px solid"
      borderColor="border"
      borderRadius="md"
      overflow="hidden"
      mt={6}
      bg="bg"
    >
      <Box p={5}>
        <Heading size="sm" mb={3} color="fg">
          Preview
        </Heading>

        <Box
          id="component-preview"
          p={6}
          minH="xs"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="bg.subtle"
          borderRadius="sm"
        >
          {Component ?? <Text>No component provided</Text>}
        </Box>
      </Box>
      <ComponentExplorerSidebar componentName={name} />
    </Box>
  )
}
