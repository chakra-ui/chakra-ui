import type { z } from "zod"
import * as S from "./schema"

interface Compositions extends z.infer<typeof S.compositionIndex> {}

const findCompositionById = (compositions: Compositions, id: string) => {
  return compositions.find((comp) => comp.id === id)
}

export const getFileDependencies = (compositions: Compositions, id: string) => {
  const composition = findCompositionById(compositions, id)
  if (!composition) return []

  const dependencies = new Set<string>()

  const collect = (compositionId: string) => {
    const comp = findCompositionById(compositions, compositionId)
    if (!comp) return

    comp.fileDependencies.forEach((dep) => {
      if (dependencies.has(dep)) return
      dependencies.add(dep.replace("compositions/ui/", ""))
      collect(dep)
    })
  }

  collect(id)
  return Array.from(dependencies)
}
