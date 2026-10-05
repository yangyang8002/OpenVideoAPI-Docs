# Video / Subtitle API

## Video ID Resolution

```
GET /api/video/resolve?url={video URL}
```

Resolves (or generates on first sight) the 8-char video ID for a **video URL**; danmaku are stored per vid:

```json
{ "code": 0, "data": { "vid": "a1b2c3d4", "source": "new" } }
```

- `source` tells where the vid came from:
  - `map`: the URL already exists in the mapping table; the existing vid is returned
  - `legacy`: old hash algorithm compatibility — if the URL has historical danmaku, the old ID is inherited so nothing is lost
  - `new`: first appearance; a fresh vid is generated and recorded
- OpenList signed links are normalized first (signature params stripped), so signature changes never create a new vid
- Missing/invalid URL returns 400; a full mapping table returns 507
- The endpoint resolves URL → vid only; it does not return the video URL itself

## Record Video Mapping

```
POST /api/video/map
{ "vid": "8-char id", "url": "https://..." }
```

- Video ID: 4-32 alphanumeric chars; URL supports http(s) and relative paths
- Called automatically on first playback
- Mapping table capacity is capped by config (write-amplification protection)

## OpenList Direct Link Resolution

```
GET /api/video/resolve-link?url={OpenList link}
```

When the URL matches a configured OpenList instance, it calls the instance API (`/api/fs/get`) to return the cloud direct link (secondary address):

```json
{ "code": 0, "data": { "url": "https://cdn.../video.mp4?sign=...", "matched": true, "original": "https://instance/d/video.mp4", "cleanUrl": "..." } }
```

- Unmatched instances return `matched: false` with the original link (played as-is)
- On failure it returns 502 and the player falls back to the original link
- The player plays the direct link, but **vid and subtitle detection stay keyed to the original link** (changing direct-link signatures never affect danmaku/subtitle associations)

## Subtitle Detection

```
GET /api/subtitle/detect?url={video URL}
```

Auto-detects same-directory subtitle files (.srt / .vtt / .ass / .ssa / .webvtt) and returns a multi-language candidate list (e.g. `video.zh.vtt`, `video.en.vtt`).

For `/d/` links of a configured OpenList (AList-compatible) instance, it also lists same-folder subtitles on the cloud via the instance API.

## External Subtitle Link

```
POST /api/subtitle/external
{ "url": "https://.../sub.zh.vtt" }
```

Validates an external subtitle link: it must be a valid http(s) URL. Valid returns `{ code: 0, data: { url } }`, otherwise `{ code: 1, msg: "无效链接" }`. The player uses it to attach an external subtitle URL to the current video.

## Subtitle Content

```
GET /api/subtitle/by-id?id={subtitle ID}
```

Returns the plain-text subtitle content (text/vtt) for the player to load.
