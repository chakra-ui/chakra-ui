import * as React from "react";
import styled from "@emotion/styled";
import { Box, BoxProps } from "../Box";

const StyledHidden = styled(Box)`
  border: 0px;
  clip: rect(0px, 0px, 0px, 0px);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0px;
  overflow: hidden;
  white-space: nowrap;
  position: absolute;
`;

const VisuallyHidden = React.forwardRef(function VisuallyHidden<P, T>(
  props: BoxProps<P, T>,
  ref: React.Ref<T>,
) {
  return <StyledHidden ref={ref} {...props} />;
}) as <P, T = HTMLElement>(
  props: BoxProps<P, T>,
) => React.ReactElement<BoxProps<P, T>>;

export default VisuallyHidden;
