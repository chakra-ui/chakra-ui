import React from "react"
import { Box, Icon, Text, Stack, Link } from "@chakra-ui/core"
import { IoLogoTwitter, IoLogoLinkedin } from "react-icons/io"
import { MdEmail } from "react-icons/md"
import { DiGithubBadge } from "react-icons/di"

type FooterLinkProps = {
  icon?: React.ElementType
  href?: string
}

const FooterLink: React.FC<FooterLinkProps> = ({ icon, href }) => (
  <Link display="inline-block" href={href} isExternal>
    <Icon as={icon} fontSize="xl" color="gray.400" />
  </Link>
)

const links = [
  {
    icon: DiGithubBadge,
    url: "https://github.com/segunadebayo",
  },
  {
    icon: IoLogoTwitter,
    url: "https://twitter.com/thesegunadebayo",
  },
  {
    icon: IoLogoLinkedin,
    url: "https://linkedin.com/in/thesegunadebayo/",
  },
  {
    icon: MdEmail,
    url: "mailto:sage@adebayosegun.com",
  },
]

export const Footer = () => (
  <Box as="footer" mt={12} textAlign="center">
    <Text fontSize="sm">
      <span>Proudly made in 🇳🇬</span>
      <Box as="span" ml="3">
        by Segun Adebayo
      </Box>
    </Text>
    <Stack mt={4} direction="row" spacing="12px" justify="center">
      {links.map((link) => (
        <FooterLink key={link.url} href={link.url} icon={link.icon} />
      ))}
    </Stack>
  </Box>
)

export default Footer
