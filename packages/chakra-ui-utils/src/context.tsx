import * as React from "react";

export function createContext<T>() {
  const Context = React.createContext<T | undefined>(undefined);

  function useContext() {
    const context = React.useContext(Context);
    if (!context)
      throw new Error("useContext must be inside a Provider with a value");
    return context;
  }

  return [Context.Provider, useContext] as const; // make TypeScript infer a tuple, not an array of union types
}
