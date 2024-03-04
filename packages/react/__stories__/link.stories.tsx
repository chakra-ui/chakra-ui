import { BrowserRouter, Link as ReactRouterLink } from "react-router-dom"
import { Link, LinkBox, LinkOverlay } from "../src"

export default {
  title: "Navigation / Link",
}

export const Basic = () => <Link href="https://google.com">This is a link</Link>

export const WithExternal = () => (
  <Link isExternal href="https://google.com">
    This is a link
  </Link>
)

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
