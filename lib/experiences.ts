export interface ExperienceItem {
  title: string;
  company: string;
  location?: string;
  period: string;
  description: string[];
  websiteUrl?: string;
  projectImages?: string[];
}

export const filterCategories: Record<string, string[]> = {
  "Next.js": ["Next.js", "next.js", "NextJS"],
  "React": ["React", "ReactJS"],
  "Angular": ["Angular"],
  "TypeScript": ["TypeScript"],
  "Node.js": ["Node.js", "NodeJS", "NestJS", "Express"],
  "AI/ML": ["AI", "OpenAI", "Anthropic", "Groq", "Claude", "Gemini", "GPT", "DeepL", "Fal AI", "Google Genai", "artificial intelligence"],
  "Web3": ["Web3", "Solidity", "Ethereum", "NFT", "Blockchain", "IPFS", "Smart Contract", "Hyperledger", "crypto", "cryptocurrency", "bitcoin", "altcoin"],
  "Swift": ["Swift", "SwiftUI", "iOS"],
  "Python": ["Python", "Django", "FastAPI"],
  "Mobile": ["Swift", "iOS", "Ionic", "React Native", "Garmin"],
  "Database": ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase", "Supabase", "Convex"],
};

export const getProjectTags = (exp: ExperienceItem): string[] => {
  const text = exp.description.join(" ");
  const tags: string[] = [];

  Object.entries(filterCategories).forEach(([category, keywords]) => {
    if (keywords.some(keyword => {
      const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      return regex.test(text);
    })) {
      tags.push(category);
    }
  });

  return tags;
};

export const experiences: ExperienceItem[] = [
  {
    title: "Founder",
    company: "Ad Forge",
    period: "January 2026 - ongoing",
    description: [
      "AI-powered ad creative generation tool",
      "Stack: Next.js, Fal AI, OpenAI, Google Genai, FFmpeg"
    ]
  },
  {
    title: "Founder",
    company: "Smallshop",
    period: "January 2026 - ongoing",
    websiteUrl: "https://smallshop.website",
    description: [
      "E-commerce platform with 3D product visualization",
      "Stack: Next.js, Three.js, Stripe, Clerk, Convex"
    ],
    projectImages: [
      "/assets/projects/smallshop.png"
    ]
  },
  {
    title: "Founder",
    company: "Hyperscalper",
    period: "January 2026 - ongoing",
    websiteUrl: "https://hyperscalper.vercel.app",
    description: [
      "High-performance copy trading bot for Hyperliquid DEX",
      "Real-time copy trading with multi-account support and smart position sizing",
      "Stack: TypeScript, Node.js, Express, WebSocket, Telegram Bot API"
    ],
    projectImages: [
      "/assets/projects/hyperscalper.png"
    ]
  },
  {
    title: "Founder",
    company: "Global Pet Sitter",
    period: "January 2026 - ongoing",
    websiteUrl: "https://www.globalpetsitter.com",
    description: [
      "Pet sitting marketplace connecting pet owners with sitters",
      "Real-time messaging, reviews, and map integration",
      "Stack: Next.js, Clerk, Convex, Supabase, MapLibre GL"
    ],
    projectImages: [
      "/assets/projects/globalpetsitter.png"
    ]
  },
  {
    title: "Garmin Developer",
    company: "Garmigotchi",
    period: "December 2025 - ongoing",
    websiteUrl: "https://garmigotchi.vercel.app",
    description: [
      "Tamagotchi-style health companion watchface for Garmin Instinct 3 Solar",
      "Interactive virtual pet that reacts to real-time health metrics",
      "Stack: Monkey C (Garmin SDK)"
    ],
    projectImages: [
      "/assets/projects/garmigotchi.png"
    ]
  },
  {
    title: "Founder",
    company: "Rollercoaster Store",
    period: "December 2025",
    websiteUrl: "https://rollercoaster-store.vercel.app",
    description: [
      "E-commerce store for Garmin watchfaces and apps",
      "Stack: Next.js, Tailwind CSS"
    ],
    projectImages: [
      "/assets/projects/rollercoaster.png"
    ]
  },
  {
    title: "iOS Developer",
    company: "MenuScanner",
    period: "December 2025",
    description: [
      "iOS app that scans restaurant menus using AI vision",
      "Menu OCR/translation with AI explanations and generated dish images",
      "Stack: SwiftUI, Firebase, Google Gemini 2.0 Flash, Imagen 3"
    ]
  },
  {
    title: "Full Stack Developer",
    company: "ImproveMyWebsite",
    period: "December 2025",
    description: [
      "Website analysis and improvement tool powered by Claude AI",
      "Stack: Next.js, Anthropic SDK, Cheerio"
    ]
  },
  {
    title: "Full Stack Developer",
    company: "Juriscan",
    period: "November 2025",
    websiteUrl: "https://juriscan-mu.vercel.app",
    description: [
      "Legal document scanner and analyzer with multi-language support",
      "Extracts, embeds, and analyzes legal articles/laws",
      "Stack: Next.js, Google Genai, Supabase, next-intl"
    ],
    projectImages: [
      "/assets/projects/juriscan.png"
    ]
  },
  {
    title: "Swift Developer",
    company: "BarterBay",
    period: "June 2025 - ongoing",
    description: [
      "iOS application development using Swift",
      "Building mobile marketplace platform"
    ],
    projectImages: [
      "/assets/projects/barterbay-1.png",
      "/assets/projects/barterbay-2.png",
      "/assets/projects/barterbay-3.png",
      "/assets/projects/barterbay-4.png"
    ]
  },
  {
    title: "Co-founder",
    company: "Kaimeleon.ai",
    period: "February 2025 - ongoing",
    description: [
      "KAI is a cutting-edge assistant that integrates artificial intelligence into business communication workflows",
      "Solutions help organizations capture, analyze, and leverage insights from meetings and communications",
      "Drive better decision-making and productivity through AI"
    ],
    websiteUrl: "https://kaimeleon.ai",
    projectImages: [
      "/assets/projects/kaimeleon.png"
    ]
  },
  {
    title: "AI Artist",
    company: "Neural Surrealism",
    period: "August 2024 - December 2024",
    description: [
      "Generating abstract art with AI from global events",
      "Fully automated process",
      "Working on NFT integration",
      "Instagram: @neuralsurrealism"
    ],
    projectImages: [
      "/assets/projects/neural-surrealism-instagram.png"
    ]
  },
  {
    title: "Owner",
    company: "Bicraw.ai",
    period: "June 2024 - ongoing",
    description: [
      "Helping businesses take advantage of AI to scale and automate their business processes",
      "AI consulting and implementation services"
    ],
    websiteUrl: "https://bicraw.ai",
    projectImages: [
      "/assets/projects/bicraw.png"
    ]
  },
  {
    title: "Founder & iOS Developer",
    company: "EchoLingo",
    period: "July 2024 - August 2024",
    description: [
      "Language learning iOS app built with Swift and SwiftUI",
      "Translations powered by DeepL and AI (OpenAI, Groq, Anthropic)",
      "Integrations with Google text to speech and cloud functions",
      "Backend: NestJS on Fly.io, PostgreSQL database on DigitalOcean"
    ],
    projectImages: [
      "/assets/projects/echolingo-1.png",
      "/assets/projects/echolingo-2.png",
      "/assets/projects/echolingo-3.png",
      "/assets/projects/echolingo-4.png",
      "/assets/projects/echolingo-5.png"
    ]
  },
  {
    title: "Senior Frontend Developer / Architect",
    company: "AWV agentschap wegen en verkeer",
    period: "May 2022 - September 2025",
    description: [
      "Migrated several existing Angular applications into a new monorepo architecture",
      "Entire build and architecture from the ground up",
      "Transformed maintenance hell project into maintainable codebase",
      "OpenLayers map, integration with complex geolocation & backend APIs",
      "Angular 13-16, ngrx, fp-ts, rxjs"
    ],
    websiteUrl: "https://wegenenverkeer.be",
    projectImages: ["/assets/projects/awv.png"]
  },
  {
    title: "NFT Creator",
    company: "Amphibiminions",
    location: "Remote",
    period: "September 2022",
    description: [
      "Created AmphibiMinions NFT collection, combining unique amphibian and minion-inspired artwork",
      "Developed unique art generation system with custom trait system and rarity mechanics",
      "Created smart contract for minting with token metadata standards",
      "Implemented procedural generation for distinctive art style",
      "Demonstrated NFT development expertise and Web3 integration skills"
    ],
    websiteUrl: "https://opensea.io/collection/amphibiminions",
    projectImages: [
      "/assets/projects/amphibiminions.jpg"
    ]
  },
  {
    title: "Full Stack Developer",
    company: "Kwenta",
    location: "Remote",
    period: "January 2021 - maintenance ongoing",
    description: [
      "Platform between creditor, lawyers and 3rd party accounting software",
      "Manages legal action for unpaid invoices",
      "Stack: Laravel Orchid admin platform, MySQL, AWS S3 buckets"
    ],
    websiteUrl: "https://kwenta.online",
    projectImages: [
      "/assets/projects/kwenta.jpg"
    ]
  },
  {
    title: "Full Stack Developer - Smart Contracts",
    company: "Bitblocks",
    period: "April 2021 - April 2022",
    description: [
      "Bitcoin history NFT platform with procedurally generated blocks",
      "Personal content/message engraving in blockchain",
      "Stack: ReactJS, NestJS, IPFS, Solidity, OpenSea, EtherJS, Ganache, Truffle"
    ],
    projectImages: [
      "/assets/projects/bitblocks-1.jpg",
      "/assets/projects/bitblocks-2.jpg"
    ]
  },
  {
    title: "Full Stack Developer",
    company: "Forex/Crypto Utils",
    period: "August 2020 - January 2021",
    description: [
      "Providing forex/crypto insights for trading groups",
      "NodeJS microservices using NestJS / Redis event queue",
      "Angular 10 frontend, ag-grid, highcharts",
      "Nginx/SSL, WSS using Cloudflare, GraphQL and Apollo",
      "CIRCLE-CI, GitHub, DigitalOcean and PM2"
    ],
    websiteUrl: "https://crypto-forex-utils.com",
    projectImages: [
      "/assets/projects/forex-utils-1.jpg",
      "/assets/projects/forex-utils-2.jpg",
      "/assets/projects/forex-utils-3.jpg"
    ]
  },
  {
    title: "Frontend Architect",
    company: "Fednot",
    period: "June 2018 - April 2021",
    description: [
      "Managing architecture for 8 apps using monorepo approach",
      "Coaching other frontend developers",
      "Development of generic services / library components",
      "Stack: Monorepo using Nrwl.io, Angular CLI, Storybook",
      "Cypress e2e tests, Jest/Spectator unit testing"
    ],
    websiteUrl: "https://www.fednot.be",
    projectImages: ["/assets/projects/fednot.png"]
  },
  {
    title: "Founder",
    company: "Pockettrader",
    period: "June 2018 - October 2018",
    description: [
      "Progressive webapp for cryptocurrency trading from multiple exchanges",
      "Stack: StencilJS Web components with Ionic components, Workbox, NestJS Backend"
    ],
    websiteUrl: "https://www.producthunt.com/posts/pockettrader",
    projectImages: [
      "/assets/projects/pockettrader.jpg"
    ]
  },
  {
    title: "Open Source Developer",
    company: "THELEDGER",
    period: "January 2018 - 2020",
    description: [
      "Created project templates (boilerplates) for Hyperledger Fabric projects",
      "Won Odyssey Hackathon 2019 with team",
      "Stack: EC2, AWS SQS, NestJS, Pusher, Hyperledger Fabric Node SDK, Auth0",
      "GitHub: hyperledger-typescript-boilerplate"
    ],
    websiteUrl: "https://medium.com/wearetheledger",
    projectImages: ["/assets/projects/theledger.png"]
  },
  {
    title: "Frontend Developer",
    company: "Bazookas",
    period: "April 2018 - June 2018",
    description: [
      "Vue.js development for responsive website",
      "Creating components and media queries",
      "Stack on top of PHP Symphony"
    ],
    websiteUrl: "https://www.bazookas.be"
  },
  {
    title: "Hyperledger Developer",
    company: "THELEDGER - Greencards POC",
    period: "January 2018 - April 2018",
    description: [
      "Insurance card (greencard) registration on blockchain",
      "Stack: Angular 5, NestJS, AWS, Hyperledger Fabric, Go chaincode, CircleCI, Auth0"
    ],
    websiteUrl: "https://medium.com/wearetheledger",
    projectImages: ["/assets/projects/theledger.png"]
  },
  {
    title: "Founder",
    company: "LightningAssets",
    period: "October 2017 - January 2018",
    description: [
      "Cryptocurrency trading platform with fractional copy trading",
      "Support for Binance, Bittrex, Poloniex, Kraken",
      "Angular 5 TDD, TypeScript, Jasmine",
      "Node microservices, PM2, CircleCI",
      "Stack: Angular 5, Bitbucket, ag-grid, NestJS, DigitalOcean, Auth0, Redis, Nginx"
    ],
    projectImages: [
      "/assets/projects/lightningassets-1.jpg",
      "/assets/projects/lightningassets-2.jpg"
    ]
  },
  {
    title: "Frontend Developer PIB",
    company: "Digipolis Ghent",
    period: "October 2016 - January 2017",
    description: [
      "Angular 2 test driven development, TypeScript, Jasmine",
      "Front end architecture for PIB, webpack - devops configuration TeamCity",
      "Ng2 Transitions from release candidate to 2.0",
      "Stack: WebApi, .NET, Angular 2, Bitbucket, ag-grid"
    ],
    websiteUrl: "https://www.digipolis.be",
    projectImages: ["/assets/projects/digipolis.png"]
  },
  {
    title: "Frontend Developer Sirius",
    company: "Digipolis Ghent",
    period: "August 2016 - October 2016",
    description: [
      "Angular 2 test driven development, TypeScript, Jasmine",
      "Facilitated transition from gulp/systemjs to Webpack for 4 frontend projects",
      "Ng2 Transitions between release candidates from RC1 – RC4",
      "Stack: WebApi, .NET, Angular 2, Bitbucket"
    ],
    websiteUrl: "https://www.digipolis.be",
    projectImages: ["/assets/projects/digipolis.png"]
  },
  {
    title: "API Developer",
    company: "Siverra",
    period: "May 2016 - August 2016",
    description: [
      "Continue development of existing Node.js API",
      "Full e2e test coverage using Mocha",
      "Full API documentation using apidoc",
      "Code refactoring & Mongoose / Express work",
      "Lucene queries (elasticsearch)",
      "Stack: Heroku, Node.js, Redis, RabbitMQ, Wercker, Bitbucket, Mlab, Cloudflare, Laravel"
    ]
  },
  {
    title: "Technical Co-founder",
    company: "Krackzee",
    period: "October 2015 - February 2016",
    description: [
      "Web platform connecting students with coaching institutes",
      "SEO friendly website on Laravel 5.1 backend",
      "Development of REST API (JWT)",
      "Angular admin panel with authenticated CORS requests",
      "Laravel admin panel for partners and analytics",
      "Facebook login & authentication (socialite)",
      "Mixpanel, Google Analytics, Hotjar, Cloudinary"
    ],
    websiteUrl: "https://angel.co/krackzee-technologies",
    projectImages: [
      "/assets/projects/krackzee-1.png",
      "/assets/projects/krackzee-2.png",
      "/assets/projects/krackzee-3.png",
      "/assets/projects/krackzee-4.png"
    ]
  },
  {
    title: "Freelance Web App / Shopify Developer",
    company: "Bicraw Consulting",
    period: "August 2014 - January 2016",
    description: [
      "Building responsive ERP web applications and business intelligence tools",
      "Shopify theme modifications and custom apps",
      "Integration with external services / databases"
    ]
  },
  {
    title: "Frontend Developer",
    company: "Vikingco",
    period: "February 2015 - July 2015",
    description: [
      "Redesign and redevelopment of entire front end architecture for Citylife",
      "Static page generator using assemble.io",
      "Custom grunt script for multi-language support via Google Spreadsheets API",
      "Angular application, OAuth and user admin",
      "Node.js script to build static HTML pages for merchants",
      "Stack: Spring, Django, Angular 1.3, Rundeck, Jenkins"
    ],
    websiteUrl: "https://mobilevikings.be"
  },
  {
    title: "Web Application Developer",
    company: "PDIUSA",
    period: "October 2014 - January 2015",
    description: [
      "SPA web app - task organizer for international remote teams",
      "HTML5, CSS, JS, Angular, Bootstrap",
      "Firebase (Before Google acquisition)",
      "PHP API for file uploads"
    ],
    websiteUrl: "https://arabianhorseresults.com"
  },
  {
    title: "Founder",
    company: "Altcoinsniper",
    period: "February 2014 - June 2014",
    description: [
      "Trading platform for altcoins (bitcoin)",
      "3 dynamically configurable automatic tradebots",
      ".NET framework, Visual Studio 2010",
      "Integration with Cryptsy API",
      "Windows forms, Zedgraph, Asynchronous programming"
    ],
    projectImages: [
      "/assets/projects/altcoinsniper-1.jpg",
      "/assets/projects/altcoinsniper-2.jpg"
    ]
  },
  {
    title: "Developer MECOMS / Dynamics AX",
    company: "Accenture",
    location: "Gasunie",
    period: "December 2013 - April 2014",
    description: [
      "MECOMS / Dynamics AX development for Gasunie client"
    ],
    websiteUrl: "https://www.accenture.com"
  },
  {
    title: "SAP ABAP Developer",
    company: "Accenture",
    period: "April 2013 - November 2013",
    description: [
      "SAP SEPA full life-cycle implementation for several SAP ECC and ISU clients",
      "Implementation of SAP notes, ABAP troubleshooting and module creation",
      "Development of SAP note suite in .NET to speed up SEPA implementation"
    ],
    websiteUrl: "https://www.accenture.com"
  },
  {
    title: "Supply Chain Specialist - J1 Internship",
    company: "Cardinal Resources",
    period: "January 2011 - January 2012",
    description: [
      "Requisition Process Management, Evaluation of products and suppliers",
      "Development of theoretical model for ATO supply chain",
      "VBA solutions to accommodate business processes",
      "ERP development in VB.NET using Microsoft Access"
    ]
  },
  {
    title: "Project Management Support",
    company: "Prodev Services",
    period: "January 2010 - January 2011",
    description: [
      "Project development support services",
      "Hardware / software troubleshooting",
      "Excel work and VBA for Excel development",
      "3D architectural representations using ArchiCAD",
      "Brochures in InDesign"
    ]
  }
];
