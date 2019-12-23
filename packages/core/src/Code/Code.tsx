/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Box, BoxProps } from "@chakra-ui/layout";
import useBadgeStyle, { UseBadgeStyleProps } from "../Badge/styles";
import { forwardRef } from "react";

type CodeProps<P, T> = BoxProps<P, T> & {
  variantColor?: UseBadgeStyleProps["color"];
};

const Code = forwardRef(function Code<P, T extends HTMLElement>(
  { variantColor = "gray", ...props }: CodeProps<P, T>,
  ref: React.Ref<T>,
) {
  const badgeStyle = useBadgeStyle({
    variant: "subtle",
    color: variantColor,
  });
  return (
    <Box
      ref={ref}
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
}) as <P, T>(props: CodeProps<P, T>) => React.ReactElement<CodeProps<P, T>>;

export default Code;
