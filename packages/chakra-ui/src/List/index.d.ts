import * as React from "react";
import * as StyledSystem from "styled-system";
import { BoxProps } from "../Box";
import { IconProps } from "../Icon";
import { Omit } from "../common-types";

interface IList {
  /**
   * The `list-style-type` of the list
   */
  styleType?: StyledSystem.ResponsiveValue<
    React.CSSProperties["listStyleType"]
  >;
  /**
   * The `list-style-position` of the list
   */
  stylePos?: StyledSystem.ResponsiveValue<
    React.CSSProperties["listStylePosition"]
  >;
  /**
   * The space between each list item
   */
  spacing?: StyledSystem.MarginBottomProps["marginBottom"];
}

type ListProps = IList & BoxProps;
declare const List: React.FC<ListProps>;
export const ListItem: React.FC<BoxProps>;

type ListIconProps = Omit<IconProps, "name"> & {
  icon: IconProps["name"] | React.ComponentType;
};

export const ListIcon: React.FC<ListIconProps>;

export default List;
