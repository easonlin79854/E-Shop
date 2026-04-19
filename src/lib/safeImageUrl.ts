/**
 * Validate that a URL only uses http/https schemes to prevent XSS
 * via javascript: or data: protocol URLs in img src attributes.
 * Returns null if the URL is not safe.
 */
export function safeImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return url;
    }
    return null;
  } catch {
    return null;
  }
}
