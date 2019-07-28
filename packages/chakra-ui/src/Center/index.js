import React, { forwardRef } from "react";
import Box from "../Box";

const Center = forwardRef((props, ref) => (
  <Box
    ref={ref}
    display="flex"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
    {...props}
  />
));

export default Center;
