# Architecture

Since 26.10 the server is organized as a **thin entry + app factory + modular assembly**. This page maps the repository and `src/` modules, the middleware stack and the request lifecycle — read it before diving into the code, debugging, or writing plugins.

## Repository Layout

```
OpenVideoAPI/
├── server.js            # thin entry (~70 lines): env vars, createApp, port wait, graceful shutdown
├── src/
│   ├── app.js           # app factory: 23 modules assembled via DEFINE_ORDER / MOUNT_ORDER
│   ├── state.js         # process-wide shared state (S)
│   ├── config.js        # DEFAULT_CONFIG + atomic config read/write
│   ├── logger.js        # logging
│   ├── middleware/      # 7 middlewares
│   ├── routes/          # 14 route modules
│   └── services/        # 12 service modules
├── lib/                 # infrastructure: store / cloud / plugin / proxy
├── public/              # frontend assets (admin admin.html, player page)
├── theme/               # player/ and admin/ themes, 11 each
├── plugins/             # local plugin dir (auto-discovered)
├── data/                # runtime data (config.json, database, backups)
└── tools/               # helper scripts
```

## Thin Entry: server.js

The entry does exactly three things: read environment variables (`PORT`, `OPENVIDEO_WAIT_PORT`, …), start the service via `createApp()` from `src/app.js`, and register `SIGTERM` / `SIGINT` graceful shutdown (up to 10 seconds). All business logic lives in `src/`, keeping the entry swappable and testable.

## App Factory: src/app.js

`app.js` maintains **23 modules (MODS)** assembled in two phases:

- **define phase** (`DEFINE_ORDER`): initializes logger, config, stats, middlewares, accounts, geo, danmaku, videos, database, backup, subtitles, plugins, update-check, … producing the shared context `ctx = { app, S, PORT, ROOT_DIR }`.
- **mount phase** (`MOUNT_ORDER`): mounts routes and middlewares onto the Express instance in order.

```js
DEFINE_ORDER = ['logger','config','apiStats','requestLog','headers','firstRun','pow',
  'rateLimit','accounts','geo','mwSecurity','danmu','videos','rtAdmin','db','backup',
  'subtitles','plugins','updateCheck','rtDeps','bannedRefresh','errorHandler','init'];

MOUNT_ORDER  = ['pow','rtDanmu','rtVideo','rtAuth','rtAdmin','rtFiles','rtBanned',
  'rtPublic','rtSecurity','rtDb','rtBackup','rtSubtitle','rtDeps','rtPlugins','rtUpdate'];
```

`PORT` = `process.env.PORT || 1919`; `ROOT_DIR` points at the repository root.

## Middleware Stack (mount order)

Requests under `/api/` pass through, in order:

1. **apiControl** — API master switch & rejection
2. **logRequest** — request logging
3. **express.json** — body parsing
4. **helmet + advancedHeaders** — security response headers
5. **securityMiddleware** — IP lists, anomaly detection, login protection
6. **powMiddleware** — proof-of-work on write requests (when enabled)
7. **express.static(public)** — static assets
8. **corsMiddleware** — CORS

`/api/admin` additionally passes **firstRunGuard** (locks the admin API until first-run setup completes).

Next comes the `GET /healthz` health check (no auth; returns `{code:0,msg:'ok',data:{uptimeSec,pid}}` — handy for container probes), then all routes per `MOUNT_ORDER`, with `rtPublic.mountFallback` catching 404s and **errorHandler** as the global backstop.

## Routes × Services × Middlewares

| Layer | Modules |
| --- | --- |
| routes (14) | admin, auth, backup, banned, danmu, db, deps, files, plugins, public, security, subtitle, update, video |
| services (12) | accounts, api-stats, backup, banned-refresh, danmu, db, geo, init, plugins, subtitles, update-check, videos |
| middleware (7) | error-handler, first-run, headers, pow, rate-limit, request-log, security |

- **Routes** only validate params and shape responses; business logic lives in services.
- **Services** carry the domain logic: danmaku, video mapping, subtitles, backups, plugin assembly, geo resolution, …
- **lib/** provides kv / cloud backup / plugin manager / proxy infrastructure; the plugin subsystem (`lib/plugin.js`) runs per the [Plugin Contract v2](/en/plugins/v2).

## Request Lifecycle (example)

For `GET /api/video/resolve?url=...`: middleware stack → `routes/video.js` param validation → `services/videos.js` mapping lookup (resolve & persist on miss) → event bus broadcasts `video:created` → JSON response; any uncaught error is caught by errorHandler and returned in the unified error shape.

## Next Steps

- [Quick Start](/en/guide/quickstart) — install & first run
- [Plugin Guide](/en/plugins/guide) — extend the modular architecture
- [Admin API](/en/api/admin) — endpoint list per route
