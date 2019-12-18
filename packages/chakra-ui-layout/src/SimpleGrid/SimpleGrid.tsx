import { forwardRef, ResponsiveValue } from "@chakra-ui/system";
import * as React from "react";
import { Grid, GridProps } from "../Grid";
import { countToColumns, widthToColumns } from "./utils";

interface SimpleGridOptions {
  /**
   * The width at which child elements will break into columns. Pass a number for pixel values or a string for any other valid CSS length.
   */
  minChildWidth?: GridProps["minWidth"];
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

type SimpleGridProps = GridProps & SimpleGridOptions;

const SimpleGrid = forwardRef(
  (
    {
      columns,
      spacingX,
      spacingY,
      spacing,
      minChildWidth,
      ...props
    }: SimpleGridProps,
    ref: React.Ref<any>,
  ) => {
    const templateColumns = !!minChildWidth
      ? widthToColumns(minChildWidth)
      : countToColumns(columns);

    return (
      <Grid
        ref={ref}
        gap={spacing}
        columnGap={spacingX}
        rowGap={spacingY}
        templateColumns={templateColumns}
        {...props}
      />
    );
  },
);

export default SimpleGrid;
