/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Reference } from "react-popper";
import { assignRef } from "../utils";
import { useMenuContext } from "./MenuContext";

export const MenuButton = ({ as: Comp = "button", ...props }) => {
  const {
    state: { isOpen },
    focusOnLastItem,
    focusOnFirstItem,
    closeMenu,
    menuId,
    buttonId,
    autoSelect,
    openMenu,
    buttonRef
  } = useMenuContext();

  const handleKeyDown = event => {
    if (event.key === "ArrowDown") {
      event.preventDefault(); // prevent scroll
      focusOnFirstItem();
    }

    if (event.key === "ArrowUp") {
      event.preventDefault(); // prevent scroll
      focusOnLastItem();
    }
  };

  return (
    <Reference>
      {({ ref: referenceRef }) => (
        <Comp
          {...props}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls={menuId}
          id={buttonId}
          role="button"
          ref={node => {
            assignRef(buttonRef, node);
            assignRef(referenceRef, node);
          }}
          onClick={() => {
            if (isOpen) {
              closeMenu();
            } else {
              autoSelect ? focusOnFirstItem() : openMenu();
            }
          }}
          onKeyDown={handleKeyDown}
        />
      )}
    </Reference>
  );
};
