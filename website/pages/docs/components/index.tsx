import {
  GridItem,
  Heading,
  Input,
  List,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ComponentOverviewItem } from 'components/component-overview-item'
import MDXLayout from 'layouts/mdx'
import type { GetStaticProps } from 'next'
import { useState } from 'react'
import type { FrontmatterHeading } from 'src/types/frontmatter'
import { getGroupedComponents } from 'utils/contentlayer-utils'

type Component = {
  title: string
  url: string
  id: string
}

type Category = {
  id: string
  title: string
  components: Component[]
}

type Props = {
  categories: Category[]
  headings: FrontmatterHeading[]
}

export const ComponentsOverview = ({ categories, headings }: Props) => {
  const { filteredCategories, filterComponentsByTitle } =
    useComponentFilter(categories)
  return (
    <MDXLayout
      frontmatter={{
        title: 'Components',
        slug: '/docs/components',
        headings,
      }}
    >
      <VStack w='full' mt={5} alignItems='stretch' gap={12}>
        <Text lineHeight='tall'>
          Chakra UI provides prebuilt components to help you build your projects
          faster. Here is an overview of the component categories:
        </Text>
        <Input
          w='full'
          size='md'
          placeholder='Search overview'
          onChange={(e) => filterComponentsByTitle(e.target.value)}
        />
        <List.Root w='full' gap='12'>
          {filteredCategories.map(({ title, components, id }) => (
            <List.Item
              key={title}
              display='flex'
              flexDirection='column'
              rowGap={6}
            >
              <Heading as='h2' size='md' id={id} scrollMarginTop={24}>
                {title}
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                {components.map(({ title: componentTitle, url, id }) => (
                  <GridItem key={id}>
                    <ComponentOverviewItem
                      url={url}
                      title={componentTitle}
                      slug={id}
                    />
                  </GridItem>
                ))}
              </SimpleGrid>
            </List.Item>
          ))}
        </List.Root>
      </VStack>
    </MDXLayout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const group = getGroupedComponents()

  const categories = Object.entries(group).reduce((acc, item) => {
    const [title, items] = item
    if (title === 'Layout') return acc
    const category: Category = {
      id: title.toLowerCase().replace(/ /g, '-'),
      title,
      components: items.map(({ title, slug, id }) => ({
        id,
        title,
        url: slug,
      })),
    }
    return acc.concat(category)
  }, [] as Category[])

  const headings = Object.entries(group).reduce((acc, item) => {
    const [title] = item
    if (title === 'Layout') return acc
    const heading: FrontmatterHeading = {
      id: title.toLowerCase().replace(/ /g, '-'),
      text: title,
      level: 2,
    }
    return acc.concat(heading)
  }, [] as FrontmatterHeading[])

  return {
    props: {
      categories,
      headings,
    },
  }
}

const useComponentFilter = (categories: Category[]) => {
  const [filteredCategories, setFilteredCategories] =
    useState<Category[]>(categories)

  const filterComponentsByTitle = (searchText: string) => {
    const filtered: Category[] = []
    categories.forEach((category) => {
      const matchingComponents = category.components.filter((component) =>
        component.title.toLowerCase().includes(searchText.toLowerCase()),
      )
      if (matchingComponents.length > 0) {
        const filteredCategory = { ...category, components: matchingComponents }
        filtered.push(filteredCategory)
      }
    })
    setFilteredCategories(filtered)
  }
  return {
    filteredCategories,
    filterComponentsByTitle,
  }
}

export default ComponentsOverview
