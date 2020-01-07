import * as React from "react";
import useClickOutside from "./utils/useClickOutside";
import useAriaHidden from "../useAriaHidden";
import useLockBodyScroll from "../useLockBodyScroll";
import { useManager } from "./utils/ModalManager";
import useMountedState from "../useMountedState";
import useId from "../useId";

interface UseModalOptions {
  onClose?: () => void;
}

function useModal({ onClose, ...props }: UseModalOptions) {
  const ref = React.useRef<any>(null);
  const visible = useMountedState();
  const uuid = useId();
  const manager = useManager();

  React.useEffect(() => {
    if (!visible) return;

    if (manager) manager.add(ref);

    return () => {
      if (manager) manager.remove(ref);
    };
    // eslint-disable-next-line
  }, [visible, ref]);

  useAriaHidden(ref, true);
  useLockBodyScroll(ref, { shouldLock: visible });
  useClickOutside(ref, manager.modals, onClose);

  const onKeyDown = React.useCallback(
    event => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose && onClose();
      }
    },
    [onClose],
  );

  return {
    ...props,
    ref,
    id: uuid,
    onKeyDown,
    role: "dialog",
    "aria-modal": true,
    tabIndex: -1,
  };
}

export default useModal;
