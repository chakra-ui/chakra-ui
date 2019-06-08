import React from "react";

export const Component = ({
  getInitialState,
  initialState,
  children,
  didMount,
  refs,
  getRefs
}) => {
  const [state, setState] = React.useState(initialState || getInitialState);
  const outRefs = React.useRef();

  React.useEffect(() => {
    outRefs.current = refs || getRefs;
    didMount && didMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return typeof children === "function"
    ? children({ state, setState, refs: outRefs.current })
    : children;
};
