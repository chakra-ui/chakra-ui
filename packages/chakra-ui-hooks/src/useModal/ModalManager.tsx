import * as React from "react";
import createCtx from "../useCreateContext";

interface ManagerContextType {
  add: (modal?: any) => void;
  remove: (modal?: any) => void;
  modals: ElementRef[];
}

const [useManager, ManagerProvider] = createCtx<ManagerContextType>();
type ElementRef = React.RefObject<HTMLElement>;

function Manager({ children }: { children: React.ReactNode }) {
  const [modals, setModals] = React.useState<ElementRef[]>([]);

  const add = React.useCallback(
    modal => setModals(modals => [...modals, modal]),
    [],
  );

  const remove = React.useCallback(
    modal => setModals(modals => modals.filter(_modal => _modal !== modal)),
    [],
  );

  const ctx = React.useMemo(
    () => ({
      add,
      remove,
      modals,
    }),
    [add, remove, modals],
  );

  return <ManagerProvider value={ctx}>{children}</ManagerProvider>;
}

export { useManager };
export default Manager;
