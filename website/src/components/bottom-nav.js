import * as React from "react"
import { NavLink } from "./header"
import { Stack, Box, Text, Icon, useColorModeValue } from "@chakra-ui/core"
import { FiUsers, FiBookOpen, FiFileText } from "react-icons/fi"

export function BottomNavItem(props) {
  const { to, label, icon, ...rest } = props
  return (
    <Box {...rest}>
      <NavLink to={to}>
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

const BottomNav = () => {
  const bg = useColorModeValue("white", "gray.800")
  return (
    <Stack
      bottom="0"
      width="100%"
      zIndex={1000}
      spacing="14px"
      direction="row"
      paddingX="1rem"
      position="fixed"
      paddingY="0.8rem"
      borderTopWidth="1px"
      background={bg}
      display={["flex", "flex", "none", "none"]}
    >
      <BottomNavItem
        width="33%"
        to="/docs/getting-started"
        label="Docs"
        icon={FiFileText}
      />
      <BottomNavItem
        width="33%"
        to="/guides"
        label="Guides"
        icon={FiBookOpen}
      />
      <BottomNavItem width="33%" to="/team" label="Team" icon={FiUsers} />
    </Stack>
  )
}

export default BottomNav
