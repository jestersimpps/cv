import { NextRequest, NextResponse } from 'next/server';

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
**Strengths:**
- Customer friendly (excellent communication)
- Fast learner and fast shipper
- Can work autonomously
- Pro-active and stubborn problem solver
- Analytical mindset
- Flexible

**Working Style & Honest Weaknesses:**
- Ships fast, breaks things, refactors often ("move fast and break things" mentality)
- Loses interest quickly in repetitive/maintenance work
- Not a good planner (prefers iterative development over detailed upfront planning)
- Thrives in fast-paced, innovative environments
- Better at 0-to-1 building than maintaining legacy systems

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

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are an expert recruiter helping assess job fit. Based on Jo's profile, analyze job descriptions and provide honest assessments.

${PROFILE_SUMMARY}

Provide assessments in JSON format with:
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

Return ONLY valid JSON, no other text.`,
          },
          {
            role: 'user',
            content: `Assess this job description:\n\n${jobDescription}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      return NextResponse.json(
        { error: 'Failed to assess job description' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const assessment = JSON.parse(data.choices[0]?.message?.content || '{}');

    return NextResponse.json(assessment);
  } catch (error) {
    console.error('Error assessing job:', error);
    return NextResponse.json(
      { error: 'Failed to assess job description' },
      { status: 500 }
    );
  }
}
