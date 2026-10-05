# Admin API

All `/api/admin/*` endpoints require `Authorization: Bearer <token>`.

## Auth

| Method | Path | Description |
| --- | --- | --- |
| POST | `/api/admin/login` | Login → token + firstRun |
| POST | `/api/admin/init` | First-run setup (lang/tz/db/password/adminPath) |
| POST | `/api/admin/change-password` | Change password |
| POST | `/api/admin/change-username` | Change username |

## Content

| Method | Path | Description |
| --- | --- | --- |
| GET/POST/DELETE | `/api/admin/banned-words` | Banned words |
| GET/POST/DELETE | `/api/admin/banned-words/subscriptions` | Lexicon subscriptions |
| POST | `/api/admin/banned-words/refresh` | Refresh lexicon |
| GET | `/api/admin/danmu?page=&limit=&vid=&search=` | Danmaku pagination |
| GET | `/api/admin/danmu/vids` | Vid danmaku counts |
| DELETE | `/api/admin/danmu` | Delete danmaku |
| GET/POST | `/api/admin/videos` | Video mappings |
| POST | `/api/admin/videos/delete` | Delete mappings (single/batch) |
| GET/POST | `/api/admin/subtitles` | Subtitles |
| POST | `/api/admin/subtitles/upload` | Upload files |
| POST | `/api/admin/subtitles/localize` | Localize remote subtitle |
| DELETE | `/api/admin/subtitles` | Delete subtitle |
| POST | `/api/admin/subtitles/apply` / `unapply` | Apply / unapply |
| GET | `/api/admin/subtitles/video-counts` | Per-video applied subtitle counts (list badges) |

## System

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/admin/dashboard` | Console stats (visits/counts/perf/disk) |
| GET | `/api/admin/logs?limit=` | Request logs |
| GET/POST | `/api/admin/config` | Server config (legacy endpoint, still available) |
| GET | `/api/admin/settings` | Settings center: domain schema, domain order, current values |
| POST | `/api/admin/settings/validate` | Pre-save validation (`{values}` → `{errors}`) |
| POST | `/api/admin/settings/save` | Save settings (full dot-path keys like `security.sessionMinutes`; unknown keys silently skipped; validation failure returns `code: 2` + errors) |
| POST | `/api/admin/restart` | Graceful restart (`{delay}` ms, 0–60000, default 1500; responds first, then restarts) |
| GET | `/api/admin/api/stats?span=` | API stats (30 ~ 7776000 sec) |
| POST | `/api/admin/api` | Save API rules |

## Files

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/admin/files?path=` | Browse / preview |
| POST | `/api/admin/files/upload` | Upload |
| POST | `/api/admin/files/delete` / `copy` / `zip` / `unzip` | Batch ops |

## Database & Backups

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/admin/db/info` | Storage info |
| POST | `/api/admin/db/test` | Test connection |
| POST | `/api/admin/db/switch` | Switch & migrate |
| GET | `/api/admin/db/data` | Browse tables |
| GET | `/api/admin/db/export` | Export all data |
| GET/POST | `/api/admin/backup/list` / `config` / `create` / `run` | Backups |
| POST | `/api/admin/backup/restore` / `restore-batch` | Restore |
| GET/POST | `/api/admin/backup/download` / `delete` | Download / delete |
| GET/POST | `/api/admin/cloud/config` / `test` / `sync` / `list` | Cloud sync |
| POST | `/api/admin/cloud/download` / `delete` | Cloud backup ops |

## Security

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/admin/security/overview` | Overview |
| GET | `/api/admin/security/ips` | IP stats |
| GET | `/api/admin/security/anomalies` | Anomalous IPs |
| GET/POST | `/api/admin/security/lists` | Ban / whitelist |
| POST | `/api/admin/security/ban` / `unban` / `whitelist` / `unwhitelist` | List ops |
| GET | `/api/admin/security/logins` | Login records |
| POST | `/api/admin/security/login-limit` | Login protection config |
| GET | `/api/admin/security/geo/info` / `regions` | Geo info |
| POST | `/api/admin/security/geo/update` | Update ip2region db |

## Deps / Plugins / Updates

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/admin/deps` | Deps + app version + plugin update info |
| POST | `/api/admin/deps/update` | Update deps (`{names:[]}`, empty = all) |
| GET | `/api/admin/plugins` | Plugin list (meta + schema) |
| POST | `/api/admin/plugins/install` | Install (file/url/npm) |
| POST | `/api/admin/plugins/toggle` | Enable / disable |
| POST | `/api/admin/plugins/config` | Save config (hot reload) |
| POST | `/api/admin/plugins/update` | Update plugin |
| POST | `/api/admin/plugins/uninstall` | Uninstall |
| GET | `/api/admin/plugins/market` | Official marketplace |
| GET | `/api/admin/plugins/logs` | Plugin ring-buffer logs (per-plugin logger output) |
| GET | `/api/admin/update/check` | Check for updates |
| POST | `/api/admin/update/config` | Update/install config (npm registry + plugin registry; `file://` local manifests supported) |
| POST | `/api/admin/update/run` | Run update `{source, restart}` |
