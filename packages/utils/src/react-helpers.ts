import * as React from "react";

export function createContext<T>(
  strict = true,
  message = "useContext must be inside a Provider with a value",
) {
  const Context = React.createContext<T | undefined>(undefined);

  function useContext() {
    const context = React.useContext(Context);
    if (!context && strict) throw new Error(message);
    return context;
  }

  return [Context.Provider, useContext] as [React.Provider<T>, () => T];
}

export function createHookContext<P, R>(hook: (props: P) => R) {
  const [ContextProvider, useContext] = createContext<R>();
  const Provider: React.FC<P> = props => {
    const context = hook(props);
    const memoContext = React.useMemo(() => context, [context]);

    return React.createElement(ContextProvider, {
      value: memoContext,
      children: props.children,
    });
  };
  const useProviderContext = () => useContext();
  return [Provider, useProviderContext] as const;
}

export function cleanChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter(child =>
    React.isValidElement(child),
  ) as React.ReactElement[];
}
