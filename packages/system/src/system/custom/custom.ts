import * as SS from "styled-system";
import { Dict, isNumber } from "@chakra-ui/utils";

// !important: I updated the border-radius props, kindly add it to changelog (breaking change)
// we could possibly write a codemod for this.
export const config: Dict = {
  topRadius: {
    properties: ["borderTopLeftRadius", "borderTopRightRadius"],
    scale: "radii",
  },
  bottomRadius: {
    properties: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    scale: "radii",
  },
  leftRadius: {
    properties: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    scale: "radii",
  },
  rightRadius: {
    properties: ["borderTopRightRadius", "borderBottomRightRadius"],
    scale: "radii",
  },
  topRightRadius: {
    property: "borderTopRightRadius",
    scale: "radii",
  },
  topLeftRadius: {
    property: "borderTopLeftRadius",
    scale: "radii",
  },
  bottomRightRadius: {
    property: "borderBottomRightRadius",
    scale: "radii",
  },
  bottomLeftRadius: {
    property: "borderBottomLeftRadius",
    scale: "radii",
  },
  radius: {
    property: "borderRadius",
    scale: "radii",
  },
  d: {
    property: "display",
  },
  w: {
    property: "width",
    scale: "sizes",
    transform: (val: number, scale: object) =>
      SS.get(scale, val, !isNumber(val) || val > 1 ? val : val * 100 + "%"),
  },
  minW: {
    property: "minWidth",
    scale: "sizes",
  },
  maxW: {
    property: "maxWidth",
    scale: "sizes",
  },
  h: {
    property: "height",
    scale: "sizes",
  },
  minH: {
    property: "minHeight",
    scale: "sizes",
  },
  maxH: {
    property: "maxHeight",
    scale: "sizes",
  },
  textColor: {
    property: "color",
    scale: "colors",
  },
  bgImage: {
    property: "backgroundImage",
  },
  bgSize: {
    property: "backgroundSize",
  },
  bgPos: {
    property: "backgroundPosition",
  },
  bgRepeat: {
    property: "backgroundRepeat",
  },
  pos: {
    property: "position",
  },
  flexDir: {
    property: "flexDirection",
  },
  shadow: {
    property: "boxShadow",
    scale: "shadows",
  },
  textDecoration: { property: "textDecoration" },
  overflowX: true,
  overflowY: true,
  textTransform: true,
  animation: true,
  appearance: true,
  transform: true,
  transformOrigin: true,
  visibility: true,
  whiteSpace: true,
  userSelect: true,
  pointerEvents: true,
  wordBreak: true,
  overflowWrap: true,
  textOverflow: true,
  boxSizing: true,
  cursor: true,
  resize: true,
  placeItems: true,
  transition: true,
  listStyleType: true,
  listStylePosition: true,
  listStyleImage: true,
  fill: {
    property: "fill",
    scale: "colors",
  },
  stroke: {
    property: "stroke",
    scale: "colors",
  },
  objectFit: true,
  objectPosition: true,
  backgroundAttachment: {
    property: "backgroundAttachment",
  },
  outline: true,
  float: true,
  willChange: true,
};

config.bgAttachment = config.backgroundAttachment;
config.textDecor = config.textDecoration;
config.listStylePos = config.listStylePosition;
config.listStyleImg = config.listStyleImage;

const customProps = SS.system(config);

export default customProps;
export { CustomProps } from "./custom.interface";
