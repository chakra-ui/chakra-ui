"use client"

import {
  type FocusTrapBaseProps,
  FocusTrap as FocusTrapPrimitive,
} from "@ark-ui/react/focus-trap"
import { type HTMLChakraProps, chakra } from "../../styled-system"

export interface FocusTrapProps
  extends HTMLChakraProps<"div">,
    FocusTrapBaseProps {}

export const FocusTrap = chakra(FocusTrapPrimitive)
