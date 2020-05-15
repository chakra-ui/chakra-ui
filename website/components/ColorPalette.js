import { Box, Flex, Grid, useTheme } from "@chakra-ui/core"

export const ColorPalette = ({ color, name, ...props }) => {
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
    <Flex align="center" {...props}>
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

export const ColorPalettes = ({ color }) => {
  const theme = useTheme()
  const keys = Object.keys(theme.colors[color])
  return keys.map(item => (
    <ColorPalette color={`${color}.${item}`} name={`${color} ${item}`} />
  ))
}

export const ColorWrapper = props => (
  <Grid
    mt={7}
    gap={6}
    templateColumns="repeat( auto-fit, minmax(200px, 1fr) )"
    {...props}
  />
)
