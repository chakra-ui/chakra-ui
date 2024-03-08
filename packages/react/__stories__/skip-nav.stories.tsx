import { SkipNavContent, SkipNavLink } from "../src/components/skip-nav"

export default {
  title: "Components / Skip Nav",
}

export const BasicExample = () => (
  <>
    <SkipNavLink>Skip to Content</SkipNavLink>
    <SkipNavContent />
  </>
)
