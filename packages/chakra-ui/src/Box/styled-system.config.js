import { system } from "styled-system";

export const config = {
  roundedTop: {
    properties: ["borderTopLeftRadius", "borderTopRightRadius"],
    scale: "radii"
  },
  roundedBottom: {
    properties: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    scale: "radii"
  },
  roundedLeft: {
    properties: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    scale: "radii"
  },
  roundedRight: {
    properties: ["borderTopRightRadius", "borderBottomRightRadius"],
    scale: "radii"
  },
  roundedTopRight: {
    property: "borderTopRightRadius",
    scale: "radii"
  },
  roundedTopLeft: {
    property: "borderTopLeftRadius",
    scale: "radii"
  },
  roundedBottomRight: {
    property: "borderBottomRightRadius",
    scale: "radii"
  },
  roundedBottomLeft: {
    property: "borderBottomLeftRadius",
    scale: "radii"
  },
  rounded: {
    property: "borderRadius",
    scale: "radii"
  },
  textDecoration: true,
  textTransform: true,
  appearance: true,
  transform: true,
  whiteSpace: true,
  userSelect: true,
  pointerEvents: true,
  cursor: true,
  resize: true,
  transition: true,
  fill: {
    property: "fill",
    scale: "colors"
  },
  stroke: {
    property: "stroke",
    scale: "colors"
  },
  objectFit: true,
  objectPosition: true,
  backgroundAttachment: true
};

// shorthand alias
config["roundedT"] = config.roundedTop;
config["roundedB"] = config.roundedBottom;
config["roundedL"] = config.roundedLeft;
config["roundedR"] = config.roundedRight;
config["roundedTr"] = config.roundedTopRight;
config["roundedTl"] = config.roundedTopLeft;
config["roundedBr"] = config.roundedBottomRight;
config["roundedBl"] = config.roundedBottomLeft;
config.bgAttachment = config.backgroundAttachment;

const extraConfig = system(config);

export default extraConfig;
