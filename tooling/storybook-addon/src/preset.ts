export function config(entry = []) {
  return [...entry, require.resolve('./preset/addDecorators')];
}

export function managerEntries(entry = []) {
    return [...entry, require.resolve("./preset/register")];
  }