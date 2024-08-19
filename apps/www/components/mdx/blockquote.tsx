import {
  type BlockquoteRootProps,
  Blockquote as ChakraBlockquote,
} from "@chakra-ui/react"

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
