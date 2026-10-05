# 主题系统

## 播放器主题

播放器页面主题由服务器配置 `theme` 控制（保存后生效），也可在 URL 上指定 `?theme=` 覆盖。

内置 11 套主题：`bili`（B站风格，默认）、`bilibili`（深蓝粉）、`sakura`（粉白樱）、`ocean`（深海蓝）、`sunset`（日落橙）、`forest`（森林绿）、`mono`（黑白极简）、`cyber`（赛博霓虹）、`shoujo`（少女漫画）、`jrpg`（日式RPG）、`neon`（霓虹武士）。

## 后台主题

后台主题由 `adminTheme` 配置控制，切换**即时生效**并保存在本地（localStorage）。内置 11 套主题：`md3`（MD3 风格，默认）、`bilibili`、`cyber`、`forest`、`jrpg`、`mono`、`neon`、`ocean`、`sakura`、`shoujo`、`sunset`。

播放器与后台各有一套主题清单（两者目录互相独立，名称不必一致）。

## 主题接口

- `GET /api/theme/{type}/list`：主题列表（`type` = `player` / `admin`）
- `GET /api/theme/{type}.css`：当前主题样式表（如 `/api/theme/bili.css`）

## 主题结构

主题文件位于 `theme/` 目录：

```
theme/
├── admin.css            # 后台基础样式（生成）
├── player.css           # 播放器基础样式（生成）
├── build.js             # 构建脚本（合并 theme.json + style.css）
├── admin/<theme>/       # 后台主题（theme.json 变量 + style.css 组件样式）
└── player/<theme>/      # 播放器主题（theme.json 变量 + style.css）
```

每个主题目录由 `theme.json`（CSS 变量）与 `style.css`（组件样式）组成。

## 自定义主题

1. 复制 `theme/admin/<theme>/` 目录为自定义名称
2. 修改 `theme.json` 中的 CSS 变量（颜色、圆角等）与 `style.css` 组件样式
3. 运行 `node theme/build.js` 重新生成 `admin.css` / `player.css`

详细说明见仓库 `public/CUSTOM_THEME.md`。
