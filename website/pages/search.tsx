import { Box } from '@chakra-ui/react'
import AlgoliaSearch from 'components/algolia-search'

const SearchPage = () => (
  <Box mb={20}>
    <Box as='section' pt='6rem' pb={{ base: '0', md: '5rem' }}>
      <AlgoliaSearch />
    </Box>
  </Box>
)

export default SearchPage
