import { ResizeObserver as ResizeObserverPolyfill } from "@juggle/resize-observer";
import { useEffect, useRef, useState } from "react";

export default function useResizeObserver() {
  const ref = useRef<HTMLElement>();
  const [size, setSize] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;

    const ro = new ResizeObserver(([entry]) => {
      setSize([entry.contentRect.width, entry.contentRect.height]);
    });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ro.observe(ref.current!);

    return () => {
      ro.disconnect();
    };
  }, []);

  return [ref, size] as const;
}
