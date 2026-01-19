interface PostHogQueryResponse {
  results: Array<[string, number]>; // [pathname, view_count]
}

interface ViewCounts {
  [slug: string]: number;
}

export async function getPageViewCounts(): Promise<ViewCounts> {
  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY;
  const projectId = process.env.POSTHOG_PROJECT_ID;

  if (!apiKey || !projectId) {
    console.error('Missing PostHog credentials');
    return {};
  }

  try {
    const response = await fetch(
      `https://eu.posthog.com/api/projects/${projectId}/query/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          query: {
            kind: 'HogQLQuery',
            query: `
              SELECT
                properties.$pathname as pathname,
                count() as views
              FROM events
              WHERE event = '$pageview'
                AND properties.$pathname LIKE '/blog/%'
                AND properties.$pathname NOT LIKE '/blog'
              GROUP BY properties.$pathname
            `,
          },
        }),
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      console.error('PostHog API error:', response.status, response.statusText);
      return {};
    }

    const data: PostHogQueryResponse = await response.json();

    // Convert pathname to slug and build counts object
    const viewCounts: ViewCounts = {};

    if (data.results && Array.isArray(data.results)) {
      data.results.forEach(([pathname, views]) => {
        // Extract slug from pathname like "/blog/my-post-slug"
        const slug = pathname.replace('/blog/', '');
        if (slug && slug !== '/blog') {
          viewCounts[slug] = views;
        }
      });
    }

    return viewCounts;
  } catch (error) {
    console.error('Error fetching PostHog view counts:', error);
    return {};
  }
}

export async function getViewCountForSlug(slug: string): Promise<number> {
  const allCounts = await getPageViewCounts();
  return allCounts[slug] || 0;
}
