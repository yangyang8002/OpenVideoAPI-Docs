# 快速开始

<span class="badge">v26.10.0</span><span class="badge">Node ≥ 18</span><span class="badge">MIT</span>

OpenVideoAPI 是一个自托管、零构建的弹幕视频播放器 + Web 管理后台。支持 PoW 防火墙、多数据库、插件系统、多语言与多主题。

## 方式一：npm 安装（推荐）

```bash
# 全局安装（可作系统服务运行）
npm install -g open-video-api
open-video-api

# 或克隆仓库运行
git clone https://github.com/yangyang8002/OpenVideoAPI.git
cd OpenVideoAPI
npm install
npm start
```

服务默认监听 `http://localhost:1919`，可用环境变量 `PORT` 覆盖。

## 方式二：Docker

```bash
docker pull yangyang8002/open-video-api:latest
docker run -d -p 1919:1919 -v ./data:/app/data yangyang8002/open-video-api:latest
```

或使用 docker-compose，详见 [Docker 部署](/guide/docker)。

## 首次启动

1. 打开 `http://localhost:1919/admin/`，使用默认账号 `admin / admin123` 登录
2. 系统会引导完成**初始化向导**：选择界面语言、时区、数据库类型，并设置新密码与管理入口路径
3. 初始化完成后，使用新密码重新登录

::: warning 安全提示
首次登录后**请立即修改默认密码**，并建议将管理入口路径改为自定义值。
:::

## 播放器地址

```
http://localhost:1919/player/?url=视频地址
```

- 支持 mp4 / m3u8 / flv 直链
- 视频首次播放会自动生成 8 位视频码（vid），弹幕按 vid 存储
- 支持 DPlayer 兼容接口 `/api/danmu/v3/?id={vid}`

## 目录结构

自 v26.10.0 起服务端已模块化：`server.js` 只是薄入口，核心逻辑在 `src/` 下按路由 / 服务 / 中间件分层。

```
server.js             服务入口（仅约 70 行：创建应用、监听端口、优雅退出）
src/                  服务端源码
├── app.js            应用工厂（模块装配：define → mount）
├── routes/           14 个路由模块（video / danmu / subtitle / admin ...）
├── services/         12 个服务模块（db / backup / plugins / init ...）
├── middleware/       中间件（安全 / 限流 / PoW / 错误处理 ...）
├── state.js          全局状态（S）
├── config.js         配置读写（config.json，原子写入）
└── logger.js         日志
lib/                  基础设施（store / cloud / plugin / proxy）
public/               前端页面（admin.html 后台、player.html 播放器、i18n.js）
theme/                主题系统（player/ 与 admin/ 各 11 套）
plugins/              插件目录（含 openvideo-plugin-demo 官方示例）
data/                 数据目录（config.json、danmu.json、videos.json ...）
tools/                辅助脚本
update.js             独立更新进程
update.xml            sha256 版本清单
```

模块清单与装配顺序详见[架构](/guide/architecture)。

## 下一步

- [架构](/guide/architecture)
- [播放器使用](/guide/player)
- [管理后台总览](/admin/overview)
- [插件开发](/plugins/guide)
- [API 参考](/api/reference)
