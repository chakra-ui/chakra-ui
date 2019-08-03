import { BoxProps } from "../Box";
import * as React from "react";

interface IList {
  /**
   * If `true` the list is displayed inline.
   */
  inline?: boolean;
  /**
   * If `true` the list is displayed in order.
   */
  ordered?: boolean;
  /**
   * The type of the list: `bullet`, `number` or `none`.
   */
  type: "bullet" | "number" | "none";
  /**
   * The contents of the list.
   */
  children?: React.ReactNode;
  /**
   * If `true` add extra styles to the list.
   */
  styled?: boolean;
  /**
   * If `true` add a divider between list items
   */
  showDivider?: boolean;
  /**
   * The spacing between the list items
   */
  spacing?: string | number;
}

export type ListProps = IList & BoxProps;

declare const List: React.FC<ListProps>;

export default List;
