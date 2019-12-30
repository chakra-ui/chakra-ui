// All credits goes to theme-ui for this
import { jsx as emotion } from "@emotion/core";
import css from "@styled-system/css";
import { SxProps } from "./types";
import tx from "./transform-custom-props";
import { selectors } from "./pseudo-props";

type SelectorProp = keyof typeof selectors;

const hasUnderscore = (str: string) => str.startsWith("_");
const stripUnderscore = (str: string) => str.slice(1, str.length);

const replace = (props: any) => {
  const next: any = {};
  for (const prop in props) {
    if (hasUnderscore(prop)) {
      const newProp = stripUnderscore(prop);
      next[selectors[newProp as SelectorProp]] = props[prop];
    } else {
      next[prop] = props[prop];
    }
  }
  return next;
};

const getCSS = (props: { sx?: object; css?: object }) => {
  if (!props.sx && !props.css) return undefined;
  return (theme: object) => {
    const modifiedSx = tx(replace(props.sx));
    const styles = css(modifiedSx)(theme);
    const raw = typeof props.css === "function" ? props.css(theme) : props.css;
    return [styles, raw];
  };
};

const parseProps = (props: any) => {
  if (!props) return null;
  const next: any = {};
  for (let key in props) {
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
