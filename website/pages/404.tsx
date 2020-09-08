import React from "react"
import SEO from "components/seo"
import { Chakra } from "components/chakra"

const NotFoundPage = () => (
  <Chakra>
    <SEO title="404: Not found" description="Page not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Chakra>
)

export default NotFoundPage
