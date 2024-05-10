"use client"

import { type HTMLChakraProps, chakra } from "../../styled-system"

export interface BoxProps extends HTMLChakraProps<"div"> {}

/**
 * Box is the most abstract component on top of which other chakra
 * components are built. It renders a `div` element by default.
 *
 * @see Docs https://chakra-ui.com/box
 */
export const Box = chakra("div")

Box.displayName = "Box"
