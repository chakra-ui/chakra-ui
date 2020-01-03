import * as SS from "@styled-system/should-forward-prop";

// Prevent some prop from getting to the underlying DOM element
const shouldForwardProp = SS.createShouldForwardProp([
  //@ts-ignore
  ...SS.props,
  "d",
  "textDecoration",
  "pointerEvents",
  "visibility",
  "transform",
  "cursor",
  "fill",
  "stroke",
]);

/**
 * htmlWidth and htmlHeight is used in the <Image />
 * component to support the native `width` and `height` attributes
 *
 * https://github.com/chakra-ui/chakra-ui/issues/149
 */
const nativeHTMLPropAlias = ["htmlWidth", "htmlHeight"];

export function isPropValid(prop: string): boolean {
  if (nativeHTMLPropAlias.includes(prop)) {
    return true;
  } else {
    return shouldForwardProp(prop);
  }
}

export default isPropValid;
