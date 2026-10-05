# Docker 部署

## 快速开始

```bash
docker pull yangyang8002/open-video-api:latest
docker run -d \
  --name openvideoapi \
  -p 1919:1919 \
  -v /path/to/data:/app/data \
  --restart unless-stopped \
  yangyang8002/open-video-api:latest
```

- 数据目录挂载到宿主机的 `/path/to/data`（弹幕、视频映射、配置、数据库文件均在此）
- 端口可修改为其他宿主机端口：`-p 8080:1919`

## docker-compose

```yaml
version: "3"
services:
  openvideoapi:
    image: yangyang8002/open-video-api:latest
    container_name: openvideoapi
    ports:
      - "1919:1919"
    volumes:
      - ./data:/app/data
    restart: unless-stopped
```

## 镜像版本

| Tag | 说明 |
| --- | --- |
| `latest` | 最新版本 |
| `26.10.0` | 指定版本（tag 与 npm 包版本一致） |
| `26.10.x` | 大版本系列 |

> 国内加速镜像：`fast.fumor.top/yangyang8002/open-video-api`（快速通道）、`ghcr.nju.edu.cn/yangyang8002/open-video-api`（NJU 镜像）

## 更新 Docker 部署

```bash
docker pull yangyang8002/open-video-api:latest
docker compose up -d
```

::: tip
Docker 部署下，后台「检查更新」会提示在宿主机执行上述命令；`update.js` 独立更新进程不适用于容器内（数据由 volume 持久化）。
:::
