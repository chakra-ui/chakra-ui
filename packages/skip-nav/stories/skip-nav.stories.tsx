import * as React from "react"
import { SkipNavContent, SkipNavLink } from "../src"

export default {
  title: "Components / Navigation / Skip Nav",
}

export const BasicExample = () => (
  <>
    <SkipNavLink>Skip to Content</SkipNavLink>
    <SkipNavContent />
  </>
)
