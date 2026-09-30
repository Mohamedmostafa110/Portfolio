/**
 * Optional, privacy-conscious event tracking.
 * Active only when VITE_ANALYTICS_URL points to an ingest endpoint you
 * control (e.g. self-hosted Plausible/Umami). Otherwise it is a no-op —
 * no third-party trackers ship with this site.
 */
export function track(event: string, meta?: Record<string, string>): void {
  const url = import.meta.env.VITE_ANALYTICS_URL as string | undefined;
  if (!url) return;
  try {
    const payload = JSON.stringify({ event, meta: meta ?? {}, path: window.location.pathname });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, payload);
    } else {
      void fetch(url, {
        method: "POST",
        body: payload,
        headers: { "Content-Type": "text/plain" },
        keepalive: true,
      });
    }
  } catch {
    /* analytics must never break the site */
  }
}
