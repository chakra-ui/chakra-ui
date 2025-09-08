import { Box, Flex } from "@chakra-ui/react"
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
      <Box mt={6}>
        <Flex
          id="component-preview"
          p={6}
          minH="xs"
          alignItems="center"
          justifyContent="center"
          bg="bg.subtle"
          borderRadius="sm"
          border="1px solid"
          borderColor="border.subtle"
          gap={4}
        >
          <ExamplePreview name={name} />
        </Flex>
      </Box>
      <ComponentExplorerSidebar componentName={name} />
    </Box>
  )
}
