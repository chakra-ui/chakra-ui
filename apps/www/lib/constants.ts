const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : ""

export const BASE_URL =
  process.env.NEXT_PUBLIC_WEBAPP_URL || VERCEL_URL || "http://localhost:3000"
