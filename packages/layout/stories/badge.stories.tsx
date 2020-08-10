import * as React from "react"
import { Badge } from "../src"

export default {
  title: "Badge",
}

export const Basic = () => <Badge>Success</Badge>

export const SolidBadge = () => {
  return (
    <React.Fragment>
      {["gray", "green", "red", "orange", "purple", "teal"].map(
        (colorScheme) => (
          <Badge
            key={colorScheme}
            colorScheme={colorScheme}
            variant="solid"
            mr={2}
          >
            {colorScheme}
          </Badge>
        ),
      )}
    </React.Fragment>
  )
}

export const SubtleBadges = () => (
  <React.Fragment>
    {["gray", "green", "red", "orange", "purple", "teal"].map((colorScheme) => (
      <Badge key={colorScheme} colorScheme={colorScheme} mr={2}>
        {colorScheme}
      </Badge>
    ))}
  </React.Fragment>
)

export const OutlineBadges = () => (
  <React.Fragment>
    {["gray", "green", "red", "orange", "purple", "teal"].map((colorScheme) => (
      <Badge
        key={colorScheme}
        colorScheme={colorScheme}
        variant="outline"
        mr={2}
      >
        {colorScheme}
      </Badge>
    ))}
  </React.Fragment>
)
