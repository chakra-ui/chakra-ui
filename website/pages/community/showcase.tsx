import { SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { ShowcaseItem } from 'components/showcase/showcase-item'
import json from 'configs/showcase.json'
import MDXLayout from 'layouts/mdx'

const Showcase = () => {
  return (
    <MDXLayout
      hideToc
      maxWidth='unset'
      frontmatter={{
        title: 'Showcase',
        description:
          'A collection of beautiful websites that are built in Chakra UI',
        slug: '/community/showcase',
      }}
    >
      <Stack align='flex-start' mt='5' gap='8'>
        <Text color='fg-subtle' fontSize={{ base: 'lg', lg: 'xl' }}>
          A collection of beautiful websites that are built in Chakra UI
        </Text>
      </Stack>

      <SimpleGrid columns={{ base: 1, xl: 2 }} gap={8} mt={10}>
        {json.data.map(({ name, image, url }) => (
          <ShowcaseItem key={url} name={name} image={image} url={url} />
        ))}
      </SimpleGrid>
    </MDXLayout>
  )
}

export default Showcase
