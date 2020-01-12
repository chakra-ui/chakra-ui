import useId from "./useId";

const generatePrefix = (str: string, id: string | number) => `${str}-${id}`;

export function useIds(...prefixes: string[]) {
  const uuid = useId();
  const ids = prefixes.map(prefix => generatePrefix(prefix, uuid));
  return ids;
}

export default useIds;
