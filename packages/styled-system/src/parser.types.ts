import {
  SpaceProps,
  ColorProps,
  TypographyProps,
  LayoutProps,
  FlexboxProps,
  GridProps,
  BorderProps,
  PositionProps,
  OtherProps,
  BackgroundProps,
  ShadowProps,
  OutlineProps,
  TransitionProps,
  TransformProps,
  ListProps,
} from "./config"
import { PseudoProps } from "./pseudo"

export interface ChakraStyleProps
  extends SpaceProps,
    ColorProps,
    TransitionProps,
    TypographyProps,
    FlexboxProps,
    TransformProps,
    GridProps,
    LayoutProps,
    BorderProps,
    ShadowProps,
    BackgroundProps,
    ListProps,
    PositionProps,
    OutlineProps,
    OtherProps {}

export interface SystemProps
  extends ChakraStyleProps,
    PseudoProps<ChakraStyleProps> {}
