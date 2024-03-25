import { Fragment } from "react"
import { SystemStyleObject } from "../../styled-system"
import { For } from "../for"
import { Mark } from "../typography/mark"
import { Chunk } from "./highlight-words"
import { useHighlight } from "./use-highlight"

export interface HighlightProps {
  query: string | string[]
  children: string | ((props: Chunk[]) => React.ReactNode)
  styles?: SystemStyleObject
}

/**
 * `Highlight` allows you to highlight substrings of a text.
 *
 * @see Docs https://chakra-ui.com/docs/components/highlight
 */
export function Highlight(props: HighlightProps): JSX.Element {
  const { children, query, styles } = props

  if (typeof children !== "string") {
    throw new Error("The children prop of Highlight must be a string")
  }

  const chunks = useHighlight({ query, text: children })

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
