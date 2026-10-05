<p align="center">
  <img src="public/logo.svg" width="120" alt="OpenVideoAPI 文档" />
</p>

# OpenVideoAPI 文档

[OpenVideoAPI](https://github.com/yangyang8002/OpenVideoAPI) 官方文档网站 —— 基于 [VitePress](https://vitepress.dev) 构建，支持中英双语。

[English](README.md) | 中文

- 在线文档：<https://doc.mbps.top/>
- 主仓库：<https://github.com/yangyang8002/OpenVideoAPI>

## 本地开发

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 构建到 docs/.vitepress/dist
npm run preview  # 预览生产构建
```

## 目录结构

```
docs/
├── index.md            # 首页（中文）
├── guide/              # 指南：快速开始 / 架构 / 播放器 / Docker / 更新 / FAQ
├── admin/              # 管理后台：总览 / 控制台 / 插件 / 依赖 / 设置中心 / 数据库 / 备份 / 安全 ...
├── api/                # API 参考
├── plugins/            # 插件系统：开发指南 / 契约 v2 / ctx API / Schema / 市场
└── en/                 # English 版本
```

## 部署

推送 `main` 分支后，GitHub Actions 自动构建并部署到 GitHub Pages。

## License

MIT
