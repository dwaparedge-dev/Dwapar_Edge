// Pure. Reduces a User-Agent string to three coarse labels; the string itself is never forwarded or stored.

export type DeviceType = "desktop" | "mobile" | "tablet";
export interface Device { deviceType: DeviceType; browser: string; os: string }

const BOT = /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|monitor|uptime|pingdom|lighthouse|headless|phantomjs|puppeteer|playwright|selenium|curl\/|wget|python-requests|python-urllib|aiohttp|httpclient|java\/|go-http-client|okhttp|axios|node-fetch|undici|libwww|scrapy|postman|insomnia|gptbot|claudebot|perplexity|bytespider|semrush|ahrefs|mj12|dotbot|petalbot|yandex|baiduspider|duckduckbot|applebot|google-inspectiontool|chrome-lighthouse/i;

/** True for crawlers, scripts and link-preview fetchers, and for an empty UA (real browsers always send one). */
export const isBot = (ua: string | null | undefined): boolean => !ua || ua.length < 12 || BOT.test(ua);

export function parseDevice(ua: string): Device {
  const tablet = /ipad|tablet|kindle|silk|playbook/i.test(ua) || (/android/i.test(ua) && !/mobile/i.test(ua));
  const mobile = !tablet && /mobi|iphone|ipod|android|windows phone/i.test(ua);
  // Order matters: Edge and Opera both say "Chrome", Chrome says "Safari".
  const browser = /edg(e|a|ios)?\//i.test(ua) ? "Edge" : /opr\/|opera/i.test(ua) ? "Opera" : /samsungbrowser/i.test(ua) ? "Samsung Internet"
    : /firefox|fxios/i.test(ua) ? "Firefox" : /chrome|crios/i.test(ua) ? "Chrome" : /safari/i.test(ua) ? "Safari" : "Other";
  const os = /windows/i.test(ua) ? "Windows" : /iphone|ipad|ipod/i.test(ua) ? "iOS" : /android/i.test(ua) ? "Android"
    : /mac os x|macintosh/i.test(ua) ? "macOS" : /cros/i.test(ua) ? "ChromeOS" : /linux|x11/i.test(ua) ? "Linux" : "Other";
  return { deviceType: tablet ? "tablet" : mobile ? "mobile" : "desktop", browser, os };
}
