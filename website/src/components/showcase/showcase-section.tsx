import {
  Box,
  Button,
  Container,
  SimpleGrid,
  VStack,
  chakra,
} from '@chakra-ui/react'
import json from 'configs/showcase.json'
import NextLink from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import { ShowcaseItem } from './showcase-item'

const websites = json.data.slice(0, 8)

const ShowcaseSection = () => {
  return (
    <Container py='7.5rem' maxW='1280px' as='section' mb={12}>
      <VStack w='full' spacing='7.5rem'>
        <Box maxW='760px' mx='auto' textAlign='center'>
          <chakra.h2 textStyle='heading' mb={4}>
            Built with Chakra UI ⚡️
          </chakra.h2>
          <chakra.p opacity={0.7} fontSize='lg' mb={8}>
            Your project can look as good as these! Check them out, get
            inspired!
          </chakra.p>
          <NextLink href='/showcase' passHref>
            <Button
              h='4rem'
              px='40px'
              fontSize='1.2rem'
              as='a'
              size='lg'
              colorScheme='teal'
            >
              See showcase
              <FaArrowRight fontSize='0.8em' />
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
