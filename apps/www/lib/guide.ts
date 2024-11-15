import { GuideCollection, Guides, guideCollections, guides } from "@/.velite"

interface Collection extends GuideCollection {
  guides: Guides[]
}

export const getGuideCollections = () =>
  guides.reduce<Collection[]>((acc, guide) => {
    const collection = guideCollections.find(
      (collection) => collection.id === guide.collection,
    )

    if (!collection) return acc

    const existingCollection = acc.find((item) => item.id === collection.id)
    if (existingCollection) {
      existingCollection.guides.push(guide)
      return acc
    }

    return [...acc, { ...collection, guides: [guide] }]
  }, [])
