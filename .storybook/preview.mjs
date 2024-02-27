export const parameters = {
  options: {
    storySort: (a, b) => {
      a.title === b.title
        ? 0
        : a.id.localeCompare(b.id, undefined, { numeric: true })
    },
  },
  chakra: {},
}

export const decorators = []
