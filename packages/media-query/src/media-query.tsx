import { useTheme } from "@chakra-ui/system"
import { Dict, memoizedGet as get, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { useMediaQuery } from "./use-media-query"

interface VisibilityProps {
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
const Visibility: React.FC<VisibilityProps> = (props) => {
  const { breakpoint, hide, children } = props
  const [show] = useMediaQuery(breakpoint)
  const isVisible = hide ? !show : show

  const rendered = isVisible ? children : null
  return rendered as React.ReactElement
}

export type HideProps = ShowProps

export const Hide: React.FC<HideProps> = (props) => {
  const { children } = props
  const query = useQuery(props)
  return (
    <Visibility breakpoint={query} hide>
      {children}
    </Visibility>
  )
}

if (__DEV__) {
  Hide.displayName = "Hide"
}

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
  children?: React.ReactNode
}

export const Show: React.FC<ShowProps> = (props) => {
  const { children } = props
  const query = useQuery(props)
  return <Visibility breakpoint={query}>{children}</Visibility>
}

if (__DEV__) {
  Show.displayName = "Show"
}

const getBreakpoint = (theme: Dict, value: any) =>
  get(theme, `breakpoints.${value}`, value)

export interface UseQueryProps {
  breakpoint?: string
  below?: string
  above?: string
}

export function useQuery(props: UseQueryProps) {
  const { breakpoint = "", below, above } = props

  const theme = useTheme()
  const bpBelow = getBreakpoint(theme, below)
  const bpAbove = getBreakpoint(theme, above)

  let query = breakpoint

  if (bpBelow) {
    query = `(max-width: ${bpBelow})`
  } else if (bpAbove) {
    query = `(min-width: ${bpAbove})`
  }

  return query
}
