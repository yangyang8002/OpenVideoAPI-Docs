# API Reference

All endpoints return JSON `{ code, msg, data }`; `code === 0` means success.

## Health Check

| Method | Path | Description |
| --- | --- | --- |
| GET | `/healthz` | Liveness probe (no auth): `{ code: 0, msg: "ok", data: { uptimeSec, pid } }` |

## Public Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/config/public` | Player public config |
| GET | `/api/danmu/?id={vid}` | Fetch danmaku (v1 format) |
| POST | `/api/danmu/` | Send danmaku (v1) |
| GET | `/api/danmu/v3/?id={vid}` | Fetch danmaku (DPlayer array format) |
| GET | `/api/danmu/v3/{vid}` | Same (path param) |
| POST | `/api/danmu/v3/` | Send danmaku (v3) |
| GET | `/api/video/resolve?url=` | Resolve a video URL to its vid (`{vid, source}`) |
| POST | `/api/video/map` | Record mapping `{vid, url}` |
| GET | `/api/video/resolve-link?url=` | OpenList direct-link resolution (signed cloud link → direct link) |
| GET | `/api/subtitle/detect?url=` | Detect sibling subtitles |
| GET | `/api/subtitle/by-id?id=` | Load subtitle content |
| POST | `/api/subtitle/external` | Validate an external subtitle link (`{url}`) |
| GET | `/api/theme/{type}/list` | Theme list (`type` = player / admin) |
| GET | `/api/theme/{type}.css` | Theme stylesheet (`type` = player / admin, e.g. `/api/theme/bili.css`) |
| GET | `/api/plugins/manifest?scope=` | Client injection manifest of enabled plugins |
| GET | `/api/plugins/client/{scope}/{pkg}/*` | Plugin client static scripts |
| GET | `/api/plugins/i18n?locale=&plugin=` | Plugin i18n terms |
| GET | `/api/plugins/pages` | Custom page routes registered by plugins |
| POST | `/api/pow/verify` | PoW verification |

Details in [Video / Subtitle API](/en/api/video-subtitle) and [Danmaku API](/en/api/danmaku).

## Admin Endpoints

All `/api/admin/*` need `Authorization: Bearer <token>`:

```
POST /api/admin/login  { username, password } → { data: { token, firstRun } }
```

See [Admin API](/en/api/admin) for the full list.

## Conventions

- Write endpoints have per-IP rate limits
- During data migration, write endpoints return 503
- Danmaku length limits apply per config
- When PoW is enabled, write requests need a PoW credential first
