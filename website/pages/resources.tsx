import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react"
import * as React from "react"
import resources from "configs/resources.json"
import ResourceCard, { Resource } from "components/resource-card"
import PageContainer from "components/page-container"
import Sidebar from "components/sidebar/sidebar"
import { getRoutes } from "layouts/mdx"
import _ from "lodash"
import { FaVideo, FaBlog, FaMicrophone } from "react-icons/fa"

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

      <Box mt="12">
        <Heading as="h2" size="md">
          <Box
            as={FaMicrophone}
            display="inline-block"
            verticalAlign="middle"
            color="teal.500"
            mr="3"
          />
          <span>Talks</span>
        </Heading>
        <SimpleGrid mt={8} columns={[1, 2]} spacing={8}>
          {groups.talk.map((item, index) => (
            <ResourceCard key={index} data={item} />
          ))}
        </SimpleGrid>
      </Box>

      <Box mt="12">
        <Heading as="h2" size="md">
          <Box
            as={FaVideo}
            display="inline-block"
            verticalAlign="middle"
            color="teal.500"
            mr="3"
          />
          <span>Videos</span>
        </Heading>
        <SimpleGrid mt={8} columns={[1, 2]} spacing={8}>
          {groups.video.map((item, index) => (
            <ResourceCard key={index} data={item} />
          ))}
        </SimpleGrid>
      </Box>

      <Box mt="12">
        <Heading as="h2" size="md">
          <Box
            as={FaBlog}
            display="inline-block"
            verticalAlign="middle"
            color="teal.500"
            mr="3"
          />
          <span>Blogs</span>
        </Heading>
        <SimpleGrid mt={8} columns={[1, 2]} spacing={8}>
          {groups.blog.map((item, index) => (
            <ResourceCard key={index} data={item} />
          ))}
        </SimpleGrid>
      </Box>
    </PageContainer>
  )
}

export default Resources
