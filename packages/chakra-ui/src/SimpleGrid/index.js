import React, { forwardRef } from "react";
import Grid from "../Grid";
import { countToColumns, widthToColumns } from "./utils";

const SimpleGrid = forwardRef(
  ({ columns, spacingX, spacingY, spacing, minChildWidth, ...props }, ref) => {
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
