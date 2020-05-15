/* @jsx jsx */
import { chakra, PropsOf, css, jsx, useTheme } from "@chakra-ui/system"
import { calculateBaselineCrop, LineHeight, FontFamily } from "./layout.utils"
import React, { forwardRef } from "react"
import { __DEV__ } from "@chakra-ui/utils"
import { Box } from "./Box"

interface ExtraTextProps {
  isBaselineCropped?: boolean
  lineHeight?: LineHeight
  fontFamily?: FontFamily
}

export type TextProps = PropsOf<typeof BaseText> & ExtraTextProps

const BaseText = chakra("p", { themeKey: "Text" })

/**
 * Used to render texts or paragraphs.
 *
 * @see Docs https://chakra-ui.com/text
 */
export const Text = forwardRef(
  (
    { isTruncated, lineHeight, isBaselineCropped, ...props }: TextProps,
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
        <BaseText
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
        </BaseText>
      )
    }

    return <BaseText ref={ref} {...props} />
  },
)

if (__DEV__) {
  Text.displayName = "Text"
}
