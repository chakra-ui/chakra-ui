import { Box, PseudoBox, useColorMode } from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { cloneElement, forwardRef } from "react";

const NavLink = ({ children, ...props }) => {
  const router = useRouter();
  let isActive = false;

  if (router.pathname === props.href) {
    isActive = true;
  }

  return (
    <NextLink passHref {...props}>
      {typeof children === "function" ? children(isActive) : children}
    </NextLink>
  );
};

export const stringToUrl = (str, path = "/") => {
  return `${path}${str
    .toLowerCase()
    .split(" ")
    .join("-")}`;
};

export const SideNavLink = forwardRef(({ children, icon, ...props }, ref) => {
  const { colorMode } = useColorMode();
  const color = { light: "gray.700", dark: "whiteAlpha.700" };
  return (
    <PseudoBox
      ref={ref}
      as="a"
      mx={-2}
      display="flex"
      cursor="pointer"
      align="center"
      px="2"
      py="1"
      transition="all 0.2s"
      fontWeight="medium"
      outline="none"
      _focus={{ shadow: "outline" }}
      color={color[colorMode]}
      _notFirst={{ mt: 1 }}
      {...props}
    >
      {icon && cloneElement(icon, { mr: 3 })}
      <Box>{children}</Box>
    </PseudoBox>
  );
});

export const TopNavLink = forwardRef(({ href, ...props }, ref) => {
  return (
    <NavLink href={href}>
      {isActive => (
        <SideNavLink
          ref={ref}
          aria-current={isActive ? "page" : undefined}
          _hover={{ color: !isActive ? "inherit" : null }}
          {...(isActive && { color: "teal.500", fontWeight: "semibold" })}
          {...props}
        />
      )}
    </NavLink>
  );
});

export const ComponentLink = forwardRef(({ href, ...props }, ref) => {
  const { colorMode } = useColorMode();
  const hoverColor = { light: "gray.900", dark: "whiteAlpha.900" };
  const activeColor = { light: "teal.800", dark: "teal.200" };
  const activeBg = { light: "teal.50", dark: "#308c7a4d" };

  return (
    <NavLink href={href}>
      {isActive => (
        <SideNavLink
          ref={ref}
          aria-current={isActive ? "page" : undefined}
          _hover={{
            color: hoverColor[colorMode],
            transform: "translateX(2px)",
          }}
          {...(isActive && {
            bg: activeBg[colorMode],
            rounded: "sm",
            color: activeColor[colorMode],
            _hover: {},
          })}
          {...props}
        />
      )}
    </NavLink>
  );
});
