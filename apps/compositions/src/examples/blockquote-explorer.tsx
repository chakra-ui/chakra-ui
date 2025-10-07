"use client"

import { Blockquote } from "@chakra-ui/react"
import { Box, Flex } from "@chakra-ui/react"
import { RiQuoteText } from "react-icons/ri"

export const BlockquoteExplorer = () => {
  return (
    <Box maxW="400px" p="4">
      <Blockquote.Root pl="4" py="2">
        <Flex align="flex-start" gap="2">
          <Blockquote.Icon>
            <RiQuoteText size={20} />
          </Blockquote.Icon>

          <Box flex="1">
            <Blockquote.Content>
              If anyone thinks he is something when he is nothing, he deceives
              himself. Each one should test his own actions. Then he can take
              pride in himself, without comparing himself to anyone else.
            </Blockquote.Content>

            <Flex mt="2" align="center" gap="2">
              <Blockquote.Caption>— Marcus Aurelius</Blockquote.Caption>
            </Flex>
          </Box>
        </Flex>
      </Blockquote.Root>
    </Box>
  )
}
