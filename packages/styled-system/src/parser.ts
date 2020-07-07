import {
  backgroundParser,
  borderParser,
  colorParser,
  flexboxParser,
  gridParser,
  othersParser,
  positionParser,
  shadowParser,
  spaceParser,
  typographyParser,
  layoutParser,
  outlineParser,
} from "./config"
import { compose } from "@styled-system/core"

export const parser = compose(
  backgroundParser,
  borderParser,
  colorParser,
  flexboxParser,
  layoutParser,
  outlineParser,
  gridParser,
  othersParser,
  positionParser,
  shadowParser,
  spaceParser,
  typographyParser,
)
