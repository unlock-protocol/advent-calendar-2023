export const AppConfig = {
  name: "Unlock Advent Calendar 2023 🎁",
  description: `Join us as we take the wraps off the 2023 Unlock Protocol Advent Calendar (https://advent.unlock-protocol.com), an exciting journey through the world of Web3!

Last year, we gifted over 200,000 NFTs to the Unlock Locksmith community as part of the Advent calendar festivities. This year, we're taking it up a notch! Each day from December 1st to 24th, open a new door on our digital calendar to claim exclusive NFTs, engage in unique experiences, and uncover special surprises.

What makes this year's calendar even more exciting are our collabs with leading names in the Web3 world: #BuildOnBase, Privy, Decrypt, Coinage, and many others. Each day is a new NFT drop with a blend of insights, fun facts, and special rewards you won't want to miss.`,
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL! || "http://localhost:3000",
  googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!,
  hotjarId: Number(process.env.NEXT_PUBLIC_HOTJAR_ID!),
  recaptchaKey: '6LfuZF4UAAAAANz9dvVjCxzX-i2w7HOuV5_hq_Ir',
} as const;
