import { useUID } from "react-uid";

const generatePrefix = (str: string, id: string | number) => `${str}-${id}`;

export function useId(idPrefix?: string, idProp?: string) {
  const uuid = useUID();
  if (idProp) return idProp;
  if (idPrefix) return generatePrefix(idPrefix, uuid);
  return uuid;
}

export default useId;
