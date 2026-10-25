# Fugitive Ground site

Marketing and support pages for the Fugitive Ground iOS app. Static Eleventy site. Not the app repo (`andypbrowne/fugitiveground`).

Production: [https://fugitiveground.andypbrowne.com](https://fugitiveground.andypbrowne.com)

App Store Support URL: `/privacy/`

[![Netlify Status](https://api.netlify.com/api/v1/badges/6a46d9be-2732-4cf8-a459-7be89d9d494b/deploy-status)](https://app.netlify.com/projects/fugitiveground-web/deploys)

## Local

```
npm install
npm start
```

Build:

```
npm run build
```

Output is `_site/`.

## Deploy

Netlify: build `npm run build`, publish `_site`.

Set `SITE_URL=https://fugitiveground.andypbrowne.com` if it is not already in `netlify.toml`.

Custom domain: `fugitiveground.andypbrowne.com`. Point DNS with a CNAME to the Netlify hostname for this site.

## App Store link

When the listing exists, set `appStoreURL` in `_data/app.js`. Leave it `null` until then.

## Pages

- `/` — what FG is
- `/privacy/` — App Store support URL
- `/about/` redirects to `/`
