import * as React from "react"

export interface Heading {
  level: "h2" | "h3"
  text: string
  id: string
}

function isHeading(child: React.ReactElement) {
  if (child.props?.mdxType) {
    return new Set(["h2", "h3"]).has(child.props.mdxType)
  }
  return false
}

export function getHeadings(children: React.ReactNode): Heading[] {
  return React.Children.toArray(children)
    .filter((child) => React.isValidElement(child) && isHeading(child))
    .map((heading) => {
      if (React.isValidElement(heading)) {
        return {
          level: heading.props?.mdxType,
          id: heading.props?.id,
          text: heading.props?.children,
        }
      }
      return undefined
    })
    .filter(Boolean)
}
