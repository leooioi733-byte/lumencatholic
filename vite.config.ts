// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { VitePWA } from "vite-plugin-pwa";

// Offline support. The web app manifest lives in public/manifest.webmanifest and
// is linked from src/routes/__root.tsx, so this plugin only builds the service
// worker. Registration happens from one guarded wrapper (src/lib/pwa-register.ts)
// that refuses to run in dev and in every Lovable preview.
export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      VitePWA({
        manifest: false,
        registerType: "autoUpdate",
        injectRegister: null,
        filename: "sw.js",
        // The client build is written to dist/client, so the worker ships at /sw.js.
        outDir: "dist/client",
        // No service worker is emitted in dev, so the preview always serves the newest build.
        devOptions: { enabled: false },
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2,webmanifest}"],
          cleanupOutdatedCaches: true,
          // Navigations go to the network first (never cache-first HTML), so an
          // update is visible on the next opening instead of after a reload.
          navigateFallback: null,
          runtimeCaching: [
            {
              urlPattern: ({ request, url, sameOrigin }) =>
                sameOrigin &&
                request.mode === "navigate" &&
                !url.pathname.startsWith("/~oauth") &&
                !url.pathname.startsWith("/api/"),
              handler: "NetworkFirst",
              options: {
                cacheName: "lumen-pages",
                networkTimeoutSeconds: 5,
                expiration: { maxEntries: 32, maxAgeSeconds: 60 * 60 * 24 * 7 },
              },
            },
          ],
        },
      }),
    ],
  },
});
