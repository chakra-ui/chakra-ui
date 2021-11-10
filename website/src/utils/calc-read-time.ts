export function calcReadTime(content: string) {
  const wordsPerMinute = 275
  const words = content.split(" ")
  const textLength = words.length || 1
  return Math.ceil(textLength / wordsPerMinute)
}
