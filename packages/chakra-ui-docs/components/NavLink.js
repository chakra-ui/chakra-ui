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
    <NextLink {...props}>
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
      color="gray.500"
      _hover={{ color: "inherit" }}
      _notFirstChild={{ mt: 1 }}
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
          {...(isActive && { color: "inherit" })}
          {...props}
        />
      )}
    </NavLink>
  );
});

export const ComponentLink = forwardRef(({ href, ...props }, ref) => {
  const { mode } = useColorMode();
  const hoverColor = { light: "gray.900", dark: "whiteAlpha.900" };

  return (
    <NavLink href={href}>
      {isActive => (
        <SideNavLink
          ref={ref}
          _hover={{ color: hoverColor[mode], transform: "translateX(2px)" }}
          {...(isActive && {
            bg: "teal.50",
            rounded: "sm",
            color: "teal.600",
            _hover: {},
          })}
          {...props}
        />
      )}
    </NavLink>
  );
});
