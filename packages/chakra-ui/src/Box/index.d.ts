import * as StyledSystem from "styled-system";
import * as Emotion from "@emotion/styled";

export interface BoxProps
  extends StyledSystem.LayoutProps,
    StyledSystem.ColorProps,
    StyledSystem.SpaceProps,
    StyledSystem.BordersProps,
    StyledSystem.BackgroundProps,
    StyledSystem.PositionProps,
    StyledSystem.TypographyProps,
    StyledSystem.FlexboxProps,
    StyledSystem.ShadowProps,
    StyledSystem.GridProps {
  wordBreak: "normal" | "words" | "all" | "truncate";
}

declare const Box: Emotion.StyledComponent<BoxProps, {}, {}>;

export default Box;
