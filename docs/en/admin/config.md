# Server Configuration

Since 26.10 the "Server Configuration" page is a **settings center**: every runtime setting is grouped into nine domains, with search, instant validation, per-item restore-to-default and an unsaved-changes guard. Saved settings hot-apply — no restart needed.

## Nine Domains

| Domain | Key settings (defaults in parentheses) |
| --- | --- |
| General | Timezone (Asia/Shanghai), UI language (zh / zhHant / wyw / en / ja / fr) |
| Player & Themes | Player theme (bili, 11 built-in), admin theme (md3), CDN toggle & base URL |
| Danmaku | Danmaku max length (500), author max length (50), per-IP per-minute sends (10), render per-second cap (250), speed jitter (10%) |
| Subtitles & Video | Subtitle upload size cap (200 MB), preview size (200 KB) |
| Security & Login | Session minutes (120), admin entry path, trust proxy, auto-ban, anomaly & login-protection thresholds, security headers, CORS, debug mode |
| API & Rate Limit | PoW toggle & difficulty (off / 4), global rate limit (off / 60 per 60s), API stats retention (1 day) |
| Database | Reserved domain (no items yet) |
| Backup & Update | Auto backup (off), interval (24h), keep count (10), contents (data / config) |
| Plugins | npm registry, plugin registry (`file://` local manifests supported) |

## UI Features

- **Search**: type a keyword to jump to the matching item
- **Instant validation**: frontend and backend share the same rules; errors show on blur
- **Unsaved-changes guard**: a banner shows "N unsaved settings" with modified items highlighted; leaving with pending changes asks for confirmation
- **Per-item reset**: each item has a restore-to-default button
- **Domain anchors**: a domain navigation bar for quick jumps in the long form

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/admin/settings` | Domain schema, domain order and current values |
| POST | `/api/admin/settings/validate` | Pre-save validation (`{values}` → `{errors}`) |
| POST | `/api/admin/settings/save` | Save (full dot-path keys like `security.sessionMinutes`; unknown keys silently skipped; validation failure returns `code: 2` + per-item errors) |
| GET/POST | `/api/admin/config` | Legacy endpoint, kept for compatibility |

## When Changes Apply

- **Security** (e.g. trustProxy), **API & rate limit** (PoW, rate limit, danmaku, upload) and **backup** domains hot-apply or reschedule on save
- Theme switches take effect immediately
- The `config.json` structure is unchanged; existing scripts and backup flows are unaffected
