/** @jsx jsx */
import { jsx } from "@emotion/core";
import useBadgeStyle from "./styles";
import Box from "../Box";
import { forwardRef } from "react";

const Badge = forwardRef(
  ({ variantColor = "gray", variant = "subtle", ...props }, ref) => {
    const badgeStyleProps = useBadgeStyle({ color: variantColor, variant });

    return (
      <Box
        ref={ref}
        display="inline-block"
        px={1}
        textTransform="uppercase"
        fontSize="xs"
        borderRadius="sm"
        fontWeight="bold"
        whiteSpace="nowrap"
        verticalAlign="middle"
        {...badgeStyleProps}
        {...props}
      />
    );
  },
);

export default Badge;
