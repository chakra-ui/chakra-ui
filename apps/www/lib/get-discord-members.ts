import { numberFormatter } from "./number-formatter"

export async function getDiscordMembers() {
  let count = 5_100 // Fallback if there's any error

  try {
    const data = await fetch(
      "https://discord.com/api/v9/invites/chakra-ui?with_counts=true",
    ).then((res) => res.json())

    count = data.approximate_member_count
  } catch (error) {
    //
  }

  return {
    count,
    prettyCount: numberFormatter.format(count),
  }
}
