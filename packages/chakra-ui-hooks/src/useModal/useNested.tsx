import * as React from "react";
import useMountedState from "../useMountedState";
import useLogger from "../useLogger";

interface NestingContextType {
  add?: (ref: React.RefObject<any>) => void;
  remove?: (ref: React.RefObject<any>) => void;
  visible?: any;
}

const NestingContext = React.createContext<NestingContextType>({});
const useNestingContext = () => React.useContext(NestingContext);

type ElementRef = React.RefObject<HTMLElement>;

export function useNested(ref: ElementRef) {
  const visible = useMountedState();
  const [nested, setNested] = React.useState<ElementRef[]>([]);
  const context = useNestingContext();

  useLogger("nested", nested);

  const add = React.useCallback(
    (ref: ElementRef) => {
      if (context.add) {
        context.add(ref);
      } else {
        setNested(refs => [...refs, ref]);
      }
    },
    [context],
  );

  const remove = React.useCallback(
    (ref: ElementRef) => {
      if (context.remove) {
        context.remove(ref);
      } else {
        setNested(refs => refs.filter(_ref => _ref !== ref));
      }
    },
    [context],
  );

  React.useEffect(() => {
    if (visible && context.add) {
      context.add(ref);
    }
    return () => {
      if (visible && context.remove) {
        context.remove(ref);
      }
    };
  }, [ref, visible, context]);

  const ctx = React.useMemo(
    () => ({
      visible,
      add,
      remove,
    }),
    [add, remove, visible],
  );

  const wrapper = React.useCallback(
    ({ children }) => (
      <NestingContext.Provider value={ctx}>{children}</NestingContext.Provider>
    ),
    [ctx],
  );

  return [wrapper, nested, visible] as const;
}

export default useNested;
