import { pseudo, system, truncate } from "../system";
import createStyled from "./create-styled";
import { As, CreateChakraOptions } from "./types";
import css from "../css";

const sx = (props: { sx: object; theme: object }) => css(props.sx)(props.theme);
const cx = (props: { css: object }) => props.css;

/**
 * The styled wrapper allows you to create a functional component that
 * can receive chakra style props.
 *
 * @example
 * ```jsx
 * const Button = createChakra(
 *   ButtonBase, { themeKey: "Button" }
 * );
 * ```
 * @param component - The unstyled base component or tag to render
 * @param baseStyle - The styles to be added with the component. This styles can be overriden with props
 * @param attrs - A helper which provides valid HTML props.
 */
function createChakra<T extends As, P = {}>(
  component: T,
  options?: CreateChakraOptions<P>,
) {
  return createStyled(component, options)(system, pseudo, truncate, sx, cx);
}

export default createChakra;
