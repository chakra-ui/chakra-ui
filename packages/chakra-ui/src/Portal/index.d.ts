import * as React from "react";

export interface PortalProps {
  /**
   * The children to render into the `container`.
   */
  children?: React.ReactNode;
  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: React.ReactInstance | (() => React.ReactInstance | null) | null;
  /**
   * If `true`, the children stay within it's parent DOM hierarchy.
   */
  isDisabled?: boolean;
  /**
   * Callback fired once the children has been mounted into the `container`.
   */
  onRendered?: () => void;
}

declare const Portal: React.FC<PortalProps>;

export default Portal;
