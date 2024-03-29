import { Box, SimpleGrid, Text, chakra } from '@chakra-ui/react'
import NextImage from 'next/image'

interface Props {
  image: string
  title: string
  description: string
  href: string
}

const CourseBanner = (props: Props) => {
  const { href, image, title } = props
  return (
    <chakra.a
      display='block'
      borderWidth='1px'
      target='_blank'
      transition='box-shadow 0.1s ease-out'
      href={href}
      rounded='lg'
      overflow='hidden'
      _hover={{ shadow: 'md' }}
    >
      <NextImage src={image} alt='Egghead Logo' width='400' height='200' />
      <Box py='3' px='4'>
        <Text as='h3' fontWeight='semibold'>
          {title}
        </Text>
      </Box>
    </chakra.a>
  )
}

export const FeaturesCourses = () => {
  return (
    <SimpleGrid
      mt='10'
      columns={{ base: 1, lg: 2 }}
      gap={{ base: '4', md: '8' }}
    >
      <CourseBanner
        image='/course-banners/egghead-course.png'
        title='Egghead Course'
        description='In this free course, you will learn the basics of Chakra UI and how to build well-designed, accessible user interfaces with speed!'
        href='https://egghead.io/courses/build-a-modern-user-interface-with-chakra-ui-fac68106'
      />
      <CourseBanner
        image='/course-banners/chakra-ui-for-beginners.png'
        title='Chakra UI for beginners'
        description='The complete course for absolute beginners to understand how Chakra UI works and get started building.'
        href='https://www.chakrauiforbeginners.com/'
      />
    </SimpleGrid>
  )
}

export default CourseBanner
