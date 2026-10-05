# Docker

## Quick Start

```bash
docker pull yangyang8002/open-video-api:latest
docker run -d \
  --name openvideoapi \
  -p 1919:1919 \
  -v /path/to/data:/app/data \
  --restart unless-stopped \
  yangyang8002/open-video-api:latest
```

## docker-compose

```yaml
version: "3"
services:
  openvideoapi:
    image: yangyang8002/open-video-api:latest
    ports:
      - "1919:1919"
    volumes:
      - ./data:/app/data
    restart: unless-stopped
```

## Image Tags

| Tag | Description |
| --- | --- |
| `latest` | latest version |
| `26.10.0` | pinned version (matches npm package version) |
| `26.10.x` | release series |

> China mirrors: `fast.fumor.top/yangyang8002/open-video-api`, `ghcr.nju.edu.cn/yangyang8002/open-video-api`

## Updating

```bash
docker pull yangyang8002/open-video-api:latest
docker compose up -d
```

::: tip
For Docker deployments, the admin "check update" button tells you to run the commands above on the host; the `update.js` standalone updater is not used inside the container.
:::
