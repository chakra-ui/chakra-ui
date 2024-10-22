import { Alert } from "compositions/ui/alert"

export const AlertWithColorPaletteOverride = () => {
  return (
    <Alert
      status="info"
      title="This is an info alert but shown as teal"
      colorPalette="teal"
    />
  )
}
