import * as React from "react";
import { pseudo, system, truncate } from "../system";
import styled from "./styled";
import domElements from "./dom-elements";
import { As, HTMLChakraComponents } from "./types";
import { get } from "@styled-system/css";
import css from '../css';

const sx = (props: { sx: object; theme: object }) => css(props.sx)(props.theme);
const cx = (props: { css: object }) => props.css;

interface ThemedProps {
  theme: object;
  apply: string;
}

function themed(tag: React.ElementType) {
  return (props: ThemedProps) => {
    const styleObject = get(props.theme, props.apply || `styles.${tag}`);
    const style = css(styleObject)(props.theme);
    return style;
  };
}

function createStyled<T extends As>(tag: T) {
  return styled(tag)(themed(tag), system, pseudo, truncate, sx, cx);
}

//@ts-ignore
const chakra: HTMLChakraComponents = {};
domElements.forEach(tag => {
  //@ts-ignore
  chakra[tag] = createStyled(tag);
});

export default chakra;
