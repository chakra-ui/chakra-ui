import { useMediaQuery } from "@chakra-ui/hooks"
import * as React from "react"

interface VisibilityProps {
  breakpoint: string
  hide: boolean
  children: React.ReactNode
}

function Visibility(props: VisibilityProps) {
  const { breakpoint, hide, children } = props
  const [show] = useMediaQuery(breakpoint)
  const isVisible = hide ? !show : show

  const rendered = isVisible ? children : null
  return rendered as React.ReactElement
}

export interface HideAtProps {
  breakpoint: string
  children?: React.ReactNode
}

export const HideAt = ({ breakpoint, children }: HideAtProps) => {
  const value = `(max-width: ${breakpoint})`
  return (
    <Visibility breakpoint={value} hide={true}>
      {children}
    </Visibility>
  )
}

export interface ShowAtProps {
  breakpoint: string
  children?: React.ReactNode
}

export const ShowAt = ({ breakpoint, children }: ShowAtProps) => {
  const value = `(max-width: ${breakpoint})`
  return (
    <Visibility breakpoint={value} hide={false}>
      {children}
    </Visibility>
  )
}

export interface ShowProps {
  query: string
  children: React.ReactNode
}

export const Show = ({ query, children }: ShowProps) => {
  return (
    <Visibility breakpoint={query} hide={false}>
      {children}
    </Visibility>
  )
}

interface HideProps {
  query: string
  children?: React.ReactNode
}

export const Hide = ({ query, children }: HideProps) => {
  return (
    <Visibility breakpoint={query} hide={true}>
      {children}
    </Visibility>
  )
}
