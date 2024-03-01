import { mergeSystem } from "./config"
import { presetBase } from "./preset-base"
import { presetChakra } from "./preset-chakra"

export const preset = mergeSystem(presetBase, presetChakra)
