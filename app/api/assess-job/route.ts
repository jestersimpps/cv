import { NextRequest, NextResponse } from 'next/server';

const PROFILE_SUMMARY = `
# Jo Vinkenroye - Profile Summary

## Experience
- 13+ years building ERP systems, SaaS platforms, and modern web applications
- Full-stack developer with strong TypeScript expertise
- Currently specializing in AI integration, blockchain development, and scalable architectures
- Remote worker based in Belgium, CET timezone
- Currently running multiple projects: Bicraw.ai (AI web crawler), Kaimeleon.ai (AI agent platform), Smallshop (e-commerce), Hyperscalper (trading bot)

## Core Technical Skills

### Frontend
- React, Next.js, Angular, Vue.js, TypeScript, Tailwind CSS
- Modern frameworks and component-driven development

### Backend
- Node.js, NestJS, Express, Python, Django, GraphQL
- API design, microservices, scalable architectures

### Database
- PostgreSQL, MongoDB, Redis, Supabase, Firebase, Convex
- Both SQL and NoSQL experience

### AI & ML
- OpenAI, Claude, Gemini, LangChain, Groq, DeepL
- Claude Code, AI Agents, MCPs, Multi-Agent Architecture
- Building AI-powered applications and workflows

### Web3 & Blockchain
- Solidity, Ethereum, Hyperledger, IPFS, Smart Contracts, NFTs
- Completed Cyfrin Foundry Full Course (2025) and Metana Web3 Bootcamp (2024)

### DevOps
- Docker, AWS, Vercel, DigitalOcean, CI/CD, Nginx
- Cloud infrastructure and deployment automation

### Mobile
- Swift, SwiftUI, Ionic, React Native
- Cross-platform mobile development

### AI-Assisted Development
- Claude Code, AI Agents, MCPs, Multi-Agent Architecture
- Heavily uses AI tools to accelerate development

## Personal Strengths
- Customer friendly
- Fast learner
- Ships fast
- Can work autonomously
- Pro-active
- Loves to automate work
- Thinks out of the box

## Working Style
- Breaks things (moves fast)
- Continuously improves code
- Iterative approach
- Fast shipper

## Honest Weaknesses
- Loses interest fast (needs engaging challenges)
- Not a good planner (prefers iterative approach)
- Hates repetitive work (strong automation preference)

## Languages
- Dutch: Native
- English: Fluent
- French: Good
- Spanish: Conversational
- German: Basic
- Chinese: Basic

## Currently Looking For
- Contract work
- Startup & Scale-up environments
- Fintech, AI, Web3 projects
- Remote-first companies
- Senior/Lead level roles
- Projects with autonomy and innovation

## Deal Breakers
- On-site only positions
- Outdated tech (.NET, ABAP, Java, PHP without modernization path)
- No clear technical vision or modernization path
- Junior/entry-level roles
- Legacy technology maintenance without innovation
- Roles requiring relocation
- Pure consulting without product ownership

## AI-First Approach
Jo is deeply integrated with AI tools and believes in using AI to accelerate development, automate repetitive tasks, and ship faster. He's particularly interested in roles where AI integration and innovation are valued.
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
  "reasoning": "2-3 sentence overall assessment",
  "connectionTitle": "A compelling, personalized title for why we should connect (e.g., 'Perfect Match for AI Integration Lead', 'Strong Fit for Blockchain Innovation', 'Let's Build Something Amazing Together')"
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
