import { useUID } from "react-uid"

function generatePrefix(str: string, id: string | number) {
  return `${str}-${id}`
}

export function useId(idProp?: string, idPrefix?: string) {
  const uuid = useUID()
  if (idProp) return idProp
  if (idPrefix) return generatePrefix(idPrefix, uuid)
  return uuid
}

export function useIds(
  idProp: string | null | undefined,
  ...prefixes: string[]
) {
  const uuid = useId()
  const id = idProp ?? uuid
  const ids = prefixes.map(prefix => generatePrefix(prefix, id))
  return ids
}
