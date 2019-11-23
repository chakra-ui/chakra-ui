import * as React from "react";
import useControllableValue from "./useControllableValue";
import usePrevious from "./usePrevious";

export interface UseDisclosureOptions {
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

const useDisclosure = (props: UseDisclosureOptions = {}) => {
  const [isOpen, setIsOpen] = React.useState(props.defaultIsOpen || false);
  const [isControlled, isOpenValue] = useControllableValue(
    props.isOpen,
    isOpen,
  );

  const prevIsOpen = usePrevious(isOpenValue);

  const onClose = React.useCallback(() => {
    if (!isControlled) {
      setIsOpen(false);
    }
    if (props.onClose) {
      props.onClose();
    }
  }, [props.onClose]);

  const onOpen = React.useCallback(() => {
    if (!isControlled) {
      setIsOpen(true);
    }
    if (props.onOpen) {
      props.onOpen();
    }
  }, [props.onOpen]);

  const onToggle = React.useCallback(() => {
    if (isOpenValue) {
      onClose();
    } else {
      onOpen();
    }
  }, []);

  return {
    isOpen: Boolean(isOpenValue),
    prevIsOpen: Boolean(prevIsOpen),
    onOpen,
    onClose,
    onToggle,
  };
};

export default useDisclosure;
