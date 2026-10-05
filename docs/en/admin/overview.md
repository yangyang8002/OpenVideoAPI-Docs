# Admin Overview

The admin panel lives at `/admin/` by default (configurable). Sidebar pages:

| Page | Purpose |
| --- | --- |
| Console | Visit totals, today requests, active IPs, danmaku/video stats, performance & live request charts |
| Banned Words | Manage keywords, GitHub lexicon subscriptions, one-click refresh |
| Danmaku List | Filter by vid / content, paginate, delete |
| Videos | Manage mappings, batch delete, generate embed codes |
| Subtitles | Add (URL / text / upload), localize, apply/unapply |
| Plugins | Install (file / URL / npm), toggle, config forms, marketplace |
| Dependencies | App version, per-dependency updates, plugin updates |
| Server Config | Settings center: 9 domains (general / theme / danmaku / video / security / API / database / backup / plugins) with search, live validation and per-item reset |
| Files | Browse server files, upload, zip/unzip, batch ops |
| Logs | Last 500 requests (method / path / status / IP / ms) |
| API Manager | Per-API enable/RPS/bandwidth, 1s-precision live stats |
| Database | Storage info, switch & migrate, data browser, export |
| Backups | Scheduled/manual backups, cloud sync (FTP/SFTP/WebDAV/OpenList), restore |
| Security | IP anomaly detection, ban/whitelist, login records & protection, world map |
| About | Version, update check, feature list |

## i18n

Switch UI language (zh / zhHant / wyw / en / ja / fr) anytime; it applies immediately and persists locally.

## Themes

Both player and admin themes (11 each) can be chosen in Server Config. The admin theme applies instantly.
