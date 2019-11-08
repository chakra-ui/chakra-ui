import { useEffect } from "react";

function useLogger<T>(value: T, format = "log") {
  useEffect(() => {
    //@ts-ignore
    console[format](value);
  }, [value]);
}

export default useLogger;
