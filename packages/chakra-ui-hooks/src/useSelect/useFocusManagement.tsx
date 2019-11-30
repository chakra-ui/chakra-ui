import * as React from "react";
import usePrevious from "../usePrevious";
import { ensureFocus } from "@chakra-ui/utils";

/**
 *  Handles focus management for the select
 */
function useFocusManagement(
  controlRef: React.RefObject<any>,
  listBoxRef: React.RefObject<any>,
  isOpen: boolean,
) {
  const prevIsOpen = usePrevious(isOpen);

  React.useEffect(() => {
    if (isOpen && listBoxRef.current) {
      ensureFocus(listBoxRef.current);
      return;
    }
    if (prevIsOpen && !isOpen && controlRef.current) {
      ensureFocus(controlRef.current);
    }
  }, [isOpen, prevIsOpen, controlRef, listBoxRef]);
}

export default useFocusManagement;
