import * as React from "react"
import { Badge } from "../src"

export default {
  title: "Badge",
}

/**
 * Badges will use the `subtle` variant and gray color scheme by default.
 *
 * @see `/theme/components/Badge.ts`
 */
export const Basic = () => <Badge>Success</Badge>

/**
 * Badge comes in several color schemes for a give variant
 */
export const SolidBadge = () => {
  return (
    <React.Fragment>
      {["gray", "green", "red", "orange", "purple", "teal"].map((color) => (
        <Badge colorScheme={color} variant="solid" mr={2}>
          {color}
        </Badge>
      ))}
    </React.Fragment>
  )
}

export const SubtleBadges = () => (
  <React.Fragment>
    {["gray", "green", "red", "orange", "purple", "teal"].map((color) => (
      <Badge colorScheme={color} mr={2}>
        {color}
      </Badge>
    ))}
  </React.Fragment>
)

export const OutlineBadges = () => (
  <React.Fragment>
    {["gray", "green", "red", "orange", "purple", "teal"].map((color) => (
      <Badge colorScheme={color} variant="outline" mr={2}>
        {color}
      </Badge>
    ))}
  </React.Fragment>
)
