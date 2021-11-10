import * as React from "react"
import { BrowserRouter, Link as ReactRouterLink } from "react-router-dom"
import { Link, LinkOverlay, LinkBox } from "../src"

export default {
  title: "Link",
}

/**
 * Here's a basic link component
 * in Chakra.
 */
export const Default = () => (
  <Link isExternal href="google.com">
    This is a link
  </Link>
)

/**
 * Chakra components supports can infer types
 * from the `as` prop.
 *
 * In this example, we're using Chakra Link with
 * React Router DOM and its types are inferred
 * correctly.
 */
export const WithRoutingLibrary = () => (
  <BrowserRouter>
    <Link as={ReactRouterLink} to="/home" replace>
      Click me
    </Link>
  </BrowserRouter>
)

export const WithLinkOverlay = () => (
  <LinkBox
    borderWidth="1px"
    bg="white"
    p="4"
    rounded="lg"
    as="article"
    _hover={{ shadow: "lg" }}
  >
    <h2>
      <LinkOverlay href="google.com">Some blog post</LinkOverlay>
    </h2>
    <p>
      As a side note, using quotation marks around an attribute value is
      required only if this value is not a valid identifier.
    </p>
  </LinkBox>
)
