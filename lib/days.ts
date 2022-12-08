/**
 * description supports markdown!
 */

const days = [
  {
    // Day 1
    lock: "0x6B6CbaA6b44D5949A2a6cac24499aa13D6c1798D",
    title: "🍾 Congrats! You have opened the first day of the advent calendar!",
    description: `Come back **every** day, open a new door, claim a new NFT, and learn something new! You can open today’s door if you opened yesterday’s door. (No peeking ahead!) Best of all, some days will have special gifts for you from Unlock! 

See you tomorrow!`,
    link: "",
    image: "",
    youtube: "",
  },
  {
    // Day 2
    lock: "0xff5446f83fFb3Ccd7D5f798C1F1C1D981E2ff2AE",
    title: "Year in Review",
    description: `Some days we’ll share great stuff from the the Unlock community’s amazing 2022 accomplishments and adventures. For example — did you know that all the tickets for Paris’s ETH.CC conference in June 2022 (over 1800 tickets!) were powered by Unlock? It’s true!`,
    link: "https://unlock-protocol.com/blog/ethcc5-2022-ticketing",
    image: "",
    youtube: "",
  },
  {
    // Day 3
    lock: "0x27787E46a701CfFaaD8af059917CF0d626556568",
    title: "Would you like to play a game?",
    description:
      "In 2022, BAFTA-award winning game designer Henry Hoffman integrated Unlock into Unity, enabling Unlock NFTs to be used for membership access, in-game items, and more in the Unity ecosystem — without having to write code. 🤯",
    link: "https://twitter.com/UnlockProtocol/status/1597632023362879488",
    image: "",
    youtube: "https://www.youtube.com/embed/l4e3L_R4Xwk",
  },
  {
    // Day 4
    lock: "0x7608F73A1dFEb206A3A75aCDad6DC9FbA9Ba83D0",
    title: "Get the flock out of here!",
    description: "Flocker, built with Unlock, is a way your fans and followers can connect with you all across the web. We built it because you should be able to connect directly with them, and not have to rely on centralized platforms like the bird app which may go through some, ahem, changes.",
    link: "https://flocker.app",
    image: "",
    youtube: "https://www.youtube.com/embed/XFBc1U4wtKg",
  },
  {
    // Day 5
    lock: "0x3e36C285E11DE77e8257Fe7D49e80209C48b295E",
    title: "Just another magic Monday",
    description: "Hey! A little something-something for you today — we’re dropping some USDC to the first 100 folks who get today's gift! We’ll automatically drop it into the wallet you used to get today’s NFT. Enjoy!",
    link: "",
    image: "https://media.tenor.com/k_I4uywWFfQAAAAC/picsou-scrooge.gif",
    youtube: "",
  },
  {
    // Day 6
    lock: "0x3Ba3470ffAB4D0bE96C75c5A11AA83DB7DC6501a",
    title: "We ❤️ our frens at Guild.xyz",
    description: "In 2022, our frens at Guild.xyz integrated Unlock memberships, which can be used to token-gate Discord, Telegram, and other resources with just a few clicks. It’s kinda magical.",
    link: "https://unlock-protocol.com/guides/how-to-token-gate-telegram-with-unlock-protocol-and-guild-xyz/",
    image: "",
    youtube: "",
  },
  {
    // Day 7
    lock: "0xd1bc4E5100024428E5573e0Cd7b1EB14e2c2aa73",
    title: "2022 was hacktastic!",
    description: "One of the absolute highlights of 2022 was the opportunity to connect up with thousands of hackers at ETHNewYork, ETHSanFrancisco and other hackathons. The creativity of the Locksmith community is amazing!",
    link: "https://unlock-protocol.com/blog/ethsanfrancisco-2022",
    image: "https://unlock-protocol.com/images/blog/ethsf22/unlock-6.png",
    youtube: "",
  },
  {
    // Day 8
    lock: "0x412024855fA62752805c96F1dbaD6B4dC0C9AD52",
    title: "Certifiably amazing",
    description: "Did you know: Professional certifications like CDAA (Certified Digital Asset Advisor) and industry leaders like Web3 Academy deliver their on-chain certifications and credentials using Unlock Protocol. It’s very cool, and it just works.",
    link: "https://unlock-protocol.com/blog/cdaa-unlock-case-study",
    image: "",
    youtube: "https://www.youtube.com/embed/MzjiOuXgXSA",
  },
  {
    // Day 9
    lock: "0x2b7cd7B41f3937c09E4242828F08fCBBaf1043a5",
    title: "Fun Sock Protocol",
    description: "It’s cold in a lot of places, and we want your toesies to be warm! Claim today’s NFT, which will give you access to a form where the first 100 folks can grab a pair of awesome Unlock socks! Click the “Learn More” link below to go to the shipping form (and you need to have today's NFT in your wallet to submit the form). Fun socks!!!",
    link: "https://forms.bueno.art/unlockprotocolday9",
    image: "https://i.imgur.com/Q0FV0EG.gif", // better aspect ratio
    youtube: "",
  },
  {
    // Day 10
    lock: "0xB3903433B3da787a01Aa30b73Ad1C108F632b297",
    title: "It’s showtime!",
    description: "Dozens of projects and partners that have used Unlock Protocol are featured in our ever-growing showcase! Want to see them? Are you one of them? Want to be one? Let us know!",
    link: "https://showcase.unlock-protocol.com",
    image: "/images/showcase-share.png",
    youtube: "",
  },
  {
    lock: "0x59c55EFD6faa9Dbecb3AdA3d219a898dd42A9Baf",
  },
  {
    lock: "0x82b0728f060919c81F5fa0b74cF0889AC4227DA0",
  },
  {
    lock: "0x3DFD892A1806c91663F2F145DcE9980DA92f186E",
  },
  {
    lock: "0x07791a5C83fec114F4dEd574f62Aa9f78b3F3A73",
  },
  {
    lock: "0x7F85E8cD1739986d9fd14118fA75c0F1d2365C1C",
  },
  {
    lock: "0x4e50c69dcD6DBE9EDAED73e81643258C923d75f3",
  },
  {
    lock: "0x0a051fD5673F8c317B53B0736676E89b1AF07797",
  },
  {
    lock: "0x58D41c526A2D88aE9D08a546d327D3619511B278",
  },
  {
    lock: "0x281522e8073bA6746874aa61bDF81DFa9DB833eC",
  },
  {
    lock: "0x19b24fF3c0C124B91b672Dc8F8Ae077A96E2551C",
  },
  {
    lock: "0x0634905430e4DB8CAaF63b0dd078EEFBF3FC1EdE",
  },
  {
    lock: "0xE5D92b4F0953EeE7B250d2DFaeC955ad95161b22",
  },
  {
    lock: "0xc9221Cf0004A05f04aB5dF82d58eb63D5307C040",
  },
  {
    lock: "0xd8aD6E0C1aa8308e27F537A76032f50d2FE3e65D",
  },
];

export default days;
