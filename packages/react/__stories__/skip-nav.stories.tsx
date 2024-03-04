import { SkipNavContent, SkipNavLink } from "../src/components/skip-nav"

export default {
  title: "Navigation / Skip Nav",
}

export const BasicExample = () => (
  <>
    <SkipNavLink>Skip to Content</SkipNavLink>
    <SkipNavContent />
  </>
)
