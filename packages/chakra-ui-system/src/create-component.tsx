import * as React from "react";
import { BoxHTMLProps } from "./system-props";
import { memo, forwardRef } from "./forward-ref";

export type As<P = any> = React.ReactType<P>;

type PropsWithAs<P, T extends As> = P &
  Omit<React.ComponentProps<T>, "as" | keyof P> & {
    as?: T;
    children?: React.ReactNode;
  };

interface Options<T extends As, P> {
  as?: T;
  hook?(props: P): BoxHTMLProps;
}

// Credit to Diego Haz for inspiring this 💖
interface Component<T extends As, O> {
  <P extends As>(props: PropsWithAs<O, P> & { as: P }): JSX.Element;
  (props: PropsWithAs<O, T>): JSX.Element;
  displayName?: string;
  defaultProps?: Partial<O>;
}

function createComponent<T extends As, O>({ as: type, hook }: Options<T, O>) {
  const Comp = (
    { as = type, children, ...props }: PropsWithAs<O, T>,
    ref: React.Ref<any>,
  ) => {
    //@ts-ignore
    if (!hook) return React.createElement(as, props, children);

    // @ts-ignore
    const propsFromHooks = hook({
      children,
      ref,
      as,
      ...props,
    });

    //@ts-ignore
    return React.createElement(as, propsFromHooks, children);
  };

  //@ts-ignore
  return memo(forwardRef(Comp as Component<T, O>));
}

export default createComponent;
