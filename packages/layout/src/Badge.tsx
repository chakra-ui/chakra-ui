import { createChakra } from "@chakra-ui/system";

const Badge = createChakra("div", { themeKey: "Badge" });
Badge.defaultProps = {
  variant: "subtle",
  variantColor: "gray",
};

export default Badge;
