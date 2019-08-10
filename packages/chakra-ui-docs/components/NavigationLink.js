import { PseudoBox } from "@chakra-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const ActiveLink = ({ children, ...props }) => {
  const router = useRouter();
  let isActive = false;

  if (router.pathname === props.href) {
    isActive = true;
  }

  return <Link {...props}>{children(isActive)}</Link>;
};

export default function NavigationLink({ href, children, passHref, ...props }) {
  return (
    <ActiveLink href={href} passHref={passHref}>
      {isActive => {
        let color = isActive ? "gray.600" : "gray.800";
        let bg = isActive ? "gray.200" : "";
        return (
          <PseudoBox {...{ bg, color, ...props }} cursor="pointer">
            {children}
          </PseudoBox>
        );
      }}
    </ActiveLink>
  );
}
