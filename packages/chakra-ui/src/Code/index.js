/** @jsx jsx */
import { jsx } from "@emotion/core";
import useBadgeStyle from "../Badge/styles";
import Box from "../Box";
import { useVariantColorWarning } from "../utils";

const Code = ({ variantColor = "gray", ...props }) => {
  useVariantColorWarning("Code", variantColor);
  const badgeStyle = useBadgeStyle({ variant: "subtle", color: variantColor });
  return (
    <Box
      as="code"
      display="inline-block"
      fontFamily="mono"
      fontSize="sm"
      px="0.2em"
      rounded="sm"
      {...badgeStyle}
      {...props}
    />
  );
};

export default Code;
