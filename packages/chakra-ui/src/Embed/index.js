/** @jsx jsx */
import styled from "@emotion/styled";
import propTypes from "prop-types";
import Box from "../Box";

const aspectRatios = {
  "21:9": 9 / 21,
  "16:9": 9 / 16,
  "9:16": 16 / 9,
  "4:3": 3 / 4,
  "1.85:1": 1 / 1.85,
  "1:1": 1,
};

const generatePadding = ratio => {
  let _ratio;
  if (ratio in aspectRatios) {
    _ratio = ratio;
  } else {
    _ratio = "4:3";
  }

  return aspectRatios[_ratio] * 100 + "%";
};

const Embed = styled(Box)(({ aspectRatio }) => ({
  padding: 0,
  overflow: "hidden",
  width: "100%",
  paddingBottom: generatePadding(aspectRatio),
  position: "relative",
  "& > iframe": {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    bottom: 0,
    left: 0,
    border: 0,
  },
}));

Embed.propTypes = {
  aspectRatio: propTypes.oneOf([
    "21:9",
    "16:9",
    "9:16",
    "4:3",
    "1.85:1",
    "1:1",
  ]),
};

Embed.defaultProps = {
  aspectRatio: "4:3",
};

export default Embed;
