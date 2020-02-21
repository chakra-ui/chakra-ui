import React from "react"
import Badge from "../Badge"

export default {
  title: "Badge",
}

export const Basic = () => <Badge variantColor="green">Success</Badge>

export const SolidBadge = () => {
  return (
    <React.Fragment>
      {["gray", "green", "red", "orange", "purple", "teal"].map(color => (
        <Badge variantColor={color} variant="solid" mr={2}>
          {color}
        </Badge>
      ))}
    </React.Fragment>
  )
}

export const SubtleBadges = () => (
  <React.Fragment>
    {["gray", "green", "red", "orange", "purple", "teal"].map(color => (
      <Badge variantColor={color} mr={2}>
        {color}
      </Badge>
    ))}
  </React.Fragment>
)

export const OutlineBadges = () => (
  <React.Fragment>
    {["gray", "green", "red", "orange", "purple", "teal"].map(color => (
      <Badge variantColor={color} variant="outline" mr={2}>
        {color}
      </Badge>
    ))}
  </React.Fragment>
)
