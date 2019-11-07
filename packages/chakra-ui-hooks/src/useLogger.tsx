import { useDeepCompareEffect } from "use-deep-compare";

function useLogger<T>(value: T, format = "log") {
  useDeepCompareEffect(() => {
    //@ts-ignore
    console[format](value);
  }, [value]);
}

export default useLogger;
