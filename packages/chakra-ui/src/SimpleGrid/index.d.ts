import * as React from "react";
import { FlexboxProps } from "styled-system";
import { BoxProps } from "../Box";

interface ISimpleGrid {
  /**
   * The width at which child elements will break into columns. Pass a number for pixel values or a string for any other valid CSS length.
   */
  minChildWidth?: React.CSSProperties["minWidth"];
  /**
   * The align-items to control child element alignment.
   */
  align?: FlexboxProps["alignItems"];
  /**
   * The justify-items to control child element alignment.
   */
  justify?: FlexboxProps["justifyItems"];
  /**
   * The number of rows
   */
  rows?: number;
  /**
   * The number of columns
   */
  columns?: number;
  /**
   * The gap between the grid items
   */
  spacing?: BoxProps["gridGap"];
  /**
   * The row gap between the grid items
   */
  spacingX?: BoxProps["gridGap"];
  /**
   * The column gap between the grid items
   */
  spacingY?: BoxProps["gridGap"];
  /**
   * If `true` will apply `auto-fit` to the grid-template-columns
   */
  autoFit?: boolean;
  /**
   * If `true` will apply `auto-fill` to the grid-template-columns
   */
  autoFill?: boolean;
}

type SimpleGridProps = BoxProps & ISimpleGrid;

declare const SimpleGrid: React.FC<SimpleGridProps>;
