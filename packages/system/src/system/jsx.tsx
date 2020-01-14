// All credits goes to theme-ui for this
import { Dict } from "@chakra-ui/utils";
import { jsx as emotion } from "@emotion/core";
import css from "@styled-system/css";
import { replacePseudo } from "./pseudo";
import tx from "./custom/custom.utils";
import { SxProps } from "./types";

const getCSS = (props: { sx?: object; css?: object }) => {
  if (!props.sx && !props.css) return undefined;
  return (theme: object) => {
    const modifiedSx = tx(replacePseudo(props.sx));
    const styles = css(modifiedSx)(theme);
    const raw = typeof props.css === "function" ? props.css(theme) : props.css;
    return [styles, raw];
  };
};

const parseProps = (props: any) => {
  if (!props) return null;
  const next: Dict = {};
  for (const key in props) {
    if (key === "sx") continue;
    next[key] = props[key];
  }
  const css = getCSS(props);
  if (css) next.css = css;
  return next;
};

export const jsx = (
  type: React.ElementType,
  props: object,
  ...children: React.ReactNode[]
) => emotion.apply(undefined, [type, parseProps(props), ...children]);

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DOMAttributes<T> extends SxProps {}
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicAttributes extends SxProps {}
  }
}

export default jsx;
