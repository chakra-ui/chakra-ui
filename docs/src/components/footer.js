import React from "react"
import { Box, Text, Stack, Link } from "@chakra-ui/core"
import { IoLogoTwitter, IoLogoLinkedin } from "react-icons/io"
import { MdEmail } from "react-icons/md"
import { DiGithubBadge } from "react-icons/di"

const FooterLink = ({ icon, href }) => (
  <Link display="inline-block" href={href} isExternal>
    <Box as={icon} size="6" color="gray.400" />
  </Link>
)

export const Footer = () => (
  <Box as="footer" mt={12} textAlign="center">
    <Text fontSize="sm">Designed & Developed by Segun Adebayo</Text>
    <Stack mt={4} direction="row" spacing="12px" justify="center">
      <FooterLink href="https://github.com/segunadebayo" icon={DiGithubBadge} />
      <FooterLink
        href="https://twitter.com/thesegunadebayo"
        icon={IoLogoTwitter}
      />
      <FooterLink
        href="https://linkedin.com/in/thesegunadebayo/"
        icon={IoLogoLinkedin}
      />
      <FooterLink href="mailto:sage@adebayosegun.com" icon={MdEmail} />
    </Stack>
  </Box>
)
