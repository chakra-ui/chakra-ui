import * as React from "react"
import { SkipNavContent, SkipNavLink } from "."

export default {
  title: "Skip Nav",
}

export const BasicExample = () => (
  <>
    <SkipNavLink>Skip to Content</SkipNavLink>
    <SkipNavContent />
  </>
)
