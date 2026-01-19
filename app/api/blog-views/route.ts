import { NextResponse } from 'next/server';
import { getPageViewCounts, getViewCountForSlug } from '@/lib/posthog/api';

export const runtime = 'nodejs';
export const revalidate = 300; // Cache for 5 minutes

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  try {
    if (slug) {
      // Get view count for a specific slug
      const count = await getViewCountForSlug(slug);
      return NextResponse.json({ slug, views: count });
    }

    // Get all view counts
    const viewCounts = await getPageViewCounts();
    return NextResponse.json(viewCounts);
  } catch (error) {
    console.error('Error in blog-views API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch view counts' },
      { status: 500 }
    );
  }
}
