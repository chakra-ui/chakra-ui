import * as React from "react";
import {
  defaultTransitionStyles,
  getElementHeight,
  makeTransitionStyles,
} from "./Collapse.utils";
import { useId, useUpdateEffect, useDisclosure } from "@chakra-ui/hooks";

const raf = requestAnimationFrame;

interface CollapseHookProps {
  startingHeight?: number;
  collapseStyles?: React.CSSProperties;
  expandStyles?: React.CSSProperties;
  defaultIsOpen?: boolean;
  isOpen?: boolean;
  onOpen?(): void;
  onClose?(): void;
}

function useCollapse(props: CollapseHookProps = {}) {
  const ref = React.useRef<any>(null);
  const uuid = useId();

  const disclosure = useDisclosure(props);

  const collapsedHeight = `${props.startingHeight || 0}px`;
  const collapsedStyles = React.useMemo(
    () => ({
      display: collapsedHeight === "0px" ? "none" : "block",
      height: collapsedHeight,
      overflow: "hidden",
    }),
    [collapsedHeight],
  );

  const { expandStyles, collapseStyles } = React.useMemo(
    () => makeTransitionStyles(props),
    [props],
  );

  const [styles, setStyles] = React.useState<React.CSSProperties>(
    disclosure.isOpen ? {} : collapsedStyles,
  );

  const [mountChildren, setMountChildren] = React.useState(disclosure.isOpen);

  useUpdateEffect(() => {
    if (disclosure.isOpen) {
      raf(() => {
        setMountChildren(true);

        setStyles(prevStyles => ({
          ...prevStyles,
          ...expandStyles,
          willChange: "height",
          display: "block",
          overflow: "hidden",
        }));

        raf(() => {
          const height = getElementHeight(ref);
          setStyles(prevStyles => ({ ...prevStyles, height }));
        });
      });
    } else {
      raf(() => {
        const height = getElementHeight(ref);
        setStyles(prevStyles => ({
          ...prevStyles,
          ...collapseStyles,
          willChange: "height",
          height,
        }));

        raf(() => {
          setStyles(prevStyles => ({
            ...prevStyles,
            height: collapsedHeight,
            overflow: "hidden",
          }));
        });
      });
    }
  }, [disclosure.isOpen]);

  const onTransitionEnd = React.useCallback(
    (event: React.TransitionEvent) => {
      if (event.target !== ref.current) return;

      if (disclosure.isOpen) {
        const height = getElementHeight(ref);
        if (height === styles.height) {
          setStyles({});
        } else {
          setStyles(prevStyles => ({ ...prevStyles, height }));
        }
      } else if (styles.height === collapsedHeight) {
        setMountChildren(false);
        setStyles(collapsedStyles);
      }
    },
    [disclosure.isOpen, styles.height, collapsedHeight, collapsedStyles],
  );

  return {
    toggle: {
      type: "button" as React.ButtonHTMLAttributes<any>["type"],
      role: "button",
      id: `collapse-toggle-${uuid}`,
      "aria-controls": `collapse-container-${uuid}`,
      "aria-expanded": disclosure.isOpen,
      tabIndex: 0,
      onClick: disclosure.onToggle,
    },
    collapse: {
      id: `collapse-container-${uuid}`,
      "aria-hidden": disclosure.isOpen ? undefined : true,
      ref,
      onTransitionEnd,
      style: { ...defaultTransitionStyles, ...styles },
    },
    isOpen: disclosure.isOpen,
    onToggle: disclosure.onToggle,
    mountChildren,
  };
}

export default useCollapse;
