import { Box, For, Span, useSlotRecipe } from "../src"
import { Slider } from "../src/components/slider"
import { colorPalettes } from "./shared/color-palettes"
import { PlaygroundTable } from "./shared/playground-table"

const DemoSlider = (props: Slider.RootProps) => {
  return (
    <Slider.Root {...props}>
      <Slider.Control>
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider.Control>
    </Slider.Root>
  )
}

export default {
  title: "Components / Slider",
  decorators: [(story: Function) => <Box padding="40px">{story()}</Box>],
}

export const Variants = () => {
  const recipe = useSlotRecipe("Slider")
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.variant}>{(v) => <td>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={colorPalettes}>
          {(c) => (
            <tr>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.variant}>
                {(v) => (
                  <td>
                    <DemoSlider colorPalette={c} variant={v} minW="200px" />
                    <DemoSlider
                      colorPalette={c}
                      variant={v}
                      minW="200px"
                      disabled
                    />
                  </td>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </PlaygroundTable>
  )
}

export const Sizes = () => {
  const recipe = useSlotRecipe("Slider")
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>{(v) => <td>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={colorPalettes}>
          {(c) => (
            <tr>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.size}>
                {(v) => (
                  <td>
                    <DemoSlider colorPalette={c} size={v} minW="160px" />
                  </td>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </PlaygroundTable>
  )
}

// export function HorizontalSlider() {
//   return (
//     <Slider colorScheme="red" onChangeEnd={console.log}>
//       <SliderTrack>
//         <SliderFilledTrack />
//       </SliderTrack>
//       <SliderThumb />
//       <SliderMark value={90} top="20px">
//         "90%"
//       </SliderMark>
//     </Slider>
//   )
// }

// export function VerticalSlider() {
//   return (
//     <Slider colorScheme="red" isReversed orientation="vertical">
//       <SliderTrack>
//         <SliderFilledTrack />
//       </SliderTrack>
//       <SliderThumb />
//       <SliderMark value={90} children="90%" left="40px" />
//     </Slider>
//   )
// }

// export function ChakraHorizontalSlider() {
//   return (
//     <Slider colorScheme="blue" defaultValue={40}>
//       <SliderTrack>
//         <SliderFilledTrack />
//       </SliderTrack>
//       <SliderThumb children="#" boxSize="30px" color="black" />
//     </Slider>
//   )
// }

// export function SteppedHorizontalSlider() {
//   const [value, setValue] = React.useState<number>(1)
//   return (
//     <Slider value={value} onChange={setValue} min={1} max={7} step={2}>
//       <SliderTrack>
//         <SliderFilledTrack />
//       </SliderTrack>
//       <SliderThumb children={value} boxSize="30px" color="black" />
//     </Slider>
//   )
// }
