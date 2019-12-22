import { useUID } from "react-uid";

const prefix = (str: string, id: string | number) => `${str}-${id}`;

function useId(idPrefix?: string, idProp?: string) {
  const uuid = useUID();
  if (idProp) return idProp;
  if (idPrefix) return prefix(idPrefix, uuid);
  return uuid;
}

export default useId;
