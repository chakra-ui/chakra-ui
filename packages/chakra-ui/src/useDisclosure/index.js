import { useState, useCallback } from "react";

const useDisclosure = defaultIsOpen => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen || false);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onOpen = useCallback(() => setIsOpen(true), []);
  const onToggle = useCallback(() => setIsOpen(prevIsOpen => !prevIsOpen), []);
  return { isOpen, onOpen, onClose, onToggle };
};

export default useDisclosure;
