import * as React from "react";
import * as StyledSystem from "styled-system";
import { BoxProps } from "../Box";

interface IList {
  /**
   * The `listStyleType` of this list
   */
  type?: StyledSystem.ResponsiveValue<React.CSSProperties["listStyleType"]>;
  spacing: StyledSystem.ResponsiveValue<StyledSystem.MarginBottomProps>;
}

type ListProps = IList & BoxProps;
declare const List: React.FC<ListProps>;
export const ListItem: React.FC<BoxProps>;

export default List;
