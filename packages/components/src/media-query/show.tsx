import { useQuery } from "./media-query"
import { Visibility } from "./visibility"

export interface ShowProps {
  /**
   * A custom css media query that determines when the `children` are rendered.
   * Will render `children` if that query resolves to `true`.
   */
  breakpoint?: string
  /**
   * A value from the `breakpoints` section in the theme. Will render `children`
   * from that breakpoint and below. Default breakpoint values: `sm`, `md`, `lg`, `xl`, `2xl`.
   */
  below?: string
  /**
   * A value from the `breakpoints` section in the theme. Will render `children`
   * from that breakpoint and above. Default breakpoint values: `sm`, `md`, `lg`, `xl`, `2xl`.
   */
  above?: string
  ssr?: boolean
  children?: React.ReactNode
}

/**
 * `Show` wraps a component to render if the provided media query matches.
 *
 * @see Docs https://chakra-ui.com/docs/components/show-hide
 */
export function Show(props: ShowProps) {
  const { children, ssr } = props
  const query = useQuery(props)
  return (
    <Visibility breakpoint={query} ssr={ssr}>
      {children}
    </Visibility>
  )
}

Show.displayName = "Show"
