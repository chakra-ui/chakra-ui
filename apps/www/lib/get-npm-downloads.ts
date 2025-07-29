import { numberFormatter } from "./number-formatter"

export async function getNpmDownloads() {
  let count = 817_000 // Fallback if there's any error

  try {
    const response = await fetch(
      "https://api.npmjs.org/downloads/point/last-month/@chakra-ui/react",
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
    if (data && typeof data.downloads === "number") {
      count = data.downloads
    } else {
      console.log("Invalid NPM API response structure:", data)
    }
  } catch (error: any) {
    console.log("Failed to get npm downloads: ", error.toString())
  }

  return {
    count,
    prettyCount: numberFormatter.format(count),
  }
}
