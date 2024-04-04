"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useTagStyles } from "./tag-context"

export interface TagLabelProps extends HTMLChakraProps<"span"> {}

export const TagLabel = forwardRef<HTMLSpanElement, TagLabelProps>(
  function TagLabel(props, ref) {
    const styles = useTagStyles()
    return (
      <chakra.span
        ref={ref}
        {...props}
        css={[styles.label, props.css]}
        className={cx("chakra-tag__label", props.className)}
      />
    )
  },
)

TagLabel.displayName = "TagLabel"
