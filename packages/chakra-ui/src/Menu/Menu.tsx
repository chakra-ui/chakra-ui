/** @jsx jsx */
import { jsx } from "@emotion/core";
import {
  useId,
  usePrevious,
  useForkRef,
  useCreateContext,
} from "@chakra-ui/hooks";
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box, Text } from "@chakra-ui/layout";
import { useColorMode } from "@chakra-ui/theme";
import { getAllFocusables, composeEventHandlers } from "@chakra-ui/utils";
import { useMenuItemStyle, useMenuListStyle } from "./styles";

const [useMenuContext, MenuContextProvider] = useCreateContext();

///////////////////////////////////////////////////////////

function Menu({
  children,
  isOpen: isOpenProp,
  defaultIsOpen,
  onOpen,
  onClose,
  autoSelect = true,
  closeOnBlur = true,
  closeOnSelect = true,
  defaultActiveIndex,
  placement,
}) {}
