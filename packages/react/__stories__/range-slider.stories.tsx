import { Box, RangeSlider } from "../src"

export default {
  title: "Components / Slider - Range",
  decorators: [(story: Function) => <Box padding="40px">{story()}</Box>],
}

export function HorizontalSlider() {
  return (
    <RangeSlider.Root maxW="300px">
      <RangeSlider.Control>
        <RangeSlider.Track>
          <RangeSlider.FilledTrack />
        </RangeSlider.Track>
        <RangeSlider.Thumb index={0} />
        <RangeSlider.Thumb index={1} />
      </RangeSlider.Control>
    </RangeSlider.Root>
  )
}

// export function VerticalSlider() {
//   return (
//     <RangeSlider orientation="vertical" onChangeEnd={console.log}>
//       <RangeSliderTrack>
//         <RangeSliderFilledTrack />
//       </RangeSliderTrack>
//       <RangeSliderThumb index={0} />
//       <RangeSliderThumb index={1} />
//     </RangeSlider>
//   )
// }

// export function SteppedHorizontalSlider() {
//   const [value, setValue] = React.useState([3, 10])
//   return (
//     <RangeSlider
//       colorScheme="pink"
//       value={value}
//       onChange={setValue}
//       min={1}
//       max={20}
//       step={2}
//     >
//       <RangeSliderTrack>
//         <RangeSliderFilledTrack />
//       </RangeSliderTrack>
//       <RangeSliderThumb index={0} />
//       <RangeSliderThumb index={1} />
//     </RangeSlider>
//   )
// }

// export function DynamicSlider() {
//   const [points, setPoints] = React.useState<number[]>([30, 70])

//   React.useEffect(() => {
//     setTimeout(() => {
//       setPoints([30, 50, 70])
//     }, 1000)
//   }, [])

//   return (
//     <RangeSlider value={points} onChange={setPoints}>
//       <RangeSliderTrack>
//         <RangeSliderFilledTrack />
//       </RangeSliderTrack>
//       {points.map((_p, index) => (
//         <RangeSliderThumb key={index} index={index} />
//       ))}
//     </RangeSlider>
//   )
// }
