# 接口总览

所有接口返回 JSON，格式统一为 `{ code, msg, data }`。`code === 0` 表示成功。

## 健康检查

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/healthz` | 存活探测（无需认证）：`{ code: 0, msg: "ok", data: { uptimeSec, pid } }` |

## 公共接口（无需认证）

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/api/config/public` | 播放器公共配置（主题、弹幕限制等） |
| GET | `/api/danmu/?id={vid}` | 获取弹幕（v1 兼容格式） |
| POST | `/api/danmu/` | 发送弹幕（v1） |
| GET | `/api/danmu/v3/?id={vid}` | 获取弹幕（DPlayer 兼容数组格式） |
| GET | `/api/danmu/v3/{vid}` | 同上（路径参数） |
| POST | `/api/danmu/v3/` | 发送弹幕（v3） |
| GET | `/api/video/resolve?url=` | 由视频地址解析视频码（`{vid, source}`） |
| POST | `/api/video/map` | 记录视频映射（`{vid, url}`） |
| GET | `/api/video/resolve-link?url=` | OpenList 直链解析（云盘签名链接 → 二次直链） |
| GET | `/api/subtitle/detect?url=` | 检测视频同目录字幕 |
| GET | `/api/subtitle/by-id?id=` | 按 ID 加载字幕内容 |
| POST | `/api/subtitle/external` | 校验外部字幕链接（`{url}`） |
| GET | `/api/theme/{type}/list` | 主题列表（`type` = player / admin） |
| GET | `/api/theme/{type}.css` | 主题样式表（`type` = player / admin，如 `/api/theme/bili.css`） |
| GET | `/api/plugins/manifest?scope=` | 已启用插件的客户端注入清单 |
| GET | `/api/plugins/client/{scope}/{pkg}/*` | 插件客户端静态脚本 |
| GET | `/api/plugins/i18n?locale=&plugin=` | 插件多语言词条 |
| GET | `/api/plugins/pages` | 插件注册的自定义页面路由 |
| POST | `/api/pow/verify` | PoW 工作量证明校验 |

各接口细节见 [视频 / 字幕 API](/api/video-subtitle) 与 [弹幕 API](/api/danmaku)。

## 管理接口（需要 Bearer Token）

`/api/admin/*` 全部需要请求头 `Authorization: Bearer <token>`。登录接口：

```
POST /api/admin/login  { username, password } → { data: { token, firstRun } }
```

完整的管理接口列表见 [管理 API](/api/admin)。

## 通用约定

- 所有写接口有每 IP 限速（防刷盘）
- 数据迁移期间写接口返回 503
- 弹幕内容长度、作者长度受配置限制
- PoW 启用时，写请求需先通过 `/api/pow/verify` 获取凭证
