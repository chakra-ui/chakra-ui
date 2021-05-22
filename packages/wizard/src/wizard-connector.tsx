import { useColorModeValue } from "@chakra-ui/color-mode"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  ThemingProps,
  useStyles,
  useTheme,
} from "@chakra-ui/system"
import { getColor } from "@chakra-ui/theme-tools"
import { motion } from "framer-motion"
import * as React from "react"

export interface WizardConnectorProps
  extends HTMLChakraProps<"div">,
    ThemingProps {
  isCompletedStep: boolean
  isVertical: boolean
}

const Connector = motion(chakra.div)

export const WizardConnector = forwardRef(
  (
    { colorScheme: c, isCompletedStep, isVertical }: WizardConnectorProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const { connector, stepIcon } = useStyles()

    const theme = useTheme()

    const activeBg = useColorModeValue(`${c}.500`, `${c}.200`)

    const inactiveBg = useColorModeValue(`gray.200`, `gray.700`)

    const rawInitialColor = getColor(theme, inactiveBg)

    const rawActiveColor = getColor(theme, activeBg)

    return (
      <Connector
        ref={ref}
        __css={{
          ...connector,
          minHeight: isVertical ? "1.5rem" : "auto",
          ml: isVertical ? `calc(${stepIcon.width} / 2)` : 0,
          width: isVertical ? "2px" : "auto",
        }}
        initial={{ backgroundColor: rawInitialColor }}
        animate={{
          backgroundColor: isCompletedStep ? rawActiveColor : rawInitialColor,
        }}
      />
    )
  },
)
