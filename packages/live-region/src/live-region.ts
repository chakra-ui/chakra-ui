export interface LiveRegionOptions {
  /**
   * A unique id for the created live region element
   */
  id?: string;
  /**
   * The desired value of the `aria-live` attribute.
   * @default "polite".
   */
  "aria-live"?: "polite" | "assertive";
  /**
   * The desired value of the role attribute
   * @default "log"
   */
  role?: "status" | "alert" | "log";
  /**
   * The desired value of the aria-relevant attribute.
   * @default "additions"
   */
  "aria-relevant"?: React.AriaAttributes["aria-relevant"];
  "aria-atomic"?: React.AriaAttributes["aria-atomic"];
  /**
   * The node to append the live region node to
   */
  parentNode?: HTMLElement;
}

export class LiveRegion {
  region: HTMLElement;
  options: Required<LiveRegionOptions>;
  parentNode: HTMLElement;

  constructor(options?: LiveRegionOptions) {
    this.options = getOptions(options);
    this.region = getRegion(this.options);
    this.parentNode = this.options.parentNode;
    this.parentNode.appendChild(this.region);
  }

  public speak(message: string) {
    this.clear();
    this.region.innerText = message;
  }

  public destroy() {
    if (this.region.parentNode) {
      this.region.parentNode.removeChild(this.region);
    }
  }

  public clear() {
    this.region.innerText = "";
  }
}

function getOptions(options?: LiveRegionOptions) {
  const defaultOptions: Required<LiveRegionOptions> = {
    "aria-live": "polite",
    "aria-atomic": "true",
    "aria-relevant": "all",
    role: "status",
    id: "chakra-a11y-live-region",
    parentNode: document.body,
  };
  if (options) {
    return Object.assign(defaultOptions, options);
  }
  return defaultOptions;
}

function getRegion(options: Required<LiveRegionOptions>) {
  let region = document.getElementById(options.id);
  if (region) {
    return region;
  } else {
    region = document.createElement("div");
    setup(region, options);
    return region;
  }
}

function setup(region: HTMLElement, options: Required<LiveRegionOptions>) {
  region.id = options.id || "chakra-live-region";
  region.className = "__chakra-live-region";
  region.setAttribute("aria-live", options["aria-live"]);
  region.setAttribute("role", options.role);
  region.setAttribute("aria-relevant", options["aria-relevant"]);
  region.setAttribute("aria-atomic", String(options["aria-atomic"]));
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
  });
}

export default LiveRegion;
