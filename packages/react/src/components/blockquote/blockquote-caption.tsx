import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import {
  BlockquoteStylesProvider,
  useBlockquoteStyles,
} from "./blockquote-context"

export interface BlockquoteCaptionProps extends HTMLChakraProps<"figcaption"> {}

export const BlockquoteCaption = forwardRef<
  HTMLElement,
  BlockquoteCaptionProps
>(function BlockquoteCaption(props, ref) {
  const styles = useBlockquoteStyles()

  return (
    <BlockquoteStylesProvider value={styles}>
      <chakra.figcaption
        ref={ref}
        {...props}
        className={cx("chakra-blockquote__caption", props.className)}
        css={styles.caption}
      />
    </BlockquoteStylesProvider>
  )
})

BlockquoteCaption.displayName = "BlockquoteCaption"
