type MediaQueryListener = (this: MediaQueryList) => void

interface MediaQueryList {
  readonly matches: boolean
  readonly media: string
  onchange: MediaQueryListener | null
  addListener(listener: MediaQueryListener): void
  removeListener(listener: MediaQueryListener): void
  addEventListener(type: "change", listener: MediaQueryListener): void
  removeEventListener(type: "change", listener: MediaQueryListener): void
  dispatchEvent(event: Event): boolean
}

type MediaQueriesType = { [key: string]: MediaQueryListener[] }

export default class MatchMedia {
  private mediaQueries: MediaQueriesType = {}
  private prevMatchMap = new Map<string, boolean>()

  private mediaQueryList!: MediaQueryList

  constructor() {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: (query: string): MediaQueryList => {
        this.mediaQueryList = {
          matches: this.evalQuery(query),
          media: query,
          onchange: null,
          addListener: (listener) => {
            this.addListener(query, listener)
          },
          removeListener: (listener) => {
            this.removeListener(query, listener)
          },
          addEventListener: (type, listener) => {
            if (type !== "change") return

            this.addListener(query, listener)
          },
          removeEventListener: (type, listener) => {
            if (type !== "change") return

            this.removeListener(query, listener)
          },
          dispatchEvent: vi.fn(),
        }

        return this.mediaQueryList
      },
    })

    window.addEventListener("resize", () => this.handleResize())
  }

  // eslint-disable-next-line class-methods-use-this
  private compileQuery(query: string) {
    type UnitsReplaceType = ($0: string, $1: string, $2: UnitType) => string

    type UnitType =
      | "cm"
      | "em"
      | "rem"
      | "in"
      | "dppx"
      | "mm"
      | "pc"
      | "pt"
      | "px"

    function unitToPixels(unit: UnitType): number {
      switch (unit) {
        case "cm":
          return 0.3937 * 96
        case "em":
        case "rem":
          return 16
        case "in":
        case "dppx":
          return 96
        case "mm":
          return (0.3937 * 96) / 10
        case "pc":
          return (12 * 96) / 72
        case "pt":
          return 96 / 72
        case "px":
        default:
          return 1
      }
    }

    const unitsReplace: UnitsReplaceType = (_, $1, $2) =>
      String(+$1 * unitToPixels($2))

    return "try { return !!(%s) } catch(e) { return false }".replace(
      "%s",
      query
        .split(/\s*,\s*/g)
        .map((part) =>
          part
            .replace(/^\s*only\s+/, "")
            .replace(/^\s*not\s*(.+)/, "!($1)")
            .replace(/(?:min-)([\w.]+)\s*:\s*/g, "media.$1 >= ")
            .replace(/(?:max-)([\w.]+)\s*:\s*/g, "media.$1 <= ")
            .replace(/([\w.]+)\s*:\s*/g, "media.$1 === ")
            .replace(/\s*all|screen\s*/g, "true")
            .replace(/\s*print\s*/g, "false")
            .replace(/[\s()]+or[\s()]+/g, " || ")
            .replace(/\s*and\s*/g, " && ")
            .replace(/dpi/g, "")
            .replace(/(\d+)(cm|em|in|dppx|mm|pc|pt|px|rem)/g, unitsReplace)
            .replace(/^(.*)$/, "($1)"),
        )
        .join(" || "),
    )
  }

  private evalQuery(query: string): boolean {
    const result = !!(
      // eslint-disable-next-line no-new-func,@typescript-eslint/no-implied-eval
      new Function("media", this.compileQuery(query))({
        width: window.innerWidth,
        height: window.innerHeight,
        orientation: window.screen.orientation
          ? window.screen.orientation.type.replace(
              /^(landscape|portrait).*$/,
              "$1",
            )
          : "landscape",
      })
    )

    return result
  }

  /**
   *
   * Adds a listener function for the window resize event
   * @private
   */
  private handleResize() {
    for (const [query, listeners] of Object.entries(this.mediaQueries)) {
      const matches = this.evalQuery(query)

      if (this.prevMatchMap.get(query) !== matches) {
        this.prevMatchMap.set(query, matches)

        const mqListEvent: Partial<MediaQueryListEvent> = {
          matches,
          media: query,
        }

        listeners.forEach((listener) => {
          ;(listener as Function)?.call(
            this.mediaQueryList,
            mqListEvent as MediaQueryListEvent,
          )
        })
      }
    }
  }

  private addListener(mediaQuery: string, listener: MediaQueryListener): void {
    if (!this.mediaQueries[mediaQuery]) {
      this.mediaQueries[mediaQuery] = []
    }

    const query = this.mediaQueries[mediaQuery]
    const listenerIndex = query.indexOf(listener)

    if (listenerIndex !== -1) return
    query.push(listener)

    if (!this.prevMatchMap.has(mediaQuery)) {
      this.prevMatchMap.set(mediaQuery, this.evalQuery(mediaQuery))
    }
  }

  private removeListener(
    mediaQuery: string,
    listener: MediaQueryListener,
  ): void {
    if (!this.mediaQueries[mediaQuery]) {
      return
    }

    const query = this.mediaQueries[mediaQuery]
    const listenerIndex = query.indexOf(listener)

    if (listenerIndex !== -1) return
    query.splice(listenerIndex, 1)

    if (query.length === 0 && this.prevMatchMap.has(mediaQuery)) {
      this.prevMatchMap.delete(mediaQuery)
    }
  }

  /**
   * Returns an array listing the media queries for which the matchMedia has registered listeners
   * @public
   */
  public getMediaQueries(): string[] {
    return Object.keys(this.mediaQueries)
  }

  /**
   * Returns a copy of the array of listeners for the specified media query
   * @public
   */
  public getListeners(mediaQuery: string): MediaQueryListener[] {
    if (!this.mediaQueries[mediaQuery]) return []
    return this.mediaQueries[mediaQuery].slice()
  }

  /**
   * Clears all registered media queries and their listeners
   * @public
   */
  public clear(): void {
    this.mediaQueries = {}
  }

  /**
   * Clears all registered media queries and their listeners,
   * and destroys the implementation of `window.matchMedia`
   * @public
   */
  public destroy(): void {
    this.clear()
    // @ts-ignore
    delete window.matchMedia
  }
}
