import {
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
  useStyleConfig,
} from "@chakra-ui/system"
import React, { Fragment, useMemo } from "react"
import { Box } from "./box"

type Chunk = {
  text: string
  match: boolean
}

type Options = {
  text: string
  query: string | string[]
}

const escapeRegexp = (term: string): string =>
  term.replace(/[|\\{}()[\]^$+*?.-]/g, (char: string) => `\\${char}`)

function buildRegex(query: string[]) {
  const _query = query
    .filter((text) => text.length !== 0)
    .map((text) => escapeRegexp(text.trim()))
  if (!_query.length) {
    return null
  }

  return new RegExp(`(${_query.join("|")})`, "ig")
}

function highlightWords({ text, query }: Options): Chunk[] {
  const regex = buildRegex(Array.isArray(query) ? query : [query])
  if (!regex) {
    return []
  }
  const result = text.split(regex).filter(Boolean)
  return result.map((str) => ({ text: str, match: regex.test(str) }))
}

export function useHighlight(props: Options) {
  const { text, query } = props
  return useMemo(() => highlightWords({ text, query }), [text, query])
}

export type HighlightProps = {
  query: string | string[]
  children: string | ((props: Chunk[]) => React.ReactNode)
  styles?: SystemStyleObject
}

export type MarkProps = ThemingProps<"Mark"> & HTMLChakraProps<"mark">

export const Mark = forwardRef<MarkProps, "mark">((props, ref) => {
  const styles = useStyleConfig("Mark", props)
  const ownProps = omitThemingProps(props)
  return (
    <Box
      ref={ref}
      {...ownProps}
      as="mark"
      __css={{ bg: "transparent", whiteSpace: "nowrap", ...styles }}
    />
  )
})

export function Highlight(props: HighlightProps): JSX.Element {
  const { children, query, styles } = props

  if (typeof children !== "string") {
    throw new Error("The children prop of Highlight must be a string")
  }

  const chunks = useHighlight({ query, text: children })

  return (
    <>
      {chunks.map((chunk, index) => {
        return chunk.match ? (
          <Mark key={index} sx={styles}>
            {chunk.text}
          </Mark>
        ) : (
          <Fragment key={index}>{chunk.text}</Fragment>
        )
      })}
    </>
  )
}
