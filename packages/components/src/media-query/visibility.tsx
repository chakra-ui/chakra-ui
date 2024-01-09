import { useMediaQuery } from "./use-media-query"

interface VisibilityProps {
  ssr?: boolean
  breakpoint: string
  hide?: boolean
  children: React.ReactNode
}

/**
 * Visibility
 *
 * React component to control the visibility of its
 * children based on the current breakpoint
 */
export function Visibility(props: VisibilityProps) {
  const { breakpoint, hide, children, ssr } = props
  const [show] = useMediaQuery(breakpoint, { ssr })
  const isVisible = hide ? !show : show

  const rendered = isVisible ? children : null
  return rendered as React.ReactElement
}
