export function config(entry = []) {
  return [...entry, require.resolve("./preview")]
}
