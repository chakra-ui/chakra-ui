/* @jsx jsx */
import { chakra, PropsOf, css, jsx, useTheme } from "@chakra-ui/system"
import { calculateBaselineCrop, LineHeight, FontFamily } from "./layout.utils"
import React, { forwardRef } from "react"
import { __DEV__ } from "@chakra-ui/utils"
import { Box } from "./Box"

interface ExtraHeadingProps {
  isBaselineCropped?: boolean
  lineHeight?: LineHeight
  fontFamily?: FontFamily
}

export type HeadingProps = PropsOf<typeof BaseHeading> & ExtraHeadingProps

const BaseHeading = chakra("p", { themeKey: "Heading" })

/**
 * Heading
 *
 * Just to render titles and subtitles
 *
 * @see Docs https://chakra-ui.com/heading
 */
export const Heading = forwardRef(
  (
    { isTruncated, lineHeight, isBaselineCropped, ...props }: HeadingProps,
    ref: React.Ref<any>,
  ) => {
    const theme = useTheme()

    if (isBaselineCropped) {
      const {
        transform,
        lineHeight: processedLineHeight,
        before,
      } = calculateBaselineCrop(theme, {
        lineHeight,
        ...props,
      })

      return (
        <BaseHeading
          ref={ref}
          transform={transform}
          lineHeight={processedLineHeight}
          sx={{ ...props.sx, "&::before": before }}
          {...props}
        >
          <Box
            fontFamily="inherit"
            as="span"
            display="block"
            isTruncated={isTruncated}
          >
            {props.children}
          </Box>
        </BaseHeading>
      )
    }

    return <BaseHeading ref={ref} {...props} />
  },
)

if (__DEV__) {
  Heading.displayName = "Heading"
}
