import type { Compositions } from "./schema"

export const findCompositionById = (compositions: Compositions, id: string) => {
  return compositions.find((comp) => comp.id === id)
}

export const getFileDependencies = (compositions: Compositions, id: string) => {
  const composition = findCompositionById(compositions, id)
  if (!composition) return []

  const fileDependencies = new Set<string>()
  composition.fileDependencies.forEach((dep) => {
    fileDependencies.add(dep.replace("compositions/ui/", ""))
  })

  const npmDependencies = new Set<string>(composition.npmDependencies)

  const collect = (id: string) => {
    const comp = findCompositionById(
      compositions,
      id.replace("compositions/ui/", ""),
    )
    if (!comp) return

    comp.npmDependencies.forEach((dep) => {
      npmDependencies.add(dep)
    })

    comp.fileDependencies.forEach((dep) => {
      if (fileDependencies.has(dep)) return
      fileDependencies.add(dep.replace("compositions/ui/", ""))
      collect(dep)
    })
  }

  collect(id)

  return {
    fileDependencies: Array.from(fileDependencies),
    npmDependencies: Array.from(npmDependencies),
  }
}
