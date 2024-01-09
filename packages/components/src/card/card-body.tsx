import { cx } from "@chakra-ui/utils/cx"
import { forwardRef, HTMLChakraProps, chakra } from "../system"
import { useCardStyles } from "./card-context"

export interface CardBodyProps extends HTMLChakraProps<"div"> {}

export const CardBody = forwardRef<CardBodyProps, "div">(
  function CardBody(props, ref) {
    const { className, ...rest } = props
    const styles = useCardStyles()
    return (
      <chakra.div
        ref={ref}
        className={cx("chakra-card__body", className)}
        __css={styles.body}
        {...rest}
      />
    )
  },
)
