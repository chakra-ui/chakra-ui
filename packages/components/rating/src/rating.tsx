/**
 * 📝 Notes for Contributors:
 *
 * - When creating an interactive component, we recommend consuming the
 * component hook created.
 *
 * For example, if you wanted to build an accordion component,
 * you'll first create a `useAccordion` hook and then create an `Accordion` component
 *
 * - Ensure this component is properly themable by following [this guide](https://chakra-ui.com/docs/theming/component-style)
 *
 * - Ensure the component is composable and can adapt to multiple use-cases
 *
 * @see Guide https://chakra-ui.com/guides/component-guide
 * @see Theming https://chakra-ui.com/docs/theming/component-style
 */

import * as React from "react"
import { HTMLChakraProps, chakra } from "@chakra-ui/system"
import { useState } from "react"

export interface RatingProps extends HTMLChakraProps<"div"> {
  max: number
}

export function Rating(props: RatingProps) {
  const [value, setValue] = useState(0)
  return (
    <chakra.div>
      {[...Array(props.max)].map((_, i) => (
        <chakra.button
          key={i}
          onClick={() => setValue(i + 1)}
          aria-label={`Rating ${i + 1}`}
          sx={{
            cursor: "pointer",
            padding: 0,
            border: 0,
            background: "transparent",
            outline: 0,
            fontSize: "1rem",
            "&:hover": {
              "& ~ button": {
                color: "gray.500",
              },
            },
            "&:focus": {
              outline: 0,
              boxShadow: "outline",
            },
            "&:active": {
              transform: "scale(0.96)",
            },
            "&:checked": {
              color: "orange.500",
              fontWeight: "bold",
            },
          }}
        >
          <span className="sr-only">{i + 1}</span>
          <span>{value >= i + 1 ? "★" : "☆"}</span>
        </chakra.button>
      ))}
    </chakra.div>
  )
}
