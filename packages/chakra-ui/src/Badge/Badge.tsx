import * as React from "react";
import useBadgeStyle from "./styles";
import { Box, BoxProps } from "../Box";
import { forwardRef } from "react";

export interface BadgeOptions {
  /**
   * The color scheme of the badge
   */
  variantColor?: string;
  /**
   * The variant of the badge
   */
  variant?: "solid" | "subtle" | "outline";
}

type BadgeProps<P, T> = BoxProps<P, T> & BadgeOptions;

const Badge = React.forwardRef(function Badge<P, T>(
  props: BadgeProps<P, T>,
  ref: React.Ref<T>,
) {
  const badgeStyleProps = useBadgeStyle({
    color: props.variantColor,
    variant: props.variant,
  });

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
}) as <P, T = HTMLElement>(
  props: BadgeProps<P, T>,
) => React.ReactElement<BadgeProps<P, T>>;

export default Badge;
