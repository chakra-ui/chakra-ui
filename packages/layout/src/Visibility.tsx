import { useMediaQuery } from "@chakra-ui/hooks"
import * as React from "react"
import { useTheme, get } from "@chakra-ui/system"

interface VisibilityProps {
  breakpoint: string
  hide?: boolean
  children: React.ReactNode
}

function Visibility(props: VisibilityProps) {
  const { breakpoint, hide, children } = props
  const [show] = useMediaQuery(breakpoint)
  const isVisible = hide ? !show : show

  const rendered = isVisible ? children : null
  return rendered as React.ReactElement
}

export type HideProps = ShowProps

export const Hide = (props: HideProps) => {
  const { breakpoint = "", children, below, above } = props

  const query = below
    ? `(max-width: ${below})`
    : above
    ? `(min-width: ${above})`
    : breakpoint

  return (
    <Visibility breakpoint={query} hide={true}>
      {children}
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
  const { breakpoint = "", children, below, above } = props

  const query = below
    ? `(max-width: ${below})`
    : above
    ? `(min-width: ${above})`
    : breakpoint

  return <Visibility breakpoint={query}>{children}</Visibility>
}
