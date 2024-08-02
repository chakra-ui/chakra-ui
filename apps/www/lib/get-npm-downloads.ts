import { numberFormatter } from "./number-formatter"

export async function getNpmDownloads() {
  let count = 817_000 // Fallback if there's any error

  try {
    const data = await fetch(
      "https://api.npmjs.org/downloads/point/last-month/@chakra-ui/react",
    ).then((res) => res.json())

    count = data.downloads
  } catch (error: any) {
    console.log("Failed to get npm downloads: ", error.toString())
  }

  return {
    count,
    prettyCount: numberFormatter.format(count),
  }
}
