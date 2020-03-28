import { useMediaQuery } from "@chakra-ui/hooks"
import React from "react"
import { useTheme } from "@chakra-ui/system"
import { Dict, get } from "@chakra-ui/utils"

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

 * @see Docs https://chakra-ui.com/visibility
 */
function Visibility(props: VisibilityProps) {
  const { breakpoint, hide, children } = props
  const [show] = useMediaQuery(breakpoint)
  const isVisible = hide ? !show : show

  const rendered = isVisible ? children : null
  return rendered as React.ReactElement
}

export type HideProps = ShowProps

export const Hide = (props: HideProps) => {
  const query = useQuery(props)
  return (
    <Visibility breakpoint={query} hide={true}>
      {props.children}
    </Visibility>
  )
}

export interface ShowProps {
  breakpoint?: string
  below?: string
  above?: string
  children?: React.ReactNode
}

export const Show = (props: ShowProps) => {
  const query = useQuery(props)
  return <Visibility breakpoint={query}>{props.children}</Visibility>
}

const getBreakpoint = (theme: Dict, value: any) =>
  get(theme, `breakpoints.${value}`, value)

export const useQuery = (props: any) => {
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
