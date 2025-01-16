import { SystemStyleObject } from "@chakra-ui/styled-system"
import { Fragment, type JSX } from "react"
import { Chunk } from "./highlight-words"
import { Mark } from "./mark"
import { useHighlight } from "./use-highlight"

export interface HighlightProps {
  query: string | string[]
  children: string | ((props: Chunk[]) => React.ReactNode)
  styles?: SystemStyleObject
}

/**
 * `Highlight` allows you to highlight substrings of a text.
 *
 * @see Docs https://v2.chakra-ui.com/docs/components/highlight
 */
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
