<p align="center">
  <img src="public/logo.svg" width="120" alt="OpenVideoAPI Docs" />
</p>

# OpenVideoAPI Docs

Official documentation site for [OpenVideoAPI](https://github.com/yangyang8002/OpenVideoAPI) — built with [VitePress](https://vitepress.dev), bilingual (zh/en).

English | [中文](README.cn.md)

- Live docs: <https://doc.mbps.top/>
- Main repo: <https://github.com/yangyang8002/OpenVideoAPI>

## Local Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build to docs/.vitepress/dist
npm run preview  # preview production build
```

## Structure

```
docs/
├── index.md            # Home (Chinese)
├── guide/              # Guide: quickstart / architecture / player / docker / update / faq
├── admin/              # Admin: overview / console / plugins / deps / config / database / backup / security ...
├── api/                # API reference
├── plugins/            # Plugins: dev guide / v2 contract / ctx API / schema / marketplace
└── en/                 # English version
```

## Deploy

Pushing to `main` triggers a GitHub Actions workflow that builds and deploys to GitHub Pages.

## License

MIT
