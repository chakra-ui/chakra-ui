import React from "react";
import Box from "../Box";

const Text = React.forwardRef((props, ref) => {
  return <Box ref={ref} as="p" fontFamily="body" {...props} />;
});

export default Text;
