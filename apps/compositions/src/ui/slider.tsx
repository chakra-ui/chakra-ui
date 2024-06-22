import { Box, Slider as ChakraSlider } from "@chakra-ui/react"
import { forwardRef } from "react"

export interface SliderProps extends ChakraSlider.RootProps {
  marks?: number[]
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  function Slider(props, ref) {
    const { marks, ...rest } = props
    const value = props.defaultValue ?? props.value
    return (
      <ChakraSlider.Root
        marginBottom={marks ? "4" : undefined}
        ref={ref}
        thumbAlignment="center"
        {...rest}
      >
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
          <ChakraSlider.MarkerGroup>
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
