/**@jsx jsx */
import { css, jsx } from "@chakra-ui/system"
import * as React from "react"
import { Box, BoxProps } from "./Box"

export type AspectRatioBoxProps = BoxProps & { ratio?: number }

export const AspectRatioBox = React.forwardRef(function(
  props: AspectRatioBoxProps,
  ref: React.Ref<any>,
) {
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
      css={css({
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
        "& > img": {
          objectFit: "cover",
        },
      })}
      {...rest}
    >
      {child}
    </Box>
  )
})
