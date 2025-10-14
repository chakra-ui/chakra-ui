import { numberFormatter } from "./number-formatter"

export async function getDiscordMembers() {
  let count = 5_100 // Fallback if there's any error

  try {
    const response = await fetch(
      "https://discord.com/api/v9/invites/chakra-ui?with_counts=true",
    )

    // Check if response is ok and content-type is JSON
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Expected JSON, got ${contentType}`)
    }

    const data = await response.json()

    // Validate that the response has the expected structure
    if (data && typeof data.approximate_member_count === "number") {
      count = data.approximate_member_count
    } else {
      console.log("Invalid Discord API response structure:", data)
    }
  } catch (error: any) {
    console.log("Failed to get discord members: ", error.toString())
  }

  return {
    count,
    prettyCount: numberFormatter.format(count),
  }
}
