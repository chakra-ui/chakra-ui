/** @jsx jsx */
import { jsx } from "@emotion/core";
import Box from "../Box";
import { forwardRef } from "react";

const Divider = forwardRef(({ orientation, ...props }, ref) => {
  const borderProps =
    orientation === "vertical"
      ? { borderLeft: "1px", mx: "8px" }
      : { borderBottom: "1px", my: "8px" };

  return (
    <Box
      ref={ref}
      as="hr"
      role="separator"
      aria-orientation={orientation}
      border="0"
      opacity="0.6"
      borderColor="inherit"
      {...borderProps}
      {...props}
    />
  );
});

export default Divider;
