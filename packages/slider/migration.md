# Migration Notes

## Changes

- We've a minor update to the structure of the slider markup. Since the filled
  track is considered visually to be inside the track, we tried to update the
  markup to also depict that.

```jsx
// before
<Slider defaultValue={30}>
  <SliderTrack />
  <SliderFilledTrack />
  <SliderThumb />
</Slider>

// after
<Slider defaultValue={30}>
  <SliderTrack>
    <SliderFilledTrack />
  </SliderTrack>
  <SliderThumb />
</Slider>
```

- We added support for `isReversed`, which allows users reverse the direction
  and functionality of the slider. This is mostly useful for `rtl` purposes.

- We added support for `onChangeEnd`, dragging the slider can trigger lots of
  updates and user might only be interested in the final result after sliding is
  complete.

- Export the `useSlider` hook to help users manage and build custom slider UIs
