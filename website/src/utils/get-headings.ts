import * as React from "react"

export interface Heading {
  text: string
  id: string
}

export function getHeadings(children: React.ReactNode): Heading[] {
  return React.Children.toArray(children)
    .filter(
      (child) => React.isValidElement(child) && child.props?.mdxType === "h2",
    )
    .map((heading) => {
      if (React.isValidElement(heading)) {
        return {
          id: heading.props?.id,
          text: heading.props?.children,
        }
      }
    })
}
