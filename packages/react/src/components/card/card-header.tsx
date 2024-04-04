"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useCardStyles } from "./card-context"

export interface CardHeaderProps extends HTMLChakraProps<"div"> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader(props, ref) {
    const styles = useCardStyles()
    return (
      <chakra.div
        ref={ref}
        {...props}
        className={cx("chakra-card__header", props.className)}
        css={[styles.header, props.css]}
      />
    )
  },
)
