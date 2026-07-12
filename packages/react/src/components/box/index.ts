"use client"

import { type HTMLChakraProps, chakra } from "../../styled-system"

/**
 * Props for the Box component
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Box padding="4">Content</Box>
 *
 * // With responsive values
 * <Box padding={["2", "4", "6"]}>Content</Box>
 *
 * // As layout container
 * <Box display="flex" flexDirection="column" gap="4">
 *   <Box>Item 1</Box>
 *   <Box>Item 2</Box>
 * </Box>
 * ```
 */
export interface BoxProps extends HTMLChakraProps<"div"> {}

/**
 * Box is the most abstract component on top of which other Chakra
 * components are built. It renders a `div` element by default.
 *
 * Box provides a convenient way to apply styling props directly
 * to a div element, including responsive styles, color mode values,
 * and pseudo selectors.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Box bg="blue.500" color="white" padding="4">
 *   This is a box
 * </Box>
 *
 * // Responsive styles with array syntax
 * <Box
 *   width={["100%", "50%", "25%"]}
 *   padding={["2", "4", "6"]}
 * >
 *   Responsive box
 * </Box>
 *
 * // Responsive styles with object syntax
 * <Box
 *   width={{ base: "100%", md: "50%", lg: "25%" }}
 *   padding={{ base: "2", md: "4", lg: "6" }}
 * >
 *   Responsive box
 * </Box>
 *
 * // As a flex container
 * <Box display="flex" alignItems="center" gap="4">
 *   <Box>Item 1</Box>
 *   <Box>Item 2</Box>
 * </Box>
 *
 * // With pseudo selectors
 * <Box
 *   _hover={{ bg: "gray.100" }}
 *   _focus={{ outline: "2px solid", outlineColor: "blue.500" }}
 * >
 *   Interactive box
 * </Box>
 *
 * // As different HTML element using asChild
 * <Box asChild>
 *   <article>
 *     <h1>Title</h1>
 *     <p>Content</p>
 *   </article>
 * </Box>
 * ```
 *
 * @see {@link https://chakra-ui.com/docs/components/box Docs}
 */
export const Box = chakra("div")

Box.displayName = "Box"
