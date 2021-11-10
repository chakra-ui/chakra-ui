import { cookieStorageManager, storageKey } from "../src"

test.each([
  ["", undefined],
  ["f", undefined],
  ["n;o;i;c;e", undefined],
  [storageKey, undefined],
  [`${storageKey}=dark`, "dark"],
  [`${storageKey}=light`, "light"],
  [`${storageKey}=light; foo=bar`, "light"],
  [`${storageKey}=dark; foo=bar`, "dark"],
  [`some=cookie; ${storageKey}=dark; foo=bar`, "dark"],
  [`some=cookie; ${storageKey}=light; foo=bar`, "light"],
])("given '%s', cookieStorageManager.get returns '%s'", (input, output) => {
  const manager = cookieStorageManager(input)

  expect(manager.get()).toBe(output)
})

test("given a different initial value, cookieStorageManger prefers cookie value", () => {
  const manager = cookieStorageManager(`${storageKey}=dark`)

  expect(manager.get("light")).toBe("dark")
})
