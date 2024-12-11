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
        {swatches.map((item) => (
          <ColorPickerSwatchTrigger key={item} value={item} />
        ))}
      </ColorPickerSwatchGroup>
    </ColorPickerRoot>
  )
}

const swatches = ["red", "green", "blue", "purple", "orange", "pink"]
