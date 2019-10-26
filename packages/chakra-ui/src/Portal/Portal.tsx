// https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Portal/Portal.js

import React, { useState, forwardRef, ReactInstance } from "react";
import { findDOMNode, createPortal } from "react-dom";
import { assignRef } from "@chakra-ui/utils";
import { useEnhancedEffect } from "@chakra-ui/hooks";

type Container = ReactInstance | (() => ReactInstance | null) | null;

export interface PortalProps {
  /**
   * The children to render into the `container`.
   */
  children: React.ReactNode;
  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: Container;
  /**
   * If `true`, the children stay within it's parent DOM hierarchy.
   */
  isDisabled?: boolean;
  /**
   * Callback fired once the children has been mounted into the `container`.
   */
  onRendered?: () => void;
}

function getContainer(container: Container) {
  const _container = typeof container === "function" ? container() : container;
  return findDOMNode(_container) as Element;
}

const Portal = forwardRef(function(
  { children, container, isDisabled = false, onRendered }: PortalProps,
  ref: React.Ref<any>,
) {
  const [mountNode, setMountNode] = useState<Element | null>(null);
  // const handleRef = mergeRefs(children.ref, ref);

  useEnhancedEffect(() => {
    if (!isDisabled && container) {
      const _mountNode = getContainer(container) || document.body;
      setMountNode(_mountNode);
    }
  }, [container, isDisabled]);

  useEnhancedEffect(() => {
    if (mountNode && !isDisabled) {
      assignRef(ref, mountNode);
      return () => {
        assignRef(ref, null);
      };
    }

    return undefined;
  }, [ref, mountNode, isDisabled]);

  useEnhancedEffect(() => {
    if (onRendered && (mountNode || isDisabled)) {
      onRendered();
    }
  }, [onRendered, mountNode, isDisabled]);

  // if (isDisabled) {
  //   Children.only(children);
  //   return cloneElement(children, {
  //     ref: handleRef,
  //   });
  // }

  return mountNode ? createPortal(children, mountNode) : mountNode;
});

export default Portal;
