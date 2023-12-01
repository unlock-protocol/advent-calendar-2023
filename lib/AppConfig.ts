export const AppConfig = {
  name: "Unlock Advent Calendar 2023",
  description: "Unlock Advent Calendar 2023",
  production: process.env.NODE_ENV === "production",
  environment: process.env.NODE_ENV!,
  siteUrl: process.env.NEXT_PUBLIC_VERCEL_URL! || "http://localhost:3000",
  unlockAppUrl: process.env.NEXT_PUBLIC_UNLOCK_APP_URL!,
  googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!,
  hotjarId: Number(process.env.NEXT_PUBLIC_HOTJAR_ID!),
} as const;
