import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useCardStyles } from "./card-context"

export interface CardHeaderProps extends HTMLChakraProps<"div"> {}

export const CardHeader = forwardRef<CardHeaderProps, "div">(
  function CardHeader(props, ref) {
    const { className, ...rest } = props
    const styles = useCardStyles()
    return (
      <chakra.div
        ref={ref}
        className={cx("chakra-card__header", className)}
        css={styles.header}
        {...rest}
      />
    )
  },
)
