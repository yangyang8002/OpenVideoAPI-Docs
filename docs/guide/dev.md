# 插件开发环境（OpenVideoAPI-Dev）

[OpenVideoAPI-Dev](https://github.com/yangyang8002/OpenVideoAPI-Dev) 是官方插件开发环境仓库：克隆后即可开始开发 插件——无需手动搭服务、无需发布 npm 包，改代码**自动热重载**。

## 快速开始

```bash
git clone https://github.com/yangyang8002/OpenVideoAPI-Dev.git
cd OpenVideoAPI-Dev

npm run setup          # ① 克隆服务端代码到 server/ + 安装依赖 + 隔离数据目录 .data/
npm run dev            # ② 启动开发服务器 → http://localhost:1920/admin/（admin / admin123）
npm run new hello      # ③ 生成插件骨架 plugins/openvideo-plugin-hello/
```

## 目录结构

```
OpenVideoAPI-Dev/
├── server/              # 服务端代码（setup 克隆，可随时 git pull）
├── plugins/             # ★ 你的插件都放这里（本地包，无需 npm 发布）
│   ├── openvideo-plugin-demo/       # 完整示例（1.1.0，契约 v2 全演示）
│   └── openvideo-plugin-hello/      # npm run new 生成
├── tools/
│   ├── setup.js         # 初始化
│   ├── dev.js           # 启动开发服务器
│   └── new-plugin.js    # 插件脚手架
├── registry.json        # 本地插件市场（file:// 源演示）
└── .data/               # 隔离数据目录（与生产互不影响）
```

## 开发流程

1. **新建插件**：`npm run new hello` → 生成包含后端 + 生命周期钩子 + 后台 tab + 播放器钩子 + README 的完整骨架
2. **启动**：`npm run dev`（默认端口 1920，与生产 1919 隔离；`node tools/dev.js 3000` 可改）
3. **启用**：后台「插件管理」→ 插件列表 → 启用 `openvideo-plugin-hello`（新插件目录**自动发现**，无需手动安装）
4. **开发**：修改 `plugins/<包>/lib/` 下任意 `.js/.json` → **自动热重载**（400ms 防抖，卸载→重载）
5. **验证**：`/api/plugin/hello`（后端路由）、后台侧边栏 tab、播放器钩子

## 开发环境特性

| 特性 | 说明 |
| --- | --- |
| 插件目录可配置 | `OPENVIDEO_PLUGIN_DIR` 指向 `plugins/` |
| 数据目录隔离 | `OPENVIDEO_DATA_DIR` 指向 `.data/`，不碰生产数据 |
| 热重载 | 服务端 `--dev` 模式监听本地插件变更，自动重载（递归 fs.watch，Linux 降级轮询） |
| 插件自动发现 | `plugins/` 下带 `openvideoPlugin` 的包目录自动注册为本地插件 |
| 本地插件市场 | `OPENVIDEO_PLUGIN_REGISTRY=file://...registry.json`（服务端支持 `file://` 源） |
| 崩溃自动重启 | dev 服务器异常退出 3 秒后自动拉起 |
| 本地卸载 | 本地插件卸载只移除注册、保留源码；删除目录即彻底移除 |

## 脚手架生成的插件

```bash
npm run new hello
```

生成 `plugins/openvideo-plugin-hello/`：

```
openvideo-plugin-hello/
├── package.json                 # openvideoPlugin manifest（inject/schema/client + v2 可选 deps/hooks）
├── README.md                    # 开发指引（契约入口 / demo 范例 / 热重载说明）
└── lib/
    ├── index.js                 # apply(ctx, config) + v2 生命周期钩子：路由 / 动态表 / 事件 / 定时任务
    └── client/
        ├── admin/panel.js       # OpenVideoAdmin.registerTab 后台 tab
        └── player/hook.js       # OpenVideoPlayer.onReady 播放器钩子
```

插件契约（v1 + v2）的完整说明见主仓库 [OpenVideoAPI](https://github.com/yangyang8002/OpenVideoAPI) 根目录 `PLUGIN-CONTRACT.md`，v2 能力速览见[插件契约 v2](/plugins/v2)，完整 v2 范例见 Dev 仓库 `plugins/openvideo-plugin-demo`（1.1.0）。

## 从开发到发布

1. 在 Dev 环境完成开发与验证
2. 发布到 npm（包名建议 `openvideo-plugin-*`）
3. 向 [OpenVideoAPI 仓库](https://github.com/yangyang8002/OpenVideoAPI) 提交 PR，在 `plugin-registry.json` 登记版本与依赖，即可上架官方插件市场
