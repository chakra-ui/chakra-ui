import React, { forwardRef } from "react";
import Box from "../Box";

const Grid = forwardRef(
  (
    {
      templateColumns,
      gap,
      rowGap,
      columnGap,
      autoFlow,
      autoRows,
      autoColumns,
      templateRows,
      templateAreas,
      area,
      column,
      row,
      ...props
    },
    ref,
  ) => (
    <Box
      gridArea={area}
      gridTemplateAreas={templateAreas}
      gridGap={gap}
      gridRowGap={rowGap}
      gridColumnGap={columnGap}
      gridAutoColumns={autoColumns}
      gridColumn={column}
      gridRow={row}
      gridAutoFlow={autoFlow}
      gridAutoRows={autoRows}
      gridTemplateRows={templateRows}
      gridTemplateColumns={templateColumns}
      display="grid"
      ref={ref}
      {...props}
    />
  ),
);

export default Grid;
