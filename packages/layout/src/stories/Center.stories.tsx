import React from "react";
import Box from "../Box";
import Center from "../Center";

///////////////////////////////////////////////////////////////////////////////////

export default {
  title: "Center",
};

export const flex = () => (
  <Center size="400px">
    <Box size="200px" bg="green.200">
      Box
    </Box>
  </Center>
);

export const absolute = () => (
  <Center use="absolute" size="400px" bg="green.200">
    Box
  </Center>
);
