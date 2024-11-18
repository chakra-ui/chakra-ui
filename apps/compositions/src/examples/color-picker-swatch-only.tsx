import {
  ColorPickerLabel,
  ColorPickerRoot,
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
  ColorPickerValueText,
} from "compositions/ui/color-picker"

export const ColorPickerSwatchOnly = () => {
  return (
    <ColorPickerRoot alignItems="flex-start">
      <ColorPickerLabel>
        Color: <ColorPickerValueText />
      </ColorPickerLabel>
      <ColorPickerSwatchGroup>
        {["red", "green", "blue", "purple", "orange", "pink"].map((item) => (
          <ColorPickerSwatchTrigger key={item} value={item} />
        ))}
      </ColorPickerSwatchGroup>
    </ColorPickerRoot>
  )
}
