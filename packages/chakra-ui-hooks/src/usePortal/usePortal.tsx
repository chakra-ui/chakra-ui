// Credit: https://github.com/reakit/reakit/blob/master/packages/reakit/src/Portal/Portal.tsx
import { canUseDOM } from "@chakra-ui/utils";
import * as React from "react";
import * as ReactDOM from "react-dom";

export const PortalContext = React.createContext(
  canUseDOM ? document.body : null,
);

function Portal({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}): React.ReactPortal | null {
  const context = React.useContext(PortalContext);
  const [portal] = React.useState(() => {
    if (typeof document !== "undefined") {
      const element = document.createElement("div");
      element.className = className || "chakra__portal";
      return element;
    }
    // ssr
    return null;
  });

  React.useEffect(() => {
    if (!portal || !context) return undefined;
    context.appendChild(portal);
    return () => {
      context.removeChild(portal);
    };
  }, [portal, context]);

  if (portal) {
    return ReactDOM.createPortal(
      <PortalContext.Provider value={portal}>
        {children}
      </PortalContext.Provider>,
      portal,
    );
  }

  // ssr
  return null;
}

export default Portal;
