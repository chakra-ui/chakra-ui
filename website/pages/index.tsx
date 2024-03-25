import {
  Box,
  Button,
  Center,
  Circle,
  Flex,
  FlexProps,
  Grid,
  HStack,
  Heading,
  Icon,
  Link,
  Separator,
  SimpleGrid,
  Span,
  Stack,
  Text,
  Wrap,
  WrapItem,
  chakra,
} from '@chakra-ui/react'
import users from 'chakra-users'
import { AdBanner } from 'components/chakra-pro/ad-banner'
import { ChakraProAd } from 'components/chakra-pro/home-page-ad'
import Container from 'components/container'
import { DiscordStrip } from 'components/discord-strip'
import { Footer } from 'components/footer'
import Header from 'components/header'
import { PageHeading } from 'components/heading'
import SandpackEmbed from 'components/sandpack-embed'
import SEO from 'components/seo'
import ShowcaseSection from 'components/showcase/showcase-section'
import TweetCard from 'components/tweet-card'
import { App, Index } from 'configs/sandpack-contents/homepage/files'
import tweets from 'configs/tweets.json'
import Image from 'next/image'
import NextLink from 'next/link'
import * as React from 'react'
import { AiFillThunderbolt } from 'react-icons/ai'
import { DiGithubBadge } from 'react-icons/di'
import { FaArrowRight, FaDiscord, FaMicrophone } from 'react-icons/fa'
import { FiDownload, FiGithub, FiUsers } from 'react-icons/fi'
import { IoMdMoon } from 'react-icons/io'
import { MdAccessibility, MdGrain, MdPalette } from 'react-icons/md'
import type { Member, Sponsor } from 'src/types/github'
import { getAllContributors } from 'utils/get-all-contributors'
import { getAllMembers } from 'utils/get-all-members'
import { getAllSponsors } from 'utils/get-all-sponsors'
import { getDiscordMembers } from 'utils/get-discord-members'
import { getGithubStars } from 'utils/get-github-stars'
import { getNpmDownloads } from 'utils/get-npm-downloads'

const openCollectiveLink = 'https://opencollective.com/chakra-ui'

const Feature = ({ title, icon, children, ...props }) => {
  return (
    <Box
      bg='white'
      rounded='12px'
      shadow='xs'
      p='40px'
      _dark={{ bg: 'gray.700' }}
      {...props}
    >
      <Flex
        rounded='full'
        w='12'
        h='12'
        bg='teal.500'
        align='center'
        justify='center'
      >
        <Icon fontSize='24px' color='white' as={icon} />
      </Flex>
      <Heading as='h3' size='md' fontWeight='semibold' mt='1em' mb='0.5em'>
        {title}
      </Heading>
      <Text fontSize='lg' opacity={0.7}>
        {children}
      </Text>
    </Box>
  )
}

interface Tweet {
  content: string
  handle: string
  name: string
  date: string
  image: string
  url: string
}

interface StatBoxProps extends FlexProps {
  icon?: React.ElementType
  title: string
  description: string
}

const StatBox = (props: StatBoxProps) => {
  const { icon: StatIcon, title, description, ...rest } = props
  return (
    <Flex
      direction='column'
      align={{ base: 'center', md: 'flex-start' }}
      pl={{ base: '0', md: '8' }}
      borderLeft='2px solid'
      borderLeftColor='yellow.200'
      {...rest}
    >
      <Box fontSize={{ base: '4rem', md: '6rem' }} lineHeight='1em' mb='20px'>
        {title}
      </Box>
      <HStack>
        <StatIcon size='24px' />
        <Text>{description}</Text>
      </HStack>
    </Flex>
  )
}

interface HomePageProps {
  members: Member[]
  githubStars: string
  npmDownloads: string
  discordMembers: string
  sponsors: {
    companies: Sponsor[]
    individuals: Sponsor[]
  }
}

const HomePage = ({
  members,
  sponsors,
  githubStars,
  npmDownloads,
  discordMembers,
}: HomePageProps) => {
  return (
    <>
      <SEO
        title='Chakra UI - A simple, modular and accessible component library that gives you the building blocks you need to build your React applications.'
        description='Simple, Modular and Accessible UI Components for your React Applications. Built with Styled System'
      />
      <AdBanner />
      <Header />
      <Box mb={20}>
        <Box as='section' pt='6rem' pb={{ base: '0', md: '5rem' }}>
          <Container>
            <Box textAlign='center'>
              <chakra.h1
                maxW='16ch'
                mx='auto'
                fontSize={{ base: '2.25rem', sm: '3rem', lg: '4rem' }}
                fontFamily='heading'
                letterSpacing='tighter'
                fontWeight='extrabold'
                mb='16px'
                lineHeight='1.2'
              >
                Create accessible React apps
                <Span color='teal.500' _dark={{ color: 'teal.300' }}>
                  {' '}
                  with speed
                </Span>
              </chakra.h1>

              <Text
                maxW='560px'
                mx='auto'
                color='gray.500'
                _dark={{ color: 'gray.400' }}
                fontSize={{ base: 'lg', lg: 'xl' }}
                mt='6'
              >
                Chakra UI is a simple, modular and accessible component library
                that gives you the building blocks you need to build your React
                applications.
              </Text>

              <Stack
                mt='10'
                gap='4'
                justify='center'
                direction={{ base: 'column', sm: 'row' }}
              >
                <Button
                  asChild
                  h='4rem'
                  px='40px'
                  fontSize='1.2rem'
                  size='lg'
                  colorPalette='teal'
                  variant='solid'
                >
                  <NextLink href='/getting-started'>
                    Get Started
                    <FaArrowRight fontSize='0.8em' />
                  </NextLink>
                </Button>
                <Button asChild size='lg' h='4rem' px='40px' fontSize='1.2rem'>
                  <a
                    href='https://github.com/chakra-ui/chakra-ui/'
                    target='__blank'
                  >
                    <DiGithubBadge size='1.5em' />
                    GitHub
                  </a>
                </Button>
              </Stack>
            </Box>

            <Center>
              <Box
                display='inline-block'
                mt='70px'
                rounded='xl'
                bg='green.50'
                shadow='xs'
                px='6'
                py='4'
              >
                <Image
                  height={55}
                  width={240}
                  src='/git-nation-badge.png'
                  alt='Git Nations Award for the most impactful project to the community'
                />
              </Box>
            </Center>
          </Container>
        </Box>

        <Separator />

        <Box as='section' pt='48px' pb='32px'>
          <Container textAlign='center'>
            <chakra.p
              fontWeight='500'
              textTransform='uppercase'
              color={{ base: 'teal.600', _dark: 'teal.300' }}
              mb='48px'
            >
              Supported and Backed by
            </chakra.p>
            <Wrap
              maxW='800px'
              mx='auto'
              justify='center'
              align='center'
              gap='24px'
            >
              {users
                .filter((user) => user.image.includes('.'))
                .slice(0, 7)
                .map((user) => (
                  <WrapItem key={user.name} bg='white' rounded='md'>
                    <Link p='5' href={user.url}>
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={120}
                        height={32}
                        loading='lazy'
                      />
                    </Link>
                  </WrapItem>
                ))}
              <WrapItem>
                <Button
                  asChild
                  w='40'
                  h='16'
                  border='1px dashed'
                  borderColor='teal.200'
                  bg='teal.50'
                  _hover={{ bg: 'teal.100' }}
                  _dark={{
                    borderColor: 'teal.500',
                    bg: 'whiteAlpha.200',
                    _hover: { bg: 'whiteAlpha.300' },
                  }}
                  rounded='md'
                >
                  <a
                    href={`${openCollectiveLink}/contribute`}
                    rel='noopener'
                    target='_blank'
                  >
                    <Box as='span' mr='1' role='img'>
                      💖
                    </Box>{' '}
                    Your company
                  </a>
                </Button>
              </WrapItem>
            </Wrap>
          </Container>
        </Box>

        <Box as='section'>
          <Container py='80px'>
            <Box mb='3em' textAlign='center'>
              <PageHeading>Less code. More speed</PageHeading>
              <Text opacity={0.7} fontSize='lg' mt='3' mx='auto' maxW='600px'>
                Spend less time writing UI code and more time building a great
                experience for your customers.
              </Text>
            </Box>
            <Box
              maxW='7xl'
              mx='auto'
              mb='-300px'
              px={{ base: '4', md: 0 }}
              position='relative'
            >
              <SandpackEmbed
                files={{
                  '/App.tsx': App,
                  '/index.tsx': Index,
                }}
                previewOptions={{
                  zIndex: 0,
                }}
                isHorizontal
              />
            </Box>
          </Container>
        </Box>

        <Box as='section' pt='240px' bg='gray.50' _dark={{ bg: 'gray.900' }}>
          <Container py='120px' maxW='1280px'>
            <Box maxW='760px' mx='auto' textAlign='center' mb='56px'>
              <PageHeading mb='5'>
                An experience you'd expect from a design system
              </PageHeading>
              <chakra.p opacity={0.7} fontSize='lg'>
                Opinionated and designed for daily use.
              </chakra.p>
            </Box>
            <Grid
              templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
              gap={10}
              px={{ md: 12 }}
            >
              <Feature icon={MdAccessibility} title='Accessible'>
                Chakra UI strictly follows WAI-ARIA standards for all
                components.
              </Feature>
              <Feature icon={MdPalette} title='Themeable'>
                Customize any part of our components to match your design needs.
              </Feature>
              <Feature icon={MdGrain} title='Composable'>
                Designed with composition in mind. Compose new components with
                ease.
              </Feature>
              <Feature icon={IoMdMoon} title='Light and Dark UI'>
                Optimized for multiple color modes. Use light or dark, your
                choice.
              </Feature>
              <Feature icon={AiFillThunderbolt} title='Developer Experience'>
                Guaranteed to boost your productivity when building your app or
                website.
              </Feature>
              <Feature icon={FaDiscord} title='Active Community'>
                We're a team of active maintainers ready to help you whenever
                you need.
              </Feature>
            </Grid>
          </Container>
        </Box>

        <ShowcaseSection />

        <Box as='section' bg='teal.500'>
          <Container py='7.5rem' maxW='1280px' color='white'>
            <Box maxW='760px' mx='auto' textAlign='center' mb='56px'>
              <PageHeading mb='5'>Chakra is growing quickly</PageHeading>
              <chakra.p opacity={0.7} fontSize='lg'>
                We're dedicated to improving the experience and performance of
                Chakra UI.
              </chakra.p>
            </Box>
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              maxW='880px'
              mx='auto'
              gap='4rem'
              px={{ md: 12 }}
            >
              <StatBox
                icon={FiDownload}
                title={npmDownloads}
                description='Downloads per month'
              />
              <StatBox
                icon={FiGithub}
                title={githubStars}
                description='Github stars'
              />
              <StatBox
                icon={FiUsers}
                title={members.length.toString()}
                description='Core contributors'
              />
              <StatBox
                icon={FaDiscord}
                title={discordMembers}
                description='Discord members'
              />
            </SimpleGrid>

            <Box mt='5rem' textAlign='center'>
              <chakra.p mb='48px' textTransform='uppercase'>
                Chakra Heroes 🥇
              </chakra.p>
              <Wrap gap='4' justify='center' maxW='660px' mx='auto'>
                {members.map((i) => (
                  <WrapItem key={i.login}>
                    <Link href={i.url}>
                      <Box rounded='full' overflow='hidden' asChild>
                        <Image
                          alt={i.name}
                          src={i.avatar_url}
                          width={80}
                          height={80}
                          loading='lazy'
                        />
                      </Box>
                    </Link>
                  </WrapItem>
                ))}
              </Wrap>
            </Box>
          </Container>
        </Box>

        <Box>
          <Container py='120px' maxW='1200px' px='32px'>
            <PageHeading size='sm' mb='48px'>
              Loved by product people like you
            </PageHeading>
            <SimpleGrid gap='32px' columns={{ base: 1, md: 3 }}>
              {chunk(tweets.tweets, 3).map((tweetList, idx) => (
                <Stack gap='6' key={idx}>
                  {tweetList.map((tweet: Tweet, idx) => (
                    <TweetCard key={idx} {...tweet} />
                  ))}
                </Stack>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        <Box bg='teal.500'>
          <Container py='120px' maxW='1200px' px='32px' color='white'>
            <Box maxW='560px' mx='auto' textAlign='center' mb='56px'>
              <PageHeading size='sm' mb='4'>
                Support Chakra UI 💖
              </PageHeading>
              <Text fontSize='lg' opacity={0.7}>
                Our maintainers devote their time, effort, and heart to ensure
                Chakra UI keeps getting better. Support us by donating to our
                collective 🙏
              </Text>
            </Box>

            <Stack
              direction={{ base: 'column', md: 'row' }}
              gap='6'
              maxW='600px'
              mx='auto'
              bg='white'
              color='gray.800'
              shadow='md'
              rounded='lg'
              p='6'
            >
              <Stack flex='1' direction='row' gap='6' pr={{ base: 0, md: '4' }}>
                <Icon h='40px' w='40px' viewBox='0 0 32 32'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M29.1531 6.8877C30.948 9.47379 31.9999 12.614 31.9999 16.0003C31.9999 19.3866 30.948 22.5271 29.1531 25.1129L25.0085 20.9684C25.8225 19.4957 26.2858 17.8019 26.2858 16.0003C26.2858 14.1987 25.8225 12.5052 25.0085 11.0325L29.1531 6.8877Z'
                    fill='#8FC7FF'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M25.1126 2.84685L20.9678 6.99138C19.4951 6.17745 17.8016 5.71417 16 5.71417C10.3194 5.71417 5.71418 10.3194 5.71418 16C5.71418 21.6806 10.3194 26.2858 16 26.2858C17.8016 26.2858 19.4951 25.8226 20.9678 25.0086L25.1126 29.1532C22.5265 30.948 19.3863 32 16 32C7.16352 32 0 24.8365 0 16C0 7.16351 7.16352 0 16 0C19.3863 0 22.5265 1.05197 25.1126 2.84685Z'
                    fill='#297EFF'
                  />
                </Icon>
                <Box flex='1'>
                  <Text fontSize='lg' fontWeight='bold' mt='-1'>
                    Open Collective
                  </Text>
                  <Text opacity={0.7}>Sponsor the Chakra UI maintainers</Text>
                </Box>
              </Stack>
              <Button
                w={{ base: '100%', md: 'auto' }}
                alignSelf='center'
                asChild
                minW='7rem'
                colorPalette='teal'
              >
                <a href={openCollectiveLink} rel='noopener' target='_blank'>
                  Sponsor
                </a>
              </Button>
            </Stack>

            <Stack
              direction={{ base: 'column', md: 'row' }}
              maxW='600px'
              mt='6'
              mx='auto'
              bg='white'
              color='gray.800'
              shadow='md'
              rounded='lg'
              p='6'
            >
              <Stack flex='1' direction='row' gap='6' pr={{ base: 0, md: '4' }}>
                <Icon w='40px' h='40px' viewBox='0 0 569 546'>
                  <g>
                    <circle
                      cx='362.589996'
                      cy='204.589996'
                      r='204.589996'
                      fill='#f96854'
                    />
                    <rect
                      fill='#052d49'
                      height='545.799988'
                      width='100'
                      x='0'
                      y='0'
                    />
                  </g>
                </Icon>
                <Box flex='1'>
                  <Text fontSize='lg' fontWeight='bold' mt='-1'>
                    Patreon
                  </Text>
                  <Text opacity={0.7}>Sponsor the creator, Segun Adebayo</Text>
                </Box>
              </Stack>

              <Button
                w={{ base: '100%', md: 'auto' }}
                alignSelf='center'
                asChild
                minW='7rem'
                colorPalette='teal'
              >
                <a
                  href='https://www.patreon.com/segunadebayo'
                  rel='noopener'
                  target='_blank'
                >
                  Sponsor
                </a>
              </Button>
            </Stack>

            <Box maxW='600px' mx='auto' textAlign='center'>
              <chakra.p textTransform='uppercase' mb='8' mt='4rem'>
                Organization Sponsors 🏦
              </chakra.p>
              <Wrap justify='center'>
                {sponsors.companies.map((i) => (
                  <WrapItem key={i.MemberId}>
                    <Circle
                      size='80px'
                      bg='white'
                      shadow='lg'
                      {...(i.website && {
                        as: 'a',
                        href: i.website,
                        target: '_blank',
                        rel: 'noopener',
                      })}
                    >
                      <Box
                        asChild
                        rounded='full'
                        cursor={i.website ? 'pointer' : 'auto'}
                      >
                        <Image
                          width={56}
                          height={56}
                          alt={i.name}
                          key={i.MemberId}
                          src={i.image}
                          loading='lazy'
                        />
                      </Box>
                    </Circle>
                  </WrapItem>
                ))}
              </Wrap>

              <chakra.p mb='8' mt='4rem' textTransform='uppercase'>
                Individual Sponsors 🥇
              </chakra.p>
              <Wrap justify='center'>
                {sponsors.individuals.map((i) => (
                  <WrapItem key={i.MemberId}>
                    <Link href={i.profile}>
                      <Box rounded='full' asChild>
                        <Image
                          src={i.image}
                          alt={i.name}
                          width={40}
                          height={40}
                          loading='lazy'
                        />
                      </Box>
                    </Link>
                  </WrapItem>
                ))}
              </Wrap>
            </Box>
          </Container>
        </Box>

        <ChakraProAd />

        <Box
          bgImage='url(/audio-bar.svg)'
          bgPos='bottom center'
          bgSize='120px'
          bgRepeat='space no-repeat'
        >
          <Container
            pt='7.5rem'
            pb='10rem'
            maxW='50rem'
            mx='auto'
            textAlign='center'
          >
            <Flex direction='column' align='center' maxW='600px' mx='auto'>
              <Circle size='80px' bg='blackAlpha.200' color='teal.400'>
                <FaMicrophone size='40px' />
              </Circle>
              <PageHeading mt='6' mb='6'>
                Invite us to speak at your next event
              </PageHeading>
              <Text mb='40px' fontSize='lg' opacity={0.7}>
                Want a Chakra UI core team member to speak at your next event?
                Invite us to create a memorable and engaging experience for your
                attendees.
              </Text>
            </Flex>
            <Button
              h='4rem'
              px='40px'
              fontSize='1.2rem'
              asChild
              size='lg'
              colorPalette='teal'
            >
              <a href='mailto:sage@adebayosegun.com?subject=Invitation to Speak!'>
                Invite us to speak
                <FaArrowRight fontSize='0.8em' />
              </a>
            </Button>
          </Container>
        </Box>

        <DiscordStrip />

        <Footer />
      </Box>
    </>
  )
}

function chunk<T>(array: T[], size: number): T[][] {
  return array.reduce((rows: T[][], currentValue: T, index: number) => {
    if (index % size === 0) {
      rows.push([currentValue])
    } else {
      rows[rows.length - 1].push(currentValue)
    }
    return rows
  }, [] as T[][])
}

export async function getStaticProps() {
  const [
    { prettyCount: githubStars },
    { prettyCount: npmDownloads },
    { prettyCount: discordMembers },
  ] = await Promise.all([
    getGithubStars(),
    getNpmDownloads(),
    getDiscordMembers(),
  ])

  const contributors = getAllContributors()
  const members = getAllMembers()
  const sponsors = getAllSponsors()

  return {
    props: {
      githubStars,
      members,
      contributors,
      sponsors,
      discordMembers,
      npmDownloads,
    },
  }
}

export default HomePage
