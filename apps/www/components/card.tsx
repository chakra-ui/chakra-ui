import {
  Box,
  HStack,
  Icon,
  IconProps,
  SimpleGrid,
  SimpleGridProps,
  Stack,
} from "@chakra-ui/react"
import Link, { LinkProps } from "next/link"
import { LuChevronRight } from "react-icons/lu"

export const CardGroup = (props: SimpleGridProps) => {
  return <SimpleGrid gap="6" columns={{ base: 1, md: 2 }} {...props} />
}

const CardTitleIcon = (props: IconProps) => {
  return (
    <Icon
      opacity="0"
      translate="-4px 0"
      transition="opacity 0.2s, translate 0.2s"
      _groupHover={{ opacity: "1", translate: "0" }}
      {...props}
      asChild
    />
  )
}

interface CardProps {
  href: LinkProps["href"]
  icon?: React.ReactNode
  title: string
  children: React.ReactNode
}

export const Card = (props: CardProps) => {
  const { icon, title, children, href } = props
  return (
    <Box
      asChild
      padding="6"
      className="group"
      borderWidth="1px"
      rounded="lg"
      focusRing="extend"
    >
      <Link href={href}>
        <Box mb="4" fontSize="xl">
          {icon}
        </Box>
        <Stack>
          <HStack fontWeight="semibold">
            {title}
            <CardTitleIcon>
              <LuChevronRight />
            </CardTitleIcon>
          </HStack>
          <Box color="fg.muted">{children}</Box>
        </Stack>
      </Link>
    </Box>
  )
}
