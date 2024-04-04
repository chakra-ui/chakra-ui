import { Box, BoxProps, chakra, List } from '@chakra-ui/react'
import { useScrollSpy } from 'hooks/use-scrollspy'
import type { FrontmatterHeading } from 'src/types/frontmatter'
import { FigmaPluginAd } from './figma-plugin-ad'
import TocNav from './toc-nav'

interface TableOfContentProps extends BoxProps {
  headings: FrontmatterHeading[]
}

function TableOfContent(props: TableOfContentProps) {
  const { headings, ...rest } = props

  const activeId = useScrollSpy(
    headings.map(({ id }) => `[id="${id}"]`),
    { rootMargin: '-10% 0% -24% 0%' },
  )

  return (
    <TocNav title='On this page' {...rest}>
      <List.Root gap='1' ml='0' mt='4' styleType='none'>
        {headings.map(({ id, text, level }) => (
          <List.Item
            key={id}
            title={text}
            ms={level === 'h3' ? '4' : undefined}
          >
            <chakra.a
              py='1'
              display='block'
              fontWeight={id === activeId ? 'bold' : 'medium'}
              href={`#${id}`}
              aria-current={id === activeId ? 'location' : undefined}
              color='fg.muted'
              _hover={{
                color: 'fg',
              }}
            >
              {text}
            </chakra.a>
          </List.Item>
        ))}
      </List.Root>

      <Box my='10'>
        <FigmaPluginAd medium='sidebar-ad' />
      </Box>
    </TocNav>
  )
}

export default TableOfContent
