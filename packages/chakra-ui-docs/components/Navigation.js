import React, { useState, useEffect } from "react";
import NavigationBox from "./NavigationBox";
import NavigationDrawer from "./NavigationDrawer";
import { useTheme } from "@chakra-ui/core";

export default function Navigation({ isDrawerOpen, onDrawerClose }) {
  const [isMobile, setIsMobile] = useState(null);
  const theme = useTheme();
  
  useEffect(() => {
    let mobile = window.matchMedia(`(max-width: ${theme.breakpoints[0]})`)
      .matches;
    setIsMobile(mobile);
  }, []);

  return isMobile ? (
    <NavigationDrawer isOpen={isDrawerOpen} onClose={onDrawerClose} />
  ) : (
    <NavigationBox />
  );
}
