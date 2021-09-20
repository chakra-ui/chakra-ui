---
"@chakra-ui/slider": minor
---

- Move hard-coded styles to slider's theme
- Add support for multithumb slider. We now have `useRangeSlider`, `RangeSlider`
  and `RangeSlider*` components

```jsx live=false
<RangeSlider>
  <RangeSliderTrack>
    <RangeSliderFilledTrack />
  </RangeSliderTrack>
  <RangeSliderThumb index={0} />
  <RangeSliderThumb index={1} />
</RangeSlider>
```
