function getUnit(value: string) {
  const len = value.length
  if (!value || !len) return null

  let i = len
  // eslint-disable-next-line no-plusplus
  while (i--)
    if (!Number.isNaN(value[i])) {
      return value.slice(i + 1, len) || null
    }

  return null
}

export default getUnit
