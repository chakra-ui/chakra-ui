"use client"

import { type HighlightChunk, useHighlight } from "@ark-ui/react/highlight"
import { Fragment, type JSX } from "react"
import { type SystemStyleObject } from "../../styled-system"
import { For } from "../for"
import { Mark } from "../typography/mark"

export interface HighlightProps {
  query: string | string[]
  children: string | ((props: HighlightChunk[]) => React.ReactNode)
  styles?: SystemStyleObject
  ignoreCase?: boolean
  matchAll?: boolean
}

/**
 * `Highlight` allows you to highlight substrings of a text.
 *
 * @see Docs https://chakra-ui.com/docs/components/highlight
 */
export function Highlight(props: HighlightProps): JSX.Element {
  const { children, query, ignoreCase, matchAll, styles } = props

  if (typeof children !== "string") {
    throw new Error("The children prop of Highlight must be a string")
  }

  const chunks = useHighlight({
    query,
    text: children,
    matchAll,
    ignoreCase,
  })

  return (
    <For each={chunks}>
      {(chunk, index) => {
        return chunk.match ? (
          <Mark key={index} css={styles}>
            {chunk.text}
          </Mark>
        ) : (
          <Fragment key={index}>{chunk.text}</Fragment>
        )
      }}
    </For>
  )
}
