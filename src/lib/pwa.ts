// Guards for the offline service worker.
//
// A service worker is held by the browser, not by the site: once installed it
// keeps answering requests even after the code changes. In a Lovable preview
// that would hide the user's newest edits behind an old build, so the preview
// (and every other Lovable-hosted control surface) is refused here, while the
// published address and any custom domain stay allowed.

const PREVIEW_DOMAINS = [".lovable.app", ".gpt-eng.com", ".gptengineer.run"];

// Main preview, numbered draft preview, commit preview and workspace-branded
// preview all start with "id-preview" or "preview" and carry a "--" separator.
const PREVIEW_LABEL = /^(?:id-preview|preview)(?:-[a-z0-9]+)?--.+$/;

// project--<project-id>-dev.lovable.app
const DEV_PROJECT_LABEL = /^project--[^.]+-dev$/;

const BLOCKED_HOSTS = new Set([
  "lovableproject.com",
  "lovableproject-dev.com",
  "beta.lovable.dev",
]);

const BLOCKED_SUFFIXES = [
  ".lovableproject.com",
  ".lovableproject-dev.com",
  ".beta.lovable.dev",
];

export interface RegistrationContext {
  hostname: string;
  search: string;
  isProduction: boolean;
  isEmbedded: boolean;
}

export function isPreviewHost(hostname: string): boolean {
  const host = hostname.trim().toLowerCase();
  if (BLOCKED_HOSTS.has(host)) return true;
  if (BLOCKED_SUFFIXES.some((suffix) => host.endsWith(suffix))) return true;

  const onLovableDomain = PREVIEW_DOMAINS.some(
    (domain) => host === domain.slice(1) || host.endsWith(domain),
  );
  if (!onLovableDomain) return false;

  const label = host.split(".")[0] ?? "";
  return PREVIEW_LABEL.test(label) || DEV_PROJECT_LABEL.test(label);
}

// "?sw=off" is the kill switch: it drops the offline copy from a live page
// without needing a new deployment.
export function isKillSwitch(search: string): boolean {
  const query = search.startsWith("?") ? search.slice(1) : search;
  return new URLSearchParams(query).get("sw") === "off";
}

export function shouldRegisterServiceWorker(context: RegistrationContext): boolean {
  if (!context.isProduction) return false;
  if (context.isEmbedded) return false;
  if (isKillSwitch(context.search)) return false;
  return !isPreviewHost(context.hostname);
}
