import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    // Fetch the URL
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkPreviewBot/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch URL');
    }

    const html = await response.text();

    // Extract Open Graph and meta tags
    const getMetaContent = (property: string): string | undefined => {
      const patterns = [
        new RegExp(`<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']*)["']`, 'i'),
        new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*property=["']${property}["']`, 'i'),
        new RegExp(`<meta[^>]*name=["']${property}["'][^>]*content=["']([^"']*)["']`, 'i'),
        new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*name=["']${property}["']`, 'i'),
      ];

      for (const pattern of patterns) {
        const match = html.match(pattern);
        if (match?.[1]) return match[1];
      }
      return undefined;
    };

    // Get title
    let title = getMetaContent('og:title') || getMetaContent('twitter:title');
    if (!title) {
      const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
      title = titleMatch?.[1];
    }

    // Get description
    const description =
      getMetaContent('og:description') ||
      getMetaContent('twitter:description') ||
      getMetaContent('description');

    // Get image
    const image = getMetaContent('og:image') || getMetaContent('twitter:image');

    // Get favicon
    let favicon = getMetaContent('icon');
    if (!favicon) {
      const faviconMatch = html.match(/<link[^>]*rel=["'](?:icon|shortcut icon)["'][^>]*href=["']([^"']*)["']/i);
      favicon = faviconMatch?.[1];
    }

    // Make favicon absolute URL
    if (favicon && !favicon.startsWith('http')) {
      const urlObj = new URL(url);
      favicon = new URL(favicon, urlObj.origin).href;
    }

    // Make image absolute URL
    let absoluteImage = image;
    if (image && !image.startsWith('http')) {
      const urlObj = new URL(url);
      absoluteImage = new URL(image, urlObj.origin).href;
    }

    return NextResponse.json({
      title: title?.trim(),
      description: description?.trim(),
      image: absoluteImage,
      favicon: favicon,
    });
  } catch (error) {
    console.error('Link preview error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch preview' },
      { status: 500 }
    );
  }
}
