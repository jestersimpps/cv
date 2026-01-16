import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const PROFILE_SUMMARY = `
# Jo Vinkenroye - Profile Summary

## Experience
- 13+ years building ERP systems, SaaS platforms, and modern web applications
- Full-stack developer with strong TypeScript expertise
- Currently specializing in AI integration, blockchain development, and scalable architectures
- Remote worker based in Belgium

## Core Technical Skills

### Programming Languages
TypeScript, JavaScript (ES2015/ES6), Python, Swift, PHP, C#, VB.NET, Solidity, Go

### Frontend
Angular (2-16), React.js, Next.js, Vue.js, Ionic, StencilJS, D3.js
HTML5, CSS/SASS, Bootstrap, Material UI, Tailwind CSS

### Backend
Node.js, NestJS, Express, Laravel, Django, .NET
GraphQL, Apollo, Socket.io, Temporal

### Databases
PostgreSQL, MySQL, MongoDB, Redis, Firebase, Supabase, Convex

### DevOps & Cloud
Docker, AWS, DigitalOcean, Heroku, Vercel, Fly.io
Jenkins, TeamCity, CircleCI, PM2, Nginx, Cloudflare

### Testing
Cypress, Jest, Jasmine, Karma, Mocha, TDD

### Blockchain & Web3
Hyperledger Fabric, Ethereum, Solidity, IPFS, EtherJS, Smart Contracts, NFTs

### AI & ML
Claude, Codex, Gemini, OpenAI, Anthropic, Groq
Claude Code, AI Agents, Skills, MCPs, AI-powered Workflows

### Specialized
OpenLayers, ag-grid, RxJS, NgRx, Redux, Elasticsearch, Shopify
fp-ts (functional programming), Monorepo Architecture, Microservices

## Personal Skills
Team player, Customer friendly, Analytical mindset, Can work autonomously
Flexible, No false promises, Pro-active, Stubborn problem solver

## Languages
- Dutch: Native
- English: Native/Very good
- French: Good
- Spanish: Daily conversations
- German: Daily conversations
- Chinese: Basic

## Work Preferences
- Remote work (based in Belgium, CET timezone)
- Full TypeScript stacks preferred
- Modern web technologies (React/Next.js/Angular + NestJS)
- AI integration projects
- Web3/blockchain opportunities
- Scalable architecture challenges
- Preference for product companies over pure consulting
- Values: Autonomy, innovation, continuous learning

## NOT a Good Fit For
- Junior/entry-level positions
- Pure manual testing roles
- Legacy technology maintenance without modernization path
- On-site only positions (unless exceptional opportunity)
- PHP-only projects (has moved to TypeScript-first approach)
- Outdated tech stacks (jQuery, old PHP, legacy .NET)
- Projects without clear architecture or technical leadership
- Roles requiring relocation
`;

export async function POST(request: NextRequest) {
  try {
    const { jobDescription } = await request.json();

    if (!jobDescription || jobDescription.trim().length < 50) {
      return NextResponse.json(
        { error: 'Please provide a detailed job description' },
        { status: 400 }
      );
    }

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: `You are an expert recruiter helping assess job fit. Based on Jo's profile below, analyze this job description and provide an honest assessment.

${PROFILE_SUMMARY}

Job Description to Assess:
${jobDescription}

Provide your assessment in the following JSON format:
{
  "isGoodFit": boolean,
  "score": number (0-100),
  "strengths": ["list of 3-5 strong alignment points"],
  "concerns": ["list of 0-4 potential concerns or mismatches"],
  "reasoning": "2-3 sentence overall assessment"
}

Be honest and direct. Consider:
1. Technical stack alignment
2. Seniority level match
3. Work style (remote, autonomy, etc.)
4. Technology preferences (modern vs legacy)
5. Career direction (AI, Web3, modern architectures)
6. Red flags (outdated tech, unclear role, mismatch in expertise)

A good fit (isGoodFit: true) means:
- Strong technical alignment (70%+ of required skills)
- Senior/Lead level role
- Remote or hybrid with flexibility
- Modern tech stack
- Clear growth opportunities

Return ONLY the JSON, no other text.`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response format');
    }

    const assessment = JSON.parse(content.text);

    return NextResponse.json(assessment);
  } catch (error) {
    console.error('Error assessing job:', error);
    return NextResponse.json(
      { error: 'Failed to assess job description' },
      { status: 500 }
    );
  }
}
