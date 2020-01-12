import * as React from "react";
import ReactFocusLock from "react-focus-lock";

interface FocusLockProps {
  initialFocusRef?: React.RefObject<any>;
  finalFocusRef?: React.RefObject<any>;
  restoreFocus?: boolean;
  children: React.ReactNode;
}

function ModalFocusLock(props: FocusLockProps) {
  const { initialFocusRef, finalFocusRef, restoreFocus, children } = props;

  const onActivation = React.useCallback(() => {
    if (initialFocusRef?.current) {
      initialFocusRef.current.focus();
    }
  }, [initialFocusRef]);

  const onDeactivation = React.useCallback(() => {
    if (finalFocusRef && finalFocusRef.current) {
      finalFocusRef.current.focus();
    }
  }, [finalFocusRef]);

  const returnFocus = restoreFocus && !finalFocusRef;

  return (
    <ReactFocusLock
      onActivation={onActivation}
      onDeactivation={onDeactivation}
      returnFocus={returnFocus}
    >
      {children}
    </ReactFocusLock>
  );
}

export default ModalFocusLock;
