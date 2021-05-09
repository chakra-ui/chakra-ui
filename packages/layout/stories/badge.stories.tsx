import * as React from "react"
import { Badge } from "../src"

export default {
  title: "Badge",
}

export const Basic = () => <Badge>Success</Badge>

export const SolidBadge = () => {
  return (
    <>
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
    </>
  )
}

export const SubtleBadges = () => (
  <>
    {["gray", "green", "red", "orange", "purple", "teal"].map((colorScheme) => (
      <Badge key={colorScheme} colorScheme={colorScheme} mr={2}>
        {colorScheme}
      </Badge>
    ))}
  </>
)

export const OutlineBadges = () => (
  <>
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
  </>
)
