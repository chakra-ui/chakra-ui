import useId from "./useId";

const prefix = (str: string, id: string | number) => `${str}-${id}`;

function useIds(...prefixes: string[]) {
  const uuid = useId();
  const ids = prefixes.map(p => prefix(p, uuid));
  return ids;
}

export default useIds;
