# 视频 / 字幕 API

## 视频码解析

```
GET /api/video/resolve?url={视频地址}
```

由**视频地址**解析（或首次生成）8 位视频码，弹幕按 vid 存储：

```json
{ "code": 0, "data": { "vid": "a1b2c3d4", "source": "new" } }
```

- `source` 表示 vid 来源：
  - `map`：地址已存在于映射表，直接返回已有 vid
  - `legacy`：兼容旧散列算法——该地址存在历史弹幕时继承旧 ID，弹幕不丢
  - `new`：首次出现，生成新 vid 并写入映射表
- OpenList 签名链接会先归一化（剥掉签名参数），签名变化不会产生新 vid
- 地址缺失或非法返回 400；映射表写满返回 507
- 接口只做「URL → vid」单向解析，不返回视频地址本身

## 记录视频映射

```
POST /api/video/map
{ "vid": "8位码", "url": "https://..." }
```

- 视频码 4-32 位字母数字；URL 支持 http(s) 与相对路径
- 播放器首次播放自动调用
- 映射表容量受配置限制（写放大防护）

## OpenList 直链解析

```
GET /api/video/resolve-link?url={OpenList链接}
```

匹配已配置的 OpenList 实例时，调用实例 API（`/api/fs/get`）返回云盘直链（二次地址）：

```json
{ "code": 0, "data": { "url": "https://cdn.../video.mp4?sign=...", "matched": true, "original": "https://实例/d/video.mp4", "cleanUrl": "..." } }
```

- 未匹配实例时返回 `matched: false` 与原链接（播放器原样播放）
- 解析失败返回 502，播放器回退原始链接
- 播放器用它播放直链，但 **vid 与字幕检测仍以原始链接为准**（直链签名变化不影响弹幕/字幕关联）

## 字幕检测

```
GET /api/subtitle/detect?url={视频地址}
```

自动检测视频同目录的字幕文件（.srt / .vtt / .ass / .ssa / .webvtt），返回多语言候选列表（如 `视频名.zh.vtt`、`视频名.en.vtt`）。

对于已配置 OpenList（AList 兼容）云端实例的 `/d/` 链接，还会通过实例 API 检测**云盘同目录**的字幕文件。

## 外部字幕链接

```
POST /api/subtitle/external
{ "url": "https://.../sub.zh.vtt" }
```

校验外部字幕链接：必须是合法 http(s) 地址。合法返回 `{ code: 0, data: { url } }`，否则 `{ code: 1, msg: "无效链接" }`。播放器用它把外部字幕地址关联到当前视频。

## 字幕内容

```
GET /api/subtitle/by-id?id={字幕ID}
```

返回纯文本字幕内容（text/vtt），供播放器加载。
