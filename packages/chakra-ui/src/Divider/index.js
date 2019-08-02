/** @jsx jsx */
import { jsx } from "@emotion/core";
import Box from "../Box";

const Divider = ({ orientation, ...props }) => {
  return (
    <Box
      as="hr"
      my="8px"
      role="separator"
      aria-orientation={orientation}
      border="0"
      borderBottom="1px"
      opacity="0.6"
      borderColor="inherit"
      {...props}
    />
  );
};

export default Divider;
