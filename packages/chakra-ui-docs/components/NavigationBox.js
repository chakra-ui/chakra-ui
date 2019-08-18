import React from "react";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  List,
  useColorMode,
} from "@chakra-ui/core";
import NavLink from "./NavLink";
import completedComponents from "./components";

const stringToUrl = (str, path = "/") => {
  return `${path}${str
    .toLowerCase()
    .split(" ")
    .join("-")}`;
};

const NavLinks = ({ links, path, ...props }) => {
  return (
    <List {...props}>
      {links.map(link => (
        <NavLink
          px={6}
          key={link.label}
          py={1}
          as="a"
          href={stringToUrl(link, path)}
          passHref
          display="block"
          textDecoration="none"
          fontSize="sm"
          transition="all 0.2s"
          _hover={{ bg: "gray.100" }}
        >
          {link}
        </NavLink>
      ))}
    </List>
  );
};

const topLinks = [
  "Installation",
  "Theming",
  "Responsive design",
  "Pseudo styles",
];

const NavGroupHeading = props => (
  <Heading
    fontSize="xs"
    px={6}
    color="gray.500"
    letterSpacing="wide"
    mb={2}
    textTransform="uppercase"
    {...props}
  />
);

export default function NavigationBox() {
  const { toggle } = useColorMode();
  return (
    <Box
      position={["relative", "fixed"]}
      width={["full", "260px"]}
      height="100vh"
      borderRightWidth="1px"
    >
      <Flex
        px={6}
        mb="16px"
        zIndex={10}
        minHeight="60px"
        position="fixed"
        alignItems="center"
        borderBottomWidth="1px"
        width={["full", "260px"]}
        justifyContent="space-between"
      >
        <Heading>Chakra UI</Heading>
        <IconButton
          variant="ghost"
          onClick={toggle}
          aria-label="Change theme"
          icon="sun"
        />
      </Flex>

      <Box pt="76px" height="100vh" overflowY="auto">
        <Box pb="16px" mb="16px">
          <NavGroupHeading>Getting started</NavGroupHeading>
          <NavLinks links={topLinks} />
        </Box>

        <Box pb="16px" mb="16px">
          <NavGroupHeading>Components</NavGroupHeading>
          <NavLinks links={completedComponents} />
        </Box>
      </Box>
    </Box>
  );
}
