import * as React from "react"
import { graphql } from "gatsby"
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Avatar,
  SimpleGrid,
  Link,
} from "@chakra-ui/core"
import { IoLogoTwitter, IoLogoGithub, IoIosGlobe } from "react-icons/io"

const SocialLink = ({ icon, href }) => (
  <Link display="inline-block" href={href} isExternal>
    <Box as={icon} fontSize="xl" color="gray.700" />
  </Link>
)

function Member({ member }) {
  const { avatarUrl, bio, name, twitterUsername, url, websiteUrl } = member

  return (
    <Box>
      <Stack direction="row" spacing={6}>
        <Avatar size="lg" src={avatarUrl} />
        <Stack spacing={3}>
          <Text fontWeight="bold" fontSize="2xl">
            {name}
          </Text>

          <Stack direction="row" spacing={2} justify="center">
            <SocialLink href={url} icon={IoLogoGithub} />
            {twitterUsername && (
              <SocialLink
                href={`https://twitter.com/${twitterUsername}`}
                icon={IoLogoTwitter}
              />
            )}
            {websiteUrl && <SocialLink href={websiteUrl} icon={IoIosGlobe} />}
          </Stack>
          <Text>{bio}</Text>
        </Stack>
      </Stack>
    </Box>
  )
}

const sortMembers = (a, b) => {
  // segun comes first!
  if (a.login === "segunadebayo") return -1
  if (b.login === "segunadebayo") return 1

  // everything else is alphabetical by login
  return a.login.localeCompare(b.login, "en")
}

function Team({ data }) {
  const { nodes } = data.github.organization.membersWithRole
  const sorted = nodes.sort(sortMembers)

  return (
    <Box pt="56px">
      <Box py="80px">
        <Container maxWidth="lg">
          <Heading as="h1" size="2xl" mb="3">
            Chakra UI Team
          </Heading>
          <Text>These are the members of the Chakra UI core team.</Text>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <SimpleGrid columns={[1, 1, 2]} spacing={6}>
          {sorted.map((member) => (
            <Member key={member.login} member={member} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Team

export const query = graphql`
  query TeamQuery {
    github {
      organization(login: "chakra-ui") {
        membersWithRole(first: 50) {
          nodes {
            avatarUrl
            bio
            login
            name
            twitterUsername
            url
            websiteUrl
          }
        }
      }
    }
  }
`
