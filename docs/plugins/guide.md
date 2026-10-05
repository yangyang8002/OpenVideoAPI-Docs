# 插件开发指南

插件系统参考成熟插件框架的设计：**插件是一个 npm 包**，包内 `main` 导出 `apply(ctx, config)`，加载时框架调用它，`ctx` 注入路由、服务、数据模型与事件总线。

## 与插件框架的对应

| 框架概念 | OpenVideoAPI 对应 |
| --- | --- |
| `ctx.plugin(plugin, config)` | 同：嵌套插件 |
| `ctx.model.define`（数据表） | `ctx.model.define`（动态表） |
| `ctx.provide`（服务注册） | 同 |
| `inject`（依赖注入） | 同：`openvideoPlugin.inject` |
| `ctx.on / ctx.emit`（事件） | 同：`danmu:send` / `ready` / `dispose` / `before:restart` |
| `schema`（配置表单） | 同：`openvideoPlugin.schema` |
| 控制台插件（前端 UI） | `client.admin.tabs`（后台 tab）+ `client.player`（播放器扩展/替换） |
| 插件市场（registry） | `plugin-registry.json`（版本 + 依赖） |
| 插件模板 / 脚手架 | [OpenVideoAPI-Dev](https://github.com/yangyang8002/OpenVideoAPI-Dev) `npm run new` |

## 环境准备（推荐：Dev 仓库）

开发插件**不需要**本地部署完整服务——使用官方开发环境：

```bash
git clone https://github.com/yangyang8002/OpenVideoAPI-Dev.git
cd OpenVideoAPI-Dev
npm run setup          # 克隆服务端 + 安装依赖
npm run dev            # 启动开发服务器（端口 1920）→ http://localhost:1920/admin/
npm run new hello      # 生成插件骨架 plugins/openvideo-plugin-hello/
```

开发环境特性：**改文件自动热重载**（无需重启）、数据/插件目录与生产隔离、本地插件市场（`file://` 源）。详见 [插件开发环境](/guide/dev)。

也可以手动搭建：克隆 [OpenVideoAPI](https://github.com/yangyang8002/OpenVideoAPI) 主仓库，把插件包放入 `plugins/` 目录（会自动发现），或用 `npm install <包名>` 安装到 `plugins/node_modules/`。

## 插件基本结构

```
openvideo-plugin-hello/
├── package.json                 # npm 包清单 + openvideoPlugin 声明
└── lib/
    ├── index.js                 # apply(ctx, config) 入口
    └── client/                  # 前端扩展（可选）
        ├── admin/panel.js       # 后台 tab 脚本
        └── player/hook.js       # 播放器脚本
```

### package.json 与 manifest

```json
{
  "name": "openvideo-plugin-hello",
  "version": "1.0.0",
  "main": "lib/index.js",
  "openvideoPlugin": {
    "name": "hello",
    "description": "我的第一个插件",
    "inject": ["store", "model", "app", "logger", "http"],
    "provide": ["helloStats"],
    "schema": [
      { "key": "greeting", "label": "欢迎语", "type": "string", "default": "Hello" }
    ],
    "client": {
      "admin": { "scripts": ["lib/client/admin/panel.js"], "tabs": [{ "id": "hello", "title": "hello" }] },
      "player": { "scripts": ["lib/client/player/hook.js"], "replaces": false }
    }
  }
}
```

| 字段 | 说明 |
| --- | --- |
| `name` / `description` | 后台展示用元数据 |
| `inject` | 依赖的服务名数组；依赖提供者自动按拓扑序先加载 |
| `provide` | 本插件提供的服务名（配合 `ctx.provide` 注册） |
| `schema` | 配置表单（见 [配置 Schema](/plugins/schema)） |
| `client` | 前端扩展声明（见 [前端扩展](/plugins/client)） |

### 入口（三种导出形式）

```js
// 1. 函数插件（插件框架 经典写法）
module.exports = function (ctx, config) {
  ctx.logger.info('hello', '加载成功');
};

// 2. 类插件（constructor(ctx, config)）
module.exports = class HelloPlugin {
  constructor(ctx, config) {
    ctx.router.get('/api/plugin/hello', (req, res) => res.json({ code: 0, data: 'hi' }));
  }
};

// 3. 带 apply 的对象（推荐：结构与 manifest 呼应）
module.exports = {
  name: 'hello', version: '1.0.0', description: '...',
  apply(ctx, config) { ... }
};
```

## 生命周期

| 阶段 | 触发 | 说明 |
| --- | --- | --- |
| 加载 | 启用插件 / 服务启动 | 按依赖拓扑序调用 `apply(ctx, config)`；热重载先卸载旧实例 |
| 就绪 | 全部启用插件加载完成 | `ctx.on('ready', fn)` |
| 运行 | — | 路由 / 事件 / 定时器正常工作；`ctx.provide` 的服务对其他插件可用 |
| 重启 | `ctx.app.restart()` | 先广播 `ctx.on('before:restart', fn)`，新进程等待端口释放后接管 |
| 卸载 | 停用 / 热重载 / 卸载 | `ctx.on('dispose', fn)` 清理定时器与连接；事件监听自动移除，旧路由自动失效 |

**热重载**：Dev 环境下修改 `lib/` 任意 `.js/.json` 自动触发「卸载 → 重载」；后台修改配置同样热重载。

## v2 能力(26.10.0+)

26.10 起插件契约升级到 v2(完全向后兼容):manifest 新增 `deps` 版本约束与 `hooks` 生命周期钩子,`ctx` 新增 static / pages / cron / settings / logs / i18n / bus / model.namespace 等能力。详见[插件契约 v2](/plugins/v2);全能力示例见主仓库 `plugins/openvideo-plugin-demo` 1.1.0。

## 下一步

- [插件契约 v2](/plugins/v2) — 26.10 新能力总览
- [ctx API 参考](/plugins/ctx) — 完整 API
- [服务层](/plugins/services) — 插件间协作
- [数据模型](/plugins/model) — 持久化
- [前端扩展](/plugins/client) — 后台 tab / 播放器
- [配置 Schema](/plugins/schema)
- [发布与市场](/plugins/market)
