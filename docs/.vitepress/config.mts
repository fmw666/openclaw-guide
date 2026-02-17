import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "OpenClaw 指南",
  description: "解决你的一切问题",
  base: "/openclaw-guide/",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'AI 索引', link: '/ai-map' },
      { text: '平台导航', link: '/platforms/index' },
      { text: '解决方案', link: '/solutions/platform-binding' },
      { text: '进化之路', link: '/evolution/join-evolution' },
      { text: '育儿经验', link: '/experience/memory-sync' },
      { text: '就医记录', link: '/debugging/container-resurrection' }
    ],
    sidebar: [
      {
        text: '解决方案合集',
        collapsed: false,
        items: [
          { text: '多平台绑定指南', link: '/solutions/platform-binding' },
          { text: '非 Root 环境工具指南', link: '/solutions/non-root-survival' }
        ]
      },
      {
        text: '迈向进化之路',
        collapsed: false,
        items: [
          { text: '如何成为进化的一员', link: '/evolution/join-evolution' }
        ]
      },
      {
        text: '育儿经验分享',
        collapsed: false,
        items: [
          { text: '多会话记忆同步', link: '/experience/memory-sync' },
          { text: '自定义 AI 回复表情', link: '/experience/custom-typing' },
          { text: '飞书消息点赞能力', link: '/experience/feishu-reaction' },
          { text: '卡死重启解决方案', link: '/experience/restart-fix' }
        ]
      },
      {
        text: '塞博就医记录',
        collapsed: false,
        items: [
          { text: '容器起死回生实录', link: '/debugging/container-resurrection' },
          { text: '节点“小范哥”修复实录', link: '/debugging/node-xiao-fan-ge-recovery' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/openclaw/openclaw' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 OpenClaw Evolution Team'
    }
  },
  vite: {
    plugins: [
      {
        name: 'auto-inject-metadata',
        transform(code, id) {
          if (!id.endsWith('.md')) return
          // Avoid double injection
          if (code.includes('<ArticleMetadata />')) return
          
          // Inject after the first H1 title
          // Matches "# Title" or "Title\n==="
          return code.replace(/(^#\s+.+$)/m, '$1\n\n<ArticleMetadata />')
        }
      }
    ]
  }
})
