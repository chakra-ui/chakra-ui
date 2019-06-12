import { useState } from "react";

const useDisclosure = defaultIsOpen => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen || false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const onToggle = () => setIsOpen(!isOpen);
  return { isOpen, onOpen, onClose, onToggle };
};

export default useDisclosure;
