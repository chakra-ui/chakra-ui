import * as React from "react";
import { useLayersContext } from "../Layers";

function useStackContext(ref: React.Ref<any>, isOpen?: boolean) {
  const manager = useLayersContext();

  React.useEffect(() => {
    if (!isOpen) return;
    if (manager.modals) manager.modals.add(ref);
    return () => {
      if (manager.modals) manager.modals.remove(ref);
    };
    // eslint-disable-next-line
  }, [isOpen, ref]);

  return manager.modals.value;
}

export default useStackContext;
