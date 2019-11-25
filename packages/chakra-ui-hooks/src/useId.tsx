import { useUID } from "react-uid";

function useId(prefix?: string, idProp?: string) {
  const uuid = useUID();
  const id = idProp || uuid;
  return prefix ? `${prefix}-${id}` : id;
}

export default useId;
