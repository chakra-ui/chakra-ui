import * as React from "react"
import { canUseDOM } from "@chakra-ui/utils"
import { useIsomorphicEffect } from "@chakra-ui/hooks"

interface VisibilityProps {
  breakpoint: string
  hide: boolean
  children: React.ReactNode
}

function Visibility(props: VisibilityProps) {
  const { breakpoint, hide, children } = props

  const [show, setShow] = React.useState(false)

  const mql = React.useRef<MediaQueryList | null>(null)

  const updateVisibility = React.useCallback(() => {
    if (!canUseDOM) return
    const matched = mql.current?.matches ?? false
    setShow(hide ? !matched : matched)
  }, [hide])

  useIsomorphicEffect(() => {
    if (canUseDOM) {
      mql.current = window.matchMedia(breakpoint)
      mql.current.addListener(updateVisibility)
    }

    return () => {
      mql.current?.removeListener(updateVisibility)
    }
  }, [breakpoint, updateVisibility])

  useIsomorphicEffect(() => {
    updateVisibility()
  }, [updateVisibility])

  const rendered = show ? children : null
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
