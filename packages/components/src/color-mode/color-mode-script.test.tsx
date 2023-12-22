import { getScriptSrc, ConfigColorMode, cookieStorageManager } from "."
import { mockMatchMedia } from "./test.fixture"

describe.skip("localStorage: color-mode-script", () => {
  it.each(
    [
      { system: "light", initial: "light", expect: "light" },
      { system: "dark", initial: "light", expect: "light" },
      { system: "light", initial: "dark", expect: "dark" },
      { system: "dark", initial: "dark", expect: "dark" },
      { system: "light", initial: "system", expect: "light" },
      { system: "dark", initial: "system", expect: "dark" },
    ].map((item) => ({
      ...item,
      toString: () => `case: ${JSON.stringify(item)}`,
    })),
  )("%s", (entry) => {
    mockMatchMedia(entry.system)
    localStorage.removeItem("chakra-ui-color-mode")

    const script = document.createElement("script")
    script.innerHTML = getScriptSrc({
      initialColorMode: entry.initial as ConfigColorMode,
      type: "localStorage",
    })
    document.body.prepend(script)

    expect(document.documentElement.dataset.theme).toEqual(entry.expect)
  })
})

describe.skip("cookie: color-mode-script", () => {
  it.each(
    [
      { system: "light", initial: "light", expect: "light" },
      { system: "dark", initial: "light", expect: "light" },
      { system: "light", initial: "dark", expect: "dark" },
      { system: "dark", initial: "dark", expect: "dark" },
      { system: "light", initial: "system", expect: "light" },
      { system: "dark", initial: "system", expect: "dark" },
    ].map((item) => ({
      ...item,
      toString: () => `case: ${JSON.stringify(item)}`,
    })),
  )("%s", (entry) => {
    mockMatchMedia(entry.system)
    //@ts-ignore
    cookieStorageManager.set("")

    const script = document.createElement("script")
    script.innerHTML = getScriptSrc({
      initialColorMode: entry.initial as ConfigColorMode,
      type: "cookie",
    })
    document.body.prepend(script)

    expect(document.documentElement.dataset.theme).toEqual(entry.expect)
  })
})
