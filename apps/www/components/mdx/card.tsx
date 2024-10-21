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
import { LuChevronRight, LuInfo, LuTerminal } from "react-icons/lu"
import {
  GatsbyIcon,
  NextJsIcon,
  RemixIcon,
  StackblitzIcon,
  ViteIcon,
} from "../framework-icon"

export const CardGroup = (props: SimpleGridProps) => {
  return <SimpleGrid gap="6" mt="6" mb="10" minChildWidth="240px" {...props} />
}

const CardTitleIcon = (props: IconProps) => {
  return (
    <Icon
      opacity="0"
      translate="-4px 0"
      transition="opacity 0.2s, translate 0.2s"
      _groupHover={{ opacity: "1", translate: "0" }}
      _groupFocus={{ opacity: "1", translate: "0" }}
      {...props}
      asChild
    />
  )
}

const iconMap = {
  info: <LuInfo />,
  terminal: <LuTerminal />,
  nextjs: <NextJsIcon />,
  remix: <RemixIcon />,
  vite: <ViteIcon />,
  gatsby: <GatsbyIcon />,
  stackblitz: <StackblitzIcon />,
}

interface CardProps {
  href: LinkProps["href"]
  icon?: keyof typeof iconMap | React.ReactNode
  title: string
  children: React.ReactNode
}

export const Card = (props: CardProps) => {
  const { icon: iconProp, title, children, href } = props

  const icon =
    typeof iconProp === "string"
      ? iconMap[iconProp as keyof typeof iconMap]
      : iconProp

  return (
    <Box
      asChild
      padding="6"
      borderWidth="1px"
      rounded="lg"
      focusRing="outside"
      _hover={{ bg: "bg.muted" }}
    >
      <Link href={href} className="group">
        {icon && (
          <Box mb="4" fontSize="3xl" boxSize="1em" asChild>
            {icon}
          </Box>
        )}
        <Stack gap="1">
          <HStack fontWeight="semibold" gap="1" color="fg">
            {title}
            <CardTitleIcon>
              <LuChevronRight />
            </CardTitleIcon>
          </HStack>
          <Box color="fg.muted" textStyle="sm">
            {children}
          </Box>
        </Stack>
      </Link>
    </Box>
  )
}
