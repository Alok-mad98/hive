<p align="center"><img src="./public/hive.svg" width="74" height="74" alt="Hive logo"></p>

# Hive

Hive is a cloud-native workspace for running AI agents across multiple models. This repository holds the public website for the Windows app.

[Visit the Hive website](https://hive-download.arechampionw.workers.dev)

## Windows preview

The fresh Windows app is in development. Its installer will appear on the website when the first release ships.

## Run the website

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Run `npm run build` to type-check the project and generate the static site in `dist/`. Run `npm run preview` to serve the production build locally.

## Explore the source

| Location | Contents |
| --- | --- |
| [src/main.tsx](./src/main.tsx) | Solid 2 scroll chapters and navigation |
| [src/solid](./src/solid) | Continuous ASCII canvas, footer, and playable Snake 404 page |
| [src/engines](./src/engines) | Six animation engines and their upstream credits |
| [public](./public) | Hive mark, character artwork, and self-hosted font licenses |
| [ARTWORK.md](./ARTWORK.md) | Character artwork and generation prompts |

## Hosting

Cloudflare Workers Static Assets serves the Vite build. Unknown routes return the custom error page with HTTP 404. After building, deploy with `npx wrangler deploy` under your own Cloudflare account.
