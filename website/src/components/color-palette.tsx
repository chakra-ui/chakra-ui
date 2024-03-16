import {
  Box,
  Flex,
  FlexProps,
  Grid,
  GridProps,
  useChakraContext,
  useToken,
} from '@chakra-ui/react'

interface ColorPaletteProps extends FlexProps {
  color?: string
  name?: string
}

export const ColorPalette = (props: ColorPaletteProps) => {
  const { color, name, ...rest } = props
  const token = useToken('colors', color)

  return (
    <Flex align='center' {...rest}>
      <Box
        borderRadius='md'
        boxSize='3rem'
        boxShadow='inner'
        mr={3}
        bgColor={color}
      />
      <Box fontSize='sm'>
        <Box fontWeight='semibold' textTransform='capitalize'>
          {name}
        </Box>
        <Box textTransform='uppercase'>{token}</Box>
      </Box>
    </Flex>
  )
}

export const ColorPalettes = (props: { color: string }) => {
  const { color } = props
  const sys = useChakraContext()
  const keys = Object.keys(sys.tokens.flatMap)

  return keys.map((item) => (
    <ColorPalette
      key={`${color}.${item}`}
      color={`${color}.${item}`}
      name={`${color} ${item}`}
    />
  ))
}

export const ColorWrapper = (props: GridProps) => (
  <Grid
    mt={7}
    gap={6}
    templateColumns='repeat(auto-fit, minmax(200px, 1fr))'
    {...props}
  />
)
