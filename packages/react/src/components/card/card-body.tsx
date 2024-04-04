"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useCardStyles } from "./card-context"

export interface CardBodyProps extends HTMLChakraProps<"div"> {}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  function CardBody(props, ref) {
    const styles = useCardStyles()
    return (
      <chakra.div
        ref={ref}
        {...props}
        className={cx("chakra-card__body", props.className)}
        css={[styles.body, props.css]}
      />
    )
  },
)
