import { BoxProps } from "../Box";
import { FC, ReactNode } from "react";

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
  children?: ReactNode;
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

declare const List: FC<ListProps>;

export default List;
