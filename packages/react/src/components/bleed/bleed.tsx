"use client"

import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type SystemStyleObject,
  chakra,
} from "../../styled-system"
import { isCssUnit, isCssVar, mapObject } from "../../utils"

export interface BleedProps extends HTMLChakraProps<"div"> {
  /**
   * The negative margin on the x-axis
   */
  inline?: SystemStyleObject["marginInline"]
  /**
   * The negative margin on the y-axis
   */
  block?: SystemStyleObject["marginBlock"]
  /**
   * The negative margin on the inline-start axis
   */
  inlineStart?: SystemStyleObject["marginInlineStart"]
  /**
   * The negative margin on the inline-end axis
   */
  inlineEnd?: SystemStyleObject["marginInlineEnd"]
  /**
   * The negative margin on the block-start axis
   */
  blockStart?: SystemStyleObject["marginBlockStart"]
  /**
   * The negative margin on the block-end axis
   */
  blockEnd?: SystemStyleObject["marginBlockEnd"]
}

const valueFn = (v: string) =>
  isCssUnit(v) || isCssVar(v) ? v : `token(spacing.${v}, ${v})`

export const Bleed = forwardRef<HTMLDivElement, BleedProps>(
  function Bleed(props, ref) {
    const {
      inline,
      inlineStart,
      inlineEnd,
      block,
      blockStart,
      blockEnd,
      ...rest
    } = props

    return (
      <chakra.div
        ref={ref}
        {...rest}
        css={{
          "--bleed-inline-start": mapObject(inline ?? inlineStart, valueFn),
          "--bleed-inline-end": mapObject(inline ?? inlineEnd, valueFn),
          "--bleed-block-start": mapObject(block ?? blockStart, valueFn),
          "--bleed-block-end": mapObject(block ?? blockEnd, valueFn),
          marginInlineStart: "calc(var(--bleed-inline-start, 0) * -1)",
          marginInlineEnd: "calc(var(--bleed-inline-end, 0) * -1)",
          marginBlockStart: "calc(var(--bleed-block-start, 0) * -1)",
          marginBlockEnd: "calc(var(--bleed-block-end, 0) * -1)",
        }}
      />
    )
  },
)
