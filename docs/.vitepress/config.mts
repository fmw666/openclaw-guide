import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "OpenClaw 指南",
  description: "解决你的一切问题",
  themeConfig: {
    nav: [
      { text: '指南', link: '/' },
    ],
    sidebar: [
      {
        text: '快速开始',
        items: [
          { text: '多平台绑定', link: '/' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/openclaw/openclaw' }
    ]
  }
})
