import {
  LayoutProps,
  ColorProps,
  SpaceProps,
  BordersProps,
  BackgroundProps,
  PositionProps,
  TypographyProps,
  FlexboxProps,
  ShadowProps,
  OpacityProps,
  GridProps
} from "styled-system";
import { StyledComponent } from "@emotion/styled";
import { RefAttributes, AriaAttributes, HTMLAttributes } from "react";

export interface BoxProps
  extends AriaAttributes,
    RefAttributes<HTMLElement>,
    HTMLAttributes<HTMLDivElement>,
    LayoutProps,
    ColorProps,
    SpaceProps,
    BordersProps,
    BackgroundProps,
    PositionProps,
    TypographyProps,
    FlexboxProps,
    ShadowProps,
    OpacityProps,
    GridProps {
  wordBreak: "normal" | "words" | "all" | "truncate";
  as: string | React.ReactElement;
}

declare const Box: StyledComponent<BoxProps, {}, {}>;

export default Box;
