import * as React from "react";

import { chakra, createChakra } from "@chakra-ui/system";

// Add option to not include common styles in create chakra
const Code = createChakra("code", { themeKey: "Code" });

Code.defaultProps = {
  variantColor: "gray",
  variant: "subtle",
};

export default Code;
