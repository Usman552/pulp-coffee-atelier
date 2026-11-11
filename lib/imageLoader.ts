/**
 * Static hosting has no image optimiser, so ask the photo CDNs (Unsplash / Pexels)
 * for the width the browser actually needs.
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  if (url.hostname.includes("unsplash")) url.searchParams.set("q", String(quality ?? 75));
  return url.toString();
}
