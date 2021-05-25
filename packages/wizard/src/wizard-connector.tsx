import { useColorModeValue } from "@chakra-ui/color-mode"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  ThemingProps,
  useStyles,
  useTheme
} from "@chakra-ui/system"
import { getColor } from "@chakra-ui/theme-tools"
import { motion } from "framer-motion"
import * as React from "react"

export interface WizardConnectorProps
  extends HTMLChakraProps<"div">,
    ThemingProps {
  isCompletedStep: boolean
  isVertical: boolean
  isLastStep?: boolean
  hasLabel?: boolean
}

const Connector = motion(chakra.div)

export const WizardConnector = forwardRef(
  (
    {
      colorScheme: c,
      isCompletedStep,
      isVertical,
      children,
      isLastStep,
      hasLabel,
    }: WizardConnectorProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const { connector, stepIcon } = useStyles()

    const theme = useTheme()

    const activeBg = useColorModeValue(`${c}.500`, `${c}.200`)

    const inactiveBg = useColorModeValue(`gray.200`, `gray.700`)

    const rawInitialColor = getColor(theme, inactiveBg)

    const rawActiveColor = getColor(theme, activeBg)

    const getMargin = () => {
      if (isVertical) return `calc(${stepIcon.width} / 2)`
      if (!hasLabel) return 2
      return 0
    }

    return (
      <Connector
        ref={ref}
        __css={{
          ...connector,
          ml: getMargin(),
          my: isVertical ? 2 : 0,
          pl: isVertical ? 4 : 0,
          width: isVertical ? "100%" : "auto",
          borderLeftWidth: isLastStep || !isVertical ? 0 : "2px",
          minHeight: isLastStep || !isVertical ? "auto" : "1.5rem",
        }}
        initial={{
          backgroundColor: isVertical ? "transparent" : rawInitialColor,
        }}
        animate={{
          ...(!isVertical && {
            backgroundColor: isCompletedStep ? rawActiveColor : rawInitialColor,
          }),
          ...(isVertical && {
            borderColor: isCompletedStep ? rawActiveColor : rawInitialColor,
          }),
        }}
      >
        {isVertical && children}
      </Connector>
    )
  },
)
