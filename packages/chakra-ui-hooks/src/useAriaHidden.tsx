import { canUseDOM } from "@chakra-ui/utils";
import { useRef, useEffect } from "react";
import { hideOthers, Undo } from "aria-hidden";

interface useAriaHiddenOptions {
  id: string;
  isEnabled?: boolean;
  container?: HTMLElement | null;
}

function useAriaHidden({
  id,
  isEnabled,
  container = canUseDOM ? document.body : null,
}: useAriaHiddenOptions) {
  const mountRef = useRef(
    canUseDOM
      ? document.getElementById(id) || document.createElement("div")
      : null,
  );

  useEffect(() => {
    let undoAriaHidden: Undo | null = null;
    let mountNode = mountRef.current;

    if (isEnabled && canUseDOM && mountRef.current && container) {
      mountRef.current.id = id;
      container.appendChild(mountRef.current);
      if (mountNode) {
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
  }, [id, isEnabled, container]);

  return mountRef;
}

export default useAriaHidden;
