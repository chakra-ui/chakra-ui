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
  transformOrigin: true,
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

config.bgAttachment = config.backgroundAttachment;

const extraConfig = system(config);

export default extraConfig;
