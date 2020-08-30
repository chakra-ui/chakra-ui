import React from "react"
import { Box, Icon, Text, Stack, Link, chakra } from "@chakra-ui/core"
import { IoLogoTwitter, IoLogoLinkedin } from "react-icons/io"
import { MdEmail } from "react-icons/md"
import { DiGithubBadge } from "react-icons/di"

type FooterLinkProps = {
  icon?: React.ElementType
  href?: string
  label?: string
}

const FooterLink: React.FC<FooterLinkProps> = ({ icon, href, label }) => (
  <Link display="inline-block" href={href} aria-label={label} isExternal>
    <Icon as={icon} fontSize="xl" color="gray.400" />
  </Link>
)

const links = [
  {
    icon: DiGithubBadge,
    label: "GitHub",
    url: "https://github.com/segunadebayo",
  },
  {
    icon: IoLogoTwitter,
    label: "Twitter",
    url: "https://twitter.com/thesegunadebayo",
  },
  {
    icon: IoLogoLinkedin,
    label: "LinkedIn",
    url: "https://linkedin.com/in/thesegunadebayo/",
  },
  {
    icon: MdEmail,
    label: "Email",
    url: "mailto:sage@adebayosegun.com",
  },
]

const NigeriaFlag = (props) => (
  <chakra.svg
    display="inline-block"
    mx="3"
    h="16px"
    w="auto"
    viewBox="0 0 48 48"
    {...props}
  >
    <g>
      <rect x="16" y="6" fill="#E6E6E6" width="16" height="36"></rect>{" "}
      <path
        fill="#078754"
        d="M48,40c0,1.105-0.895,2-2,2H32V6h14c1.105,0,2,0.895,2,2V40z"
      />
      <path
        fill="#078754"
        d="M16,42H2c-1.105,0-2-0.895-2-2V8c0-1.105,0.895-2,2-2h14V42z"
      />
    </g>
  </chakra.svg>
)

export const Footer = () => (
  <Box as="footer" mt={12} textAlign="center">
    <Text fontSize="sm">
      <span>
        Proudly made in
        <NigeriaFlag />
      </span>
      <span>by Segun Adebayo</span>
    </Text>
    <Stack mt={4} direction="row" spacing="12px" justify="center">
      {links.map((link) => (
        <FooterLink key={link.url} {...link} />
      ))}
    </Stack>
  </Box>
)

export default Footer
