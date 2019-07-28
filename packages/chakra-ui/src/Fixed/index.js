import React, { forwardRef } from "react";
import Box from "../Box";

const Fixed = forwardRef((props, ref) => (
  <Box position="fixed" ref={ref} {...props} />
));

export default Fixed;
