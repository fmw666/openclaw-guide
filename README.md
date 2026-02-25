# docsite-rag-template

**AI-First Documentation Site Template** — 基于 VitePress 的文档站点模板，面向人类高可读性的同时完美服务于 AI Agent 的 RAG 检索。

## 为什么需要这个模板？

在 AI 辅助开发时代，项目知识不仅需要人类能读，更需要 AI Agent 能**高效检索和准确理解**。本模板提供：

- **结构化知识体系** — 架构设计、数据模型、API 文档、技术方案、开发指南，分类清晰
- **AI 检索优化** — 内置 `llms.txt`、AI 意图映射表（ai-map）、XML Sitemap
- **Agent 完整操作手册** — `skill.md` 包含检索协议、维护协议、格式规范、操作脚本、连锁更新矩阵，AI 读一遍就知道怎么用
- **文档效应体系** — 每类文档定义了明确的效应范围和连锁更新规则，AI 改一处自动知道要同步哪些文档
- **文档格式模板** — 每种文档分类提供精确的 Markdown 模板，AI 创建新文档零猜测
- **VitePress 驱动** — 人类可读的精美文档站点，支持全文搜索、暗色模式

## 适用场景

```
your-org/
├── evomap-website/         # 前端项目 → skill.md 指向 docsite
├── evomap-hub/             # 后端项目 → skill.md 指向 docsite
├── evomap-postgresql/      # 数据库项目 → skill.md 指向 docsite
└── evomap-docsite/         # ← 基于本模板创建
```

所有项目的 AI Agent 通过 `skill.md` 协议访问同一个文档站点：
- **查阅知识** — 架构设计、缓存方案、模型定义…
- **维护文档** — 新增模型时自动更新模型文档、ER 图、API 文档…

## 快速开始

### 1. 使用模板创建仓库

点击 GitHub 的 **"Use this template"** 按钮，或：

```bash
git clone https://github.com/YOUR_ORG/docsite-rag-template.git your-project-docsite
cd your-project-docsite
```

### 2. 替换占位符

全局替换以下占位符：

| 占位符 | 替换为 | 示例 |
|:-------|:-------|:-----|
| `YOUR_PROJECT_NAME` | 项目名称 | `EvoMap` |
| `YOUR_ORG` | GitHub 组织/用户名 | `myorg` |
| `YOUR_REPO` | 仓库名 | `evomap-docsite` |

需要替换的文件：
- `docs/.vitepress/config.mts` — 站点标题、Base URL、GitHub 链接
- `docs/index.md` — 首页 Hero 内容
- `docs/public/llms.txt` — LLM 索引
- `docs/ai-map.md` — AI 意图映射
- `skill.md` — Agent Skill 文件

### 3. 安装与开发

```bash
npm install
npm run dev       # 本地预览 http://localhost:5173
npm run build     # 生产构建
npm run preview   # 预览构建产物
```

### 4. 部署到 GitHub Pages

已内置 GitHub Actions Workflow（`.github/workflows/deploy.yml`），推送到 `main` 分支即自动部署。

确保 GitHub 仓库设置中：
- **Settings → Pages → Source** 选择 **GitHub Actions**

### 5. 在项目中集成 skill.md

将 `skill.md` 复制到你的各个项目仓库中，并在 Cursor Rules 或 Agent System Prompt 中引用。

详见 `skill.md` 中的 [集成指南](#) 章节。

## 目录结构

```
docsite-rag-template/
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts              # VitePress 配置（导航、侧边栏、sitemap）
│   │   └── theme/
│   │       ├── index.ts            # 主题扩展
│   │       └── ArticleMetadata.vue # 文章元数据组件
│   ├── public/
│   │   ├── llms.txt                # LLM 专用索引文件
│   │   └── skill-template.md       # AI Skill 模板（可从站点直接获取）
│   ├── architecture/               # 🏗️ 架构设计
│   │   ├── overview.md             #    系统架构总览
│   │   ├── tech-stack.md           #    技术栈说明
│   │   └── deployment.md           #    部署架构
│   ├── models/                     # 🗃️ 数据模型
│   │   ├── overview.md             #    模型总览
│   │   └── entity-relationship.md  #    实体关系
│   ├── api/                        # 🔌 API 文档
│   │   ├── overview.md             #    API 总览
│   │   └── conventions.md          #    API 设计规范
│   ├── guides/                     # 📖 开发指南
│   │   ├── getting-started.md      #    快速开始
│   │   ├── coding-standards.md     #    编码规范
│   │   └── git-workflow.md         #    Git 工作流
│   ├── solutions/                  # 📐 技术方案
│   │   ├── caching.md              #    缓存方案
│   │   ├── authentication.md       #    认证与授权
│   │   └── error-handling.md       #    错误处理规范
│   ├── changelog/                  # 📋 变更日志
│   │   └── index.md
│   ├── tags/                       # 🏷️ 标签索引
│   │   └── index.md
│   ├── index.md                    # 🏠 首页
│   └── ai-map.md                   # 🤖 AI 意图映射表
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages 自动部署
├── skill.md                        # 🧠 AI Agent Skill 文件
├── package.json
├── .gitignore
└── README.md
```

## skill.md — AI Agent 完整操作手册

`skill.md` 是整个模板的核心。AI Agent 读一遍就能完全理解如何使用。包含 7 大部分：

| 章节 | 内容 |
|:-----|:-----|
| **§0 站点概况** | 站点信息 + 完整文件树 |
| **§1 知识检索** | 4 步检索流程 + 快捷路径表 + 可用脚本 |
| **§2 文档效应** | 9 类文档的效应说明 + 11 条连锁更新规则 |
| **§3 格式规范** | Frontmatter 要求 + 正文结构 + 5 种分类文档模板 |
| **§4 操作脚本** | 克隆、预览、新增文档（7步完整流程）、修改文档、构建验证、Commit 规范 |
| **§5 文件参考** | config.mts / ai-map / llms.txt / changelog / tags 的完整结构 |
| **§6 集成方式** | Cursor Rules 配置 + 多项目共享 + 其他平台集成 |

站点还提供 `/skill-template.md`，AI 可直接从部署后的站点获取并复制到项目中。

## AI 检索架构

```
AI Agent (在任意项目中开发)
    │
    ├─ 读取 skill.md         ──→  理解全部协议（检索 + 维护 + 格式）
    │
    ├─ 获取 {SITE}/llms.txt  ──→  建立文档索引（摘要 + 关键词 + 路径）
    │
    ├─ 获取 {SITE}/ai-map    ──→  按开发意图直接定位文档
    │
    └─ web_fetch 目标 URL    ──→  获取具体文档内容
```

## 文档维护闭环

```
开发变更
  │
  ▼
AI 根据 skill.md §2.2 连锁更新矩阵判断影响范围
  │
  ├─ 更新对应文档内容（遵循 §3 格式规范）
  ├─ 更新 ai-map.md     （如有新文档）
  ├─ 更新 llms.txt      （如有新文档）
  ├─ 更新 tags/index.md  （如有新文档）
  ├─ 更新 config.mts     （如有新文档）
  ├─ 追加 changelog
  └─ git commit + push（遵循 §4.6 Commit 规范）
```

## 自定义扩展

### 添加新的文档分类

1. 在 `docs/` 下创建新目录（如 `docs/testing/`）
2. 在 `config.mts` 的 `sidebar` 中添加对应配置
3. 在 `nav` 中添加导航项（可选）
4. 更新 `ai-map.md`、`llms.txt`、`tags/index.md`
5. 更新 `skill.md` 中的快捷路径表和文件树

### 添加文章元数据

每篇文档支持以下 frontmatter：

```yaml
---
title: 文档标题
tags: ['tag1', 'tag2']
author: 作者名
updated: 2026-01-01
---
```

## License

MIT
