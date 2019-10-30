import * as React from "react";

function useLogger<T>(value: T, format = "log") {
  React.useEffect(() => {
    //@ts-ignore
    console[format](value);
  }, [value]);
}

export default useLogger;
