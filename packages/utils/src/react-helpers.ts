import * as React from "react";
import { isFunction } from "./assertion";

export function createContext<T>(strict = true, message = "useContext must be inside a Provider with a value") {
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
  return React.Children.toArray(children).filter(child => React.isValidElement(child)) as React.ReactElement[];
}

type ReactRef<T> = React.Ref<T> | React.RefObject<T> | React.MutableRefObject<T>;

export function assignRef<T = any>(ref: ReactRef<T> | undefined, value: T) {
  if (ref == null) return;

  if (isFunction(ref)) {
    ref(value);
    return;
  }

  try {
    (ref as React.MutableRefObject<T>).current = value;
  } catch (error) {
    throw new Error(`Cannot assign value "${value}" to ref "${ref}"`);
  }
}

export function mergeRefs<T>(...refs: (ReactRef<T> | undefined)[]) {
  return (value: T) => {
    refs.forEach(ref => assignRef(ref, value));
  };
}
