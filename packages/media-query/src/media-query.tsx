import { useMediaQuery } from "./use-media-query"
import * as React from "react"
import { useTheme } from "@chakra-ui/system"
import { Dict, get, __DEV__ } from "@chakra-ui/utils"

interface VisibilityProps {
  breakpoint: string
  hide?: boolean
  children: React.ReactNode
}

/**
 * Visibility
 *
 * React component to control the visibility of it's
 * children based on the current breakpoint
 */
function Visibility(props: VisibilityProps) {
  const { breakpoint, hide, children } = props
  const [show] = useMediaQuery(breakpoint)
  const isVisible = hide ? !show : show

  const rendered = isVisible ? children : null
  return rendered as React.ReactElement
}

export type HideProps = ShowProps

export function Hide(props: HideProps) {
  const query = useQuery(props)
  return (
    <Visibility breakpoint={query} hide={true}>
      {props.children}
    </Visibility>
  )
}

if (__DEV__) {
  Hide.displayName = "Hide"
}

export interface ShowProps {
  breakpoint?: string
  below?: string
  above?: string
  children?: React.ReactNode
}

export function Show(props: ShowProps) {
  const query = useQuery(props)
  return <Visibility breakpoint={query}>{props.children}</Visibility>
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

  const query = bpBelow
    ? `(max-width: ${bpBelow})`
    : bpAbove
    ? `(min-width: ${bpAbove})`
    : breakpoint

  return query
}
