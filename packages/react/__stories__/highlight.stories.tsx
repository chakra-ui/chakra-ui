import type { Meta } from "@storybook/react"
import * as React from "react"
import { Box, Heading, Highlight, Mark, Text, useHighlight } from "../src"

export default {
  title: "Typography / Highlight",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export const WithSymbol = () => (
  <Text fontWeight="semibold">
    <Highlight
      query={["$48 per year ($4 per month)", "$5 per month", "free"]}
      styles={{ px: "2", py: "1", rounded: "full", bg: "teal.100" }}
    >
      Cleanup.Picture is free unless you need better quality and process
      hi-resolution images. The price is then $5 per month or $48 per year ($4
      per month) for processing images of any size.
    </Highlight>
  </Text>
)

export const WithHook = () => {
  const chunks = useHighlight({
    text: "Remove any unwanted object, defect, people or text from your pictures in seconds",
    query: ["object", "defect", "people", "in seconds"],
  })

  return (
    <Heading>
      {chunks.map(({ match, text }, index) => {
        if (!match) return text
        return text === "in seconds" ? (
          <Box key={index} as="u" fontFamily="NewYork">
            {text}
          </Box>
        ) : (
          <Mark
            key={index}
            bg="teal.200"
            rounded="full"
            fontFamily="NewYork"
            px="2"
            py="1"
          >
            {text}
          </Mark>
        )
      })}
    </Heading>
  )
}

export const MarketingExample = () => {
  const chunks = useHighlight({
    text: "Endless scale, powered by real humans.",
    query: ["endless", "real humans."],
  })
  return (
    <Heading
      size="2xl"
      textAlign="center"
      pt="20"
      maxW="20ch"
      mx="auto"
      fontWeight="extrabold"
    >
      {chunks.map((chunk, index) => {
        return chunk.match ? (
          <Mark
            key={index}
            css={{
              fontStyle: "italic",
              color: "red.500",
              position: "relative",
            }}
          >
            {chunk.text}
            <img
              style={{ position: "absolute", left: 0 }}
              src="https://uploads-ssl.webflow.com/5fac11c3554384e2baf6481c/61c4dc7572d22f05ba26fd34_hero-underline.svg"
              loading="lazy"
              alt=""
            />
          </Mark>
        ) : (
          <React.Fragment key={index}>{chunk.text}</React.Fragment>
        )
      })}
    </Heading>
  )
}
