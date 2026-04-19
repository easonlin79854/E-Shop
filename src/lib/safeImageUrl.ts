/**
 * Validate that a URL only uses http/https schemes to prevent XSS
 * via javascript: or data: protocol URLs in img src attributes.
 * Returns null if the URL is not safe or if the URL is relative
 * (relative URLs are not expected for product images which must be absolute).
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
    // URL constructor throws for relative/invalid URLs — treat as unsafe
    return null;
  }
}
