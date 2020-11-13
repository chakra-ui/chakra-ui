import {
  Box,
  Flex,
  FlexProps,
  Grid,
  GridProps,
  useTheme,
} from "@chakra-ui/react"
import React from "react"

type ColorPaletteProps = FlexProps & { color?: string; name?: string }

export const ColorPalette = (props: ColorPaletteProps) => {
  const { color, name, ...rest } = props

  const theme = useTheme()
  let colorCode = color
  const [shade, hue] = color.split(".")

  if (shade && hue) {
    colorCode = theme.colors[shade][hue]
  }

  if (color in theme.colors && typeof theme.colors[color] === "string") {
    colorCode = theme.colors[color]
  }

  return (
    <Flex align="center" {...rest}>
      <Box
        borderRadius="md"
        boxSize="3rem"
        boxShadow="inner"
        mr={3}
        bg={color}
      />
      <Box fontSize="sm">
        <Box fontWeight="semibold" textTransform="capitalize">
          {name}
        </Box>
        <Box textTransform="uppercase">{colorCode}</Box>
      </Box>
    </Flex>
  )
}

export const ColorPalettes = (props: { color: string }) => {
  const { color } = props
  const theme = useTheme()
  const keys = Object.keys(theme.colors[color])

  return keys.map((item) => (
    <ColorPalette
      key={`${color}.${item}`}
      color={`${color}.${item}`}
      name={`${color} ${item}`}
    />
  ))
}

export const ColorWrapper: React.FC<GridProps> = (props) => (
  <Grid
    mt={7}
    gap={6}
    templateColumns="repeat( auto-fit, minmax(200px, 1fr) )"
    {...props}
  />
)
