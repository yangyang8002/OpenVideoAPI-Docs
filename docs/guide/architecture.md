# 架构

自 26.10 起,服务端按「**薄入口 + 应用工厂 + 模块化装配**」组织。本文给出仓库与 `src/` 的模块地图、中间件栈与请求生命周期,帮助你在阅读代码、排查问题或编写插件前建立全局印象。

## 目录总览

```
OpenVideoAPI/
├── server.js            # 薄入口(约 70 行):环境变量、createApp、端口等待、优雅关停
├── src/
│   ├── app.js           # 应用工厂:23 个模块按 DEFINE_ORDER / MOUNT_ORDER 装配
│   ├── state.js         # 进程级共享状态(S)
│   ├── config.js        # DEFAULT_CONFIG 与原子化配置读写
│   ├── logger.js        # 日志
│   ├── middleware/      # 7 个中间件
│   ├── routes/          # 14 个路由模块
│   └── services/        # 12 个服务模块
├── lib/                 # 基础设施:store / cloud / plugin / proxy
├── public/              # 前端静态资源(后台 admin.html、播放器页)
├── theme/               # player/ 与 admin/ 各 11 套主题
├── plugins/             # 本地插件目录(自动发现)
├── data/                # 运行数据(config.json、数据库、备份)
└── tools/               # 辅助脚本
```

## 薄入口 server.js

入口只做三件事:读取环境变量(`PORT`、`OPENVIDEO_WAIT_PORT` 等)、调用 `src/app.js` 的 `createApp()` 启动服务、注册 `SIGTERM` / `SIGINT` 优雅关停(最长等待 10 秒)。业务逻辑全部下沉到 `src/`,入口保持可替换、可测试。

## 应用工厂 src/app.js

`app.js` 维护 **23 个模块(MODS)**,两阶段装配:

- **define 阶段**(`DEFINE_ORDER`):按序初始化 logger、config、统计、中间件、账户、geo、弹幕、视频、数据库、备份、字幕、插件、更新检查等模块,产出共享上下文 `ctx = { app, S, PORT, ROOT_DIR }`。
- **mount 阶段**(`MOUNT_ORDER`):按序把路由与中间件挂到 Express 实例上。

```js
DEFINE_ORDER = ['logger','config','apiStats','requestLog','headers','firstRun','pow',
  'rateLimit','accounts','geo','mwSecurity','danmu','videos','rtAdmin','db','backup',
  'subtitles','plugins','updateCheck','rtDeps','bannedRefresh','errorHandler','init'];

MOUNT_ORDER  = ['pow','rtDanmu','rtVideo','rtAuth','rtAdmin','rtFiles','rtBanned',
  'rtPublic','rtSecurity','rtDb','rtBackup','rtSubtitle','rtDeps','rtPlugins','rtUpdate'];
```

`PORT` 取 `process.env.PORT || 1919`;`ROOT_DIR` 指向仓库根目录。

## 中间件栈(挂载顺序)

`/api/` 前缀的请求依次经过:

1. **apiControl** — API 总开关与拒绝
2. **logRequest** — 请求日志
3. **express.json** — 请求体解析
4. **helmet + advancedHeaders** — 安全响应头
5. **securityMiddleware** — IP 名单、异常检测、登录防护
6. **powMiddleware** — 写请求工作量证明(启用时)
7. **express.static(public)** — 静态资源
8. **corsMiddleware** — 跨域

`/api/admin` 额外经过 **firstRunGuard**(首启未初始化时锁定管理端)。

其后是 `GET /healthz` 健康检查(无需鉴权,返回 `{code:0,msg:'ok',data:{uptimeSec,pid}}`,可用于容器编排探活),再按 `MOUNT_ORDER` 挂载全部路由,`rtPublic.mountFallback` 兜底 404,**errorHandler** 全局错误处理收尾。

## 路由 × 服务 × 中间件

| 层 | 模块 |
| --- | --- |
| routes(14) | admin、auth、backup、banned、danmu、db、deps、files、plugins、public、security、subtitle、update、video |
| services(12) | accounts、api-stats、backup、banned-refresh、danmu、db、geo、init、plugins、subtitles、update-check、videos |
| middleware(7) | error-handler、first-run、headers、pow、rate-limit、request-log、security |

- **路由**只做参数校验与响应编排,业务下沉服务层;
- **服务**承载弹幕、视频映射、字幕、备份、插件装配、geo 解析等领域逻辑;
- **lib/** 提供 kv/云备份/插件管理器/代理等基础设施,插件子系统(`lib/plugin.js`)按 [插件契约 v2](/plugins/v2) 运行。

## 请求生命周期(示例)

以 `GET /api/video/resolve?url=...` 为例:中间件栈 → `routes/video.js` 参数校验 → `services/videos.js` 查映射(未命中则解析并落库)→ 事件总线广播 `video:created` → JSON 响应;任何未捕获异常由 errorHandler 兜底返回统一错误结构。

## 下一步

- [快速开始](/guide/quickstart) — 安装与首启
- [插件开发](/plugins/guide) — 在模块化架构上扩展
- [管理 API](/api/admin) — 各路由的端点清单
