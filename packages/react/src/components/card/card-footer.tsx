import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemStyleObject,
  chakra,
  forwardRef,
} from "../../styled-system"
import { useCardStyles } from "./card-context"

export interface CardFooterProps extends HTMLChakraProps<"div"> {
  justify?: SystemStyleObject["justifyContent"]
}

export const CardFooter = forwardRef<CardFooterProps, "div">(
  function CardFooter(props, ref) {
    const { className, justify, ...rest } = props
    const styles = useCardStyles()
    return (
      <chakra.div
        ref={ref}
        className={cx("chakra-card__footer", className)}
        css={{
          display: "flex",
          justifyContent: justify,
          ...styles.footer,
        }}
        {...rest}
      />
    )
  },
)
