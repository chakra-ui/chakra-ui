import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { Box, BoxProps } from "./Box"

interface AspectRatioBoxOptions {
  /**
   * The aspect ratio of the Box. Common values are:
   *
   * `21/9`, `16/9`, `9/16`, `4/3`, `1.85/1`
   */
  ratio?: number
}

export type AspectRatioBoxProps = BoxProps & AspectRatioBoxOptions

/**
 * AspectRatioBox component is used to embed responsive videos, images,
 * maps that fit a specific aspect ratio.
 *
 * @see Docs https://chakra-ui.com/aspectratiobox
 */
export const AspectRatioBox = React.forwardRef(
  (props: AspectRatioBoxProps, ref: React.Ref<any>) => {
    const { ratio = 4 / 3, children, ...rest } = props
    const child = React.Children.only(children)

    return (
      <Box
        ref={ref}
        position="relative"
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
  AspectRatioBox.displayName = "AspectRatioBox"
}
