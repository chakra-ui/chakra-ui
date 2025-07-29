interface Sponsor {
  MemberId: number
  createdAt: string
  type: string
  role: string
  tier: string
  isActive: boolean
  totalAmountDonated: number
  currency: string
  lastTransactionAt: string
  lastTransactionAmount: number
  profile: string
  name: string
  company: string | null
  description: string | null
  image: string
  email: string | null
  twitter: string | null
  github: string | null
  website: string | null
}

// Static fallback data for major sponsors (updated manually when needed)
const FALLBACK_SPONSORS: Sponsor[] = [
  // Add major sponsors here as fallback
  // This can be updated periodically from the OpenCollective UI export feature
]

async function fetchSponsorsFromGraphQL(): Promise<Sponsor[]> {
  const response = await fetch("https://api.opencollective.com/graphql/v2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "chakra-ui-docs/v3",
    },
    body: JSON.stringify({
      query: `
        query GetCollectiveMembers($slug: String!) {
          collective(slug: $slug) {
            members(limit: 100, role: [BACKER]) {
              nodes {
                id
                createdAt
                role
                tier {
                  name
                }
                totalDonations {
                  value
                }
                account {
                  id
                  name
                  description
                  imageUrl
                  website
                  twitterHandle
                  githubHandle
                  type
                }
              }
            }
          }
        }
      `,
      variables: {
        slug: "chakra-ui",
      },
    }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const contentType = response.headers.get("content-type")
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error(`Expected JSON, got ${contentType}`)
  }

  const result = await response.json()

  if (result.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`)
  }

  if (!result.data?.collective?.members?.nodes) {
    throw new Error("Invalid GraphQL response structure")
  }

  return result.data.collective.members.nodes.map((member: any) => ({
    MemberId: parseInt(member.id),
    createdAt: member.createdAt,
    type: member.account.type,
    role: member.role,
    tier: member.tier.name,
    isActive: true,
    totalAmountDonated: member.totalDonations.value || 0,
    currency: "USD",
    lastTransactionAt: member.createdAt,
    lastTransactionAmount: 0,
    profile: `https://opencollective.com/${member.account.id}`,
    name: member.account.name,
    company: null,
    description: member.account.description,
    image: member.account.imageUrl,
    email: null,
    twitter: member.account.twitterHandle
      ? `https://twitter.com/${member.account.twitterHandle}`
      : null,
    github: member.account.githubHandle
      ? `https://github.com/${member.account.githubHandle}`
      : null,
    website: member.account.website,
  }))
}

export async function getSponsors(): Promise<Sponsor[]> {
  try {
    // Try GraphQL API first
    return await fetchSponsorsFromGraphQL()
  } catch (error: any) {
    console.log("Failed to fetch sponsors from GraphQL API:", error.toString())

    try {
      // Fallback to REST API (in case GraphQL is down but REST works)
      const response = await fetch(
        "https://opencollective.com/chakra-ui/members/all.json",
        {
          headers: {
            "User-Agent": "chakra-ui-website/1.0.0",
          },
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Expected JSON, got ${contentType}`)
      }

      const allSponsors: Sponsor[] = await response.json()

      if (!Array.isArray(allSponsors)) {
        throw new Error("Invalid OpenCollective API response: expected array")
      }

      return allSponsors
    } catch (restError: any) {
      console.log(
        "Failed to fetch sponsors from REST API:",
        restError.toString(),
      )

      // Final fallback to static data
      console.log("Using static fallback sponsor data")
      return FALLBACK_SPONSORS
    }
  }
}
