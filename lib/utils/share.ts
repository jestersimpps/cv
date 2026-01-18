export interface ShareData {
  url: string;
  title: string;
  description: string;
}

export function generateTwitterShareUrl(data: ShareData): string {
  const params = new URLSearchParams({
    text: `${data.title}\n\n${data.description}`,
    url: data.url,
    via: 'jestersimpps',
  });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

export function generateLinkedInShareUrl(data: ShareData): string {
  const params = new URLSearchParams({
    url: data.url,
  });
  return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
}

export function generateFacebookShareUrl(data: ShareData): string {
  const params = new URLSearchParams({
    u: data.url,
  });
  return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
