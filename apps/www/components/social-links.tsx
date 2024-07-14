import { HStack, IconButton } from "@chakra-ui/react"
import Link from "next/link"
import { BsDiscord, BsGithub, BsTwitterX } from "react-icons/bs"

interface SocialLink {
  type: "x" | "github" | "discord"
  href: string
}

interface SocialLinksProps {
  items: SocialLink[]
}

const iconMap = {
  x: <BsTwitterX />,
  github: <BsGithub />,
  discord: <BsDiscord />,
}

export const SocialLinks = (props: SocialLinksProps) => {
  const { items } = props
  return (
    <HStack gap="1">
      {items.map((item, index) => (
        <IconButton
          size="sm"
          variant="ghost"
          asChild
          key={index}
          aria-label={`${item.type} link`}
        >
          <Link href={item.href} target="_blank" rel="noopener noreferrer">
            {iconMap[item.type]}
          </Link>
        </IconButton>
      ))}
    </HStack>
  )
}
