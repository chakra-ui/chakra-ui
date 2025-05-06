import {
  type BlockquoteRootProps,
  Blockquote as ChakraBlockquote,
} from "@sh3yk0-ui/react"

export const Blockquote = (props: BlockquoteRootProps) => {
  return (
    <ChakraBlockquote.Root
      {...props}
      css={{
        marginTop: "1.285em",
        marginBottom: "1.285em",
      }}
    />
  )
}
