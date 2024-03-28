"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, SystemStyleObject, chakra } from "../../styled-system"
import { useCardStyles } from "./card-context"

export interface CardFooterProps extends HTMLChakraProps<"div"> {
  /**
   * The justify-content CSS property defines the alignment along the main axis.
   */
  justify?: SystemStyleObject["justifyContent"]
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter(props, ref) {
    const { justify, ...rest } = props
    const styles = useCardStyles()
    return (
      <chakra.div
        ref={ref}
        display="flex"
        justifyContent={justify}
        {...rest}
        className={cx("chakra-card__footer", props.className)}
        css={[styles.footer, props.css]}
      />
    )
  },
)
