import {
  Box,
  BoxProps,
  chakra,
  ListItem,
  OrderedList,
  useColorModeValue,
} from '@chakra-ui/react'
import { useScrollSpy } from 'hooks/use-scrollspy'
import type { FrontmatterHeading } from 'src/types/frontmatter'
import { t } from 'utils/i18n'
import { FigmaPluginAd } from './figma-plugin-ad'
import TocNav from './toc-nav'

interface TableOfContentProps extends BoxProps {
  headings: FrontmatterHeading[]
}

function TableOfContent(props: TableOfContentProps) {
  const { headings, ...rest } = props
  const activeId = useScrollSpy(
    headings.map(({ id }) => `[id="${id}"]`),
    {
      rootMargin: '-10% 0% -24% 0%',
    },
  )
  const linkColor = useColorModeValue('gray.600', 'gray.400')
  const linkHoverColor = useColorModeValue('gray.900', 'gray.600')
  return (
    <TocNav title={t('component.table-of-content.on-this-page')} {...rest}>
      <OrderedList spacing={1} ml='0' mt='4' styleType='none'>
        {headings.map(({ id, text, level }) => (
          <ListItem key={id} title={text} ml={level === 'h3' ? '4' : undefined}>
            <chakra.a
              py='1'
              display='block'
              fontWeight={id === activeId ? 'bold' : 'medium'}
              href={`#${id}`}
              aria-current={id === activeId ? 'location' : undefined}
              color={linkColor}
              _hover={{
                color: linkHoverColor,
              }}
            >
              {text}
            </chakra.a>
          </ListItem>
        ))}
      </OrderedList>

      <Box my='10'>
        <FigmaPluginAd medium='sidebar-ad' />
      </Box>
    </TocNav>
  )
}

export default TableOfContent
