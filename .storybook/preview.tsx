import { Parameters } from "@storybook/react"
import * as React from "react"

const withChakra = (StoryFn: Function) => {
  return (
    <React.StrictMode>
      <div id="story-wrapper" style={{ minHeight: "100vh" }}>
        <StoryFn />
      </div>
    </React.StrictMode>
  )
}

export const parameters: Parameters = {
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
}

export const decorators = [withChakra]
