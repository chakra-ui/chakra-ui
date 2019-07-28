import React, { forwardRef } from "react";
import Box from "../Box";

const Grid = forwardRef((props, ref) => (
  <Box display="grid" ref={ref} {...props} />
));

export default Grid;
