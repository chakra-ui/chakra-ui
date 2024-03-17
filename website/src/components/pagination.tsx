import { HStack, Link, SimpleGrid, Text, chakra } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const ChevronLeftIcon = chakra(FaChevronLeft)
const ChevronRightIcon = chakra(FaChevronRight)

export const PaginationLink = (props) => {
  const { label, href, children, ...rest } = props

  return (
    <Link
      display='flex'
      flexDirection='column'
      asChild
      _hover={{ textDecor: 'none' }}
      flex='1'
      borderRadius='md'
      {...rest}
    >
      <NextLink href={href}>
        <Text fontSize='sm' px='2'>
          {label}
        </Text>
        <HStack mt='1' fontWeight='semibold' color='teal.600'>
          {children}
        </HStack>
      </NextLink>
    </Link>
  )
}

export const Pagination = ({ previous, next, ...rest }) => {
  return (
    <SimpleGrid
      as='nav'
      aria-label='Pagination'
      gap='40px'
      my='64px'
      columns={2}
      {...rest}
    >
      {previous ? (
        <PaginationLink
          alignItems='flex-start'
          label='Previous'
          href={previous.path}
          rel='prev'
        >
          <ChevronLeftIcon mr='1' />
          {previous.title}
        </PaginationLink>
      ) : (
        <div />
      )}
      {next ? (
        <PaginationLink
          alignItems='flex-end'
          label='Next'
          href={next.path}
          rel='next'
        >
          {next.title}
          <ChevronRightIcon ml='1' />
        </PaginationLink>
      ) : (
        <div />
      )}
    </SimpleGrid>
  )
}

export default Pagination
