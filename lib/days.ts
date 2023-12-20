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
    title: "Forta-fied!",
    description:
      "The Forta Scam Detector is a monthly subscription service data feed that provides real-time intelligence about EOAs, contracts and URLs involved in a variety of Web3 scams. It is jointly maintained by the Forta Foundation, Nethermind, Blocksec, ChainPatrol and members of the Forta developer community. Unlock is thrilled to be powering the subscription infrastructure for this important set of services!",
    link: "https://app.forta.network/scam-detector",
    image: "/images/forta-advent.png",
    youtube: "",
  },
  {
    // Day 17
    title: "Own The Narrative with Coinage (Literally)",
    description:
      "Coinage, the first community-owned Web3 media outlet governed by NFT holders, created the first-ever Onchain Scavenger Hunt in partnership with Unlock Protocol this year. Players had a chance to win 5 ETH and other prizes along the way. Every day for 12 days, players competed to solve a daily clue, and mint a free digital trophy (NFT) to celebrate their Web3 knowledge. At the end of 12 days, players who unlocked all 12 words were eligible to automatically unlock the grand prize. It was a ridiculous amount of retro fun! More importantly, Coinage does some of the best reporting in the game, period.",
    link: "https://coinage.media",
    image: "/images/coinage-scavenger.gif",
    youtube: "",
  },
  {
    // Day 18
    title: "The ALANA Project",
    description:
      "The ALANA Project empowers creators and believes everyone should to be able to learn, co-create, and build. Everyone has the ability to create, and access to the right tools and resources is vital to unlocking the full potential of one's creativity. The ALANA Project has six branches including a magazine, a boutique, AI, adventures, and more. Unlock is a proud partner of The ALANA Project.",
    link: "https://www.the-alana-project.xyz/",
    image: "",
    youtube: "https://www.youtube.com/embed/bg86iZAAzQw",
  },
  {
    // Day 19
    title: "Enter 2024 in style with Privy 😎",
    description:
      "2023 has been a year of crypto glow-ups! We've seen a wave of exciting consumer products for mainstream users, with engaging app experiences, seamless onboarding, and smooth wallet UX. Celebrate the year by claiming a Privy shirt, available to the first 25 people to fill out the **Learn more** form. (The Unlock team loves working with Privy, and the advent calendar uses Privy extensively!)",
    link: "https://50fzxaracbi.typeform.com/to/Bm1sYwKS",
    image: "/images/privy-shirt.png",
    youtube: "",
  },
  {
    // Day 20
    title: "20 on 20: Enter to win free tickets to CoinDesk's Consensus 2024",
    description:
      "For Day 20 of Unlock's Advent Calendar, Consensus is giving away 20 Pro Passes to randomly selected winners who complete the form linked below by Dec. 21 at 11:59 p.m EST. Please click the \"Learn More\" button and enter the info below for a chance to win a pair of pro passes to Consensus 2024 in Austin, Texas on May 29-31. All fields are required to be considered a valid entry. Good luck!",
    link: "https://airtable.com/appBFFx7vdL4ng7c0/pagKMudjgHwUHn8Hh/form",
    image: "/images/consensus-share.png",
    youtube: "",
  },
  {
    // Day 21
    title: "A Big Thanks to Base!",
    description:
      "The Unlock Protocol community wanted to give a special shout-out today to the amazing team over at Base for being a part of the advent calendar fun this year! We so appreciate their support and wanted to share our congrats with them on an amazing 2023. We look forward to collaborating more with them in 2024!",
    link: "https://base.org",
    image: "/images/base-share.png",
    youtube: "",
  },
  {
    // Day 22
    title: "A New Kind of Christmas Card 🦉💳",
    description:
      "The team at Gnosis Pay created a Christmas card to connect our web3 and IRL selves together! To get into the festive spirit, Santa 🎅 is delivering Gnosis Cards, worth EUR 30+ each, to three Locksmiths, so you can spend some crypto in the real world in 2024!",
    link: "https://gnosispay.com/app/signup",
    image: "/images/gnosis-share.png",
    youtube: "",
  },
  {
    // Day 23
    title: "Tomorrow is the big day!",
    description:
      "Tomorrow’s going to be a big day, with one 1000 USDC gift for one lucky Locksmith. But it’s the last day of the calendar, and we’re going to miss connecting with you every day. We’d love to stay in touch! If you’d like to as well, please [sign up for our newsletter](https://newsletter.unlock-protocol.com) — and see you tomorrow!",
    link: "https://newsletter.unlock-protocol.com",
    image: "/images/santa-newsletter.png",
    youtube: "",
  },
  {
    // Day 24
    title: "The Last Day",
    description:
      "FINE",
    link: "https://newsletter.unlock-protocol.com",
    image: "/images/santa-newsletter.png",
    youtube: "",
  },
];

export default days;
