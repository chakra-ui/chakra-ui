import React from "react";
import { Drawer, DrawerBody } from "@chakra-ui/core";
import NavigationBox from "./NavigationBox";

export default function NavigationDrawer({ isOpen, onClose }) {
  return (
    <Drawer
      size="xs"
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
    >
      <DrawerBody p={0}>
        <NavigationBox />
      </DrawerBody>
    </Drawer>
  );
}
