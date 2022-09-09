export function splitByComma(value: string) {
  const chunks = []
  let chunk = ""
  let inParens = false
  for (let i = 0; i < value.length; i++) {
    const char = value[i]
    if (char === "(") {
      inParens = true
      chunk += char
    } else if (char === ")") {
      inParens = false
      chunk += char
    } else if (char === "," && !inParens) {
      chunks.push(chunk)
      chunk = ""
    } else {
      chunk += char
    }
  }

  chunk = chunk.trim()
  if (chunk) {
    chunks.push(chunk)
  }

  return chunks
}
