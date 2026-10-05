# Quick Start

<span class="badge">v26.10.0</span><span class="badge">Node ≥ 18</span><span class="badge">MIT</span>

OpenVideoAPI is a self-hosted, zero-build danmaku video player with a web admin panel: PoW firewall, multi-database, plugin system, i18n and themes.

## Option 1: npm

```bash
npm install -g open-video-api
open-video-api

# or from source
git clone https://github.com/yangyang8002/OpenVideoAPI.git
cd OpenVideoAPI
npm install
npm start
```

The service listens on `http://localhost:1919` by default (override with the `PORT` env var).

## Option 2: Docker

```bash
docker pull yangyang8002/open-video-api:latest
docker run -d -p 1919:1919 -v ./data:/app/data yangyang8002/open-video-api:latest
```

See [Docker](/en/guide/docker) for details.

## First Run

1. Open `http://localhost:1919/admin/` and log in with `admin / admin123`
2. The **first-run wizard** guides you through: UI language, timezone, database type, new password and admin path
3. Re-login with the new password

::: warning
Change the default password immediately after first login.
:::

## Player URL

```
http://localhost:1919/player/?url=VIDEO_URL
```

- mp4 / m3u8 / flv direct links
- A unique 8-char video ID (vid) is generated on first play; danmaku are stored per vid
- DPlayer-compatible endpoint: `/api/danmu/v3/?id={vid}`

## Project Layout

Since v26.10.0 the server is modular: `server.js` is a thin entry, and the logic lives in `src/` split into routes / services / middleware.

```
server.js             thin entry (~70 lines: create app, listen, graceful shutdown)
src/                  server source
├── app.js            app factory (module assembly: define → mount)
├── routes/           14 route modules (video / danmu / subtitle / admin ...)
├── services/         12 service modules (db / backup / plugins / init ...)
├── middleware/       middleware (security / rate limit / PoW / error handler ...)
├── state.js          global state (S)
├── config.js         config I/O (config.json, atomic writes)
└── logger.js         logger
lib/                  infrastructure (store / cloud / plugin / proxy)
public/               frontend (admin.html, player.html, i18n.js)
theme/                theme system (player/ and admin/, 11 themes each)
plugins/              plugin directory (includes the openvideo-plugin-demo sample)
data/                 data (config.json, danmu.json, videos.json ...)
tools/                helper scripts
update.js             standalone updater
update.xml            sha256 manifest
```

See [Architecture](/en/guide/architecture) for the full module map and assembly order.

## Next Steps

- [Architecture](/en/guide/architecture)
- [Player](/en/guide/player)
- [Admin Overview](/en/admin/overview)
- [Plugin Development](/en/plugins/guide)
- [API Reference](/en/api/reference)
