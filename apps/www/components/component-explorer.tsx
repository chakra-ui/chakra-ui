import { Box } from "@chakra-ui/react"
import { ComponentExplorerWrapper } from "./component-snapshot"
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
      className={className}
      display={{ base: "block", lg: "grid" }}
      gridTemplateColumns={{ base: "1fr", lg: "1fr 260px" }}
      gridTemplateRows="auto auto"
      gap={4}
      mt={4}
      maxW="100%"
    >
      <Box
        id="component-preview"
        p={6}
        minH={{ base: "200px", md: "300px", lg: "480px" }}
        bg="bg.subtle"
        borderRadius="sm"
        border="1px solid"
        borderColor="border.subtle"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
      >
        <ExamplePreview name={name} />
      </Box>
      <ComponentExplorerWrapper name={name} />
    </Box>
  )
}
