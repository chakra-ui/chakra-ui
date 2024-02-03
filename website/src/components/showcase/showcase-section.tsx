import {
  Box,
  Button,
  Container,
  SimpleGrid,
  chakra,
  VStack,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

import showcaseJson from 'configs/showcase.json'
import { t } from 'utils/i18n'
import { ShowcaseItem } from './showcase-item'

const websites = showcaseJson.data.slice(0, 8)

const ShowcaseSection = () => {
  return (
    <Container py='7.5rem' maxW='1280px' as='section' mb={12}>
      <VStack w='full' spacing='7.5rem'>
        <Box maxW='760px' mx='auto' textAlign='center'>
          <chakra.h2 textStyle='heading' mb={4}>
            {t('homepage.built-with-chakra-section.title')}
          </chakra.h2>
          <chakra.p opacity={0.7} fontSize='lg' mb={8}>
            {t('homepage.built-with-chakra-section.description')}
          </chakra.p>
          <NextLink href='/showcase' passHref>
            <Button
              h='4rem'
              px='40px'
              fontSize='1.2rem'
              as='a'
              size='lg'
              colorScheme='teal'
              rightIcon={<FaArrowRight fontSize='0.8em' />}
            >
              {t('homepage.built-with-chakra-section.see-showcase')}
            </Button>
          </NextLink>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} w='full'>
          {websites.map(({ name, image, url }) => (
            <ShowcaseItem key={url} name={name} image={image} url={url} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  )
}

export default ShowcaseSection
