import { PseudoBox } from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Link = ({ children, ...props }) => {
  const router = useRouter();
  let isActive = false;

  if (router.pathname === props.href) {
    isActive = true;
  }

  return <NextLink {...props}>{children(isActive)}</NextLink>;
};

function NavLink({ href, passHref, ...props }) {
  return (
    <Link href={href} passHref={passHref}>
      {isActive => {
        let color = isActive ? "blue.600" : "gray.600";
        let bg = isActive ? "blue.50" : undefined;
        return (
          <PseudoBox
            fontWeight="medium"
            bg={bg}
            color={color}
            cursor="pointer"
            {...props}
          />
        );
      }}
    </Link>
  );
}

export default NavLink;
