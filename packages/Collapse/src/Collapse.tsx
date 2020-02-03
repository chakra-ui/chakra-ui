/**@jsx jsx */
import { jsx, chakra, PropsOf } from "@chakra-ui/system";
import * as React from "react";
import AnimateHeight, { AnimateHeightProps } from "react-animate-height";

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export interface CollapseOptions {
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
}

type CollapseProps = Pick<
  AnimateHeightProps,
  "easing" | "onAnimationStart" | "onAnimationEnd"
> &
  CollapseOptions &
  Omit<PropsOf<typeof chakra.div>, "onAnimationStart" | "onAnimationEnd">;

export const Collapse = React.forwardRef(
  (props: CollapseProps, ref: React.Ref<any>) => {
    const {
      isOpen,
      animateOpacity = true,
      onAnimationStart,
      onAnimationEnd,
      duration = 130,
      easing = "cubic-bezier(0.45, 0, 0.4, 1)",
      startingHeight = 0,
      endingHeight = "auto",
      children,
      ...rest
    } = props;
    return (
      <chakra.div ref={ref} {...rest}>
        <AnimateHeight
          duration={duration}
          easing={easing}
          animateOpacity={animateOpacity}
          height={isOpen ? endingHeight : startingHeight}
          applyInlineTransitions={false}
          onAnimationStart={onAnimationStart}
          onAnimationEnd={onAnimationEnd}
          css={{
            transition:
              "height .2s ease,opacity .2s ease-in-out,transform .2s ease-in-out",
            "&.rah-animating--to-height-zero": {
              opacity: 0,
              transform: "translateY(-0.625rem)",
            },
            "&.rah-static--height-zero": {
              transform: "translateY(-0.625rem)",
            },
          }}
        >
          {children}
        </AnimateHeight>
      </chakra.div>
    );
  },
);

export default Collapse;
