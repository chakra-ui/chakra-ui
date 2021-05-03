import * as React from "react"

export interface Heading {
  text: string
  id: string
}

export function getHeadings(children: React.ReactNode): Heading[] {
  return children
    .filter((child) => child.props?.mdxType === "h2")
    .map((heading) => {
      return {
        id: heading.props?.id,
        text: heading.props?.children,
      }
    })
}
