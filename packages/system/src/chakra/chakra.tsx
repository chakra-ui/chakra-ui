import * as React from "react";
import { pseudo, system, truncate } from "../system";
import styled from "./styled";
import htmlElements from "./supported-elements";
import { As, HTMLChakraComponents } from "./types";
import { css, get } from "@styled-system/css";

const sx = (props: { sx: object; theme: object }) => css(props.sx)(props.theme);

const themed = (tag: React.ElementType) => (props: {
  theme: object;
  apply: string;
}) => css(get(props.theme, props.apply || `styles.${tag}`))(props.theme);

function createComponent<T extends As>(tag: T) {
  return styled(tag)(themed(tag), system, pseudo, truncate, sx);
}

//@ts-ignore
const chakra: HTMLChakraComponents = {};
htmlElements.forEach(tag => {
  //@ts-ignore
  chakra[tag] = createComponent(tag);
});

export default chakra;
