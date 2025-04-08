import { OpenGraphImage, size } from "@/components/open-graph-image"
import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

export { size } from "@/components/open-graph-image"

export const contentType = "image/png"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get("category") || "Documentation"
  const title = searchParams.get("title") || "Chakra UI"

  const satoshiBold = fetch(
    new URL("../../public/fonts/Satoshi-Bold.otf", import.meta.url),
  ).then((res) => res.arrayBuffer())

  const backgroundArrayBuffer = await fetch(
    new URL("../../public/open-graph-bg.png", import.meta.url),
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <OpenGraphImage
        category={category}
        title={title}
        backgroundSrc={backgroundArrayBuffer}
      />
    ),
    {
      ...size,
      fonts: [
        {
          name: "Satoshi",
          data: await satoshiBold,
          style: "normal",
          weight: 700,
        },
      ],
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  )
}
