import { isBrowser } from "@chakra-ui/utils"

export interface LiveRegionOptions {
  /**
   * A unique id for the created live region element
   */
  id?: string
  /**
   * Used to mark a part of the page as "live" so that updates will
   * be communicated to users by screen readers.
   *
   * - If set to `polite`: tells assistive technology to alert the user
   * to this change when it has finished whatever it is currently doing
   *
   * - If set to `assertive`: tells assistive technology to interrupt whatever
   * it is doing and alert the user to this change immediately
   *
   * @default "polite".
   */
  "aria-live"?: "polite" | "assertive"
  /**
   * The desired value of the role attribute
   * @default "status"
   */
  role?: "status" | "alert" | "log"
  /**
   * Indicates what types of changes should be presented to the user.
   * @default "all"
   */
  "aria-relevant"?: React.AriaAttributes["aria-relevant"]
  /**
   * Indicates whether the entire region should be
   * considered as a whole when communicating updates
   *
   * @default true
   */
  "aria-atomic"?: React.AriaAttributes["aria-atomic"]
  /**
   * The node to append the live region node to
   */
  parentNode?: HTMLElement
}

export class LiveRegion {
  region: HTMLElement | null
  options: Required<LiveRegionOptions>
  parentNode: HTMLElement

  constructor(options?: LiveRegionOptions) {
    this.options = getOptions(options) as any
    this.region = getRegion(this.options)
    this.parentNode = this.options.parentNode
    if (this.region) {
      this.parentNode.appendChild(this.region)
    }
  }

  public speak(message: string) {
    this.clear()
    if (this.region) {
      this.region.innerText = message
    }
  }

  public destroy() {
    if (this.region) {
      this.region.parentNode?.removeChild(this.region)
    }
  }

  public clear() {
    if (this.region) {
      this.region.innerText = ""
    }
  }
}

function getOptions(options?: LiveRegionOptions) {
  const defaultOptions: LiveRegionOptions = {
    "aria-live": "polite",
    "aria-atomic": "true",
    "aria-relevant": "all",
    role: "status",
    id: "chakra-a11y-live-region",
    parentNode: isBrowser ? document.body : undefined,
  }
  if (options) {
    return Object.assign(defaultOptions, options)
  }
  return defaultOptions
}

function getRegion(options: Required<LiveRegionOptions>) {
  let region = isBrowser ? document.getElementById(options.id) : null

  if (region) return region

  if (isBrowser) {
    region = document.createElement("div")
    setup(region, options)
  }

  return region
}

function setup(region: HTMLElement, options: Required<LiveRegionOptions>) {
  region.id = options.id || "chakra-live-region"
  region.className = "__chakra-live-region"
  region.setAttribute("aria-live", options["aria-live"])
  region.setAttribute("role", options.role)
  region.setAttribute("aria-relevant", options["aria-relevant"])
  region.setAttribute("aria-atomic", String(options["aria-atomic"]))
  Object.assign(region.style, {
    border: "0px",
    clip: "rect(0px, 0px, 0px, 0px)",
    height: "1px",
    width: "1px",
    margin: "-1px",
    padding: "0px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    position: "absolute",
  })
}
