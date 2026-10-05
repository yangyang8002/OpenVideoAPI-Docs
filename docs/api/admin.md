# 管理 API

所有 `/api/admin/*` 接口需要请求头 `Authorization: Bearer <token>`（登录后获得）。

## 认证

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | `/api/admin/login` | 登录，返回 token 与 firstRun 标志 |
| POST | `/api/admin/init` | 首次启动初始化（语言 / 时区 / 数据库 / 密码 / 入口） |
| POST | `/api/admin/change-password` | 修改密码 |
| POST | `/api/admin/change-username` | 更换用户名 |

## 内容管理

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET/POST/DELETE | `/api/admin/banned-words` | 屏蔽词增删查 |
| GET/POST/DELETE | `/api/admin/banned-words/subscriptions` | 词库订阅管理 |
| POST | `/api/admin/banned-words/refresh` | 刷新词库 |
| GET | `/api/admin/danmu?page=&limit=&vid=&search=` | 弹幕分页查询 |
| GET | `/api/admin/danmu/vids` | 视频码弹幕量统计 |
| DELETE | `/api/admin/danmu` | 删除弹幕 |
| GET/POST | `/api/admin/videos` | 视频映射查询 / 新增 |
| POST | `/api/admin/videos/delete` | 删除映射（单个或批量） |
| GET/POST | `/api/admin/subtitles` | 字幕查询 / 添加 |
| POST | `/api/admin/subtitles/upload` | 上传字幕文件 |
| POST | `/api/admin/subtitles/localize` | 字幕本地化 |
| DELETE | `/api/admin/subtitles` | 删除字幕 |
| POST | `/api/admin/subtitles/apply` / `unapply` | 应用 / 取消字幕 |
| GET | `/api/admin/subtitles/video-counts` | 各视频已关联的字幕数量（视频列表徽标） |

## 系统与监控

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/api/admin/dashboard` | 控制台统计（访问量 / 计数 / 性能 / 磁盘） |
| GET | `/api/admin/logs?limit=` | 最近请求日志 |
| GET/POST | `/api/admin/config` / POST | 读取 / 保存服务器配置（旧端点，继续可用） |
| GET | `/api/admin/settings` | 设置中心：分域 schema、域名顺序与当前值 |
| POST | `/api/admin/settings/validate` | 保存前校验（`{values}` → `{errors}`） |
| POST | `/api/admin/settings/save` | 保存设置（键为全点路径如 `security.sessionMinutes`，未知键静默跳过；校验失败返回 `code: 2` 与错误表） |
| POST | `/api/admin/restart` | 优雅重启（`{delay}` 毫秒，0 ~ 60000，默认 1500；先响应再执行） |
| GET | `/api/admin/api/stats?span=` | API 统计（span 秒，30 ~ 7776000） |
| POST | `/api/admin/api` | 保存 API 规则与保留天数 |

## 文件管理

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/api/admin/files?path=` | 浏览目录 / 预览文件 |
| POST | `/api/admin/files/upload` | 上传 |
| POST | `/api/admin/files/delete` / `copy` / `zip` / `unzip` | 批量操作 |

## 数据库与备份

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/api/admin/db/info` | 当前存储信息与表统计 |
| POST | `/api/admin/db/test` | 测试连接 |
| POST | `/api/admin/db/switch` | 切换存储并迁移 |
| GET | `/api/admin/db/data` | 表数据浏览 |
| GET | `/api/admin/db/export` | 导出全部数据 |
| GET/POST | `/api/admin/backup/list` / `config` / `create` / `run` | 备份管理 |
| POST | `/api/admin/backup/restore` / `restore-batch` | 恢复 |
| GET/POST | `/api/admin/backup/download` / `delete` | 下载 / 删除 |
| GET/POST | `/api/admin/cloud/config` / `test` / `sync` / `list` | 云端配置与同步 |
| POST | `/api/admin/cloud/download` / `delete` | 云端备份操作 |

## 安全

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/api/admin/security/overview` | 安全总览 |
| GET | `/api/admin/security/ips` | IP 统计列表 |
| GET | `/api/admin/security/anomalies` | 异常 IP |
| GET/POST | `/api/admin/security/lists` | 封禁 / 白名单 |
| POST | `/api/admin/security/ban` / `unban` / `whitelist` / `unwhitelist` | 名单操作 |
| GET | `/api/admin/security/logins` | 登录记录 |
| POST | `/api/admin/security/login-limit` | 登录防护配置 |
| GET | `/api/admin/security/geo/info` / `regions` | 地理信息 |
| POST | `/api/admin/security/geo/update` | 更新 ip2region 数据库 |

## 依赖 / 插件 / 更新

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/api/admin/deps` | 依赖版本 + 程序版本 + 插件更新信息 |
| POST | `/api/admin/deps/update` | 更新依赖（`{names: []}`，空则全部） |
| GET | `/api/admin/plugins` | 插件列表（含元数据与 schema） |
| POST | `/api/admin/plugins/install` | 安装（file / url / npm） |
| POST | `/api/admin/plugins/toggle` | 启用 / 停用 |
| POST | `/api/admin/plugins/config` | 保存配置（热重载） |
| POST | `/api/admin/plugins/update` | 更新插件（按原来源） |
| POST | `/api/admin/plugins/uninstall` | 卸载 |
| GET | `/api/admin/plugins/market` | 官方插件市场 |
| GET | `/api/admin/plugins/logs` | 插件环形日志（各插件 logger 输出） |
| GET | `/api/admin/update/check` | 检查版本更新 |
| POST | `/api/admin/update/config` | 更新/安装配置（npm 镜像源 + 插件市场源；市场源支持 `file://` 本地清单） |
| POST | `/api/admin/update/run` | 执行更新（`{source, restart}`） |
