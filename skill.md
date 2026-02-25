# Docsite Knowledge Base — AI Agent Skill

> **你是什么？** 这是一份 AI Agent 的操作手册。读完本文件后，你将能够：
> 1. 从文档站点检索任何项目知识（架构、模型、API、方案…）
> 2. 在开发过程中主动维护和补充文档站点内容
> 3. 创建符合规范的新文档页面
> 4. 理解每类文档的效应范围和更新连锁关系

---

## 0. 站点概况

| 属性 | 值 |
|:-----|:---|
| 站点名称 | `YOUR_PROJECT_NAME Docsite` |
| 站点地址 | `https://YOUR_ORG.github.io/YOUR_REPO/` |
| 仓库地址 | `https://github.com/YOUR_ORG/YOUR_REPO` |
| 技术方案 | VitePress 1.x（静态 Markdown 站点生成器） |
| 部署方式 | GitHub Actions → GitHub Pages（push main 自动部署） |

### 文件树

```
YOUR_REPO/
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts              # 站点配置（导航、侧边栏、sitemap）
│   │   └── theme/
│   │       ├── index.ts            # 主题扩展入口
│   │       └── ArticleMetadata.vue # 文章元信息组件
│   ├── public/
│   │   ├── llms.txt                # LLM 结构化索引
│   │   └── logo.svg                # 站点 Logo
│   ├── index.md                    # 首页
│   ├── ai-map.md                   # AI 意图映射表
│   ├── architecture/               # 架构设计
│   │   ├── overview.md
│   │   ├── tech-stack.md
│   │   └── deployment.md
│   ├── models/                     # 数据模型
│   │   ├── overview.md
│   │   └── entity-relationship.md
│   ├── api/                        # API 文档
│   │   ├── overview.md
│   │   └── conventions.md
│   ├── guides/                     # 开发指南
│   │   ├── getting-started.md
│   │   ├── coding-standards.md
│   │   └── git-workflow.md
│   ├── solutions/                  # 技术方案
│   │   ├── caching.md
│   │   ├── authentication.md
│   │   └── error-handling.md
│   ├── changelog/
│   │   └── index.md                # 变更日志
│   └── tags/
│       └── index.md                # 标签索引
├── skill.md                        # ← 你正在读的这个文件
├── package.json
├── .gitignore
├── README.md
└── .github/workflows/deploy.yml    # 自动部署
```

---

## 1. 知识检索 — 怎样查找信息

### 1.1 检索流程（按优先级执行）

```
Step 1  →  获取 {SITE}/llms.txt             ← 全量索引，关键词+摘要+路径
Step 2  →  若有明确意图，获取 {SITE}/ai-map.html  ← 意图→文档 直达映射
Step 3  →  根据路径，获取目标文档 HTML
Step 4  →  兜底：web_search "site:YOUR_ORG.github.io/YOUR_REPO 关键词"
```

> `{SITE}` = `https://YOUR_ORG.github.io/YOUR_REPO`

### 1.2 快捷路径表

直接拼接 `{SITE}` + 下表路径即可获取：

| 需要查找 | 路径 |
|:---------|:-----|
| 系统架构 | `/architecture/overview.html` |
| 技术栈 | `/architecture/tech-stack.html` |
| 部署架构 | `/architecture/deployment.html` |
| 数据模型（表/字段） | `/models/overview.html` |
| 实体关系（ER 图） | `/models/entity-relationship.html` |
| API 端点列表 | `/api/overview.html` |
| API 设计规范 | `/api/conventions.html` |
| 环境搭建/快速开始 | `/guides/getting-started.html` |
| 编码规范 | `/guides/coding-standards.html` |
| Git 工作流 | `/guides/git-workflow.html` |
| 缓存方案 | `/solutions/caching.html` |
| 认证与授权 | `/solutions/authentication.html` |
| 错误处理 | `/solutions/error-handling.html` |
| 变更日志 | `/changelog/index.html` |
| 标签索引 | `/tags/index.html` |
| LLM 索引 | `/llms.txt` |
| 意图映射 | `/ai-map.html` |
| Sitemap | `/sitemap.xml` |

### 1.3 检索脚本

当你需要查询知识时，可直接使用以下命令：

```bash
# 获取全量索引（推荐首步）
curl -s "https://YOUR_ORG.github.io/YOUR_REPO/llms.txt"

# 获取指定文档
curl -s "https://YOUR_ORG.github.io/YOUR_REPO/architecture/overview.html"

# 如果有 web_fetch 工具（Cursor / MCP 环境）
web_fetch("https://YOUR_ORG.github.io/YOUR_REPO/llms.txt")
```

---

## 2. 文档分类与效应 — 每类文档做什么、影响什么

每类文档不是孤立的，变更一处会连锁影响其他文档。以下是完整的 **效应矩阵**：

### 2.1 分类说明

| 分类 | 目录 | 核心内容 | 谁读它 | 效应范围 |
|:-----|:-----|:---------|:-------|:---------|
| **架构设计** | `architecture/` | 系统分层、技术选型、部署拓扑 | 全员 + AI | 变更后影响：api/、models/、solutions/、guides/ |
| **数据模型** | `models/` | 表结构、字段定义、ER 图、索引 | 后端 + DBA + AI | 变更后影响：api/overview、solutions/caching |
| **API 文档** | `api/` | 端点列表、请求响应、设计规范 | 前端 + 后端 + AI | 变更后影响：models/（如有新字段） |
| **开发指南** | `guides/` | 环境搭建、编码规范、Git 流程 | 新人 + AI | 独立性高，一般不连锁 |
| **技术方案** | `solutions/` | 缓存、认证、错误处理等方案 | 架构师 + 后端 + AI | 变更后影响：api/conventions、architecture/ |
| **变更日志** | `changelog/` | 时间线变更记录 | 全员 + AI | 每次文档变更都必须追加 |
| **标签索引** | `tags/` | 按标签分类的快捷入口 | AI | 新增文档时必须同步更新 |
| **AI 索引** | `ai-map.md` | 意图→文档路由表 | AI | 新增文档时必须同步更新 |
| **LLM 索引** | `public/llms.txt` | 文档摘要+关键词+路径 | AI | 新增文档时必须同步更新 |

### 2.2 连锁更新矩阵

当你做了左列的变更，**必须**同步更新右列所有文档：

| 你的变更 | 必须更新（P0 立即） | 应当检查（P1 后续） |
|:---------|:--------------------|:--------------------|
| 新增数据库表/字段 | `models/overview.md` `models/entity-relationship.md` | `api/overview.md`（如有对应 API） |
| 新增 API 端点 | `api/overview.md` | `models/overview.md`（如引入新字段） |
| 变更 API 响应格式 | `api/overview.md` `api/conventions.md` | `solutions/error-handling.md` |
| 变更认证逻辑 | `solutions/authentication.md` | `api/overview.md`（认证标记） |
| 变更缓存策略 | `solutions/caching.md` | `architecture/overview.md` |
| 变更错误码 | `solutions/error-handling.md` | `api/conventions.md` |
| 升级技术栈依赖 | `architecture/tech-stack.md` | `guides/getting-started.md`（版本要求） |
| 变更部署方式 | `architecture/deployment.md` | `architecture/overview.md` |
| 架构级重构 | `architecture/overview.md` + **所有关联** | 全站审查 |
| 新增任何文档页面 | `ai-map.md` `llms.txt` `tags/index.md` `config.mts`(sidebar) | `changelog/index.md` |
| 任何文档修改 | `changelog/index.md`（追加记录） | — |

---

## 3. 文档格式规范 — 每篇文档必须长什么样

### 3.1 Frontmatter（必须）

每篇 `.md` 文件头部必须包含 YAML frontmatter：

```yaml
---
title: 文档标题（简洁准确，不超过 20 字）
tags: ['分类标签1', '分类标签2']
---
```

可选字段：

```yaml
---
title: 文档标题
tags: ['architecture', 'system-design']
author: 作者名
updated: 2026-02-25
---
```

### 3.2 正文结构（必须遵循）

```markdown
---
title: 标题
tags: ['tag1', 'tag2']
---

# 标题（与 frontmatter title 一致）

> 一句话说明本文档解决什么问题、包含什么内容。

## 章节 1

（使用表格、代码块、列表呈现结构化信息。避免大段散文。）

## 章节 2

...

## 关联文档

- [相关文档A](/path/to/a) — 一句话说明关联关系
- [相关文档B](/path/to/b) — 一句话说明关联关系
```

**强制规则**：

1. **H1 唯一** — 每篇文档只有一个 `#` 标题
2. **关联文档** — 末尾必须有 `## 关联文档` 区域，列出相关文档链接
3. **结构优先** — 优先使用 **表格**（对比/列表数据）、**代码块**（配置/命令/示例）、**层级标题**（H2/H3）
4. **避免废话** — 不写"本节介绍了…"、"下面我们来看…"，直接给信息
5. **关键词密度** — 在描述中自然包含关键术语，利于 RAG 匹配

### 3.3 各分类文档模板

#### architecture/*.md 模板

```markdown
---
title: [系统架构总览 / 技术栈说明 / 部署架构]
tags: ['architecture', '其他标签']
---

# 标题

> 一句话概述。

## 概览图 / 总览表

（ASCII 架构图 或 总览表格）

## 详细说明

### 子模块/子话题 A

（表格 + 文字说明）

### 子模块/子话题 B

...

## 关联文档

- [链接](/path) — 关系说明
```

#### models/*.md 模板

```markdown
---
title: [模型总览 / 实体关系]
tags: ['models', 'database']
---

# 标题

> 一句话概述。

## 实体列表 / ER 图

（表格列出所有实体，或 ASCII ER 图）

## [实体名] 模型

（SQL DDL 代码块 + 字段说明表格）

```sql
CREATE TABLE table_name ( ... );
```

| 字段 | 类型 | 约束 | 说明 |
|:-----|:-----|:-----|:-----|
| ... | ... | ... | ... |

## 命名约定 / 索引策略

（规则表格）

## 关联文档

- [链接](/path) — 关系说明
```

#### api/*.md 模板

```markdown
---
title: [API 总览 / API 设计规范]
tags: ['api', '其他标签']
---

# 标题

> 一句话概述。

## Base URL / 认证方式

（代码块 + 简要说明）

## 端点列表

### [模块名] (`/path`)

| 方法 | 路径 | 说明 | 认证 |
|:-----|:-----|:-----|:-----|
| `GET` | `/path` | 描述 | 是/否 |

### 请求/响应示例

（JSON 代码块）

## 关联文档

- [链接](/path) — 关系说明
```

#### solutions/*.md 模板

```markdown
---
title: [缓存方案 / 认证与授权 / 错误处理规范]
tags: ['solutions', '其他标签']
---

# 标题

> 一句话概述。

## 方案概览

（架构图 或 流程图 — ASCII）

## 详细设计

### 设计点 A

（表格 + 代码块 + 说明）

### 设计点 B

...

## 关联文档

- [链接](/path) — 关系说明
```

#### guides/*.md 模板

```markdown
---
title: [快速开始 / 编码规范 / Git 工作流]
tags: ['guides', '其他标签']
---

# 标题

> 一句话概述。

## 前置要求 / 总览

（表格列出工具、版本等）

## 步骤 / 规则

### 1. 第一步 / 规则一

（命令代码块 + 说明）

### 2. 第二步 / 规则二

...

## 关联文档

- [链接](/path) — 关系说明
```

---

## 4. 操作脚本 — 具体怎么做

以下是你在维护文档时会用到的完整脚本。

### 4.1 克隆文档仓库

```bash
# 如果当前项目旁边还没有 docsite 仓库
cd ..
git clone https://github.com/YOUR_ORG/YOUR_REPO.git
cd YOUR_REPO
npm install
```

### 4.2 本地预览

```bash
npm run dev
# 浏览器打开 http://localhost:5173/YOUR_REPO/
```

### 4.3 新增文档页面（完整流程）

假设要在 `solutions/` 下新增 `rate-limiting.md`：

**Step 1 — 创建文档文件**

```bash
cat > docs/solutions/rate-limiting.md << 'EOF'
---
title: 限流方案
tags: ['solutions', 'rate-limiting', 'api']
---

# 限流方案

> 描述系统的 API 限流策略、算法选型与配置。

## 方案概览

...

## 关联文档

- [API 总览](/api/overview) — 限流应用于所有 API 端点
- [部署架构](/architecture/deployment) — 限流中间件的部署位置
EOF
```

**Step 2 — 更新 config.mts 侧边栏**

在 `docs/.vitepress/config.mts` 中找到 `'/solutions/'` 的 sidebar 配置，在 `items` 数组末尾添加：

```typescript
{ text: '限流方案', link: '/solutions/rate-limiting' },
```

**Step 3 — 更新 ai-map.md**

在意图映射表格中添加一行：

```markdown
| **设计限流方案** | [限流方案](/solutions/rate-limiting) | 令牌桶、滑动窗口、Redis 限流 |
```

在 JSON 索引中添加：

```json
"rate_limiting": "/solutions/rate-limiting.html",
```

**Step 4 — 更新 llms.txt**

在 `## 技术方案 (Solutions)` 区域末尾添加：

```
- [限流方案](/solutions/rate-limiting.html)
  - **内容**: API 限流策略、算法选型、Redis 配置
  - **关键词**: 限流, rate limit, 令牌桶, 滑动窗口, Redis
```

**Step 5 — 更新 tags/index.md**

在合适的标签区域添加链接。如果标签不存在则创建新的标签区域：

```markdown
## rate-limiting

- [限流方案](/solutions/rate-limiting)
```

**Step 6 — 更新 changelog**

在 `docs/changelog/index.md` 的 `[Unreleased]` 下添加：

```markdown
### Added
- 新增限流方案文档 (`solutions/rate-limiting.md`)
```

**Step 7 — 提交**

```bash
git add -A
git commit -m "docs(solutions): add rate-limiting strategy"
git push
```

### 4.4 修改现有文档

```bash
# 1. 编辑目标文件
#    (用你的编辑工具修改 docs/models/overview.md)

# 2. 检查连锁更新（参考 §2.2 连锁更新矩阵）
#    例如：修改了模型字段 → 检查 api/overview.md 是否需要同步

# 3. 更新 changelog
#    在 docs/changelog/index.md [Unreleased] 下添加记录

# 4. 提交
git add -A
git commit -m "docs(models): update user table schema — add phone field"
git push
```

### 4.5 构建与验证

```bash
# 本地构建，检查是否有错误
npm run build

# 构建产物在 docs/.vitepress/dist/
# 可检查 sitemap.xml 是否包含新页面
cat docs/.vitepress/dist/sitemap.xml
```

### 4.6 Commit Message 规范

```
docs(<scope>): <description>
```

| scope | 使用场景 |
|:------|:---------|
| `architecture` | 架构文档变更 |
| `models` | 模型文档变更 |
| `api` | API 文档变更 |
| `guides` | 指南文档变更 |
| `solutions` | 方案文档变更 |
| `index` | 索引文件变更（ai-map、llms.txt、tags） |
| `config` | VitePress 配置变更 |

示例：
```
docs(models): add orders table and update ER diagram
docs(api): add POST /orders endpoint
docs(solutions): update caching strategy for order queries
docs(index): add orders-related entries to ai-map and llms.txt
```

---

## 5. 关键文件内容参考

以下是站点中每个关键配置/索引文件的完整结构，供你在维护时参考和修改。

### 5.1 docs/.vitepress/config.mts 结构

```typescript
import { defineConfig } from 'vitepress'

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
  sitemap: { hostname: SITE_URL },
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
      '/architecture/': [{ text: '架构设计', items: [
        { text: '系统架构总览', link: '/architecture/overview' },
        { text: '技术栈说明',   link: '/architecture/tech-stack' },
        { text: '部署架构',     link: '/architecture/deployment' },
      ]}],
      '/models/': [{ text: '数据模型', items: [
        { text: '模型总览', link: '/models/overview' },
        { text: '实体关系', link: '/models/entity-relationship' },
      ]}],
      '/api/': [{ text: 'API 文档', items: [
        { text: 'API 总览',     link: '/api/overview' },
        { text: 'API 设计规范', link: '/api/conventions' },
      ]}],
      '/guides/': [{ text: '开发指南', items: [
        { text: '快速开始', link: '/guides/getting-started' },
        { text: '编码规范', link: '/guides/coding-standards' },
        { text: 'Git 工作流', link: '/guides/git-workflow' },
      ]}],
      '/solutions/': [{ text: '技术方案', items: [
        { text: '缓存方案',     link: '/solutions/caching' },
        { text: '认证与授权',   link: '/solutions/authentication' },
        { text: '错误处理规范', link: '/solutions/error-handling' },
        // ← 新增文档在这里追加
      ]}],
      '/changelog/': [{ text: '变更日志', items: [
        { text: '变更记录', link: '/changelog/' },
      ]}],
    },
    socialLinks: [{ icon: 'github', link: GITHUB_URL }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 YOUR_ORG',
    },
    search: { provider: 'local' },
    outline: { level: [2, 3], label: '页面导航' },
    lastUpdated: { text: '最后更新于' },
    editLink: {
      pattern: `${GITHUB_URL}/edit/main/docs/:path`,
      text: '在 GitHub 上编辑此页',
    },
    docFooter: { prev: '上一篇', next: '下一篇' },
  },
})
```

**修改要点**：添加新文档时只需在 `sidebar` 对应分类的 `items` 末尾追加条目。添加新分类需同时增加 `nav` 条目和 `sidebar` 新键。

### 5.2 docs/ai-map.md 结构

文件由三部分组成：

1. **意图映射表格** — 每行：`| 意图描述 | [文档名](/path) | 关键词列表 |`
2. **JSON 索引** — 键值对：`"slug": "/path.html"`
3. **维护触发规则** — 变更→需更新的文档

新增文档时，在表格和 JSON 中各添加一行。

### 5.3 docs/public/llms.txt 结构

```
# 站点名 (LLM Index)

**Site:** ...
**Base URL:** ...

## 分类名 (Category)

- [文档标题](/path.html)
  - **内容**: 一句话描述
  - **关键词**: 逗号分隔的关键词
```

新增文档时，在对应分类下添加一个条目。如果是新分类，创建新的 `##` 区域。

### 5.4 docs/changelog/index.md 结构

```markdown
## [Unreleased]

### Added
- 新增项

### Changed
- 修改项

---

## [2026-02-25]

### Added
- 历史记录
```

每次修改文档后，在 `[Unreleased]` 下添加记录。发版时将 `[Unreleased]` 改为日期。

### 5.5 docs/tags/index.md 结构

```markdown
## 标签名

- [文档标题](/path)
- [文档标题](/path)
```

新增文档时，在所有匹配的标签区域下添加链接。如果标签不存在，创建新的 `##` 区域。

---

## 6. 集成方式

### 6.1 在 Cursor 项目中使用

**方式 A — 放入 Cursor Rules（推荐）**

在项目中创建 `.cursor/rules/docsite.mdc`：

```markdown
---
description: 项目文档站点知识库
globs:
alwaysApply: true
---

请阅读项目根目录的 skill.md 文件，了解如何访问和维护项目知识库。

核心规则：
1. 需要查找架构、模型、API、编码规范等信息时，先读取 {SITE}/llms.txt 建立索引，再获取目标文档
2. 开发过程中涉及架构、模型、API 等变更时，必须按 skill.md 中的连锁更新矩阵同步更新文档
3. 文档仓库地址：https://github.com/YOUR_ORG/YOUR_REPO
```

**方式 B — 作为 Agent Skill 引用**

将 `skill.md` 放在项目根目录，在 System Prompt 中添加：

```
你有一个项目知识库，操作手册在 skill.md。当你需要项目知识或做出影响文档的变更时，遵循 skill.md 的协议。
```

### 6.2 多项目共享

```
your-org/
├── project-frontend/       # 前端项目
│   └── skill.md            # ← 同一份 skill，指向同一个 docsite
├── project-backend/        # 后端项目
│   └── skill.md
├── project-database/       # 数据库项目
│   └── skill.md
└── project-docsite/        # 文档站点（基于 docsite-rag-template）
    └── docs/
```

所有项目的 `skill.md` 内容相同（或略有项目特定定制），指向同一个文档站点。AI Agent 在任意项目开发时都能读取知识、维护文档。

### 6.3 其他 Agent 平台

将 `skill.md` 全文注入 System Prompt，或将其作为 RAG 可检索文档添加到 Agent 的数据源中。

---

## 7. 占位符替换清单

使用本模板时，全局搜索并替换以下占位符：

| 占位符 | 替换为 | 示例 |
|:-------|:-------|:-----|
| `YOUR_PROJECT_NAME` | 项目名称 | `EvoMap` |
| `YOUR_ORG` | GitHub 组织/用户名 | `myorg` |
| `YOUR_REPO` | 文档站点仓库名 | `evomap-docsite` |

替换后 `{SITE}` 即为 `https://myorg.github.io/evomap-docsite`。

**需要替换的文件清单**：

| 文件 | 包含的占位符 |
|:-----|:-------------|
| `skill.md` | 全部三个 |
| `docs/.vitepress/config.mts` | 全部三个 |
| `docs/index.md` | `YOUR_PROJECT_NAME`, `YOUR_ORG`, `YOUR_REPO` |
| `docs/ai-map.md` | 无（使用相对路径） |
| `docs/public/llms.txt` | `YOUR_PROJECT_NAME`, `YOUR_ORG`, `YOUR_REPO` |
| `README.md` | `YOUR_ORG`, `YOUR_REPO` |

一键替换脚本：

```bash
# 用法：./replace.sh EvoMap myorg evomap-docsite
PROJECT_NAME=${1:?用法: $0 PROJECT_NAME ORG REPO}
ORG=${2:?}
REPO=${3:?}

FILES=(
  "skill.md"
  "README.md"
  "docs/.vitepress/config.mts"
  "docs/index.md"
  "docs/public/llms.txt"
)

for f in "${FILES[@]}"; do
  if [ -f "$f" ]; then
    sed -i "s/YOUR_PROJECT_NAME/$PROJECT_NAME/g" "$f"
    sed -i "s/YOUR_ORG/$ORG/g" "$f"
    sed -i "s/YOUR_REPO/$REPO/g" "$f"
  fi
done

echo "Done. Replaced placeholders in ${#FILES[@]} files."
echo "Site will be: https://$ORG.github.io/$REPO/"
```
