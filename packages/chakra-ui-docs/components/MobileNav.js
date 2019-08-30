import { Drawer, DrawerBody, IconButton, useDisclosure } from "@chakra-ui/core";
import React, { useEffect } from "react";
import { MdDehaze } from "react-icons/md";
import { SideNavContent } from "./SideNav";
import { useRouter } from "next/router";

const useRouteChanged = callback => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = url => {
      callback();
      console.log("App is changing to: ", url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, callback]);
};

const MobileNav = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  useRouteChanged(onClose);

  return (
    <>
      <IconButton
        display={{ sm: "inline-flex", md: "none" }}
        aria-label="Navigation Menu"
        fontSize="20px"
        variant="ghost"
        icon={MdDehaze}
        onClick={onToggle}
      />
      <Drawer
        size="xs"
        isOpen={isOpen}
        placement="left"
        zIndex={6}
        onClose={onClose}
      >
        <DrawerBody p={0}>
          <SideNavContent contentHeight="100vh" top="0" />
        </DrawerBody>
      </Drawer>
    </>
  );
};

export default MobileNav;
