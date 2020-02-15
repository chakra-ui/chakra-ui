import { createChakra } from "@chakra-ui/system";

export const Code = createChakra("code", { themeKey: "Code" });

Code.defaultProps = {
  variantColor: "gray",
  variant: "subtle",
};

export default Code;
