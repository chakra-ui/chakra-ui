import {
  Box,
  Circle,
  Heading,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import fs from 'fs'
import MDXLayout from 'layouts/mdx'
import NextImage from 'next/image'
import { IoIosGlobe, IoLogoGithub, IoLogoTwitter } from 'react-icons/io'
import { Contributor, Member as IMember } from 'src/types/github'

type Props = {
  icon: React.ElementType
  href: string
  label: string
}

function SocialLink(props: Props) {
  const { icon, href, label } = props
  return (
    <Link
      display='inline-flex'
      alignItems='center'
      justifyContent='center'
      rounded='full'
      href={href}
      external
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      <Icon as={icon} fontSize='xl' color='accent' />
    </Link>
  )
}

function Member(props: { member: IMember }) {
  const {
    avatar_url: avatarUrl,
    bio,
    name,
    twitter_username: twitterUsername,
    blog: websiteUrl,
    url,
  } = props.member

  return (
    <Stack direction='row' gap={6} align='flex-start'>
      <Circle overflow='hidden' bg='gray.50'>
        <NextImage src={avatarUrl} width='96' height='96' alt={name} />
      </Circle>
      <Stack gap={3} maxW='320px'>
        <Text fontWeight='bold'>{name}</Text>

        <Stack direction='row' align='center' gap={2}>
          <SocialLink
            href={url}
            icon={IoLogoGithub}
            label={`View ${name}'s Github`}
          />
          {twitterUsername && (
            <SocialLink
              href={`https://twitter.com/${twitterUsername}`}
              icon={IoLogoTwitter}
              label={`View ${name}'s Twitter`}
            />
          )}
          {websiteUrl && (
            <SocialLink
              href={websiteUrl}
              icon={IoIosGlobe}
              label={`View ${name}'s website`}
            />
          )}
        </Stack>
        <Text fontSize='sm' color='fg-muted'>
          {bio}
        </Text>
      </Stack>
    </Stack>
  )
}

interface TeamProps {
  members: IMember[]
  contributors: Contributor[]
}

function Team({ members, contributors }: TeamProps) {
  const memberLogins = members.map(({ login }) => login)
  const contributorsWithoutTeam = contributors.filter(
    ({ login }) => !memberLogins.includes(login),
  )

  return (
    <MDXLayout
      frontmatter={{
        title: 'Chakra UI Team',
        description:
          'Amazing engineers who have contributed time, effort, and thought to Chakra UI. Without them, this project would not be possible.',
        slug: '/community/team',
      }}
    >
      <Text lineHeight='tall' mt='5'>
        Amazing engineers who have contributed time, effort, and thought to
        Chakra UI. Without them, this project would not be possible.
      </Text>

      <Stack gap={8} mt='20'>
        <Heading size='lg'>Core Team 🤝</Heading>
        <SimpleGrid columns={[1, 1, 2]} gap='40px' pt='3'>
          {members.map((member) => (
            <Member key={member.login} member={member} />
          ))}
        </SimpleGrid>
      </Stack>

      <Stack py='12' gap={8}>
        <Heading size='lg'>Our Sponsors 💰</Heading>

        <Box>
          <Text mb='4' textTransform='uppercase' opacity='0.7'>
            Organizations
          </Text>
          <Wrap>
            {new Array(9).fill('').map((_, idx) => (
              <WrapItem key={idx} asChild>
                <a
                  href={`https://opencollective.com/chakra-ui/organization/${idx}/website`}
                >
                  <img
                    alt='Open collective Organizations'
                    src={`https://opencollective.com/chakra-ui/organization/${idx}/avatar.svg?avatarHeight=130`}
                  />
                </a>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
        <Box>
          <Text mb='4' textTransform='uppercase' opacity='0.7'>
            Individuals
          </Text>
          <a href='https://opencollective.com/chakra-ui'>
            <img
              alt='Open collective Individuals'
              src='https://opencollective.com/chakra-ui/individuals.svg?width=890'
            />
          </a>
        </Box>
      </Stack>

      <Stack gap={8} mt={{ base: '10', md: '24' }}>
        <Heading size='lg'>Project Contributors 💖</Heading>
        <Wrap gap='3'>
          {contributorsWithoutTeam.map((contributor) => (
            <Circle overflow='hidden' key={contributor.login}>
              <NextImage
                width={48}
                height={48}
                src={contributor.avatar_url}
                alt={contributor.name}
              />
            </Circle>
          ))}
        </Wrap>
      </Stack>
    </MDXLayout>
  )
}

export async function getStaticProps() {
  /**
   * Read the profile/bio of each member from `.all-membersrc` file
   * to avoid overfetching from Github
   */
  const { members } = JSON.parse(fs.readFileSync('.all-membersrc', 'utf-8'))

  /**
   * Read contributors from `.all-contributorsrc` file
   * to avoid overfetching from Github
   */
  const { contributors } = JSON.parse(
    fs.readFileSync('.all-contributorsrc', 'utf-8'),
  )

  return {
    props: {
      members,
      contributors,
    },
  }
}

export default Team
