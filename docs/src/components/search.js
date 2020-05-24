import React from "react"
import { get, startsWith } from "lodash/fp"
import { Input } from "@chakra-ui/core"
import "../styles/algolia.css"

const getLvl1 = get("hierarchy.lvl1")
const startsWithCss = startsWith("css-")

export const Search = () => {
  React.useEffect(() => {
    if (window) {
      import("docsearch.js").then(({ default: docsearch }) => {
        window.docsearch = docsearch
        docsearch({
          apiKey: "df1dcc41f7b8e5d68e73dd56d1e19701",
          indexName: "chakra-ui",
          inputSelector: "#algolia-search",
          debug: true,
          transformData(hits) {
            return hits.filter(hit => {
              const lvl1 = getLvl1(hit)
              return !startsWithCss(lvl1)
            })
          },
        })
      })
    }
  })

  return <Input id="algolia-search" />
}
