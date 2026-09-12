Agent brief: Fugitive Ground marketing site (fugitiveground-web)
Context
Build a static marketing and support site for the Fugitive Ground iOS app. It is not the app repo. Do not modify andypbrowne/fugitiveground unless the user explicitly asks.

Production URL: https://fugitiveground.andypbrowne.com
App already links here: iOS AppLinks.website points at this domain.
Stack: Eleventy only (user did a clean Eleventy starter install). No Sanity, no CMS, no backend.
Deploy target: Netlify (or similar static host). Set SITE_URL / canonical URLs to the production domain.
Product definition (keep copy accurate)
Fugitive Ground (FG) is a two-hour window each day: one hour before sunset through one hour after sunset, for the user’s place. The app shows live status, times, moon context, journal entries tied to date+place, notifications, etc.

Canonical one-liner (from the app’s AboutCopy):

Fugitive Ground is a time and place everyday beginning one hour before sunset and ending one hour after sunset wherever you are. The shifting light marks place, transience, and the edge of day.

Window math: start = sunset - 1h, end = sunset + 1h. Use the same sunset definition as the app (SunCalc-style, not civil twilight unless labeled).

Voice and writing
Follow the Fugitive Ground voice skill if available in the workspace; otherwise use these rules:

Calm, direct, sentence case for UI and headings (Privacy, About, not PRIVACY).
Brand name: Fugitive Ground; abbreviation FG is fine in compact UI.
No productivity hype, no “don’t miss out,” no AI framing.
Short lines on the home page; full sentences on privacy and about.
Reference (iOS repo): .cursor/skills/fugitive-ground-voice/SKILL.md and AboutCopy in fugitiveground/Settings/AboutFugitiveGroundView.swift.

v1 scope (ship this first)
Page / asset	Purpose
Home (/)
What FG is, link to App Store when available (placeholder or “coming soon” until URL exists), optional live demo (phase 2 below)
Privacy (/privacy/)
Required for App Store Support URL. Cover: location (when user opts in), local notifications, journal stored on device (and iCloud when enabled in paid build), no ad tracking, no selling data
About (/about/) optional
Project story, link to original blog post, credits (SunCalc / Vladimir Agafonkin, etc.)
404
Simple, on-brand
robots.txt / sitemap.xml
Eleventy-friendly; include home + privacy (+ about)
favicon / social
Reuse FG visual language (red field, horizon mark) if assets exist; otherwise minimal
Out of scope for v1: blog, Sanity, accounts, journal sync on web, App Store server APIs, analytics pixels unless the user asks.

Phase 2 (home page demo, still static)
Optional interactive block on the home page:

User taps “Use my location” (never prompt on load).
navigator.geolocation.getCurrentPosition as the primary path (Safari/iOS).
Optional progressive enhancement: <geolocation> element where supported (Chrome 144+), same handler for coordinates.
suncalc (npm) in a small bundled or inline client script: compute today’s sunset, then start/sunset/end in 24-hour time by default (match app default).
Denied / unavailable: short message + suggest installing the app or trying again; no IP geolocation unless the user requests it (privacy).
All location math in the browser only; do not send lat/lon to a server. State that clearly on the privacy page.

Technical constraints
Keep the Eleventy starter’s conventions unless something is clearly wrong; prefer one CSS file or a small set, logical properties, responsive layout.
HTTPS required for geolocation.
No secrets in the repo. Netlify env: at minimum SITE_URL=https://fugitiveground.andypbrowne.com if the starter uses it.
.gitignore: node_modules, _site, .env.
Node: match starter’s .nvmrc / package.json engines if present.
Design direction
Minimal, app-adjacent: strong red accent, plenty of whitespace, readable body type. Inconsolata is used in the app; web can use it only if licensed (OFL) and loaded deliberately—system UI font is fine for v1.
Home should feel like the app’s Time card idea: date, optional countdown copy pattern (Starts today • …), three times in a read-only layout—not form fields.
Do not copy the entire iOS codebase; steal patterns, not Swift.

App Store / TestFlight
Support URL in App Store Connect → https://fugitiveground.andypbrowne.com/privacy/ (or / if privacy is the main legal page; prefer dedicated /privacy/).
Marketing URL → https://fugitiveground.andypbrowne.com/
App Store link: leave a config constant (e.g. appStoreURL: null) until the user sets an App Store ID; iOS uses AppLinks.appStoreID when ready.
Netlify
Build command: starter’s npm run build (or npx @11ty/eleventy).
Publish directory: starter output (often _site).
Custom domain: fugitiveground.andypbrowne.com (DNS is user’s job; document CNAME in README).
README for the repo
Short README: what the site is, npm install, npm run dev, build, deploy, env vars, relationship to the iOS app repo.

Acceptance criteria
npm run build succeeds with no errors.
Home and privacy render; privacy is substantive enough for App Store review.
All internal links work; canonical URLs use production domain in production builds.
No Sanity, no API keys committed.
If demo is implemented: geolocation only after user gesture; fallback when denied.
Lighthouse: reasonable accessibility (labels, contrast, focus) without over-engineering.
Workflow
Inspect existing Eleventy starter layout (src/, eleventy.config, etc.) before restructuring.
Implement v1 pages and deploy config before the geolocation demo.
Do not bump or change the iOS app version or bundle ID from this repo.
Commit in small, logical chunks; user will push to andypbrowne/fugitiveground-web.