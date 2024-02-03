import { Resource } from 'components/resource-card'

/**
 * Wrapper for filtering resources, in the Resources page, by heading, as per initial
 * requirements; it serves as a wrapper to keep the component lean, rather than defined
 * inline within the component.
 */
export function filterResources(query: string, resources: Resource[]) {
  const normalizedQuery = query.trim().toLowerCase()

  return normalizedQuery !== ''
    ? resources.filter((resource: Resource) =>
        resource.heading.toLowerCase().includes(normalizedQuery),
      )
    : resources
}
