import * as React from "react"
import Spinner from "./Spinner"

export default {
  title: "Spinner",
}

export const Default = () => (
  <div>
    {["xl", "lg", "md", "sm", "xs"].map(size => (
      <Spinner key={size} margin={3} color="red.500" variantSize={size} />
    ))}
  </div>
)
