# Plugin Guide

The plugin system is modeled after mature plugin frameworks: a plugin is an **npm package** whose `main` exports `apply(ctx, config)`; the framework calls it on load and injects routing, services, data models and an event bus via `ctx`.

## Framework Mapping

| Framework concept | OpenVideoAPI equivalent |
| --- | --- |
| `ctx.plugin(plugin, config)` | same (nested plugins) |
| `ctx.model.define` | `ctx.model.define` (dynamic tables) |
| `ctx.provide` (services) | same |
| `inject` (dependencies) | `openvideoPlugin.inject` |
| `ctx.on / ctx.emit` | same (`danmaku:send` / `ready` / `dispose` / `before:restart`) |
| `schema` | `openvideoPlugin.schema` |
| Console plugins (UI) | `client.admin.tabs` + `client.player` |
| Marketplace / registry | `plugin-registry.json` (versions + dependencies) |
| Plugin template / scaffolding | [OpenVideoAPI-Dev](https://github.com/yangyang8002/OpenVideoAPI-Dev) `npm run new` |

## Environment (recommended: Dev repo)

```bash
git clone https://github.com/yangyang8002/OpenVideoAPI-Dev.git
cd OpenVideoAPI-Dev
npm run setup          # clone server + install deps
npm run dev            # dev server on port 1920 → http://localhost:1920/admin/
npm run new hello      # scaffold plugins/openvideo-plugin-hello/
```

Files under `plugins/<pkg>/lib/` **hot-reload automatically**; data/plugin dirs are isolated from production. See [Plugin Dev Env](/en/guide/dev).

## Plugin Structure

```
openvideo-plugin-hello/
├── package.json                 # npm manifest + openvideoPlugin declaration
└── lib/
    ├── index.js                 # apply(ctx, config) entry
    └── client/                  # optional frontend extensions
        ├── admin/panel.js
        └── player/hook.js
```

```json
{
  "name": "openvideo-plugin-hello",
  "version": "1.0.0",
  "main": "lib/index.js",
  "openvideoPlugin": {
    "name": "hello",
    "description": "My first plugin",
    "inject": ["store", "model", "app", "logger", "http"],
    "provide": ["helloStats"],
    "schema": [ { "key": "greeting", "label": "Greeting", "type": "string", "default": "Hello" } ],
    "client": {
      "admin": { "scripts": ["lib/client/admin/panel.js"], "tabs": [{ "id": "hello", "title": "hello" }] },
      "player": { "scripts": ["lib/client/player/hook.js"], "replaces": false }
    }
  }
}
```

## Entry Forms

```js
// 1. function
module.exports = function (ctx, config) { ... };

// 2. class (constructor(ctx, config))
module.exports = class HelloPlugin { constructor(ctx, config) { ... } };

// 3. object with apply (recommended)
module.exports = { name: 'hello', version: '1.0.0', apply(ctx, config) { ... } };
```

## Lifecycle

| Stage | When | Notes |
| --- | --- | --- |
| Load | enable / server start | `apply(ctx, config)` in topological order; hot reload unloads old instance first |
| Ready | all enabled plugins loaded | `ctx.on('ready', fn)` |
| Run | — | routes / events / timers work; `ctx.provide` services available to others |
| Restart | `ctx.app.restart()` | broadcasts `ctx.on('before:restart', fn)`; new process waits for the port |
| Dispose | disable / hot reload / uninstall | `ctx.on('dispose', fn)` cleanup; listeners & old routes removed automatically |

In the Dev environment, editing any `.js/.json` under `lib/` triggers automatic reload.

## v2 Capabilities (26.10.0+)

Since 26.10 the plugin contract is at v2 (fully backward compatible): the manifest adds `deps` version constraints and `hooks` lifecycle hooks, and `ctx` gains static / pages / cron / settings / logs / i18n / bus / model.namespace. See [Plugin Contract v2](/en/plugins/v2); the main-repo `plugins/openvideo-plugin-demo` 1.1.0 demonstrates every capability.

## Next Steps

- [Plugin Contract v2](/en/plugins/v2) — what's new in 26.10
- [ctx API](/en/plugins/ctx)
- [Services](/en/plugins/services)
- [Data Model](/en/plugins/model)
- [Client Extensions](/en/plugins/client)
- [Config Schema](/en/plugins/schema)
- [Publishing & Market](/en/plugins/market)
