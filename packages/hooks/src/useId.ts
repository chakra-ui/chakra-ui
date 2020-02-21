import { useUID } from "react-uid"

const generatePrefix = (str: string, id: string | number) => `${str}-${id}`

export function useId(idPrefix?: string, idProp?: string) {
  const uuid = useUID()
  if (idProp) return idProp
  if (idPrefix) return generatePrefix(idPrefix, uuid)
  return uuid
}

export function useIds(...prefixes: string[]) {
  const uuid = useId()
  const ids = prefixes.map(prefix => generatePrefix(prefix, uuid))
  return ids
}
