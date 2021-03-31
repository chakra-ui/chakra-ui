const doc = {
  body: {
    classList: {
      add() {},
      remove() {},
    },
  },
  addEventListener() {},
  removeEventListener() {},
  activeElement: {
    blur() {},
    nodeName: "",
  },
  querySelector() {
    return null
  },
  querySelectorAll() {
    return []
  },
  getElementById() {
    return null
  },
  createEvent() {
    return {
      initEvent() {},
    }
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return []
      },
    }
  },
}

export const ssrDocument = (doc as unknown) as Document
