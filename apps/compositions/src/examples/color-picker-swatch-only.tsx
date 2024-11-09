import {
  ColorPickerLabel,
  ColorPickerRoot,
  ColorPickerSwatchGroup,
  ColorPickerValueText,
} from "compositions/ui/color-picker"

export const ColorPickerSwatchOnly = () => {
  return (
    <ColorPickerRoot open alignItems="flex-start">
      <ColorPickerLabel>
        Color: <ColorPickerValueText />
      </ColorPickerLabel>
      <ColorPickerSwatchGroup
        items={["red", "green", "blue", "purple", "orange", "pink"]}
      />
    </ColorPickerRoot>
  )
}
