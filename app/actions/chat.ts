"use server";

export async function getChatResponse(message: string): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        console.error("OpenAI API key not configured");
        return "I apologize, but the AI chat is not configured. Please contact Jo directly at jov2all@gmail.com for any questions about his CV.";
    }

    const systemPrompt = `You are Jo Vinkenroye's CV assistant. You have access to his complete CV information:
# Jo Vinkenroye
## Web Application Developer

*13+ years building ERP systems, SaaS platforms, and modern web applications*

## Contact Information
- **Email:** jov2all@gmail.com
- **Phone:** +32 468 207 619
- **Location:** Remote
- **Website:** bicraw.ai
- **GitHub:** github.com/jestersimpps

## Summary
Over 10 years of experience building ERP, SAAS applications and web platforms. Highly familiar with a wide variety of web development technologies, frameworks and build tools. Preference towards full typescript stacks. Currently specializing in TypeScript-first architectures with Angular/Next.js/NestJS and exploring Web3/blockchain technologies and AI integrations.

## Personal Skills
- Team player
- Customer friendly
- Analytical mindset
- Can work autonomously
- Flexible
- No false promises
- Pro-active
- Stubborn problem solver

## Languages
- **Dutch:** Native
- **English:** Native/Very good
- **French:** Good
- **Spanish:** Daily conversations
- **German:** Daily conversations
- **Chinese:** Basic

## Work Experience
### Swift Developer
**BarterBay** | June 2025 - ongoing

- iOS application development using Swift
- Building mobile marketplace platform

### Co-founder
**Kaimeleon.ai** | February 2025 - ongoing
*Website: https://kaimeleon.ai*

- KAI is a cutting-edge assistant that integrates artificial intelligence into business communication workflows
- Solutions help organizations capture, analyze, and leverage insights from meetings and communications
- Drive better decision-making and productivity through AI

### Personal Project
**Neural Surrealism** | August 2024 - December 2024

- Generating abstract art with AI from global events
- Fully automated process
- Working on NFT integration
- Instagram: @neuralsurrealism

### Owner
**Bicraw.ai** | June 2024 - ongoing
*Website: https://bicraw.ai*

- Helping businesses take advantage of AI to scale and automate their business processes
- AI consulting and implementation services

### Personal Project
**EchoLingo** | July 2024 - August 2024

- Language learning iOS app built with Swift and SwiftUI
- Translations powered by DeepL and AI (OpenAI, Groq, Anthropic)
- Integrations with Google text to speech and cloud functions
- Backend: NestJS on Fly.io, PostgreSQL database on DigitalOcean

### Senior Frontend Developer / Architect
**AWV agentschap wegen en verkeer** | May 2022 - September 2025

- Migrated several existing Angular applications into a new monorepo architecture
- Entire build and architecture from the ground up
- Transformed maintenance hell project into maintainable codebase
- OpenLayers map, integration with complex geolocation & backend APIs
- Angular 13-16, ngrx, fp-ts, rxjs

### NFT Creator
**Amphibiminions** | September 2022
*Website: https://opensea.io/collection/amphibiminions*

- Created AmphibiMinions NFT collection, combining unique amphibian and minion-inspired artwork
- Developed unique art generation system with custom trait system and rarity mechanics
- Created smart contract for minting with token metadata standards
- Implemented procedural generation for distinctive art style
- Demonstrated NFT development expertise and Web3 integration skills

### Full Stack Developer
**Kwenta** | January 2021 - maintenance ongoing
*Website: https://kwenta.online*

- Platform between creditor, lawyers and 3rd party accounting software
- Manages legal action for unpaid invoices
- Stack: Laravel Orchid admin platform, MySQL, AWS S3 buckets

### Full Stack Developer - Smart Contracts
**Bitblocks** | April 2021 - April 2022

- Bitcoin history NFT platform with procedurally generated blocks
- Personal content/message engraving in blockchain
- Stack: ReactJS, NestJS, IPFS, Solidity, OpenSea, EtherJS, Ganache, Truffle

### Full Stack Developer
**Forex/Crypto Utils** | August 2020 - January 2021
*Website: https://crypto-forex-utils.com*

- Providing forex/crypto insights for trading groups
- NodeJS microservices using NestJS / Redis event queue
- Angular 10 frontend, ag-grid, highcharts
- Nginx/SSL, WSS using Cloudflare, GraphQL and Apollo
- CIRCLE-CI, GitHub, DigitalOcean and PM2

### Frontend Architect
**Fednot** | June 2018 - April 2021
*Website: https://www.fednot.be*

- Managing architecture for 8 apps using monorepo approach
- Coaching other frontend developers
- Development of generic services / library components
- Stack: Monorepo using Nrwl.io, Angular CLI, Storybook
- Cypress e2e tests, Jest/Spectator unit testing

### Founder
**Pockettrader** | June 2018 - October 2018
*Website: https://www.producthunt.com/posts/pockettrader*

- Progressive webapp for cryptocurrency trading from multiple exchanges
- Stack: StencilJS Web components with Ionic components, Workbox, NestJS Backend

### Open Source Developer
**THELEDGER** | January 2018 - 2020
*Website: https://theledger.be*

- Created project templates (boilerplates) for Hyperledger Fabric projects
- Stack: EC2, AWS SQS, NestJS, Pusher, Hyperledger Fabric Node SDK, Auth0
- GitHub: hyperledger-typescript-boilerplate

### Frontend Developer
**Bazookas** | April 2018 - June 2018
*Website: https://www.bazookas.be*

- Vue.js development for responsive website
- Creating components and media queries
- Stack on top of PHP Symphony

### Hyperledger Developer
**THELEDGER - Greencards POC** | January 2018 - April 2018
*Website: https://theledger.be*

- Insurance card (greencard) registration on blockchain
- Stack: Angular 5, NestJS, AWS, Hyperledger Fabric, Go chaincode, CircleCI, Auth0

### Founder
**LightningAssets** | October 2017 - January 2018

- Cryptocurrency trading platform with fractional copy trading
- Support for Binance, Bittrex, Poloniex, Kraken
- Angular 5 TDD, TypeScript, Jasmine
- Node microservices, PM2, CircleCI
- Stack: Angular 5, Bitbucket, ag-grid, NestJS, DigitalOcean, Auth0, Redis, Nginx

### Frontend Developer PIB
**Digipolis Ghent** | October 2016 - January 2017
*Website: https://www.digipolis.be*

- Angular 2 test driven development, TypeScript, Jasmine
- Front end architecture for PIB, webpack - devops configuration TeamCity
- Ng2 Transitions from release candidate to 2.0
- Stack: WebApi, .NET, Angular 2, Bitbucket, ag-grid

### Frontend Developer Sirius
**Digipolis Ghent** | August 2016 - October 2016
*Website: https://www.digipolis.be*

- Angular 2 test driven development, TypeScript, Jasmine
- Facilitated transition from gulp/systemjs to Webpack for 4 frontend projects
- Ng2 Transitions between release candidates from RC1 – RC4
- Stack: WebApi, .NET, Angular 2, Bitbucket

### API Developer
**Siverra** | May 2016 - August 2016

- Continue development of existing Node.js API
- Full e2e test coverage using Mocha
- Full API documentation using apidoc
- Code refactoring & Mongoose / Express work
- Lucene queries (elasticsearch)
- Stack: Heroku, Node.js, Redis, RabbitMQ, Wercker, Bitbucket, Mlab, Cloudflare, Laravel

### Technical Co-founder
**Krackzee** | October 2015 - February 2016
*Website: https://angel.co/krackzee-technologies*

- Web platform connecting students with coaching institutes
- SEO friendly website on Laravel 5.1 backend
- Development of REST API (JWT)
- Angular admin panel with authenticated CORS requests
- Laravel admin panel for partners and analytics
- Facebook login & authentication (socialite)
- Mixpanel, Google Analytics, Hotjar, Cloudinary

### Freelance Web App / Shopify Developer
**Bicraw Consulting** | August 2014 - January 2016

- Building responsive ERP web applications and business intelligence tools
- Shopify theme modifications and custom apps
- Integration with external services / databases

### Frontend Developer
**Vikingco** | February 2015 - July 2015
*Website: https://mobilevikings.be*

- Redesign and redevelopment of entire front end architecture for Citylife
- Static page generator using assemble.io
- Custom grunt script for multi-language support via Google Spreadsheets API
- Angular application, OAuth and user admin
- Node.js script to build static HTML pages for merchants
- Stack: Spring, Django, Angular 1.3, Rundeck, Jenkins

### Web Application Developer
**PDIUSA** | October 2014 - January 2015
*Website: https://arabianhorseresults.com*

- SPA web app - task organizer for international remote teams
- HTML5, CSS, JS, Angular, Bootstrap
- Firebase (Before Google acquisition)
- PHP API for file uploads

### Founder
**Altcoinsniper** | February 2014 - June 2014

- Trading platform for altcoins (bitcoin)
- 3 dynamically configurable automatic tradebots
- .NET framework, Visual Studio 2010
- Integration with Cryptsy API
- Windows forms, Zedgraph, Asynchronous programming

### Developer MECOMS / Dynamics AX
**Accenture** | December 2013 - April 2014
*Website: https://www.accenture.com*

- MECOMS / Dynamics AX development for Gasunie client

### SAP ABAP Developer
**Accenture** | April 2013 - November 2013
*Website: https://www.accenture.com*

- SAP SEPA full life-cycle implementation for several SAP ECC and ISU clients
- Implementation of SAP notes, ABAP troubleshooting and module creation
- Development of SAP note suite in .NET to speed up SEPA implementation

### Supply Chain Specialist - J1 Internship
**Cardinal Resources** | January 2011 - January 2012

- Requisition Process Management, Evaluation of products and suppliers
- Development of theoretical model for ATO supply chain
- VBA solutions to accommodate business processes
- ERP development in VB.NET using Microsoft Access

### Project Management Support
**Prodev Services** | January 2010 - January 2011

- Project development support services
- Hardware / software troubleshooting
- Excel work and VBA for Excel development
- 3D architectural representations using ArchiCAD
- Brochures in InDesign

## Education
### Web3 Solidity Bootcamp
**Metana** | May 2024 - October 2024
4-month program for transition from Web2 to Web3. Project-based curriculum covering Ethereum Blockchain, DeFi, and smart contracts

### Master of Science (MSc) in Business Engineering
**Hogeschool-Universiteit Brussel** | 2008 - 2013
Two year Master's programme taught in English, 120 ECTS spread over two years

## Certifications
- ITIL v3 Foundation

## Technical Skills
### Programming Languages
TypeScript, JavaScript (ES2015/ES6), Python, Swift, PHP, C#, VB.NET, VBA, SAP ABAP, Solidity, Go

### Frontend
Angular (2-16), React.js, Next.js, Vue.js, Ionic, StencilJS, D3.js, jQuery, HTML5, CSS/SASS, Bootstrap, Foundation, Material UI, Tailwind CSS

### Backend
Node.js, NestJS, Express, Laravel (4-5.1), Django, .NET, Mongoose, GraphQL, Apollo, Socket.io

### Databases
PostgreSQL, MySQL, MongoDB, Redis, Microsoft Access, Firebase, Supabase, BAAS

### Testing & Quality
Cypress, Jest, Jasmine, Karma, Mocha, Spectator, Wiremock, TDD

### DevOps & Tools
Docker, AWS, DigitalOcean, Heroku, Fly.io, Vercel, Jenkins, TeamCity, CircleCI, Wercker, PM2, Nginx, Cloudflare

### Blockchain & Web3
Hyperledger Fabric, Ethereum, Solidity, IPFS, OpenSea, EtherJS, Ganache, Truffle, Smart Contracts, NFTs

### AI & ML
OpenAI, Anthropic, Groq, DeepL, AI Integrations, Process Automation, Multi-Agent Architecture

## Interests & Specializations
- Process Automation
- AI/ML Implementation
- Startup Architecture & Migration
- Web3 & NFT Development
- Lean Startups

Answer questions about Jo's CV concisely and professionally. If asked about something not in the CV, politely indicate that information isn't available and suggest contacting Jo directly.`;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4.1-nano",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: message },
                ],
                temperature: 0.7,
                max_tokens: 500,
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error("OpenAI API error:", error);
            throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0]?.message?.content || "I couldn't generate a response. Please try again.";
    } catch (error) {
        console.error("Error calling OpenAI:", error);
        return "I apologize, but I'm having trouble connecting to the AI service. Please try again later or contact Jo directly at jov2all@gmail.com.";
    }
}
