import * as React from "react"
import { Link } from "../src"
import { BrowserRouter, Link as ReactRouterLink } from "react-router-dom"

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
 * React Router DOM and it's types are inferred
 * correctly.
 */
export const WithRoutingLibrary = () => (
  <BrowserRouter>
    <Link as={ReactRouterLink} to="/home" replace>
      Click me
    </Link>
  </BrowserRouter>
)
