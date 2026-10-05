# ctx API 参考

`ctx` 是插件上下文，在 `apply(ctx, config)` 时注入（对应 ctx）。

## 基础属性

| 属性 | 说明 |
| --- | --- |
| `ctx.name` | 插件显示名 |
| `ctx.config` | 当前插件配置（后台表单保存后热重载更新） |
| `ctx.version` | 服务端版本号（如 `26.10.0`） |
| `ctx.log(msg)` | 带插件名前缀的日志输出 |

## ctx.router（Express 路由）

```js
ctx.router.get('/api/plugin/hello', (req, res) => res.json({ code: 0, data: 'hi' }));
ctx.router.post('/api/plugin/hello/hook', (req, res) => { ... });
ctx.router.use('/api/plugin/hello', middleware);
```

支持 `get` / `post` / `put` / `delete` / `patch` / `use`。热重载后旧实例注册的路由自动失效。

## ctx.store（数据存储）

弹幕 / 视频 / 字幕 / 屏蔽词等核心数据（与后台 API 同源）：

```js
await ctx.store.danmuAll();
await ctx.store.videoSet(vid, url);
await ctx.store.subtitleAll();
await ctx.store.kvGet(key); await ctx.store.kvSet(key, value);
```

## ctx.app（服务控制）

```js
ctx.app.version            // 服务端版本
ctx.app.pid                // 进程 PID
ctx.app.platform           // 平台
ctx.app.uptime()           // 运行秒数
ctx.app.getConfig()        // 读取服务器配置
ctx.app.saveConfig(patch)  // 保存配置（合并 + 应用 trustProxy 等）
ctx.app.restart({ delay: 1500 })  // 优雅重启（广播 before:restart → 新进程等待端口 → 退出）
```

## ctx.logger（分级日志）

```js
ctx.logger.debug('scope', 'msg');
ctx.logger.info('scope', 'msg');
ctx.logger.warn('scope', 'msg');
ctx.logger.error('scope', 'msg');
ctx.logger.tail(200);      // 环形缓冲（后台 GET /api/admin/plugins/logs 可查，调试工具数据源）
```

## ctx.http（HTTP 客户端）

```js
const res = await ctx.http.get('https://example.com/api');       // Response
const data = await ctx.http.json('https://example.com/api');     // 已解析 JSON（失败返回 null）
const r2 = await ctx.http.post('https://example.com/hook', { hello: 1 });
```

## ctx.on / ctx.emit（事件总线）

```js
ctx.on('danmaku:send', (danmu) => { /* { vid, text, color, type, time, author } */ });
ctx.on('ready', () => { /* 全部启用插件加载完成 */ });
ctx.on('before:restart', () => { /* 重启前清理 */ });
ctx.on('dispose', () => { clearInterval(timer); });   // 卸载清理
ctx.on('my:event', (payload) => { ... });             // 自定义事件
ctx.emit('my:event', { hello: 1 });                   // 同步广播
```

卸载时自动清理该插件注册的全部监听；事件处理器异常被捕获并记录，不影响其他插件。v2 起 `ctx.on` 返回取消函数（`const off = ctx.on(...); off()`），且 `ctx.bus` 提供 `once` / `off` / `emitTo` / `events` 增强。

## ctx.provide / ctx.service（服务层）

详见 [服务层](/plugins/services)：

```js
ctx.provide('myService', { ... });      // 提供服务（manifest.provide 声明）
ctx.service('myService');               // 运行时获取
// manifest.inject 声明的服务直接挂在 ctx 上：ctx.app / ctx.logger / ctx.myService ...
```

## ctx.model（数据模型）

详见 [数据模型](/plugins/model)：

```js
const notes = ctx.model.define('hello_notes', { primary: 'id', fields: { ... } });
await notes.create({ text: 'hi' });
await notes.list({ page: 1, limit: 20, search: 'key', searchKey: 'text' });
```

## ctx.plugin（嵌套插件）

同步加载子插件：

```js
ctx.plugin(require('./sub-plugin'), { interval: 5 });
```

## v2 新增能力（26.10.0+）

在上述 v1 API 之外，v2 新增：`ctx.http.text/request`（超时可控的完整 HTTP 控制）、`ctx.static`（静态资源目录）、`ctx.pages.register`（自定义页面，可要求鉴权）、`ctx.cron.every/at`（自动清理的定时任务）、`ctx.settings`（插件私有持久化 kv）、`ctx.logs`（结构化日志）、`ctx.i18n`（词条注入与 `GET /api/plugins/i18n` 聚合）、`ctx.bus`（事件总线增强）、`ctx.model.namespace`（表名命名空间）。完整契约见 [插件契约 v2](/plugins/v2)。
