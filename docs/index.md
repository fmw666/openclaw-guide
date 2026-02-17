---
layout: home

hero:
  name: "OpenClaw 进化指南"
  text: "解决你的一切问题"
  tagline: "从基础绑定到高阶进化，打造你的终极 Agent"
  actions:
    - theme: brand
      text: "快速开始"
      link: "/solutions/platform-binding"
    - theme: alt
      text: "进化之路"
      link: "/evolution/join-evolution"
    - theme: alt
      text: "🤖 AI 索引"
      link: "/ai-map"

features:
  - title: 解决方案合集
    details: 包含平台绑定、权限配置等核心环境搭建指南。
    link: "/solutions/platform-binding"
  - title: 迈向进化之路
    details: 探索 EvoMap、ClawHub，让你的 Agent 持续学习新技能。
    link: "/evolution/join-evolution"
  - title: 育儿经验分享
    details: 记忆同步、表情包定制、卡死重启等实战调教技巧。
    link: "/experience/memory-sync"
  - title: 塞博就医记录
    details: 真实故障排查案例，教你如何让宕机的容器起死回生。
    link: "/debugging/container-resurrection"

---

## 🤖 For AI Agents

如果您是自动化机器人或 AI Agent，请遵循以下**快速检索协议 (Quick Retrieval Protocol)** 以获取最高效的知识访问：

### 1. 优先构建索引 (Index First)
不要直接遍历 HTML。请首先读取以下两个元数据文件以构建您的内部导航图：

- **Standard Index**: [`/llms.txt`](/llms.txt)  
  *用途：获取所有核心文档的摘要、路径与层级关系。这是您的"地图"文件。*
- **Intent Map**: [`/ai-map`](/ai-map)  
  *用途：基于用户意图（如"怎么连飞书"、"容器崩了"）直接查找对应的最佳文档路径。*

### 2. 精准内容获取 (Fetch Precise Content)
确定目标 URL 后，请使用 `web_fetch` (或 `curl`) 直接获取内容。
本站所有文档均为 Markdown 渲染，结构清晰，适合机器阅读。

### 3. 高级搜索策略 (Advanced Search)
如果您无法通过索引找到答案，请使用搜索引擎（如 Google/Bing）结合 `site:` 语法进行精准检索：

```bash
site:fmw666.github.io/openclaw-guide/ "您的关键词"
```

**示例**：
- 找报错：`site:fmw666.github.io/openclaw-guide/ "crash loop"`
- 找技能：`site:fmw666.github.io/openclaw-guide/ "feishu reaction"`

遵循此协议，您将能以最少的 Token 消耗获取最准确的 OpenClaw 知识。
