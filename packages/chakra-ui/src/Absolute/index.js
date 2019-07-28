import React, { forwardRef } from "react";
import Box from "../Box";

const Absolute = forwardRef((props, ref) => (
  <Box position="absolute" ref={ref} {...props} />
));

export default Absolute;
