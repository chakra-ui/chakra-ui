import { shipped } from "@/.velite"

export type ShippedStory = (typeof shipped)[number]

export function isPublished(story: ShippedStory) {
  if (!story.shippedAt) return true
  return new Date(story.shippedAt) <= new Date()
}

export function getPublishedShipped() {
  return shipped.filter(isPublished)
}
