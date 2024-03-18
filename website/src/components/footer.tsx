import {
  Icon,
  Link,
  Stack,
  StackProps,
  Text,
  VStack,
  chakra,
} from '@chakra-ui/react'
import React from 'react'
import { DiGithubBadge } from 'react-icons/di'
import { FaYoutube } from 'react-icons/fa'
import { IoLogoLinkedin, IoLogoTwitter } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import { VercelCallout } from './vercel-callout'

type FooterLinkProps = {
  icon?: React.ElementType
  href?: string
  label?: string
}

const FooterLink = ({ icon, href, label }: FooterLinkProps) => (
  <Link display='inline-block' href={href} aria-label={label} external>
    <Icon as={icon} fontSize='xl' color='gray.400' />
  </Link>
)

const links = [
  {
    icon: DiGithubBadge,
    label: 'GitHub',
    href: 'https://github.com/segunadebayo',
  },
  {
    icon: IoLogoTwitter,
    label: 'Twitter',
    href: 'https://twitter.com/thesegunadebayo',
  },
  {
    icon: IoLogoLinkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/thesegunadebayo/',
  },
  {
    icon: MdEmail,
    label: 'Email',
    href: 'mailto:sage@adebayosegun.com',
  },
  {
    icon: FaYoutube,
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UC4TmDovH46TB4S0SM0Y4CIg',
  },
]

const NigeriaFlag = (props) => (
  <chakra.svg
    display='inline-block'
    mx='3'
    h='16px'
    w='auto'
    viewBox='0 0 48 48'
    verticalAlign='middle'
    {...props}
  >
    <title>Nigeria</title>
    <g>
      <rect x='16' y='6' fill='#E6E6E6' width='16' height='36'></rect>{' '}
      <path
        fill='#078754'
        d='M48,40c0,1.105-0.895,2-2,2H32V6h14c1.105,0,2,0.895,2,2V40z'
      />
      <path
        fill='#078754'
        d='M16,42H2c-1.105,0-2-0.895-2-2V8c0-1.105,0.895-2,2-2h14V42z'
      />
    </g>
  </chakra.svg>
)

export const Footer = (props: StackProps) => (
  <VStack as='footer' gap={4} mt={12} textAlign='center' {...props}>
    <Text fontSize='sm'>
      <span>
        Proudly made in
        <NigeriaFlag />
      </span>
      <span>by Segun Adebayo</span>
    </Text>
    <Stack mt={4} direction='row' gap='12px' justify='center'>
      {links.map((link) => (
        <FooterLink key={link.href} {...link} />
      ))}
    </Stack>
    <VercelCallout />
  </VStack>
)

export default Footer
