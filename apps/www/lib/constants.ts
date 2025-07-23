const VERCEL_HOST =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    : process.env.NEXT_PUBLIC_VERCEL_URL

const VERCEL_URL = VERCEL_HOST ? `https://${VERCEL_HOST}` : undefined

export const BASE_URL =
  process.env.NEXT_PUBLIC_URL || VERCEL_URL || "http://localhost:3000"
