// Credit: https://github.com/reakit/reakit/blob/master/packages/reakit/src/Portal/Portal.tsx

import { canUseDOM } from "@chakra-ui/utils";
import * as React from "react";

export const PortalContext = React.createContext(
  typeof document !== "undefined" ? document.body : null,
);

function usePortal(className?: string) {
  const portalParent = React.useContext(PortalContext);
  const [portalNode] = React.useState(() => {
    if (canUseDOM) {
      const rootContainer = document.createElement("div");
      rootContainer.className = className || "chakra__portal";
      return rootContainer;
    }

    // ssr
    return null;
  });

  React.useEffect(() => {
    if (!portalNode || !portalParent) return undefined;
    portalParent.appendChild(portalNode);
    return () => {
      portalParent.removeChild(portalNode);
    };
  }, [portalNode, portalParent]);

  if (portalNode) {
    const PortalProvider = (props: any) => (
      <PortalContext.Provider value={portalNode} {...props} />
    );
    return [PortalProvider, portalNode] as const;
  }

  // ssr
  return null;
}

export default usePortal;
