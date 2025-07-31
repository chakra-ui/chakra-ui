import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const response =
    request.method === "OPTIONS"
      ? new NextResponse(null, { status: 200 })
      : NextResponse.next()

  response.headers.set("Access-Control-Allow-Origin", "*")
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  )
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  )

  if (request.method === "OPTIONS") {
    response.headers.set("Access-Control-Max-Age", "86400")
  }

  return response
}

export const config = {
  matcher: "/api/:path*",
}
