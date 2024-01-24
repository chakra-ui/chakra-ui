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
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import fs from 'fs'
import MDXLayout from 'layouts/mdx'
import NextImage from 'next/image'
import { IoIosGlobe, IoLogoGithub, IoLogoTwitter } from 'react-icons/io'
import { IFormerMember } from 'scripts/get-former-members'
import { Contributor, Member as IMember } from 'src/types/github'
import { t } from 'utils/i18n'

function SocialLink(props: {
  icon: React.ElementType
  href: string
  label: string
}) {
  const { icon, href, label } = props
  return (
    <Link
      display='inline-flex'
      alignItems='center'
      justifyContent='center'
      rounded='full'
      href={href}
      isExternal
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
    <Stack direction='row' spacing={6} align='flex-start'>
      <Circle overflow='hidden' bg='gray.50'>
        <NextImage src={avatarUrl} width='96' height='96' alt={name} />
      </Circle>
      <Stack spacing={3} maxW='320px'>
        <Text fontWeight='bold'>{name}</Text>

        <Stack isInline align='center' spacing={2}>
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

function FormerMember({ formerMember }: { formerMember: IFormerMember }) {
  return (
    <VStack spacing={2}>
      <Circle overflow='hidden' bg='gray.50'>
        <NextImage
          src={`https://github.com/${formerMember.githubName}.png`}
          width='96'
          height='96'
          alt={formerMember.name}
        />
      </Circle>
      <Text
        as='a'
        href={`https://github.com/${formerMember.githubName}`}
        fontSize='md'
        textAlign='center'
      >
        {formerMember.name}
      </Text>
    </VStack>
  )
}

interface TeamProps {
  members: IMember[]
  formerMembers: IFormerMember[]
  contributors: Contributor[]
}

function Team({ members, formerMembers, contributors }: TeamProps) {
  const memberLogins = members.map(({ login }) => login)
  const contributorsWithoutTeam = contributors.filter(
    ({ login }) => !memberLogins.includes(login),
  )

  return (
    <MDXLayout
      frontmatter={{
        title: t('team.seo.title'),
        description: t('team.seo.description'),
        slug: '/community/team',
      }}
    >
      <Text lineHeight='tall' mt='5'>
        {t('team.message')}
      </Text>

      <Stack spacing={8} mt='20'>
        <Heading size='lg'>{t('team.core-team')}</Heading>
        <SimpleGrid columns={[1, 1, 2]} spacing='40px' pt='3'>
          {members.map((member) => (
            <Member key={member.login} member={member} />
          ))}
        </SimpleGrid>

        {formerMembers && (
          <Stack spacing='8' pt='4'>
            <Text textStyle='caps' textTransform='uppercase' opacity='0.7'>
              {t('team.former-members')}
            </Text>
            <SimpleGrid columns={[2, 2, 6]} spacing='40px'>
              {formerMembers.map(
                (member) =>
                  member.name &&
                  member.githubName && (
                    <FormerMember
                      key={member.githubName}
                      formerMember={member}
                    />
                  ),
              )}
            </SimpleGrid>
          </Stack>
        )}
      </Stack>

      <Stack py='12' spacing={8}>
        <Heading size='lg'>{t('team.our-sponsors')}</Heading>

        <Box>
          <Text textStyle='caps' mb='4' textTransform='uppercase' opacity='0.7'>
            {t('team.organizations')}
          </Text>
          <Wrap>
            {new Array(9).fill('').map((_, idx) => (
              <WrapItem
                as='a'
                key={idx}
                href={`https://opencollective.com/chakra-ui/organization/${idx}/website`}
              >
                <img
                  alt='Open collective Organizations'
                  src={`https://opencollective.com/chakra-ui/organization/${idx}/avatar.svg?avatarHeight=130`}
                />
              </WrapItem>
            ))}
          </Wrap>
        </Box>
        <Box>
          <Text textStyle='caps' mb='4' textTransform='uppercase' opacity='0.7'>
            {t('team.individuals')}
          </Text>
          <a href='https://opencollective.com/chakra-ui'>
            <img
              alt='Open collective Individuals'
              src='https://opencollective.com/chakra-ui/individuals.svg?width=890'
            />
          </a>
        </Box>
      </Stack>

      <Stack spacing={8} mt={{ base: '10', md: '24' }}>
        <Heading size='lg'>{t('team.project-contributors')}</Heading>
        <Wrap spacing='3'>
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
   * Read former members from `.all-former-membersrc` file
   * to avoid overfetching from Github
   */
  const formerMembers = JSON.parse(
    fs.readFileSync('.all-former-membersrc', 'utf-8'),
  )

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
      formerMembers,
      contributors,
    },
  }
}

export default Team
