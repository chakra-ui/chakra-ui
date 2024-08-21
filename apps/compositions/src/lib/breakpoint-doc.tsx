"use client"

import { Box, HStack, Stack, Text, defaultSystem } from "@chakra-ui/react"
import { TokenDoc } from "./token-doc"

const { _config: config } = defaultSystem

const breakpoints = config.theme?.breakpoints || {}
const allBreakpoints = Object.entries(breakpoints)
  .sort((a, b) => parseFloat(a[1]) - parseFloat(b[1]))
  .map(([key]) => key)

export const BreakpointDoc = () => {
  return (
    <TokenDoc title="theme.breakpoints" mt="8">
      <Stack gap="8">
        {allBreakpoints.map((key, index) => {
          const width = (index + 1) * 2
          return (
            <HStack key={key}>
              <Box minWidth="200px">
                <Box
                  rounded="sm"
                  height="12"
                  borderInlineWidth="4px"
                  borderTopWidth="4px"
                  borderBottomWidth="12px"
                  width={`${width}rem`}
                />
              </Box>
              <Box minWidth="80px">
                <Text py="2" fontWeight="medium">
                  {key}
                </Text>
              </Box>
              <Text py="2" opacity="0.6">
                {`@media screen (min-width >= ${breakpoints[key]})`}
              </Text>
            </HStack>
          )
        })}
      </Stack>
    </TokenDoc>
  )
}
