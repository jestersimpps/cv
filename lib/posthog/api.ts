import { PostHog } from 'posthog-node';

interface ViewCounts {
  [slug: string]: number;
}

interface CachedData {
  data: ViewCounts;
  timestamp: number;
}

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
let cachedViewCounts: CachedData | null = null;
let posthogClient: PostHog | null = null;

function getPostHogClient(): PostHog | null {
  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.posthog.com';

  if (!apiKey) {
    console.error('Missing POSTHOG_PERSONAL_API_KEY');
    return null;
  }

  if (!posthogClient) {
    posthogClient = new PostHog(apiKey, {
      host,
    });
  }

  return posthogClient;
}

function isCacheValid(): boolean {
  if (!cachedViewCounts) return false;
  return Date.now() - cachedViewCounts.timestamp < CACHE_TTL_MS;
}

export async function getPageViewCounts(): Promise<ViewCounts> {
  if (isCacheValid()) {
    return cachedViewCounts!.data;
  }

  const client = getPostHogClient();
  const projectId = process.env.POSTHOG_PROJECT_ID;

  if (!client || !projectId) {
    console.error('Missing PostHog credentials');
    return cachedViewCounts?.data || {};
  }

  try {
    // Use PostHog insights API to get pageview counts
    const response = await fetch(
      `https://eu.posthog.com/api/projects/${projectId}/query/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.POSTHOG_PERSONAL_API_KEY}`,
        },
        body: JSON.stringify({
          query: {
            kind: 'HogQLQuery',
            query: `
              SELECT
                JSONExtractString(properties, '$pathname') as pathname,
                count() as views
              FROM events
              WHERE event = '$pageview'
                AND JSONExtractString(properties, '$pathname') LIKE '/blog/%'
                AND JSONExtractString(properties, '$pathname') != '/blog'
              GROUP BY pathname
              ORDER BY views DESC
            `,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('PostHog API error:', response.status, response.statusText);
      console.error('Error details:', errorText);
      return {};
    }

    const data = await response.json();

    // Convert pathname to slug and build counts object
    const viewCounts: ViewCounts = {};

    if (data.results && Array.isArray(data.results)) {
      data.results.forEach((row: any[]) => {
        const pathname = row[0];
        const views = row[1];

        if (pathname && typeof pathname === 'string' && pathname.startsWith('/blog/')) {
          // Extract slug from pathname like "/blog/my-post-slug"
          const slug = pathname.replace('/blog/', '');
          if (slug && slug !== '/blog') {
            viewCounts[slug] = typeof views === 'number' ? views : parseInt(views, 10) || 0;
          }
        }
      });

      console.log('Successfully fetched view counts:', Object.keys(viewCounts).length, 'posts');
    } else {
      console.log('No results from PostHog query:', data);
    }

    cachedViewCounts = {
      data: viewCounts,
      timestamp: Date.now(),
    };

    return viewCounts;
  } catch (error) {
    console.error('Error fetching PostHog view counts:', error);
    return cachedViewCounts?.data || {};
  }
}

export async function getViewCountForSlug(slug: string): Promise<number> {
  const allCounts = await getPageViewCounts();
  return allCounts[slug] || 0;
}
