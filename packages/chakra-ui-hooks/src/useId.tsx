import { useUID } from "react-uid";

function useId(prefix?: string) {
  const uuid = useUID();
  return prefix ? `${prefix}-${uuid}` : uuid;
}

export default useId;
