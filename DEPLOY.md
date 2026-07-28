# Deploying to Netlify

## Deploy

1. Push this folder to a GitHub repo.
2. Netlify → **Add new site → Import an existing project** → pick the repo.
3. The settings should auto-fill from `netlify.toml`. Confirm they read:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy. No environment variables are required.

The SPA redirect in `netlify.toml` is what stops `/services` from 404-ing on a
hard refresh — wouter routes on the client, so every path has to serve
`index.html`.

## What changed from the Manus export

**Removed — Manus-specific build tooling**
- `vite-plugin-manus-runtime` and `@builder.io/vite-plugin-jsx-loc` (dev-only
  editor instrumentation)
- The `manus-debug-collector` Vite plugin and `client/public/__manus__/`
  (browser-log shipping used inside the Manus IDE)
- `server/index.ts` + `express` + the `esbuild` half of the build script. It was
  a static-file server with an SPA fallback; Netlify does both natively.
- `patches/wouter@3.7.1.patch`, which existed only to publish route paths to
  `window.__WOUTER_ROUTES__` for Manus's editor
- `.manuspre.computer` etc. from `server.allowedHosts`
- pnpm lockfile and `packageManager` pin, so the project installs with plain npm

**Removed — dead code that referenced Manus services**
- `client/src/components/Map.tsx` — a Google Maps component routed through
  `forge.butterfly-effect.dev`, a Manus proxy, using a Manus API key. **No page
  imported it.** If you want a map, rewrite it against the Google Maps JS API
  with your own key.
- `client/src/const.ts` — a `getLoginUrl()` helper pointing at Manus OAuth. Unused.
- `client/src/components/ManusDialog.tsx` — a "Login with Manus" modal. Unused.
- `shared/const.ts` — session-cookie constants only the deleted server used.
- The `umami` analytics `<script>` in `index.html`, whose `%VITE_ANALYTICS_*%`
  placeholders were never defined and would have shipped as a literal broken URL.

All of these are in your original zip if you want any of them back.

**Changed — the contact form now actually sends**
`ContactForm.tsx` previously ran `await new Promise(r => setTimeout(r, 1200))`
and then showed "Message Received." It sent nothing, anywhere. It now POSTs to
Netlify Forms, backed by the hidden `<form name="contact">` stub in
`client/index.html` that Netlify parses at deploy time.

To finish wiring it up: after your first deploy, go to **Site configuration →
Forms** in Netlify, confirm the `contact` form was detected, and add a
notification email. Submissions land in the Netlify dashboard. Netlify's free
tier caps submissions per month — check their current pricing page for the
number, since it has changed over time. If you'd rather not use Netlify Forms,
swap the `fetch` call for Formspree, Basin, or your own endpoint; it's about six
lines in `handleSubmit`.

## Still worth doing

**Self-host the images.** Every image still loads from
`d2xsxph8kpxj0f.cloudfront.net/310519663456461424/...`, a Manus-owned bucket.
The site renders fine today and will keep rendering as long as Manus serves
those files — which is not a guarantee you control. Run:

```bash
bash scripts/localize-assets.sh
```

from the project root. It downloads all 19 images into `client/public/images/`
and rewrites the references. (I couldn't run it for you — the sandbox can't
reach that CDN.) Check `git diff` and `npm run dev` afterward.

**The 360° studio viewer and the Pannellum library** load from jsDelivr at
runtime (`Studio.tsx`). That works, but it's a third-party CDN dependency; you
could `npm i pannellum` and bundle it if you'd rather not rely on it.

**`NewMusic.tsx`** posts to a Google Form and embeds a published Google Sheet.
Those are yours and work from any domain — no change needed. `google-apps-script.js`
is the companion Apps Script; it isn't part of the build.

**Check the network logos.** `Services.tsx` displays Netflix, HBO, Apple TV,
Disney, Peacock, ABC, and NFL marks. Worth confirming you're comfortable with
how they're used before this is public.
