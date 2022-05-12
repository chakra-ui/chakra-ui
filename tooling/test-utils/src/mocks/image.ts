type Status = "loaded" | "error"

const originalImage = window.Image

export function mockImage() {
  let status: Status

  //@ts-expect-error
  window.Image = class Image {
    onload: VoidFunction = () => {
      console.log("called")
    }
    onerror: VoidFunction = () => {}
    src = ""
    alt = ""
    hasAttribute(name: string) {
      return name in this
    }
    getAttribute(name: string) {
      return name in this ? (this as any)[name] : null
    }
    constructor() {
      setTimeout(() => {
        if (status === "error") {
          this.onerror()
        } else {
          this.onload()
        }
      }, mockImage.DELAY)
      return this
    }
  }

  return {
    simulate(value: Status) {
      status = value
    },
    restore() {
      window.Image = originalImage
    },
  }
}

mockImage.restore = () => {
  window.Image = originalImage
}

mockImage.DELAY = 100
