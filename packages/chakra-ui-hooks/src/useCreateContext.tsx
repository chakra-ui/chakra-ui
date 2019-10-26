import * as React from "react";

function useCreateContext<T>() {
  const Context = React.createContext<T | undefined>(undefined);

  function useContext() {
    const context = React.useContext(Context);
    if (!context)
      throw new Error("useContext must be inside a Provider with a value");
    return context;
  }

  return [useContext, Context.Provider] as const; // make TypeScript infer a tuple, not an array of union types
}

export default useCreateContext;
