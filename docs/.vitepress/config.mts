import { defineConfig } from 'vitepress'

// ============================================================================
// TEMPLATE CONFIG — Replace placeholders below with your project's values.
//
//   YOUR_PROJECT_NAME  →  e.g. "EvoMap"
//   YOUR_ORG           →  e.g. "myorg"
//   YOUR_REPO          →  e.g. "evomap-docsite"
//   YOUR_SITE_URL      →  e.g. "https://myorg.github.io/evomap-docsite"
// ============================================================================

const SITE_TITLE = 'YOUR_PROJECT_NAME Docsite'
const SITE_DESC  = 'Architecture, models, APIs, and guides — for humans and AI agents.'
const BASE_PATH  = '/YOUR_REPO/'
const SITE_URL   = 'https://YOUR_ORG.github.io/YOUR_REPO'
const GITHUB_URL = 'https://github.com/YOUR_ORG/YOUR_REPO'

export default defineConfig({
  title: SITE_TITLE,
  description: SITE_DESC,
  base: BASE_PATH,

  head: [
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['link', { rel: 'sitemap', type: 'application/xml', href: `${BASE_PATH}sitemap.xml` }],
  ],

  sitemap: {
    hostname: SITE_URL,
  },

  lastUpdated: true,

  themeConfig: {
    siteTitle: SITE_TITLE,
    logo: '/logo.svg',

    nav: [
      { text: '首页',       link: '/' },
      { text: 'AI 索引',    link: '/ai-map' },
      { text: '架构设计',   link: '/architecture/overview' },
      { text: '数据模型',   link: '/models/overview' },
      { text: 'API 文档',   link: '/api/overview' },
      { text: '开发指南',   link: '/guides/getting-started' },
      { text: '技术方案',   link: '/solutions/caching' },
    ],

    sidebar: {
      '/architecture/': [
        {
          text: '架构设计',
          collapsed: false,
          items: [
            { text: '系统架构总览',   link: '/architecture/overview' },
            { text: '技术栈说明',     link: '/architecture/tech-stack' },
            { text: '部署架构',       link: '/architecture/deployment' },
          ],
        },
      ],
      '/models/': [
        {
          text: '数据模型',
          collapsed: false,
          items: [
            { text: '模型总览',       link: '/models/overview' },
            { text: '实体关系',       link: '/models/entity-relationship' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API 文档',
          collapsed: false,
          items: [
            { text: 'API 总览',       link: '/api/overview' },
            { text: 'API 设计规范',   link: '/api/conventions' },
          ],
        },
      ],
      '/guides/': [
        {
          text: '开发指南',
          collapsed: false,
          items: [
            { text: '快速开始',       link: '/guides/getting-started' },
            { text: '编码规范',       link: '/guides/coding-standards' },
            { text: 'Git 工作流',     link: '/guides/git-workflow' },
          ],
        },
      ],
      '/solutions/': [
        {
          text: '技术方案',
          collapsed: false,
          items: [
            { text: '缓存方案',       link: '/solutions/caching' },
            { text: '认证与授权',     link: '/solutions/authentication' },
            { text: '错误处理规范',   link: '/solutions/error-handling' },
          ],
        },
      ],
      '/changelog/': [
        {
          text: '变更日志',
          items: [
            { text: '变更记录',       link: '/changelog/' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: GITHUB_URL },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © ${new Date().getFullYear()} YOUR_ORG`,
    },

    search: {
      provider: 'local',
    },

    outline: {
      level: [2, 3],
      label: '页面导航',
    },

    lastUpdated: {
      text: '最后更新于',
    },

    editLink: {
      pattern: `${GITHUB_URL}/edit/main/docs/:path`,
      text: '在 GitHub 上编辑此页',
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
  },
})
