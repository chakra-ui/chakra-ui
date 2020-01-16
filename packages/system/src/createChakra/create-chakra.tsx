import { css } from "@styled-system/css";
import { pseudo, system, truncate } from "../system";
import createStyled from "./create-styled";
import { As, CreateChakraOptions } from "./types";

const sx = (props: { sx: object; theme: object }) => css(props.sx)(props.theme);
const cx = (props: { css: object }) => props.css;

/**
 * createChakra takes 3 options
 * - The tag
 * - The options:
 *  - themeKey: the reference to the styles in the theme.components
 *  - hook: To execute a hook within the components
 *  - dataAttr: A unique data-chakra-* attribute
 *  - baseStyle: Some base styles to apply to the component
 */
function createChakra<T extends As, H>(
  tag: T,
  options?: CreateChakraOptions<H>,
) {
  return createStyled(tag, options)(system, pseudo, truncate, sx, cx);
}

export default createChakra;
