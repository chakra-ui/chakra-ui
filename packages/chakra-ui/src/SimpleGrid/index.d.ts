import * as React from "react";
import { ResponsiveValue, GridProps } from "styled-system";
import { BoxProps } from "../Box";

interface ISimpleGrid {
  /**
   * The width at which child elements will break into columns. Pass a number for pixel values or a string for any other valid CSS length.
   */
  minChildWidth?: ResponsiveValue<React.CSSProperties["minWidth"]>;
  /**
   * The number of columns
   */
  columns?: ResponsiveValue<number>;
  /**
   * The gap between the grid items
   */
  spacing?: GridProps["gridGap"];
  /**
   * The column gap between the grid items
   */
  spacingX?: GridProps["gridGap"];
  /**
   * The row gap between the grid items
   */
  spacingY?: GridProps["gridGap"];
}

type SimpleGridProps = BoxProps & ISimpleGrid;

declare const SimpleGrid: React.FC<SimpleGridProps>;
