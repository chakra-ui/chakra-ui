import { OpenGraphImage, size } from "@/components/open-graph-image"
import { ImageResponse } from "next/og"

export const runtime = "edge"

export { size } from "@/components/open-graph-image"

export const contentType = "image/png"

type Params = {
  category?: string
  title?: string
}

export async function GET(request: Request, context: { params: Params }) {
  const satoshiBold = fetch(
    new URL("../../public/fonts/Satoshi-Bold.otf", import.meta.url),
  ).then((res) => res.arrayBuffer())

  const backgroundArrayBuffer = await fetch(
    new URL("../../public/open-graph-bg.png", import.meta.url),
  ).then((res) => res.arrayBuffer())

  const { category, title } = context.params

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
