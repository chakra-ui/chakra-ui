"use client"

import { Heading, Mark, useHighlight } from "@chakra-ui/react"
import { Fragment } from "react"

export const HighlightWithSquiggle = () => {
  const chunks = useHighlight({
    text: "Endless scale, powered by real humans.",
    query: ["endless", "real humans."],
  })

  return (
    <Heading size="2xl" maxW="20ch">
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
          <Fragment key={index}>{chunk.text}</Fragment>
        )
      })}
    </Heading>
  )
}
