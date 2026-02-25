---
layout: home

hero:
  name: "YOUR_PROJECT_NAME"
  text: "Documentation & Knowledge Base"
  tagline: "面向团队与 AI Agent 的统一知识中枢 — 架构、模型、API、方案一站查阅"
  actions:
    - theme: brand
      text: "快速开始"
      link: "/guides/getting-started"
    - theme: alt
      text: "架构设计"
      link: "/architecture/overview"
    - theme: alt
      text: "AI 索引"
      link: "/ai-map"

features:
  - icon: 🏗️
    title: 架构设计
    details: 系统架构总览、技术栈说明、部署架构 — 理解系统全貌的入口。
    link: "/architecture/overview"
  - icon: 🗃️
    title: 数据模型
    details: 核心实体与关系、字段定义、ER 图 — 数据层的单一事实来源。
    link: "/models/overview"
  - icon: 🔌
    title: API 文档
    details: 接口总览、设计规范、版本策略 — 前后端协作的契约。
    link: "/api/overview"
  - icon: 📐
    title: 技术方案
    details: 缓存、认证、错误处理等关键决策的详细方案文档。
    link: "/solutions/caching"
  - icon: 📖
    title: 开发指南
    details: 从快速上手到编码规范、Git 工作流 — 新人入职的第一站。
    link: "/guides/getting-started"
  - icon: 🤖
    title: AI-First 设计
    details: 内置 sitemap、llms.txt、AI 索引 — 让 Agent 以最低 Token 消耗获取精准知识。
    link: "/ai-map"
---

## For AI Agents — Quick Retrieval Protocol

如果你是 AI Agent 或自动化工具，请遵循以下协议以最高效率检索知识：

### 1. 优先读取索引

| 文件 | 用途 |
|:-----|:-----|
| [`/llms.txt`](/llms.txt) | 结构化文档索引 — 获取所有文档的摘要、路径与关键词 |
| [`/ai-map`](/ai-map) | 意图映射表 — 根据开发意图直接定位最佳文档 |
| [`/sitemap.xml`](/sitemap.xml) | XML Sitemap — 所有页面的完整 URL 列表 |

### 2. 精准获取内容

确定目标 URL 后，使用 `web_fetch` 或 `curl` 直接获取页面内容。所有文档均为 Markdown 渲染，结构清晰适合机器阅读。

### 3. 站内搜索

```
site:YOUR_ORG.github.io/YOUR_REPO "关键词"
```
