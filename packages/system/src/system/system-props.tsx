import * as SS from "styled-system";
import custom from "./custom/custom";
import { SystemProps } from "./system-props-interface";

// Compose all style functions into a single function
export const system = SS.compose(
  SS.layout,
  SS.color,
  SS.space,
  SS.background,
  SS.border,
  SS.grid,
  SS.position,
  SS.shadow,
  SS.typography,
  SS.flexbox,
  SS.zIndex,
  custom,
);

// Allow users pass the `isTruncated` prop from any component
export function truncate(props: {
  isTruncated?: boolean;
}): SystemProps | undefined {
  if (props.isTruncated) {
    return {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    };
  }
}

export default system;
