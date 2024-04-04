import {
  Box,
  Field,
  Flex,
  HTMLChakraProps,
  Heading,
  Input,
  LinkBox,
  LinkOverlay,
  Tabs,
  Text,
  chakra,
} from '@chakra-ui/react'
import PageContainer from 'components/page-container'
import ResourceCard, { Resource } from 'components/resource-card'
import Sidebar from 'components/sidebar/sidebar'
import resources from 'configs/resources.json'
import { useFormik } from 'formik'
import { getRoutes } from 'layouts/mdx'
import NextLink from 'next/link'
import * as React from 'react'
import { FaMicrophone, FaPenSquare, FaVideo } from 'react-icons/fa'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { filterResources } from 'utils/filter-resources'
import { groupBy } from 'utils/js-utils'

function Resources() {
  /**
   * Re-use the docs sidebar so it's easier for a visitors
   * to reference components mentioned in the resource blog/video.
   */
  const routes = getRoutes('/docs/')
  const data = resources.data as Resource[]
  const groups = groupBy(data, 'type')

  return (
    <PageContainer
      leftSidebar={<Sidebar routes={routes} />}
      frontmatter={{
        title: 'Community Resources',
        description:
          'A rich compilation of technical descriptions and detailed information of how Chakra UI works.',
      }}
    >
      <Text mt='2'>
        A rich compilation of technical descriptions and detailed information of
        how Chakra UI works.
      </Text>
      <ShowcaseBanner />
      <Tabs.Root colorPalette='teal' variant='line' mt='6'>
        <Tabs.List>
          <Tabs.Trigger value='talks'>
            <ResourcesTabContent icon={FaMicrophone} text='Talks' />
          </Tabs.Trigger>
          <Tabs.Trigger value='videos'>
            <ResourcesTabContent icon={FaVideo} text='Videos' />
          </Tabs.Trigger>
          <Tabs.Trigger value='blogs'>
            <ResourcesTabContent icon={FaPenSquare} text='Blogs' />
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.ContentGroup>
          <Tabs.Content value='talks'>
            <ResourceSection title='Talks' resources={groups.talk} />
          </Tabs.Content>
          <Tabs.Content value='videos'>
            <ResourceSection title='Videos' resources={groups.video} />
          </Tabs.Content>
          <Tabs.Content value='blogs'>
            <ResourceSection title='Blogs' resources={groups.blog} />
          </Tabs.Content>
        </Tabs.ContentGroup>
      </Tabs.Root>
    </PageContainer>
  )
}

export default Resources

interface ResourceSectionProps {
  title: string
  resources: Resource[]
}

function ResourceSection(props: ResourceSectionProps) {
  const { title, resources } = props
  const filterInputId = `resources-filter-${title.toLowerCase()}`
  const formik = useFormik({
    initialValues: { [filterInputId]: '' },
    onSubmit: undefined,
  })
  const filteredResources = filterResources(
    formik.values[filterInputId],
    resources,
  )
  /**
   * Notice, that the breakpoints don't follow conventional numbers (e.g. 768, 991).
   * The reason for that is that the number (e.g. 767) actually represents target
   * number - 1 (e.g. 768 - 1), where at target number (e.g. 768) is the point at
   * which the grid should switch.  This might be a bug with the library.
   */
  const masonryGridBreakpoints = { 350: 1, 580: 2, 767: 1, 990: 2 }

  return (
    <Box as='section' mt='8'>
      <Field.Root id={filterInputId} mt='8' mb='8'>
        <Field.Label>Search</Field.Label>
        <Input
          name={filterInputId}
          onChange={formik.handleChange}
          placeholder='react'
          value={formik.values[filterInputId]}
        />
        <Field.HelpText>Filter by title</Field.HelpText>
      </Field.Root>
      <ResponsiveMasonry columnsCountBreakPoints={masonryGridBreakpoints}>
        <Masonry gutter='16px'>
          {filteredResources.map((item, index) => (
            <ResourceCard key={index} data={item} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </Box>
  )
}

interface ResourcesTabContentProps {
  icon: React.ElementType
  text: string
}

function ResourcesTabContent({ icon, text }: ResourcesTabContentProps) {
  return (
    <>
      <Box
        as={icon}
        display='inline-block'
        verticalAlign='middle'
        color='teal.500'
        mr='2'
      />
      <span>{text}</span>
    </>
  )
}

const ShowcaseIcon = (props: HTMLChakraProps<'svg'>) => (
  <chakra.svg
    width='5'
    height='5'
    viewBox='0 0 24 24'
    fill='none'
    color='white'
    {...props}
  >
    <path
      d='M11.0489 4.92705C11.3483 4.00574 12.6517 4.00574 12.9511 4.92705L14.0206 8.21885C14.1545 8.63087 14.5385 8.90983 14.9717 8.90983H18.4329C19.4016 8.90983 19.8044 10.1494 19.0207 10.7188L16.2205 12.7533C15.87 13.0079 15.7234 13.4593 15.8572 13.8713L16.9268 17.1631C17.2261 18.0844 16.1717 18.8506 15.388 18.2812L12.5878 16.2467C12.2373 15.9921 11.7627 15.9921 11.4122 16.2467L8.61204 18.2812C7.82833 18.8506 6.77385 18.0844 7.0732 17.1631L8.14277 13.8713C8.27665 13.4593 8.12999 13.0079 7.7795 12.7533L4.97933 10.7188C4.19562 10.1494 4.59839 8.90983 5.56712 8.90983H9.02832C9.46154 8.90983 9.8455 8.63087 9.97937 8.21885L11.0489 4.92705Z'
      fill='currentColor'
    />
  </chakra.svg>
)

const ShowcaseBanner = () => (
  <LinkBox role='group' mt='6'>
    <Flex align='center' rounded='3xl' bg='gray.900' padding='8'>
      <Box>
        <LinkOverlay color='white' asChild>
          <NextLink href='/showcase'>
            <Flex align='center' mb='4'>
              <Heading size='md'>Visit the Showcase</Heading>
              <ShowcaseIcon w='8' h='8' ml='1' />
            </Flex>
          </NextLink>
        </LinkOverlay>
        <Text color='gray.400'>
          See what other Devs made with Chakra UI. Those are community projects,
          websites, libraries, tools, articles and videos that you can use to
          get inspired, implement a feature, or learn Chakra UI.
        </Text>
      </Box>
    </Flex>
  </LinkBox>
)
