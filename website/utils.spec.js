const { sortPostNodes } = require("./utils")

test("sortPostNodes", () => {
  const nodes = [
    { frontmatter: { title: "B" }, fields: { collection: "utilities" } },
    {
      frontmatter: { title: "A", order: 1 },
      fields: { collection: "components" },
    },
    { frontmatter: { title: "B" }, fields: { collection: "components" } },
    { frontmatter: { title: "C" }, fields: { collection: "components" } },
    { frontmatter: { title: "B", order: 2 }, fields: { collection: "main" } },
    { frontmatter: { title: "A" }, fields: { collection: "utilities" } },
    { frontmatter: { title: "A", order: 1 }, fields: { collection: "main" } },
  ]

  const expected = [
    { frontmatter: { title: "A", order: 1 }, fields: { collection: "main" } },
    { frontmatter: { title: "B", order: 2 }, fields: { collection: "main" } },
    {
      frontmatter: { title: "A", order: 1 },
      fields: { collection: "components" },
    },
    { frontmatter: { title: "B" }, fields: { collection: "components" } },
    { frontmatter: { title: "C" }, fields: { collection: "components" } },
    { frontmatter: { title: "A" }, fields: { collection: "utilities" } },
    { frontmatter: { title: "B" }, fields: { collection: "utilities" } },
  ]

  expect(sortPostNodes(nodes)).toEqual(expected)
})
