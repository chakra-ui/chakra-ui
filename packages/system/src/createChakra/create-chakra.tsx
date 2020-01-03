import { css } from "@styled-system/css";
import { pseudo, system, truncate } from "../system";
import styled from "./styled";
import { As, CreateChakraOptions } from "./types";

const sx = (props: { sx: object; theme: object }) => css(props.sx)(props.theme);
const cx = (props: { css: object }) => props.css;

function createChakra<T extends As, H>(
  tag: T,
  options?: CreateChakraOptions<H>,
) {
  return styled(tag, options)(system, pseudo, truncate, sx, cx);
}

export default createChakra;
