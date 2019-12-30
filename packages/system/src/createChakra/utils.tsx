import * as React from "react";
import { isPropValid } from "../system";

export const clean = (props: any) => {
  const nextProps: any = {};
  for (const prop in props) {
    if (isPropValid(prop)) nextProps[prop] = props[prop];
  }
  return nextProps;
};

export function sanitize<Props>(Comp: React.ComponentType<Props>) {
  return React.forwardRef((props: Props, ref: React.Ref<any>) => (
    <Comp ref={ref} {...clean(props)} />
  ));
}
