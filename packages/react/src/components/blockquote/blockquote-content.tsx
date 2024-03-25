import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import {
  BlockquoteStylesProvider,
  useBlockquoteStyles,
} from "./blockquote-context"

export interface BlockquoteContentProps extends HTMLChakraProps<"blockquote"> {}

export const BlockquoteContent = forwardRef<
  HTMLElement,
  BlockquoteContentProps
>(function BlockquoteContent(props, ref) {
  const styles = useBlockquoteStyles()

  return (
    <BlockquoteStylesProvider value={styles}>
      <chakra.blockquote
        ref={ref}
        {...props}
        className={cx("chakra-blockquote__content", props.className)}
        css={styles.content}
      />
    </BlockquoteStylesProvider>
  )
})

BlockquoteContent.displayName = "BlockquoteContent"
