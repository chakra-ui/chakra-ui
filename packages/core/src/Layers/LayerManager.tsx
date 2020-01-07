import * as React from "react";
import { createContext } from "@chakra-ui/utils";

export interface LayersContextType {
  host: HTMLElement;
  zIndex?: number;
  modals: {
    value: any[];
    add: (modal: any) => void;
    remove: (modal: any) => void;
  };
}

const [LayersProvider, useLayersContext] = createContext<LayersContextType>(
  true,
);

export { useLayersContext };

interface LayerManagerProps {
  children?: React.ReactNode;
  zIndex?: number;
}

// This component should be used once in the root
export function LayerManager({ children, zIndex }: LayerManagerProps) {
  // The element that wraps the stacked layers
  const hostRef = React.useRef<HTMLDivElement>(null);

  // force an update so the Provider works correctly
  const [, forceUpdate] = React.useState();
  React.useEffect(() => {
    forceUpdate({});
  }, []);

  // Just a hack to help me manage multiple modals
  const [modals, setModals] = React.useState<any[]>([]);
  const add = React.useCallback(
    modal => setModals((modals: any) => [...modals, modal]),
    [],
  );
  const remove = React.useCallback(
    modal => setModals(modals => modals.filter(_modal => _modal !== modal)),
    [],
  );

  // let's detect if use has mutiple instances of this component
  const parent = useLayersContext();

  // Broadcast the host element via context
  // If user passed a stacking context (aka z-index), send that as well
  const context = {
    host: parent?.host || hostRef.current,
    zIndex,
    modals: { value: modals, add, remove },
  };

  return (
    <LayersProvider value={context}>
      {children}
      <div className="__chakra--layer-manager" ref={hostRef} />
    </LayersProvider>
  );
}

export default LayerManager;
