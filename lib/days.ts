/**
 * description supports markdown!
 */

let locks = [{
  network: 5,
  lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
},{
  network: 5,
  lock: "0x91709c051ad4e5fbbfcc6eea7908cfe1d5d8aefc",
},{
  network: 5,
  lock: "0x5e7fa2c880f38971fdab65b5168f5797edde9614",
},{
  network: 5,
  lock: "0xf60909e99345dab0fb6d26b56c5356deb2d2b4a7",
},{
  network: 5,
  lock: "0x3c0f537762851a5fd774a8e66e18ac79b1d224a7",
},{
  network: 5,
  lock: "0xdf511e0e57ec3fd4441f59e7fa12c057e747be72",
},{
  network: 5,
  lock: "0xa1e9ea9e324d6281db4b4ca458e530d37b8c0d3d",
},{
  network: 5,
  lock: "0x877f612681d6b832369a04bca293e21fa9025147",
},{
  network: 5,
  lock: "0xbe73425327e6f5ab0d87e41561b4d60931be76cb",
},{
  network: 5,
  lock: "0x668e56888713d417a260e79ad80c07c38a96e819",
},{
  network: 5,
  lock: "0x7de509b53fdaed932ae8b8a630eb98d3727c90c6",
},{
  network: 5,
  lock: "0x0655ebfa6b3feb1d33d041d6417d934633844e8c",
},{
  network: 5,
  lock: "0x9da8a0f6430ce562b492d16563d714bb1989442b",
},{
  network: 5,
  lock: "0xa9e8cd67a910fb21e0623fd8dfdfb22a747306d1",
},{
  network: 5,
  lock: "0x53a1fdeebdafed23d59a0c3a8d0d59aa7ab71f5b",
},{
  network: 5,
  lock: "0x44066443a3043e77e4a2ec16ec8413537e3339ae",
},{
  network: 5,
  lock: "0xbd07a679f8eb42a9e26d8f04153144894fed74be",
},{
  network: 5,
  lock: "0xac61c1d5bf3a2e175a867a597223a9630b9a7eb4",
},{
  network: 5,
  lock: "0x510a1c3fde353b7fce2dbb33c1cd477f5ef61d2b",
},{
  network: 5,
  lock: "0x8564aa4ff5d27466a3aef3bc88ed541b4f530e13",
},{
  network: 5,
  lock: "0x8315156e7c7033c95bbba2e368efa947f94f17ad",
},{
  network: 5,
  lock: "0x3efd5836ae3edb6e68f40d4b9abecdbd8e710f26",
},{
  network: 5,
  lock: "0x7e4e7cdaacf6a5a81413f73b6de4a7d2d9427d8d",
},{
  network: 5,
  lock: "0x2516a877838faa7e7f6ce83cd9f877b4a3f1d842",
}]
if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
  locks = [{
    network: 5,
    lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
  },{
    network: 5,
    lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
  },{
    network: 5,
    lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
  },{
    network: 5,
    lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
  },{
    network: 5,
    lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
  },{
    network: 5,
    lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
  },{
    network: 5,
    lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
  },{
    network: 5,
    lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
  },{
    network: 5,
    lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
  },{
    network: 5,
    lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
  },{
    network: 5,
    lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
  },{
    network: 5,
    lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
  },{
    network: 5,
    lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
  },{
    network: 5,
    lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
  },{
    network: 5,
    lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
  },{
    network: 5,
    lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
  },{
    network: 5,
    lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
  },{
    network: 5,
    lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
  },{
    network: 5,
    lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
  },{
    network: 5,
    lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
  },{
    network: 5,
    lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
  },{
    network: 5,
    lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
  },{
    network: 5,
    lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
  },{
    network: 5,
    lock: "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
  }]
}

const days = [
  {
    // Day 1
    ...locks[0],
    title: "🍾 Congrats! You have opened the first day of the advent calendar!",
    description: `Come back **every** day, open a new door, claim a new NFT, and learn something new! You can open today’s door if you opened yesterday’s door. (No peeking ahead!) Best of all, some days will have special gifts for you from Unlock! 

See you tomorrow!`,
    link: "",
    image: "",
    youtube: "",
  },
  {
    // Day 2
    ...locks[1],
    title: "Year in Review",
    description: `Some days we’ll share great stuff from the the Unlock community’s amazing 2022 accomplishments and adventures. For example — did you know that all the tickets for Paris’s ETH.CC conference in June 2022 (over 1800 tickets!) were powered by Unlock? It’s true!`,
    link: "https://unlock-protocol.com/blog/ethcc5-2022-ticketing",
    image: "",
    youtube: "",
  },
  {
    // Day 3
    ...locks[2],
    title: "Would you like to play a game?",
    description:
      "In 2022, BAFTA-award winning game designer Henry Hoffman integrated Unlock into Unity, enabling Unlock NFTs to be used for membership access, in-game items, and more in the Unity ecosystem — without having to write code. 🤯",
    link: "https://twitter.com/UnlockProtocol/status/1597632023362879488",
    image: "",
    youtube: "https://www.youtube.com/embed/l4e3L_R4Xwk",
  },
  {
    // Day 4
    ...locks[3],
    title: "Get the flock out of here!",
    description:
      "Flocker, built with Unlock, is a way your fans and followers can connect with you all across the web. We built it because you should be able to connect directly with them, and not have to rely on centralized platforms like the bird app which may go through some, ahem, changes.",
    link: "https://flocker.app",
    image: "",
    youtube: "https://www.youtube.com/embed/XFBc1U4wtKg",
  },
  {
    // Day 5
    ...locks[4],
    title: "Just another magic Monday",
    description:
      "Hey! A little something-something for you today — we’re dropping some USDC to the first 100 folks who get today's gift! We’ll automatically drop it into the wallet you used to get today’s NFT. Enjoy!",
    link: "",
    image: "https://media.tenor.com/k_I4uywWFfQAAAAC/picsou-scrooge.gif",
    youtube: "",
  },
  {
    // Day 6
    ...locks[5],
    title: "We ❤️ our frens at Guild.xyz",
    description:
      "In 2022, our frens at Guild.xyz integrated Unlock memberships, which can be used to token-gate Discord, Telegram, and other resources with just a few clicks. It’s kinda magical.",
    link: "https://unlock-protocol.com/guides/how-to-token-gate-telegram-with-unlock-protocol-and-guild-xyz/",
    image: "",
    youtube: "",
  },
  {
    // Day 7
    ...locks[6],
    title: "2022 was hacktastic!",
    description:
      "One of the absolute highlights of 2022 was the opportunity to connect up with thousands of hackers at ETHNewYork, ETHSanFrancisco and other hackathons. The creativity of the Locksmith community is amazing!",
    link: "https://unlock-protocol.com/blog/ethsanfrancisco-2022",
    image: "https://unlock-protocol.com/images/blog/ethsf22/unlock-6.png",
    youtube: "",
  },
  {
    // Day 8
    ...locks[7],
    title: "Certifiably amazing",
    description:
      "Did you know: Professional certifications like CDAA (Certified Digital Asset Advisor) and industry leaders like Web3 Academy deliver their on-chain certifications and credentials using Unlock Protocol. It’s very cool, and it just works.",
    link: "https://unlock-protocol.com/blog/cdaa-unlock-case-study",
    image: "",
    youtube: "https://www.youtube.com/embed/MzjiOuXgXSA",
  },
  {
    // Day 9
    ...locks[8],
    title: "Fun Sock Protocol",
    description:
      "It’s cold in a lot of places, and we want your toesies to be warm! Claim today’s NFT, which will give you access to a form where the first 100 folks can grab a pair of awesome Unlock socks! Click the “Learn More” link below to go to the shipping form (and you need to have today's NFT in your wallet to submit the form). Fun socks!!!",
    link: "https://forms.bueno.art/unlockprotocolday9",
    image: "https://i.imgur.com/Q0FV0EG.gif", // better aspect ratio
    youtube: "",
  },
  {
    // Day 10
    ...locks[9],
    title: "It’s showtime!",
    description:
      "Dozens of projects and partners that have used Unlock Protocol are featured in our ever-growing showcase! Want to see them? Are you one of them? Want to be one? Let us know!",
    link: "https://showcase.unlock-protocol.com",
    image: "/images/showcase-share.png",
    youtube: "",
  },
  {
    // Day 11
    ...locks[10],
    title: "thirdweb 🤝 Unlock",
    description:
      "thirdweb is a platform that provides a suite of tools for creators, artists, and entrepreneurs, enabling them to easily build, launch and manage web3 projects. Last week, thirdweb’s Ciara Nightingale created this stellar guide that shows you how to deploy an instance of Unlock’s Lock contract and then integrates this contract into a simple app. Check it out!",
    link: "https://blog.thirdweb.com/guides/build-a-subscription-with-unlock/",
    image: "/images/thirdweb-guide-min.png",
    youtube: "",
  },
  {
    // Day 12
    ...locks[11],
    title: "Let a billion ideas Bloom",
    description:
      "Bloom Network is an international community of people and projects working toward regenerative cultures. Bloom hubs around the world grow participation in food security, local economies, celebrations of diversity, art as cultural transformation, and aim to inspire a billion acts of regeneration. Bloom Network is part of the Unlock Protocol ecosystem, and for every Advent NFT claimed today, Unlock will make a $1 donation to Bloom Network, up to a maximum total of USD$250.",
    link: "https://bloomnetwork.org/",
    image: "/images/bloom-header.png",
    youtube: "",
  },
  {
    // Day 13
    ...locks[12],
    title: "A free learning webinar for you",
    description:
      "This week, we're doing a webinar on the Membership Journey! Learn the basics of how to set up an NFT-based membership program and work through the foundational steps of the membership playbook for projects and brands. This free one-hour webinar will cover: Why memberships matter, key use cases for memberships, a dive into the Membership Journey, and a live demo. Join us! (It's free.) Click *Learn more* below to register.",
    link: "https://us06web.zoom.us/webinar/register/1216708555427/WN_xqpZql2JRLCfKIuOqhIbTg",
    image: "/images/journey-16x9.png",
    youtube: "",
  },
  {
    // Day 14
    ...locks[13],
    title: "When do you know it’s really the holidays?",
    description:
      "Ok, on to the important stuff. We need to know how the Unlock community feels about one of the important questions of the year. Which of these holiday movies is the true sign of the season? Is it when the FRAGILE lamp arrives? When John McClane comes out to the coast to have a few laughs with Hans Gruber at Nakatomi Plaza? When Buddy the Elf discovers the truth? When Clark Griswold plugs in the holiday lights? Hit **Learn more** to see the results and cast your vote!",
    link: "https://twitter.com/UnlockProtocol/status/1602715987459026944",
    image: "/images/movie-twitter-poll.png",
    youtube: "",
  },
  {
    // Day 15
    ...locks[14],
    title: "Ho Ho ZenGo!",
    description:
      "Next-gen tech for a new year. Welcome to the future. We think the ZenGo Wallet team is pretty neat, and they’ve built something incredible! It’s a new kind of wallet that not only does the things you’d expect, but it also has a **huge** focus on security and recovery options, includes a built-in web3 firewall, features a gorgeous NFT gallery, and — get this — they have actual customer support! Amazing.",
    link: "https://zengo.com/?utm_source=unlock&utm_medium=adventwebsite&utm_campaign=advent15",
    image: "/images/zengo-nft.png",
    youtube: "",
  },
  {
    // Day 16
    ...locks[15],
    title: "Here comes Polygon",
    description:
      "One of the big leaps forward this year was in the adoption of faster, more environmentally-friendly, less-expensive blockchains across the industry. In particular, our frens at Polygon have been on a tear, providing infrastructure across huge projects like Starbucks Odyssey and many others. While Unlock works across nearly any EVM-compatible blockchain, we’ve seen incredible adoption across Polygon this year, and have just relaunched our own membership smart contract on the Polygon blockchain.",
    link: "",
    image: "",
    youtube: "https://www.youtube.com/embed/qDQkteJMK6E",
  },
  {
    // Day 17
    ...locks[16],
    title: "You can OpenSea your Unlock memberships anywhere",
    description:
      "Since Unlock memberships and subscriptions are at their core ERC-721 NFTs, they just work anywhere you’d expect an NFT to work. For example, every Unlock membership key NFT is visible in its collection on OpenSea within minutes after minting or airdropping. And want to configure those collections? If you’re the creator or manager of that collection on Unlock, you can! Here’s how. (Yes, that was a terrible pun in the title. We regret nothing!)",
    link: "",
    image: "",
    youtube: "https://www.youtube.com/embed/tWh597nk3uM",
  },
  {
    // Day 18
    ...locks[17],
    title: "You can do token-gated events with Beem (feat. Unlock!)",
    description:
      "Want to set up a token-gated event? Tess from Beem shows you how to do it in under two minutes, click that **Learn more** link to see how to Beem your fans, followers, and attendees in from anywhere!",
    link: "https://twitter.com/0xcyp/status/1603035069878521857",
    image: "/images/beem-demo.png",
    youtube: "",
  },
  {
    // Day 19
    ...locks[18],
    title: "Set up a smart contract in about two minutes",
    description:
      "Have a New Year's Eve party, happy hour, meetup, or other event coming up? It's a snap to set up NFT ticketing for it with Unlock. In just over two minutes, you can set up and deploy a smart contract using Unlock and have your ticketing done the web3 way! Want to check out the full guide? Hit that **Learn more** link below!",
    link: "https://unlock-protocol.com/guides/how-to-sell-nft-tickets-for-an-event/",
    image: "",
    youtube: "https://www.youtube.com/embed/1EGjCGfn7aE",
  },
  {
    // Day 20
    ...locks[19],
    title: "Unlock mints digital collectibles with membership superpowers",
    description:
      "You already knew Unlock has always been about memberships, subscriptions, NFT ticketing, on-chain certification, and other real-world use cases. But did you know Unlock makes it easy to mint digital collectibles with membership superpowers as well? It’s true! Here’s how you can set up unique digital art for every piece in a collection — every one of which inherits all the advanced capabilities of Unlock Protocol. It’s kinda like holiday magic. ✨",
    link: "https://unlock-protocol.com/guides/how-to-use-different-images/?utm_source=unlock&utm_medium=adventwebsite&utm_campaign=advent20",
    image: "/images/collectibles-16x9.png",
    youtube: "",
  },
  {
    // Day 21
    ...locks[20],
    title: "A tasty treat",
    description:
      "Cookbook.dev is a hub for smart contracts where you can find, deploy, and collaborate on any contract in EVM. You can view audits, documentation, and usage, as well as deploy and manage the contracts from the user interface. And the Cookbook community membership is deliciously powered by Unlock — yum! 🍪",
    link: "https://twitter.com/UnlockProtocol/status/1605050465615429633",
    image: "/images/cookbook-preview.png",
    youtube: "",
  },
  {
    // Day 22
    ...locks[21],
    title: "Holiday pints",
    description:
      "Boxcar is UK’s best-kept secret in craft beer, known to beer geeks and enthusiasts for pioneering, innovative, and fastidiously well-made beers. In the spirit of innovation and community, Boxcar decided to involve everyone who loves their beers and ethos to join in on the journey and launched the Boxcar Collective, which allows members to join them their journey with a unique membership program powered by Unlock NFTs.",
    link: "https://twitter.com/jroebuck/status/1595739801809977344",
    image: "/images/boxcar.gif",
    youtube: "",
  },
  {
    // Day 23
    ...locks[22],
    title: "Tomorrow is the big day!",
    description:
      "Tomorrow’s going to be a big day, with incredible gifts for a few lucky Locksmiths. But it’s the last day of the calendar, and we’re going to miss connecting with you every day. We’d love to stay in touch! If you’d like to as well, please [sign up for our newsletter](https://newsletter.unlock-protocol.com) — and see you tomorrow!",
    link: "https://newsletter.unlock-protocol.com",
    image: "/images/santa-newsletter.png",
    youtube: "",
  },
  {
    // Day 24
    ...locks[23],
    title: "Last Day",
    description:
      "FINE",
    link: "https://newsletter.unlock-protocol.com",
    image: "/images/santa-newsletter.png",
    youtube: "",
  },
];

export default days;
