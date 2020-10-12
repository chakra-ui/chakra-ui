import { SEO } from "components/seo"

const NotFoundPage = (): JSX.Element => (
  <>
    <SEO title="404: Not found" description="Page not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </>
)

// eslint-disable-next-line import/no-default-export
export default NotFoundPage
