import { setScript, ConfigColorMode } from "../src"

describe("color-mode-script", () => {
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
    const systemIsDarkMode = entry.system === "dark"
    const documentStyleMock = jest.spyOn(
      document.documentElement.style,
      "setProperty",
    )
    const documentSetAttributeMock = jest.spyOn(
      document.documentElement,
      "setAttribute",
    )
    global.matchMedia = jest.fn().mockImplementation((query) => {
      if (query === "(prefers-color-scheme: dark)") {
        return {
          matches: systemIsDarkMode,
        }
      }
    })
    setScript(entry.initial as ConfigColorMode)
    expect(documentStyleMock).toHaveBeenCalledWith(
      "--chakra-ui-color-mode",
      entry.expect,
    )

    expect(documentSetAttributeMock).toHaveBeenCalledWith(
      "data-theme",
      entry.expect,
    )
  })
})
