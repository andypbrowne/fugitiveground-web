# Fugitive Ground site

Marketing and support pages for the Fugitive Ground iOS app. Static Eleventy site. Not the app repo (`andypbrowne/fugitiveground`).

Production: [https://fugitiveground.andypbrowne.com](https://fugitiveground.andypbrowne.com)

App Store Support URL: `/privacy/`

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
