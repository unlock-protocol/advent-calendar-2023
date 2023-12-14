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
      "🎉 Holiday goodness from the folks at Decrypt! Decrypt is gifting 10 Shark Membership Passes, each worth $99.99, to 10 lucky Locksmiths. Winners can use the passes (built with Unlock Protocol, naturally) to plunge into a world of exclusive access and thrilling experiences. Dive into members-only poker tournaments, fantasy football, basketball leagues, and unique competitions to showcase your degen prowess. It's the ultimate holiday activity to get your adrenaline pumping! 🦈 Plus, don't miss out: 20 lucky participants will also win access to the “Mastering NFT Trading” Course at Degen U, valued at $9.99 each. Embrace the holiday spirit with a chance to learn, compete, and win! 🌟",
    link: "https://decrypt.co/1000x",
    image: "/images/decrypt-1000x-share.png",
    youtube: "",
  },
  {
    // Day 8
    title: "Sharing is Caring",
    description:
      "Today’s present is a collab between **you** and the Locksmith community! Today, anyone who shares a link to the advent calendar and includes their unique referral code will receive an airdrop of $1 USDC **every** time someone else also mints today’s gift via their referral link! **The URLs in the links below are unique to you and contain your unique referrer code.** Sharing is caring!",
    link: "https://unlock-protocol.com/blog/referral-fees",
    image: "", 
    youtube: "https://www.youtube.com/embed/aSjSEy8mdxI",
  },
  {
    // Day 9
    title: "LabWeek23 Rocked",
    description:
      "LabWeek23, organized by Protocol Labs alongside Devconnect Istanbul, was a decentralized, week-long series where the Protocol Labs Network and its community came together. LabWeek hosted over 1,500 builders in a variety of events where attendees shared progress on projects and research, exchanged knowledge, and forged deeper connections through research-focused seminars, engineering workshops, summits, unconferences, and social gatherings. LabWeek’s ticketing membership infrastructure was powered by Unlock Protocol.",
    link: "https://23.labweek.io/registration-ticketing",
    image: "/images/labweek-large-share.png", 
    youtube: "",
  },
  {
    // Day 10
    title: "Nym Shipyard Set Sail",
    description:
      "Nym Shipyard is a free, six-week privacy bootcamp, designed to train the next generation of activists, builders and operators to create the private internet in the age of AI. It is an intensive Web3 training program featuring weekly masterclasses with the Nym core team and special guests including Chelsea Manning, Harry Halpin, Claudia Diaz and others featuring multiple tracks, hands-on workshops, and mentorship. Over 7,000 memberships and completion NFTs were earned by Shipyard participants in 2023.",
    link: "https://nymtech.net/learn/shipyard",
    image: "/images/nym-large-share.png",
    youtube: "",
  },
  {
    // Day 11
    title: "Darkblock and Unlock Protocol Teamed Up",
    description:
      "In 2023, Darkblock integrated Unlock Protocol to give creators more flexibility in how they deliver exclusive content to their fans. With this integration, creators can now harness the combined power of Unlock and Darkblock to sell recurring subscriptions to their content and enable other time-based access to onchain content. Want to build your own subscription-based magazine, label, or onchain Patreon? This is how you would do it.",
    link: "https://unlock-protocol.com/guides/how-to-create-subscription-content-with-unlock-protocol-and-darkblock/",
    image: "",
    youtube: "https://www.youtube.com/embed/iPeOxC7xVUw",
  },
  {
    // Day 12
    title: "Certified Awesome",
    description:
      "Did you know: Professional certifications like CDAA (Certified Digital Asset Advisor) and industry leaders like Web3 Academy deliver their on-chain certifications and credentials using Unlock Protocol. It’s very cool, and it just works.",
    link: "https://unlock-protocol.com/blog/cdaa-unlock-case-study",
    image: "/images/cdaa-share.png",
    youtube: "",
  },
  {
    // Day 13
    title: "Protect your Digital Assets with Webacy Pro",
    description:
      "Webacy helps you navigate the Web3 world with services that help you stay safe. Assess your risk with Risk Score. Monitor your wallets with Wallet Watch. Act on threats with the Panic Button and Backup Wallet. Webacy’s non-custodial, fully no-access services provide you with the tools you need to stay safe on the blockchain. Today, **Webacy is gifting 10 NFT passes (powered by Unlock Protocol!) to lucky Locksmiths!** These passes grant access to Webacy’s cutting edge blockchain safety services (and might even have a special impact on your ranking on the Webacy Leaderboard 👀).",
    link: "https://webacy.com/",
    image: "",
    youtube: "https://www.youtube.com/embed/ZGdpVHOMaD0",
  },
  {
    // Day 14
    title: "Connect Your Community with Kazm-Powered Gamified Membership",
    description:
      "Kazm enables next level community engagement & brand loyalty. Easily launch white-label memberships to reward activations across EVERY touchpoint - with no-code, and no limits. **Kazm is giving away three Starter Plan accounts on Kazm's SAAS, white-label, no-code platform with 3 free months:** Launch a membership, club, or gamified community experience for up to 1000 Registered participants ($600 value for each!). Membership programs including Lazy Lions, Surf Junkie Club and others use Kazm + Unlock Protocol for their memberships!",
    link: "https://join.kazm.com/",
    image: "/images/kazmgif-1280.gif",
    youtube: "",
  },
  {
    // Day 15
    title: "Boost Your Loyalty Game with beyondClub + Unlock!",
    description:
      "Ready to rock the loyalty world? Meet beyondClub, which created a fun NFT loyalty platform powered by Unlock Protocol! It's a breeze to create buzzing fan communities and cool, exclusive experiences. We love how beyondClub makes loyalty fun!",
    link: "https://beyondclub.xyz",
    image: "/images/beyondclub-share.png",
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
