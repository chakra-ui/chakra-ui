// import { useEnhancedEffect } from "@chakra-ui/hooks";
// import React, { ReactInstance, useState } from "react";
// import { createPortal, findDOMNode } from "react-dom";

// type Container = ReactInstance | null;

// export interface PortalProps {
//   /**
//    * The children to render into the `container`.
//    */
//   children: React.ReactNode | React.ReactPortal;
//   /**
//    * A node, component instance, or function that returns either.
//    * The `container` will have the portal children appended to it.
//    * By default, it uses the body of the top-level document object,
//    * so it's simply `document.body` most of the time.
//    */
//   container?: Container | (() => Container);
//   /**
//    * If `true`, the children stay within it's parent DOM hierarchy.
//    */
//   isDisabled?: boolean;
//   /**
//    * Callback fired once the children has been mounted into the `container`.
//    */
//   onRendered?: () => void;
// }

// function getContainer(container: PortalProps["container"]) {
//   const _container = typeof container === "function" ? container() : container;
//   return findDOMNode(_container) as HTMLElement;
// }

// const Portal = ({ children, container }: PortalProps) => {
//   // @ts-ignore
//   const [mountNode, setMountNode] = useState<HTMLElement>(null);

//   useEnhancedEffect(() => {
//     setMountNode(getContainer(container) || document.body);
//   }, [container]);

//   const _node = mountNode ? createPortal(children, mountNode) : mountNode;
//   return _node as React.ReactPortal;
// };

// export default Portal;
