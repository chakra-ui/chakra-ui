import React, { forwardRef } from "react";
import Grid from "../Grid";

const SimpleGrid = forwardRef(
  (
    {
      rows,
      columns,
      spacingX,
      spacingY,
      spacing,
      autoFit,
      autoFill,
      minChildWidth,
      align,
      justify,
      ...props
    },
    ref,
  ) => {
    let templateColumns;
    if (autoFit && minChildWidth) {
      templateColumns = `repeat(auto-fit, minmax(${minChildWidth}, 1fr))`;
    }
    if (autoFill && minChildWidth) {
      templateColumns = `repeat(auto-fill, minmax(${minChildWidth}, 1fr))`;
    }
    return (
      <Grid
        ref={ref}
        gap={spacing}
        columnGap={spacingX}
        rowGap={spacingY}
        templateRows={`repeat(${rows}, 1fr)`}
        templateColumns={templateColumns || `repeat(${columns}, 1fr)`}
        justifyItems={justify}
        alignItems={align}
        {...props}
      />
    );
  },
);

export default SimpleGrid;
