export interface Sponsor {
  MemberId: number
  createdAt: string
  type: string | null
  role: string
  tier: string | null
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
const FALLBACK_SPONSORS: Sponsor[] = []

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
            members(limit: 1000, role: [BACKER]) {
              nodes {
                id
                createdAt
                role
                isActive
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
    throw new Error(
      `GraphQL HTTP error! status: ${response.status}, statusText: ${response.statusText}`,
    )
  }

  const contentType = response.headers.get("content-type")
  if (!contentType || !contentType.includes("application/json")) {
    const responseText = await response.text()
    throw new Error(
      `Expected JSON, got ${contentType}. Response: ${responseText.slice(0, 500)}`,
    )
  }

  const result = await response.json()

  if (result.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors, null, 2)}`)
  }

  if (!result.data?.collective?.members?.nodes) {
    throw new Error(
      `Invalid GraphQL response structure. Data: ${JSON.stringify(result.data, null, 2)}`,
    )
  }

  const activeMembers = result.data.collective.members.nodes.filter(
    (member: any) => member.isActive,
  )

  console.log(
    `Filtered to ${activeMembers.length} active members (${result.data.collective.members.nodes.length - activeMembers.length} inactive filtered out)`,
  )

  return activeMembers.map((member: any) => ({
    MemberId: parseInt(member.id),
    createdAt: member.createdAt,
    type: member.account?.type || "INDIVIDUAL",
    role: member.role,
    tier: member.tier?.name || "Backer 💚",
    isActive: member.isActive,
    totalAmountDonated: member.totalDonations?.value || 0,
    currency: "USD",
    lastTransactionAt: member.createdAt,
    lastTransactionAmount: 0,
    profile: `https://opencollective.com/${member.account.id}`,
    name: member.account.name,
    company: null,
    description: member.account?.description || null,
    image: member.account?.imageUrl || "",
    email: null,
    twitter: member.account?.twitterHandle
      ? `https://twitter.com/${member.account.twitterHandle}`
      : null,
    github: member.account?.githubHandle
      ? `https://github.com/${member.account.githubHandle}`
      : null,
    website: member.account?.website || null,
  }))
}

export async function getSponsors(): Promise<Sponsor[]> {
  try {
    // Try GraphQL API first
    const sponsors = await fetchSponsorsFromGraphQL()
    console.log(
      `Successfully fetched ${sponsors.length} sponsors from GraphQL API`,
    )
    return sponsors
  } catch (error: any) {
    console.error("Failed to fetch sponsors from GraphQL API:", {
      message: error.message,
      stack: error.stack,
      toString: error.toString(),
    })

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

      const activeSponsors = allSponsors.filter((sponsor) => sponsor.isActive)
      console.log(
        `Successfully fetched ${activeSponsors.length} active sponsors from REST API (${allSponsors.length} total)`,
      )
      return activeSponsors
    } catch (restError: any) {
      console.error("Failed to fetch sponsors from REST API:", {
        message: restError.message,
        stack: restError.stack,
        toString: restError.toString(),
      })

      // Final fallback to static data
      console.warn(
        `Using static fallback sponsor data (${FALLBACK_SPONSORS.length} sponsors)`,
      )
      return FALLBACK_SPONSORS
    }
  }
}
