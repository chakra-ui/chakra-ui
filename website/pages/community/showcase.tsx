import { SimpleGrid, Stack, Text } from '@chakra-ui/react'

import { t } from 'utils/i18n'
import showcaseJson from 'configs/showcase.json'
import MDXLayout from 'layouts/mdx'
import { ShowcaseItem } from 'components/showcase/showcase-item'

const Showcase = () => {
  return (
    <MDXLayout
      hideToc
      maxWidth='unset'
      frontmatter={{
        title: t('showcase.seo.title'),
        description: t('showcase.seo.description'),
        slug: '/community/showcase',
      }}
    >
      <Stack align='flex-start' mt='5' spacing='8'>
        <Text color='fg-subtle' fontSize={{ base: 'lg', lg: 'xl' }}>
          {t('showcase.message')}
        </Text>
      </Stack>

      <SimpleGrid columns={{ base: 1, xl: 2 }} gap={8} mt={10}>
        {showcaseJson.data.map(({ name, image, url }) => (
          <ShowcaseItem key={url} name={name} image={image} url={url} />
        ))}
      </SimpleGrid>
    </MDXLayout>
  )
}

export default Showcase
