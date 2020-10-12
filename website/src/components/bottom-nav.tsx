import {
  Stack,
  Box,
  Text,
  Icon,
  useColorModeValue,
  BoxProps,
} from "@chakra-ui/core"
import { IconType } from "react-icons"
import { FiUsers, FiBookOpen, FiFileText } from "react-icons/fi"

import NavLink from "./header-nav-link"

type BottomNavItemProps = BoxProps & {
  href: string
  label: string
  icon: IconType
}

export function BottomNavItem(props: BottomNavItemProps): JSX.Element {
  const { href, label, icon, ...rest } = props
  return (
    <Box {...rest}>
      <NavLink href={href}>
        <Stack
          spacing="0"
          textAlign="center"
          alignItems="center"
          justifyContent="center"
        >
          <Icon boxSize="1.4rem" as={icon} marginBottom="0.2rem" />
          <Text fontSize="0.875rem">{label}</Text>
        </Stack>
      </NavLink>
    </Box>
  )
}

export function BottomNav(): JSX.Element {
  const bg = useColorModeValue("white", "gray.800")
  return (
    <Stack
      bottom="0"
      w="100%"
      zIndex={1000}
      spacing="14px"
      direction="row"
      px="1rem"
      pos="fixed"
      py="0.8rem"
      borderTopWidth="1px"
      bg={bg}
      display={["flex", "flex", "none", "none"]}
    >
      <BottomNavItem
        width="33%"
        href="/docs/getting-started"
        label="Docs"
        icon={FiFileText}
      />
      <BottomNavItem
        width="33%"
        href="/guides"
        label="Guides"
        icon={FiBookOpen}
      />
      <BottomNavItem width="33%" href="/team" label="Team" icon={FiUsers} />
    </Stack>
  )
}
