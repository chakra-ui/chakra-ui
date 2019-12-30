import * as SS from "@styled-system/should-forward-prop";

declare module "@styled-system/should-forward-prop" {
  export const props: any[];
}

// Prevent some prop from getting to the underlying DOM element
const shouldForwardProp = SS.createShouldForwardProp([
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

function isPropValid(prop: string): boolean {
  if (nativeHTMLPropAlias.includes(prop)) {
    return true;
  } else {
    return shouldForwardProp(prop);
  }
}

export default isPropValid;
