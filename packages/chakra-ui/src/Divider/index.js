/** @jsx jsx */
import { jsx } from "@emotion/core";
import Box from "../Box";
import { forwardRef } from "react";

const Divider = forwardRef(({ orientation, ...props }, ref) => {
  const borderProps =
    orientation === "vertical"
      ? { borderLeft: "0.0625rem solid", height: "auto", mx: 2 }
      : { borderBottom: "0.0625rem solid", width: "auto", my: 2 };

  return (
    <Box
      ref={ref}
      as="hr"
      aria-orientation={orientation}
      border="0"
      opacity="0.6"
      {...borderProps}
      borderColor="inherit"
      {...props}
    />
  );
});

export default Divider;
