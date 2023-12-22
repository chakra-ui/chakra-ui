import { ResponsiveValue } from "@chakra-ui/styled-system"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { cx } from "@chakra-ui/utils/cx"
import { mapResponsive } from "@chakra-ui/utils/responsive"
import { Children } from "react"

interface AspectRatioOptions {
  /**
   * The aspect ratio of the Box. Common values are:
   *
   * `21/9`, `16/9`, `9/16`, `4/3`, `1.85/1`
   */
  ratio?: ResponsiveValue<number>
}

export interface AspectRatioProps
  extends Omit<HTMLChakraProps<"div">, "aspectRatio">,
    AspectRatioOptions {}

/**
 * React component used to cropping media (videos, images and maps)
 * to a desired aspect ratio.
 *
 * @see Docs https://chakra-ui.com/aspectratiobox
 */
export const AspectRatio = forwardRef<AspectRatioProps, "div">(
  function (props, ref) {
    const { ratio = 4 / 3, children, className, ...rest } = props

    // enforce single child
    const child = Children.only(children)

    const _className = cx("chakra-aspect-ratio", className)

    return (
      <chakra.div
        ref={ref}
        position="relative"
        className={_className}
        _before={{
          height: 0,
          content: `""`,
          display: "block",
          paddingBottom: mapResponsive(ratio, (r) => `${(1 / r) * 100}%`),
        }}
        __css={{
          "& > *:not(style)": {
            overflow: "hidden",
            position: "absolute",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          },
          "& > img, & > video": {
            objectFit: "cover",
          },
        }}
        {...rest}
      >
        {child}
      </chakra.div>
    )
  },
)

AspectRatio.displayName = "AspectRatio"
