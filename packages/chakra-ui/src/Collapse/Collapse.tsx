/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef, useState } from "react";
import AnimateHeight, { AnimateHeightProps } from "react-animate-height";
import { Box, BoxProps } from "../Box";

type AnimateHeightOptions = Pick<
  AnimateHeightProps,
  | "animationStateClasses"
  | "applyInlineTransitions"
  | "delay"
  | "easing"
  | "style"
  | "children"
>;

interface CollapseOptions {
  /**
   * If `true`, the content will be visible
   */
  isOpen?: boolean;
  /**
   * If `true`, the opacity of the content will be animated
   */
  animateOpacity?: boolean;
  /**
   * The duration of the animation in `ms`
   */
  duration?: number;
  /**
   * The height you want the content in it's collapsed state. Set to `0` by default
   */
  startingHeight?: number | string;
  /**
   * The height you want the content in it's expanded state. Set to `auto` by default
   */
  endingHeight?: number | string;
  /**
   * The function to be called when the collapse animation starts. It provides the `newHeight` as an argument
   */
  onAnimationEnd?(props: { newHeight: number }): void;
  /**
   * The function to be called when the collapse animation ends. It provides the `newHeight` as an argument
   */
  onAnimationStart?(props: { newHeight: number }): void;
}

export type CollapseProps<P, T> = AnimateHeightOptions &
  CollapseOptions &
  BoxProps<P, T>;

const Collapse = forwardRef(function Collapse<P = {}, T = HTMLElement>(
  {
    isOpen,
    animateOpacity = true,
    onAnimationStart,
    onAnimationEnd,
    duration,
    easing = "ease",
    startingHeight = 0,
    endingHeight = "auto",
    ...rest
  }: CollapseProps<P, T>,
  ref: React.Ref<any>,
) {
  return (
    <AnimateHeight
      duration={duration}
      easing={easing}
      animateOpacity={animateOpacity}
      height={isOpen ? endingHeight : startingHeight}
      applyInlineTransitions={false}
      css={{
        transition:
          "height .2s ease,opacity .2s ease-in-out,transform .2s ease-in-out",
        "&.rah-animating--to-height-zero": {
          opacity: 0,
          transform: "translateY(-0.625rem)",
        },
      }}
      {...{ onAnimationStart, onAnimationEnd }}
    >
      <Box ref={ref} {...rest} />
    </AnimateHeight>
  );
}) as <P, T>(
  props: CollapseProps<P, T>,
) => React.ReactElement<CollapseProps<P, T>>;

export default Collapse;
