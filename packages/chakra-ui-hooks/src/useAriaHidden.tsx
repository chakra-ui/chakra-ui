import { canUseDOM } from "exenv";
import { useRef, useEffect } from "react";
import { hideOthers, Undo } from "aria-hidden";

interface Options {
  isOpen?: boolean;
  id: string;
  isEnabled?: boolean;
  container?: HTMLElement | null;
}

function useAriaHidden({
  isOpen,
  id,
  isEnabled,
  container = canUseDOM ? document.body : null,
}: Options) {
  const mountRef = useRef(
    canUseDOM
      ? document.getElementById(id) || document.createElement("div")
      : null,
  );

  useEffect(() => {
    let undoAriaHidden: Undo | null = null;
    let mountNode = mountRef.current;

    if (isOpen && canUseDOM && mountRef.current && container) {
      mountRef.current.id = id;
      container.appendChild(mountRef.current);
      if (isEnabled && mountNode) {
        undoAriaHidden = hideOthers(mountNode);
      }
    }

    return () => {
      if (isEnabled && undoAriaHidden != null) {
        undoAriaHidden();
      }
      if (mountNode && mountNode.parentElement) {
        mountNode.parentElement.removeChild(mountNode);
      }
    };
  }, [isOpen, id, isEnabled, container]);

  return mountRef;
}

export default useAriaHidden;
