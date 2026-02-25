# Docsite Knowledge Base — AI Agent Skill

> **用途**：将本文件放置到你的项目仓库中（如 `evomap-website`、`evomap-hub` 等），在 Agent / Cursor Rules / System Prompt 中引用本文件，使 AI Agent 能够访问并维护你的文档站点知识库。

---

## 1. 文档站点信息

| 属性 | 值 |
|:-----|:---|
| **站点名称** | YOUR_PROJECT_NAME Docsite |
| **站点地址** | `https://YOUR_ORG.github.io/YOUR_REPO/` |
| **仓库地址** | `https://github.com/YOUR_ORG/YOUR_REPO` |
| **技术方案** | VitePress (静态站点生成器) |
| **用途** | 项目统一知识中枢，面向团队成员与 AI Agent |

---

## 2. 知识检索协议 (Knowledge Retrieval Protocol)

当你需要查找项目的架构、模型、API、编码规范等知识时，**必须遵循以下协议**：

### Step 1 — 读取索引

首先获取以下索引文件之一，建立内部导航图：

| 索引 | URL | 用途 |
|:-----|:----|:-----|
| **LLM Index** | `{SITE_URL}/llms.txt` | 所有文档的摘要、路径、关键词（推荐首选） |
| **AI Intent Map** | `{SITE_URL}/ai-map.html` | 基于开发意图直接定位最佳文档 |
| **Sitemap** | `{SITE_URL}/sitemap.xml` | 完整 URL 列表 |

### Step 2 — 精准获取

根据索引确定目标文档 URL 后，使用 `web_fetch` / `curl` / `browser` 获取页面内容。
所有文档为 Markdown 渲染的 HTML，结构清晰（标题、表格、代码块），适合机器阅读。

### Step 3 — 站内搜索（兜底）

如果索引中未找到答案：

```
site:YOUR_ORG.github.io/YOUR_REPO "关键词"
```

### 快捷路径表

| 需要查找 | 直接访问 |
|:---------|:---------|
| 系统架构 | `{SITE_URL}/architecture/overview.html` |
| 技术栈 | `{SITE_URL}/architecture/tech-stack.html` |
| 部署方式 | `{SITE_URL}/architecture/deployment.html` |
| 数据模型 | `{SITE_URL}/models/overview.html` |
| 实体关系 | `{SITE_URL}/models/entity-relationship.html` |
| API 接口 | `{SITE_URL}/api/overview.html` |
| API 规范 | `{SITE_URL}/api/conventions.html` |
| 快速上手 | `{SITE_URL}/guides/getting-started.html` |
| 编码规范 | `{SITE_URL}/guides/coding-standards.html` |
| Git 流程 | `{SITE_URL}/guides/git-workflow.html` |
| 缓存方案 | `{SITE_URL}/solutions/caching.html` |
| 认证方案 | `{SITE_URL}/solutions/authentication.html` |
| 错误处理 | `{SITE_URL}/solutions/error-handling.html` |
| 变更日志 | `{SITE_URL}/changelog/index.html` |

---

## 3. 文档维护协议 (Documentation Maintenance Protocol)

**关键原则：当你在开发中做出影响文档的变更时，必须同步更新文档站点。**

### 触发规则

以下变更 **必须** 触发文档更新：

| 你做了什么 | 必须更新的文档 | 优先级 |
|:-----------|:---------------|:-------|
| 新增/修改数据表或字段 | `models/overview.md` + `models/entity-relationship.md` | **P0** |
| 新增/修改 API 端点 | `api/overview.md` + 关联的模型文档 | **P0** |
| 变更认证/授权逻辑 | `solutions/authentication.md` | **P0** |
| 变更缓存策略 | `solutions/caching.md` | **P0** |
| 变更错误码或异常处理 | `solutions/error-handling.md` | **P0** |
| 升级/替换技术栈依赖 | `architecture/tech-stack.md` | **P1** |
| 变更部署方式/CI/CD | `architecture/deployment.md` | **P1** |
| 架构级重构 | `architecture/overview.md` + **所有关联文档** | **P0** |
| 变更编码规范 | `guides/coding-standards.md` | **P1** |
| 变更 Git 工作流 | `guides/git-workflow.md` | **P1** |
| 任何文档变更 | `changelog/index.md` (追加变更记录) | **P1** |

### 更新步骤

1. **Clone 文档仓库**（如果尚未克隆）：
   ```bash
   git clone https://github.com/YOUR_ORG/YOUR_REPO.git
   cd YOUR_REPO
   ```

2. **编辑对应文档**：按上表定位需更新的文件

3. **更新关联索引**：
   - 如果新增了文档页面，同步更新：
     - `docs/ai-map.md` — 添加意图映射条目
     - `docs/public/llms.txt` — 添加文档索引条目
     - `docs/tags/index.md` — 添加标签归类
     - `docs/.vitepress/config.mts` — 添加导航/侧边栏条目
   - 如果修改了现有文档的标题或路径，更新上述所有索引

4. **更新变更日志**：在 `docs/changelog/index.md` 的 `[Unreleased]` 区域添加记录

5. **提交并推送**：
   ```bash
   git add .
   git commit -m "docs: <变更描述>"
   git push
   ```

### 文档编写规范

- **Frontmatter 必填**：每篇文档须包含 `title` 和 `tags`
  ```yaml
  ---
  title: 文档标题
  tags: ['category1', 'category2']
  ---
  ```
- **交叉引用**：每篇文档末尾须包含「关联文档」链接区
- **结构化内容**：优先使用表格、代码块、层级标题，方便 AI 解析
- **关键词密度**：在描述中自然包含关键术语，利于搜索和 RAG 匹配
- **不冗余注释**：避免"本节介绍…"等废话，直接给出信息

---

## 4. 集成指南

### 在 Cursor Rules 中引用

在项目的 `.cursor/rules` 或 `.cursorrules` 中添加：

```
你可以通过以下方式访问项目知识库：
1. 阅读 skill.md 了解知识检索和文档维护协议
2. 使用 web_fetch 访问 https://YOUR_ORG.github.io/YOUR_REPO/llms.txt 获取文档索引
3. 当开发过程中涉及架构、模型、API 等变更时，遵循 skill.md 中的文档维护协议同步更新文档
```

### 在其他 Agent 系统中引用

将 `skill.md` 的内容注入 Agent 的 System Prompt，或将其作为可检索文档加入 RAG 数据源。

### 多项目共享

本文档站点设计为跨项目共享的知识中枢。推荐架构：

```
your-org/
├── evomap-website/         # 前端项目
│   ├── .cursor/rules       # 引用 skill.md
│   └── skill.md            # 本文件的副本
├── evomap-hub/             # 后端项目
│   ├── .cursor/rules
│   └── skill.md
├── evomap-postgresql/      # 数据库项目
│   ├── .cursor/rules
│   └── skill.md
└── evomap-docsite/         # 文档站点 (基于 docsite-rag-template)
    └── docs/
```

每个项目中的 `skill.md` 指向同一个文档站点，AI Agent 在任何项目中开发时都能：
- **查阅**：通过知识检索协议获取架构、模型、API 等信息
- **维护**：通过文档维护协议同步更新文档站点内容

---

## 5. 变量替换清单

使用本模板时，请将以下占位符替换为你的实际值：

| 占位符 | 替换为 | 示例 |
|:-------|:-------|:-----|
| `YOUR_PROJECT_NAME` | 项目名称 | `EvoMap` |
| `YOUR_ORG` | GitHub 组织/用户名 | `myorg` |
| `YOUR_REPO` | 文档站点仓库名 | `evomap-docsite` |
| `{SITE_URL}` | 站点完整地址 | `https://myorg.github.io/evomap-docsite` |
