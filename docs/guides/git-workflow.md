---
title: Git 工作流
tags: ['guides', 'git']
---

# Git 工作流

> 本文档定义 YOUR_PROJECT_NAME 的分支策略、提交规范与 Code Review 流程。

## 分支策略

```
main (production)
  │
  ├── develop (integration)
  │     │
  │     ├── feature/user-auth
  │     ├── feature/order-module
  │     └── fix/login-redirect
  │
  └── hotfix/critical-bug
```

| 分支 | 用途 | 来源 | 合入目标 |
|:-----|:-----|:-----|:---------|
| `main` | 生产代码 | — | — |
| `develop` | 集成开发 | `main` | `main` |
| `feature/*` | 新功能 | `develop` | `develop` |
| `fix/*` | Bug 修复 | `develop` | `develop` |
| `hotfix/*` | 紧急修复 | `main` | `main` + `develop` |

## Commit 规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Type 列表

| Type | 说明 | 示例 |
|:-----|:-----|:-----|
| `feat` | 新功能 | `feat(auth): add JWT refresh token` |
| `fix` | Bug 修复 | `fix(api): handle null response` |
| `docs` | 文档变更 | `docs(models): update ER diagram` |
| `style` | 代码格式 | `style: fix indentation` |
| `refactor` | 重构 | `refactor(service): extract base class` |
| `test` | 测试 | `test(auth): add login unit tests` |
| `chore` | 构建/工具 | `chore: upgrade dependencies` |

## Code Review 流程

1. 开发者创建 PR，填写描述模板
2. 至少 1 位 Reviewer approve
3. CI 全部通过（lint + test + build）
4. Squash merge 到目标分支

## 关联文档

- [编码规范](/guides/coding-standards) — 代码风格要求
- [部署架构](/architecture/deployment) — 分支与环境的对应关系
