# Privacy & website — shared facts

Copy this file into the website repo (or link agents to it). Product claims for [fugitiveground.andypbrowne.com](https://fugitiveground.andypbrowne.com) and App Store / marketing copy must match what the iOS app actually does. Do not invent data paths.

**Canonical site:** `https://fugitiveground.andypbrowne.com`  
**Privacy page:** `https://fugitiveground.andypbrowne.com/privacy/`  
**App constant:** `AppLinks.website` in the iOS repo

When behavior changes (especially Insights), update the privacy page and marketing copy in the same release window as the app.

---

## What stays true

- No Fugitive Ground server receives journal text, location, or Insights.
- The website never sees journal entries or Insights.
- Private CloudKit (when signed in) is **user iCloud sync of journal data**, not an Insights backend.
- Insights inference runs **on this device** via Apple’s on-device Foundation Models when available.
- If the model is unavailable or declines the set, the app still shows non-model patterns (tags, places, deterministic Theme / continuity). It does not send bodies to a Fugitive Ground server as a fallback.
- Ad tracking, sale of personal data, and advertising profiles are out of scope.

### Confirm before promising “on device only”

Apple’s stack can evolve. Before final privacy or marketing wording ships, verify current docs for **Foundation Models** / Apple Intelligence as used by the app (on-device Neural Engine vs any Private Cloud Compute). If anything can leave the device under Apple’s path, say so plainly. Do not claim “never leaves the device” unless that is still accurate for the APIs we call.

---

## Data the app uses (plain list)

| Data | Why | Where it goes |
|---|---|---|
| Journal entries (text, tags, place name, dates, moon) | Personal record; Insights patterns | Device; user’s iCloud when signed in |
| Coordinates / timezone for a place | Sunset window, daylight, moon | Device; with the entry / saved place |
| Device location (optional) | Current place when following GPS | Device; not sent to FG servers |
| Notifications | Window start reminders | Local scheduling on device |
| Insights Theme / continuity lines | Patterns from the user’s own notes | Computed on device; cache on device; not on the FG website |

---

## Insights — what to say on the privacy page

Additive update (not a full rewrite). Bump **Last updated**.

Suggested substance (match voice to the rest of the site; keep quiet and specific):

- When enough journal entries exist, **Insights** may appear in the journal.
- Insights names recurring places and tags, and may offer a short reading of the set and a line linking a new note to an earlier one.
- That work is drawn from the user’s own entries and worked out **on this device**. Nothing is sent to a Fugitive Ground server or this website for Insights.
- When an on-device model is unavailable, Insights still shows structured patterns without model prose.
- Journal sync via the user’s iCloud (when signed in) is separate from Insights processing.
- Insights can be turned off in Settings.

Avoid: chatbot framing, “AI coach,” mood scores, mental-health claims, or implying a Fugitive Ground cloud brain.

---

## Insights — marketing / site copy (allowed framing)

Safe product language (aligned with in-app About / Settings):

- Insights are patterns and a short reading drawn from your entries, worked out on this device.
- They show in Journal once there are enough entries; a line linking a new entry to an earlier one starts a bit later.
- No Fugitive Ground server.

Do **not** market Insights as chat, a therapist, a social feed, or a server-side AI feature.

Current in-app anchors (keep website and store copy consistent with these):

- About: “Insights in the journal are drawn from your own entries and worked out on this device. Nothing is sent to a Fugitive Ground server.”
- Settings footer: patterns and a short reading from your entries, on this device; thresholds for when Insights and continuity appear.

---

## Other product facts the site may need

- **Place:** Users choose a place for Today and journal entries. Search can keep a specific name; current location reverse-geocodes to a quieter city-level label. Last place is remembered.
- **Window:** Daily practice is the two hours around sunset at the chosen place.
- **Export:** Journal can export as Markdown on device; that is user-initiated, not a FG server upload.

---

## Checklist when shipping an Insights-related app version

1. Privacy page updated (Insights subsection + Last updated).
2. Marketing homepage / feature blurbs match on-device framing (no AI spectacle).
3. App Store privacy nutrition labels re-checked.
4. About / Settings copy in the app still matches the site.
5. Optional: Settings or About link explicitly to `/privacy/`.

---

## Collaboration

- **Website repo** owns published privacy and marketing pages.
- **This iOS repo** owns product behavior and in-app disclosure (`AboutCopy`, Settings).
- Agents: edit claims against this file first; then update the owning surface. Do not invent Foundation Models, iCloud, or server behavior.
- Deeper product plan: `reference/insights-plan.md` (Privacy & safety). This file is the shareable contract for the website.
