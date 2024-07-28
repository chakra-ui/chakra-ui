import { Box, Slider as ChakraSlider } from "@chakra-ui/react"
import { forwardRef } from "react"

export interface SliderProps extends ChakraSlider.RootProps {
  marks?: number[]
  label?: React.ReactNode
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  function Slider(props, ref) {
    const { marks, label, ...rest } = props
    const value = props.defaultValue ?? props.value
    return (
      <ChakraSlider.Root ref={ref} thumbAlignment="center" {...rest}>
        {label && (
          <ChakraSlider.Label fontWeight="medium">{label}</ChakraSlider.Label>
        )}
        <ChakraSlider.Control>
          <ChakraSlider.Track>
            <ChakraSlider.Range />
          </ChakraSlider.Track>
          {value?.map((_, index) => (
            <ChakraSlider.Thumb key={index} index={index}>
              <ChakraSlider.HiddenInput />
            </ChakraSlider.Thumb>
          ))}
        </ChakraSlider.Control>
        {marks?.length && (
          <ChakraSlider.MarkerGroup mb="4">
            {marks.map((mark, index) => (
              <ChakraSlider.Marker key={index} value={mark}>
                <Box width="1px" height="1.5" bg="border" />
                {mark}
              </ChakraSlider.Marker>
            ))}
          </ChakraSlider.MarkerGroup>
        )}
      </ChakraSlider.Root>
    )
  },
)
