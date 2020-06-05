import { __DEV__, cx } from "@chakra-ui/utils"
import * as React from "react"
import { Box, BoxProps } from "./box"

interface AspectRatioOptions {
  /**
   * The aspect ratio of the Box. Common values are:
   *
   * `21/9`, `16/9`, `9/16`, `4/3`, `1.85/1`
   */
  ratio?: number
}

export type AspectRatioProps = BoxProps & AspectRatioOptions

/**
 * React component used to cropping media (videos, images and maps)
 * to a desired aspect ratio.
 *
 * @see Docs https://chakra-ui.com/aspectratio
 */
export const AspectRatio = React.forwardRef(
  (props: AspectRatioProps, ref: React.Ref<any>) => {
    const { ratio = 4 / 3, children, className, ...rest } = props

    // enforce single child
    const child = React.Children.only(children)

    const _className = cx("chakra-aspect-ratio", className)

    return (
      <Box
        ref={ref}
        position="relative"
        className={_className}
        _before={{
          height: 0,
          content: `""`,
          display: "block",
          paddingBottom: `${(1 / ratio) * 100}%`,
        }}
        css={{
          "& > *": {
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
      </Box>
    )
  },
)

if (__DEV__) {
  AspectRatio.displayName = "AspectRatio"
}
