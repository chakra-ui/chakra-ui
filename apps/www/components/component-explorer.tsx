import { Box, Heading, Text } from "@chakra-ui/react"
import { ComponentExplorerSidebar } from "./component-explorer-sidebar"
import { ExamplePreview } from "./example"

export function ComponentExplorer({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{ base: "1fr", lg: "1fr 260px" }}
      minH="480px"
      className={className}
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
          border="1px solid"
          borderColor="border.subtle"
        >
          <ExamplePreview name={name} />
        </Box>
      </Box>
      <ComponentExplorerSidebar componentName={name} />
    </Box>
  )
}
