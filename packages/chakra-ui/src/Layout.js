/** @jsx jsx */
import styled from "@emotion/styled";
import {
  color,
  flexbox,
  layout,
  space,
  grid,
  background,
  border,
  position,
  shadow
} from "styled-system";

export const Box = styled.div`
  ${layout}
  ${color}
  ${space}
  ${background}
  ${border}
  ${position}
  ${shadow}
`;

export const Flex = styled(Box)`
  ${flexbox}
`;

export const Grid = styled(Box)`
  ${grid}
`;
