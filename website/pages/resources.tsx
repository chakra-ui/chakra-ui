import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react"
import * as React from "react"
import resources from "configs/resources.json"
import ResourceCard, { Resource } from "components/resource-card"
import PageContainer from "components/page-container"

function Resources() {
  return (
    <PageContainer frontmatter={{}}>
      <Box margin="auto">
        <Heading size="2xl">Resources</Heading>
        <Text>
          A rich compilation of technical descriptions and detailed information
          of how Chakra UI works.
        </Text>
        <SimpleGrid pt={4} columns={[1, 2]} spacing={6}>
          {resources.data.map((item: Resource, index) => (
            <ResourceCard key={index} data={item} />
          ))}
        </SimpleGrid>
      </Box>
    </PageContainer>
  )
}

export default Resources
