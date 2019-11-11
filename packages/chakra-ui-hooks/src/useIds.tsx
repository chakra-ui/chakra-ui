import useId from "./useId";

const prefix = (str: string, id: string | number) => `${str}-${id}`;

function useIds(prefixes: string[], id?: string) {
  const uuid = useId();
  const _id = id || uuid;
  const ids = prefixes.map(p => prefix(p, _id));
  return ids;
}

export default useIds;
