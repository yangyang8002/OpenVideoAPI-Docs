// https://vitepress.dev/reference/default-theme-config
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'OpenVideoAPI Docs',
  description: '自托管弹幕视频播放器 + Web 管理后台 官方文档',
  lang: 'zh-CN',
  base: '/',
  cleanUrls: true,
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        logo: '/logo.svg',
        siteTitle: 'OpenVideoAPI',
        search: { provider: 'local' },
        nav: [
          { text: '指南', link: '/guide/quickstart', activeMatch: '/guide/' },
          { text: '管理后台', link: '/admin/overview', activeMatch: '/admin/' },
          { text: 'API 参考', link: '/api/reference', activeMatch: '/api/' },
          { text: '插件', link: '/plugins/guide', activeMatch: '/plugins/' },
          { text: 'English', link: '/en/' }
        ],
        sidebar: {
          '/guide/': [
            {
              text: '指南',
              items: [
                { text: '快速开始', link: '/guide/quickstart' },
                { text: '架构', link: '/guide/architecture' },
                { text: '播放器使用', link: '/guide/player' },
                { text: '插件开发环境', link: '/guide/dev' },
                { text: 'Docker 部署', link: '/guide/docker' },
                { text: '系统更新', link: '/guide/update' },
                { text: '常见问题 (FAQ)', link: '/guide/faq' }
              ]
            }
          ],
          '/admin/': [
            {
              text: '管理后台',
              items: [
                { text: '界面总览', link: '/admin/overview' },
                { text: '控制台', link: '/admin/console' },
                { text: '弹幕 / 视频 / 字幕', link: '/admin/content' },
                { text: '插件管理', link: '/admin/plugins' },
                { text: '依赖与更新', link: '/admin/deps' },
                { text: '服务器配置', link: '/admin/config' },
                { text: '数据库管理', link: '/admin/database' },
                { text: '备份中心', link: '/admin/backup' },
                { text: '安全中心', link: '/admin/security' },
                { text: 'API 管理', link: '/admin/api' },
                { text: '主题系统', link: '/admin/themes' }
              ]
            }
          ],
          '/api/': [
            {
              text: 'API 参考',
              items: [
                { text: '接口总览', link: '/api/reference' },
                { text: '弹幕 API', link: '/api/danmaku' },
                { text: '视频 / 字幕 API', link: '/api/video-subtitle' },
                { text: '管理 API', link: '/api/admin' }
              ]
            }
          ],
          '/plugins/': [
            {
              text: '插件系统',
              items: [
                { text: '插件开发指南', link: '/plugins/guide' },
                { text: '插件契约 v2', link: '/plugins/v2' },
                { text: 'ctx API 参考', link: '/plugins/ctx' },
                { text: '服务层', link: '/plugins/services' },
                { text: '数据模型', link: '/plugins/model' },
                { text: '前端扩展', link: '/plugins/client' },
                { text: '配置 Schema', link: '/plugins/schema' },
                { text: '发布与市场', link: '/plugins/market' }
              ]
            }
          ]
        },
        docFooter: { prev: '上一页', next: '下一页' },
        outline: { label: '本页目录' },
        lastUpdated: { text: '最后更新' },
        socialLinks: [{ icon: 'github', link: 'https://github.com/yangyang8002/OpenVideoAPI' }],
        footer: {
          message: 'MIT License · Made with ♥ by yangyang8002',
          copyright: 'Copyright © 2024-2026 yangyang8002'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        logo: '/logo.svg',
        siteTitle: 'OpenVideoAPI',
        search: { provider: 'local' },
        nav: [
          { text: 'Guide', link: '/en/guide/quickstart', activeMatch: '/en/guide/' },
          { text: 'Admin', link: '/en/admin/overview', activeMatch: '/en/admin/' },
          { text: 'API', link: '/en/api/reference', activeMatch: '/en/api/' },
          { text: 'Plugins', link: '/en/plugins/guide', activeMatch: '/en/plugins/' },
          { text: '中文', link: '/' }
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'Guide',
              items: [
                { text: 'Quick Start', link: '/en/guide/quickstart' },
                { text: 'Architecture', link: '/en/guide/architecture' },
                { text: 'Player', link: '/en/guide/player' },
                { text: 'Plugin Dev Env', link: '/en/guide/dev' },
                { text: 'Docker', link: '/en/guide/docker' },
                { text: 'Update', link: '/en/guide/update' },
                { text: 'FAQ', link: '/en/guide/faq' }
              ]
            }
          ],
          '/en/admin/': [
            {
              text: 'Admin Panel',
              items: [
                { text: 'Overview', link: '/en/admin/overview' },
                { text: 'Console', link: '/en/admin/console' },
                { text: 'Danmaku / Videos / Subtitles', link: '/en/admin/content' },
                { text: 'Plugins', link: '/en/admin/plugins' },
                { text: 'Dependencies', link: '/en/admin/deps' },
                { text: 'Server Config', link: '/en/admin/config' },
                { text: 'Database', link: '/en/admin/database' },
                { text: 'Backups', link: '/en/admin/backup' },
                { text: 'Security', link: '/en/admin/security' },
                { text: 'API Management', link: '/en/admin/api' },
                { text: 'Theme System', link: '/en/admin/themes' }
              ]
            }
          ],
          '/en/api/': [
            {
              text: 'API Reference',
              items: [
                { text: 'Overview', link: '/en/api/reference' },
                { text: 'Danmaku API', link: '/en/api/danmaku' },
                { text: 'Video / Subtitle API', link: '/en/api/video-subtitle' },
                { text: 'Admin API', link: '/en/api/admin' }
              ]
            }
          ],
          '/en/plugins/': [
            {
              text: 'Plugins',
              items: [
                { text: 'Plugin Guide', link: '/en/plugins/guide' },
                { text: 'Plugin Contract v2', link: '/en/plugins/v2' },
                { text: 'ctx API', link: '/en/plugins/ctx' },
                { text: 'Services', link: '/en/plugins/services' },
                { text: 'Data Model', link: '/en/plugins/model' },
                { text: 'Client Extensions', link: '/en/plugins/client' },
                { text: 'Config Schema', link: '/en/plugins/schema' },
                { text: 'Publishing & Market', link: '/en/plugins/market' }
              ]
            }
          ]
        },
        docFooter: { prev: 'Previous', next: 'Next' },
        outline: { label: 'On this page' },
        lastUpdated: { text: 'Last updated' },
        socialLinks: [{ icon: 'github', link: 'https://github.com/yangyang8002/OpenVideoAPI' }],
        footer: {
          message: 'MIT License · Made with ♥ by yangyang8002',
          copyright: 'Copyright © 2024-2026 yangyang8002'
        }
      }
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#7c5cfc' }]
  ]
})
