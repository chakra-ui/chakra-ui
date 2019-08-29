import { BoxProps } from "../Box/index";
import * as Emotion from "@emotion/styled";

export interface IControlBox {
  type?: "checkbox" | "radio";
  _hover?: BoxProps;
  _invalid?: BoxProps;
  _disabled?: BoxProps;
  _focus?: BoxProps;
  _checked?: BoxProps;
  _child?: BoxProps;
  _checkedAndChild?: BoxProps;
  _checkedAndDisabled?: BoxProps;
  _checkedAndFocus?: BoxProps;
  _checkedAndHover?: BoxProps;
}

export type ControlBoxProps = IControlBox & BoxProps;

declare const ControlBox: Emotion.StyledComponent<ControlBoxProps, {}, {}>;

export default ControlBox;
