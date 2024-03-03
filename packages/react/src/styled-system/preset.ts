import { presetBase } from "./preset-base"
import { presetChakra } from "./preset-chakra"
import { createSystem } from "./system"

export const preset = createSystem({
  ...presetBase,
  ...presetChakra,
})

export default preset
