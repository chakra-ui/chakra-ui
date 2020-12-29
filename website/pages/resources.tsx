import { Box, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import PageContainer from "components/page-container"
import ResourceCard, { Resource } from "components/resource-card"
import Sidebar from "components/sidebar/sidebar"
import resources from "configs/resources.json"
import { getRoutes } from "layouts/mdx"
import _ from "lodash"
import * as React from "react"
import { FaMicrophone, FaPenSquare, FaVideo } from "react-icons/fa"

function Resources() {
  /**
   * Re-use the docs sidebar so it's easier for a visitors
   * to reference components mentioned in the resource blog/video.
   */
  const routes = getRoutes("/docs/")
  const data = resources.data as Resource[]
  const groups = _.groupBy(data, "type")

  return (
    <PageContainer
      sidebar={<Sidebar routes={routes} />}
      frontmatter={{
        title: "Community Resources",
        description:
          "A rich compilation of technical descriptions and detailed information of how Chakra UI works.",
      }}
    >
      <Text mt="2">
        A rich compilation of technical descriptions and detailed information of
        how Chakra UI works.
      </Text>

      <Stack spacing="12">
        <ResourceSection
          title="Talks"
          resources={groups.talk}
          icon={FaMicrophone}
        />
        <ResourceSection
          title="Videos"
          resources={groups.video}
          icon={FaVideo}
        />
        <ResourceSection
          title="Blogs"
          resources={groups.blog}
          icon={FaPenSquare}
        />
      </Stack>
    </PageContainer>
  )
}

export default Resources

interface ResourceSectionProps {
  title: string
  icon: React.ElementType
  resources: Resource[]
}

function ResourceSection(props: ResourceSectionProps) {
  const { icon, title, resources } = props
  return (
    <Box as="section" mt="12">
      <Heading as="h2" size="md">
        <Box
          as={icon}
          display="inline-block"
          verticalAlign="middle"
          color="teal.500"
          mr="3"
        />
        <span>{title}</span>
      </Heading>
      <SimpleGrid mt={8} columns={[1, 2]} spacing={8}>
        {resources.map((item, index) => (
          <ResourceCard key={index} data={item} />
        ))}
      </SimpleGrid>
    </Box>
  )
}
