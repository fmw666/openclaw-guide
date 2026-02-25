# docsite-rag-template

基于 VitePress 的 **AI-First 文档站点模板**。人类可读、AI 可检索。作为项目群的统一知识中枢，让所有参与开发的 AI Agent 都能高效查阅和主动维护文档。

---

## How it works

```
                        ┌───────────────────────────────────┐
                        │       docsite (本模板)              │
                        │                                   │
                        │   VitePress 静态站点               │
                        │   ├── 架构设计 / 数据模型 / API     │
                        │   ├── 技术方案 / 开发指南           │
                        │   ├── llms.txt  (AI 全量索引)      │
                        │   ├── ai-map    (意图→文档路由)    │
                        │   ├── sitemap   (全页面 URL)       │
                        │   └── skill-template.md            │
                        │                                   │
                        └──────────┬────────────────────────┘
                                   │
                   ┌───────────────┼───────────────┐
                   │               │               │
            ┌──────▼──────┐ ┌─────▼──────┐ ┌──────▼──────┐
            │  前端项目    │ │  后端项目   │ │  DB 项目    │
            │             │ │            │ │             │
            │  skill.md ──┼─┼── 相同 ────┼─┼── 相同      │
            │  (指向站点)  │ │ (指向站点)  │ │ (指向站点)   │
            └─────────────┘ └────────────┘ └─────────────┘

AI Agent 在任意项目中：
  1. 读 skill.md      → 理解检索协议 + 维护规则 + 格式规范
  2. 读 llms.txt      → 获取全部文档的摘要/关键词/路径
  3. fetch 目标文档    → 拿到具体知识
  4. 开发时有变更      → 按连锁矩阵同步更新 docsite
```

---

## How to use

### Step 1 — 创建你的 docsite 仓库

**方式 A：GitHub 模板**（推荐）

在 GitHub 仓库页面点击 **"Use this template"** → 填入你的仓库名（如 `evomap-docsite`）→ Create。

**方式 B：手动克隆**

```bash
git clone https://github.com/YOUR_ORG/docsite-rag-template.git evomap-docsite
cd evomap-docsite
rm -rf .git
git init
git remote add origin https://github.com/myorg/evomap-docsite.git
```

### Step 2 — 替换占位符

模板中有 3 个占位符需要替换为你的实际值：

| 占位符 | 含义 | 示例 |
|:-------|:-----|:-----|
| `YOUR_PROJECT_NAME` | 项目/产品名称 | `EvoMap` |
| `YOUR_ORG` | GitHub 用户名或组织名 | `myorg` |
| `YOUR_REPO` | docsite 仓库名 | `evomap-docsite` |

**一键替换脚本**（在仓库根目录执行）：

```bash
# 用法：bash replace.sh <项目名> <org> <repo>
# 示例：bash replace.sh EvoMap myorg evomap-docsite

PROJECT_NAME=$1; ORG=$2; REPO=$3

for f in skill.md README.md docs/.vitepress/config.mts docs/index.md docs/public/llms.txt docs/public/skill-template.md; do
  [ -f "$f" ] && sed -i "s/YOUR_PROJECT_NAME/$PROJECT_NAME/g; s/YOUR_ORG/$ORG/g; s/YOUR_REPO/$REPO/g" "$f"
done

echo "Done → https://$ORG.github.io/$REPO/"
```

**需要替换的文件清单**：

| 文件 | 包含哪些占位符 |
|:-----|:---------------|
| `docs/.vitepress/config.mts` | 全部 3 个（站点标题、Base URL、GitHub 链接） |
| `docs/index.md` | `YOUR_PROJECT_NAME`、`YOUR_ORG`、`YOUR_REPO` |
| `docs/public/llms.txt` | `YOUR_PROJECT_NAME`、`YOUR_ORG`、`YOUR_REPO` |
| `docs/public/skill-template.md` | 全部 3 个 |
| `skill.md` | 全部 3 个 |
| `README.md` | `YOUR_ORG`、`YOUR_REPO`（本文件，替换后可按需二次编辑） |

### Step 3 — 安装与本地预览

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:5173/YOUR_REPO/`（替换后是你的实际 repo 名）即可预览。

### Step 4 — 填入你的项目内容

模板中每篇文档都有完整的结构示例。按照你的项目实际情况替换内容：

| 先做 | 文件 | 你要做什么 |
|:-----|:-----|:-----------|
| 1 | `docs/architecture/overview.md` | 画出你的系统架构图，列出模块职责 |
| 2 | `docs/architecture/tech-stack.md` | 填入你实际使用的技术栈和版本号 |
| 3 | `docs/models/overview.md` | 写入你的数据库表结构和字段说明 |
| 4 | `docs/models/entity-relationship.md` | 画出 ER 图，标注关系和级联策略 |
| 5 | `docs/api/overview.md` | 列出所有 API 端点、请求/响应格式 |
| 6 | `docs/api/conventions.md` | 确认或调整 API 设计规范 |
| 7 | `docs/guides/getting-started.md` | 写你项目的环境搭建和运行步骤 |
| 8 | `docs/guides/coding-standards.md` | 填入你的编码规范 |
| 9 | `docs/guides/git-workflow.md` | 确认或调整分支/commit 规范 |
| 10 | `docs/solutions/*.md` | 填入你的缓存、认证、错误处理方案 |

每篇文档的格式要求见 `skill.md` §3。模板中已有示例内容，可以直接在上面改。

### Step 5 — 同步更新索引

内容填完后，确保以下索引文件与你的文档一致：

| 索引文件 | 操作 |
|:---------|:-----|
| `docs/public/llms.txt` | 更新每篇文档的摘要和关键词 |
| `docs/ai-map.md` | 更新意图映射表和 JSON 索引 |
| `docs/tags/index.md` | 更新标签分类 |
| `docs/changelog/index.md` | 填入初始版本记录 |

### Step 6 — 部署到 GitHub Pages

仓库已内置 `.github/workflows/deploy.yml`，push 到 `main` 分支自动部署。

**首次部署前需在 GitHub 仓库设置**：

1. 进入仓库 → **Settings** → **Pages**
2. **Source** 选择 **GitHub Actions**
3. Push 到 `main`，等待 Actions 完成

部署后站点地址：`https://<org>.github.io/<repo>/`

### Step 7 — 在你的项目中集成 skill.md

将 `skill.md` 复制到你的每个项目仓库根目录：

```bash
# 在前端项目中
cp ../evomap-docsite/skill.md ./skill.md

# 在后端项目中
cp ../evomap-docsite/skill.md ./skill.md
```

然后在项目中创建 Cursor Rule，让 AI Agent 知道 skill.md 的存在：

**创建 `.cursor/rules/docsite.mdc`**：

```markdown
---
description: 项目文档站点知识库
globs:
alwaysApply: true
---

请阅读项目根目录的 skill.md，了解如何访问和维护项目知识库。

核心规则：
1. 需要查找项目知识时，先读取站点 llms.txt 建立索引，再获取目标文档
2. 开发涉及架构/模型/API/方案变更时，必须按 skill.md 连锁更新矩阵同步文档
3. 新增文档必须同步更新 ai-map、llms.txt、tags、config.mts sidebar、changelog
```

**Done.** 之后 AI Agent 在你的任何项目中开发时，都会自动：
- 遇到需要查阅知识 → 读 skill.md → 检索 docsite
- 做出代码变更 → 根据连锁矩阵 → 同步维护 docsite 文档

---

## 日常使用

### 新增一篇文档

完整的 7 步流程在 `skill.md` §4.3 中有详细说明，简要概括：

```
1. 创建 docs/<category>/<name>.md     ← 遵循格式模板（skill.md §3）
2. 更新 config.mts sidebar            ← 添加侧边栏条目
3. 更新 ai-map.md                     ← 添加意图映射行 + JSON 条目
4. 更新 llms.txt                      ← 添加摘要 + 关键词条目
5. 更新 tags/index.md                 ← 添加标签归类
6. 更新 changelog/index.md            ← 追加变更记录
7. git add + commit + push
```

### 修改现有文档

```
1. 编辑目标文件
2. 查 skill.md §2.2 连锁更新矩阵 → 同步受影响的文档
3. 更新 changelog/index.md
4. git add + commit + push
```

### 添加新的文档分类

比如要添加一个 `testing/` 分类：

```
1. mkdir docs/testing/
2. 创建 docs/testing/overview.md
3. config.mts → nav 添加导航项 + sidebar 添加新分类
4. 更新 ai-map.md / llms.txt / tags/index.md
5. 更新 skill.md 中的文件树和快捷路径表
```

---

## 目录结构

```
docsite-rag-template/
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts              # 站点配置（标题、导航、侧边栏、sitemap）
│   │   └── theme/
│   │       ├── index.ts            # 主题扩展（注入元数据组件）
│   │       └── ArticleMetadata.vue # 文章元信息展示（作者、标签、更新日期）
│   ├── public/
│   │   ├── llms.txt                # LLM 结构化索引（摘要+关键词+路径）
│   │   ├── skill-template.md       # Skill 模板（部署后 AI 可直接获取）
│   │   └── logo.svg                # 站点 Logo
│   │
│   ├── index.md                    # 首页（Hero + 功能卡片 + AI 检索协议）
│   ├── ai-map.md                   # AI 意图映射表（意图→文档路由）
│   │
│   ├── architecture/               # 架构设计
│   │   ├── overview.md             #   系统架构总览
│   │   ├── tech-stack.md           #   技术栈说明
│   │   └── deployment.md           #   部署架构
│   ├── models/                     # 数据模型
│   │   ├── overview.md             #   模型总览（表结构+字段）
│   │   └── entity-relationship.md  #   实体关系（ER 图）
│   ├── api/                        # API 文档
│   │   ├── overview.md             #   端点列表+请求响应
│   │   └── conventions.md          #   设计规范
│   ├── guides/                     # 开发指南
│   │   ├── getting-started.md      #   快速开始
│   │   ├── coding-standards.md     #   编码规范
│   │   └── git-workflow.md         #   Git 工作流
│   ├── solutions/                  # 技术方案
│   │   ├── caching.md              #   缓存方案
│   │   ├── authentication.md       #   认证与授权
│   │   └── error-handling.md       #   错误处理
│   ├── changelog/
│   │   └── index.md                # 变更日志
│   └── tags/
│       └── index.md                # 标签索引
│
├── skill.md                        # AI Agent 操作手册（核心文件）
├── .github/workflows/deploy.yml    # GitHub Pages 自动部署
├── package.json
├── .gitignore
└── README.md
```

---

## skill.md 说明

`skill.md` 是本模板的核心交付物。它是一份 AI Agent 的完整操作手册，放在项目仓库中供 Agent 读取。

**目录结构**：

| 章节 | 内容 | AI 读完后能做什么 |
|:-----|:-----|:------------------|
| §0 站点概况 | 站点信息 + 完整文件树 | 知道 docsite 有什么、在哪里 |
| §1 知识检索 | 4 步检索流程 + 18 条快捷路径 + curl/web_fetch 脚本 | 按步骤查找任何知识 |
| §2 文档效应 | 9 类文档的读者/效应 + 11 条连锁更新规则 | 改代码时知道要同步更新哪些文档 |
| §3 格式规范 | Frontmatter + 正文结构 + 5 种分类文档模板 | 创建任何新文档都格式正确 |
| §4 操作脚本 | 克隆/预览/新增(7步)/修改/构建/commit 规范 | 按脚本执行，无需猜测 |
| §5 文件参考 | config.mts / ai-map / llms.txt / changelog / tags 完整结构 | 知道索引文件怎么改 |
| §6 集成方式 | Cursor Rules 配置 + 多项目共享架构 | 正确集成到任何项目 |
| §7 占位符替换 | 替换清单 + 一键脚本 | 初始化时一次搞定 |

**设计原则**：AI 读一遍就知道全部规则，不需要问人。

---

## 可用命令

| 命令 | 说明 |
|:-----|:-----|
| `npm run dev` | 启动本地开发服务器（热重载） |
| `npm run build` | 构建生产版本到 `docs/.vitepress/dist/` |
| `npm run preview` | 预览构建产物 |

---

## License

MIT
