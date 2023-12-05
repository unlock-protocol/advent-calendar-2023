/**
 * description supports markdown!
 */

const days = [
  {
    // Day 1
    title: "🍾 Welcome to the 2023 Unlock Protocol Advent Calendar!",
    description: `Every day, open a new door, claim a new NFT, and learn something new! You can open today’s door if you opened yesterday’s door. (No peeking ahead!) Best of all, some days will have special gifts for you from Unlock and our partners and community!
See you tomorrow!`,
    link: "",
    image: "/images/gift-present-share-tag-text-1120x630a.png",
    youtube: "",
  },
  {
    // Day 2
    title: "Year in Review",
    description: `Some days we’ll share great stuff from the the Unlock community’s amazing 2023 accomplishments and adventures. For example — did you know there’s an entire showcase of events, subscriptions, memberships, certifications and more that have been built using Unlock Protocol? It’s true!`,
    link: "https://showcase.unlock-protocol.com",
    image: "/images/showcase-share-3.png",
    youtube: "",
  },
  {
    // Day 3
    title: "Subscription Tokens with Unlock Protocol",
    description:
      "One of the common questions we get asked is how do memberships and subscription tokens work with Unlock Protocol? Here’s a deep dive into how it works!",
    link: "https://twitter.com/UnlockProtocol/status/1720459335875350599",
    image: "/images/subscription-share-3.jpeg",
    youtube: "",
  },
  {
    // Day 4
    title: "Let’s get this party started!",
    description:
      `Hey! A little something-something for you today — we’re dropping some USDC to a number of lucky folks today! If you're chosen, we’ll automatically drop it into the wallet you used to get today's NFT. Enjoy! Please see the [official rules](https://unlockprotocol.notion.site/Unlock-Contests-and-Sweepstakes-Standard-Terms-and-Conditions-2023-289658e982794a1f8198d28fe7ec134b?pvs=4) for country and other eligibility.`,
    link: "",
    image: "/images/picsou-scrooge.gif",
    youtube: "",
  },
  {
    // Day 5
    title: "Easy-Peasy Event Tickets and Registration",
    description:
      "Did you know you can create event tickets and landing pages for your conference, event, or meetup in under five minutes with Unlock Protocol? Set up your event landing page, sell or airdrop tickets as NFTs and via email, and perform check-in with a dedicated QR code. Easy.",
    link: "https://events.unlock-protocol.com",
    image: "/images/event-share-3.png",
    youtube: "",
  },
  {
    // Day 6
    title: "We ❤️ our frens at Web3 Academy",
    description:
      "Our frens at Web3 Academy, the #1 trusted resource to make sense of an onchain world in constant transformation, integrated Unlock memberships this year. They are the go-to resource for weekly onchain analysis, industry insights & market analysis to help you build and invest successfully in web3. Today, some lucky Locksmiths will pick up a Web3 Academy PRO Membership ($180 value) or a Web3 Investing Masterclass ($250 value)!",
    link: "https://paragraph.xyz/@web3academy",
    image: "",
    youtube: "https://www.youtube.com/embed/-fE64lkvUmg",
  },
  {
    // Day 7
    title: "Unleash Your Inner Degen",
    description:
      "🎉 Holiday goodness from the folks at Decypt! Decrypt is gifting 10 Shark Membership Passes, each worth $99.99, to 10 lucky Locksmiths. Winners can use the passes (built with Unlock Protocol, naturally) to plunge into a world of exclusive access and thrilling experiences. Dive into members-only poker tournaments, fantasy football, basketball leagues, and unique competitions to showcase your degen prowess. It's the ultimate holiday activity to get your adrenaline pumping! 🦈 Plus, don't miss out: 20 lucky participants will also win access to the “Mastering NFT Trading” Course at Degen U, valued at $9.99 each. Embrace the holiday spirit with a chance to learn, compete, and win! 🌟",
    link: "https://decrypt.co/1000x",
    image: "/images/decrypt-1000x-share.png",
    youtube: "",
  },
  {
    // Day 8
    title: "Certifiably amazing",
    description:
      "Did you know: Professional certifications like CDAA (Certified Digital Asset Advisor) and industry leaders like Web3 Academy deliver their on-chain certifications and credentials using Unlock Protocol. It’s very cool, and it just works.",
    link: "https://unlock-protocol.com/blog/cdaa-unlock-case-study",
    image: "",
    youtube: "https://www.youtube.com/embed/MzjiOuXgXSA",
  },
  {
    // Day 9
    title: "Fun Sock Protocol",
    description:
      "It’s cold in a lot of places, and we want your toesies to be warm! Claim today’s NFT, which will give you access to a form where the first 100 folks can grab a pair of awesome Unlock socks! Click the “Learn More” link below to go to the shipping form (and you need to have today's NFT in your wallet to submit the form). Fun socks!!!",
    link: "https://forms.bueno.art/unlockprotocolday9",
    image: "https://i.imgur.com/Q0FV0EG.gif", // better aspect ratio
    youtube: "",
  },
  {
    // Day 10
    title: "It’s showtime!",
    description:
      "Dozens of projects and partners that have used Unlock Protocol are featured in our ever-growing showcase! Want to see them? Are you one of them? Want to be one? Let us know!",
    link: "https://showcase.unlock-protocol.com",
    image: "/images/showcase-share.png",
    youtube: "",
  },
  {
    // Day 11
    title: "thirdweb 🤝 Unlock",
    description:
      "thirdweb is a platform that provides a suite of tools for creators, artists, and entrepreneurs, enabling them to easily build, launch and manage web3 projects. Last week, thirdweb’s Ciara Nightingale created this stellar guide that shows you how to deploy an instance of Unlock’s Lock contract and then integrates this contract into a simple app. Check it out!",
    link: "https://blog.thirdweb.com/guides/build-a-subscription-with-unlock/",
    image: "/images/thirdweb-guide-min.png",
    youtube: "",
  },
  {
    // Day 12
    title: "Let a billion ideas Bloom",
    description:
      "Bloom Network is an international community of people and projects working toward regenerative cultures. Bloom hubs around the world grow participation in food security, local economies, celebrations of diversity, art as cultural transformation, and aim to inspire a billion acts of regeneration. Bloom Network is part of the Unlock Protocol ecosystem, and for every Advent NFT claimed today, Unlock will make a $1 donation to Bloom Network, up to a maximum total of USD$250.",
    link: "https://bloomnetwork.org/",
    image: "/images/bloom-header.png",
    youtube: "",
  },
  {
    // Day 13
    title: "A free learning webinar for you",
    description:
      "This week, we're doing a webinar on the Membership Journey! Learn the basics of how to set up an NFT-based membership program and work through the foundational steps of the membership playbook for projects and brands. This free one-hour webinar will cover: Why memberships matter, key use cases for memberships, a dive into the Membership Journey, and a live demo. Join us! (It's free.) Click *Learn more* below to register.",
    link: "https://us06web.zoom.us/webinar/register/1216708555427/WN_xqpZql2JRLCfKIuOqhIbTg",
    image: "/images/journey-16x9.png",
    youtube: "",
  },
  {
    // Day 14
    title: "When do you know it’s really the holidays?",
    description:
      "Ok, on to the important stuff. We need to know how the Unlock community feels about one of the important questions of the year. Which of these holiday movies is the true sign of the season? Is it when the FRAGILE lamp arrives? When John McClane comes out to the coast to have a few laughs with Hans Gruber at Nakatomi Plaza? When Buddy the Elf discovers the truth? When Clark Griswold plugs in the holiday lights? Hit **Learn more** to see the results and cast your vote!",
    link: "https://twitter.com/UnlockProtocol/status/1602715987459026944",
    image: "/images/movie-twitter-poll.png",
    youtube: "",
  },
  {
    // Day 15
    title: "Ho Ho ZenGo!",
    description:
      "Next-gen tech for a new year. Welcome to the future. We think the ZenGo Wallet team is pretty neat, and they’ve built something incredible! It’s a new kind of wallet that not only does the things you’d expect, but it also has a **huge** focus on security and recovery options, includes a built-in web3 firewall, features a gorgeous NFT gallery, and — get this — they have actual customer support! Amazing.",
    link: "https://zengo.com/?utm_source=unlock&utm_medium=adventwebsite&utm_campaign=advent15",
    image: "/images/zengo-nft.png",
    youtube: "",
  },
  {
    // Day 16
    title: "Here comes Polygon",
    description:
      "One of the big leaps forward this year was in the adoption of faster, more environmentally-friendly, less-expensive blockchains across the industry. In particular, our frens at Polygon have been on a tear, providing infrastructure across huge projects like Starbucks Odyssey and many others. While Unlock works across nearly any EVM-compatible blockchain, we’ve seen incredible adoption across Polygon this year, and have just relaunched our own membership smart contract on the Polygon blockchain.",
    link: "",
    image: "",
    youtube: "https://www.youtube.com/embed/qDQkteJMK6E",
  },
  {
    // Day 17
    title: "You can OpenSea your Unlock memberships anywhere",
    description:
      "Since Unlock memberships and subscriptions are at their core ERC-721 NFTs, they just work anywhere you’d expect an NFT to work. For example, every Unlock membership key NFT is visible in its collection on OpenSea within minutes after minting or airdropping. And want to configure those collections? If you’re the creator or manager of that collection on Unlock, you can! Here’s how. (Yes, that was a terrible pun in the title. We regret nothing!)",
    link: "",
    image: "",
    youtube: "https://www.youtube.com/embed/tWh597nk3uM",
  },
  {
    // Day 18
    title: "You can do token-gated events with Beem (feat. Unlock!)",
    description:
      "Want to set up a token-gated event? Tess from Beem shows you how to do it in under two minutes, click that **Learn more** link to see how to Beem your fans, followers, and attendees in from anywhere!",
    link: "https://twitter.com/0xcyp/status/1603035069878521857",
    image: "/images/beem-demo.png",
    youtube: "",
  },
  {
    // Day 19
    title: "Set up a smart contract in about two minutes",
    description:
      "Have a New Year's Eve party, happy hour, meetup, or other event coming up? It's a snap to set up NFT ticketing for it with Unlock. In just over two minutes, you can set up and deploy a smart contract using Unlock and have your ticketing done the web3 way! Want to check out the full guide? Hit that **Learn more** link below!",
    link: "https://unlock-protocol.com/guides/how-to-sell-nft-tickets-for-an-event/",
    image: "",
    youtube: "https://www.youtube.com/embed/1EGjCGfn7aE",
  },
  {
    // Day 20
    title: "Unlock mints digital collectibles with membership superpowers",
    description:
      "You already knew Unlock has always been about memberships, subscriptions, NFT ticketing, on-chain certification, and other real-world use cases. But did you know Unlock makes it easy to mint digital collectibles with membership superpowers as well? It’s true! Here’s how you can set up unique digital art for every piece in a collection — every one of which inherits all the advanced capabilities of Unlock Protocol. It’s kinda like holiday magic. ✨",
    link: "https://unlock-protocol.com/guides/how-to-use-different-images/?utm_source=unlock&utm_medium=adventwebsite&utm_campaign=advent20",
    image: "/images/collectibles-16x9.png",
    youtube: "",
  },
  {
    // Day 21
    title: "A tasty treat",
    description:
      "Cookbook.dev is a hub for smart contracts where you can find, deploy, and collaborate on any contract in EVM. You can view audits, documentation, and usage, as well as deploy and manage the contracts from the user interface. And the Cookbook community membership is deliciously powered by Unlock — yum! 🍪",
    link: "https://twitter.com/UnlockProtocol/status/1605050465615429633",
    image: "/images/cookbook-preview.png",
    youtube: "",
  },
  {
    // Day 22
    title: "Holiday pints",
    description:
      "Boxcar is UK’s best-kept secret in craft beer, known to beer geeks and enthusiasts for pioneering, innovative, and fastidiously well-made beers. In the spirit of innovation and community, Boxcar decided to involve everyone who loves their beers and ethos to join in on the journey and launched the Boxcar Collective, which allows members to join them their journey with a unique membership program powered by Unlock NFTs.",
    link: "https://twitter.com/jroebuck/status/1595739801809977344",
    image: "/images/boxcar.gif",
    youtube: "",
  },
  {
    // Day 23
    title: "Tomorrow is the big day!",
    description:
      "Tomorrow’s going to be a big day, with incredible gifts for a few lucky Locksmiths. But it’s the last day of the calendar, and we’re going to miss connecting with you every day. We’d love to stay in touch! If you’d like to as well, please [sign up for our newsletter](https://newsletter.unlock-protocol.com) — and see you tomorrow!",
    link: "https://newsletter.unlock-protocol.com",
    image: "/images/santa-newsletter.png",
    youtube: "",
  },
  {
    // Day 24
    title: "Last Day",
    description:
      "FINE",
    link: "https://newsletter.unlock-protocol.com",
    image: "/images/santa-newsletter.png",
    youtube: "",
  },
];

export default days;
