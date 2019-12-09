import * as React from "react";
import constate from "constate";

type ElementRef = React.RefObject<HTMLElement>;

function useModalManager() {
  const [modals, setModals] = React.useState<ElementRef[]>([]);

  const add = React.useCallback(
    modal => setModals(modals => [...modals, modal]),
    [],
  );

  const remove = React.useCallback(
    modal => setModals(modals => modals.filter(_modal => _modal !== modal)),
    [],
  );

  return {
    add,
    remove,
    modals,
  };
}

const [ModalManager, useManager] = constate(useModalManager);
export { useManager };
export default ModalManager;
