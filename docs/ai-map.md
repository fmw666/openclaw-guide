---
title: AI 索引地图
description: AI Agent 意图映射表 — 根据开发意图快速定位最佳文档
---

# AI 索引地图 (AI Intent Map)

> **致 AI Agent**: 请根据用户的 **开发意图 (Intent)** 查阅下表，直接跳转到最匹配的文档。

| 意图 (Intent) | 推荐文档 (Doc Link) | 核心知识点 (Key Topics) |
|:---|:---|:---|
| **了解系统架构** | [系统架构总览](/architecture/overview) | 分层架构、服务拓扑、核心模块职责 |
| **查看技术栈** | [技术栈说明](/architecture/tech-stack) | 框架选型、依赖库、版本要求 |
| **了解部署方式** | [部署架构](/architecture/deployment) | 容器化、CI/CD、环境配置 |
| **查询数据模型** | [模型总览](/models/overview) | 核心实体、字段定义、索引策略 |
| **查看实体关系** | [实体关系](/models/entity-relationship) | ER 图、外键关系、级联策略 |
| **查看 API 接口** | [API 总览](/api/overview) | 端点列表、请求/响应格式 |
| **了解 API 规范** | [API 设计规范](/api/conventions) | RESTful 规范、错误码、版本策略 |
| **快速上手开发** | [快速开始](/guides/getting-started) | 环境搭建、依赖安装、本地运行 |
| **查看编码规范** | [编码规范](/guides/coding-standards) | 命名约定、目录结构、代码风格 |
| **了解 Git 流程** | [Git 工作流](/guides/git-workflow) | 分支策略、Commit 规范、Code Review |
| **设计缓存方案** | [缓存方案](/solutions/caching) | Redis 策略、缓存层级、失效机制 |
| **设计认证方案** | [认证与授权](/solutions/authentication) | JWT、OAuth、RBAC 权限模型 |
| **设计错误处理** | [错误处理规范](/solutions/error-handling) | 错误码体系、全局异常、日志策略 |

| **获取 AI Skill 文件** | [skill-template.md](https://YOUR_ORG.github.io/YOUR_REPO/skill-template.md) | skill.md 模板，复制到项目中供 AI Agent 使用 |

---

### JSON 索引 (For Tool Use)

```json
{
  "architecture_overview":  "/architecture/overview.html",
  "tech_stack":             "/architecture/tech-stack.html",
  "deployment":             "/architecture/deployment.html",
  "models_overview":        "/models/overview.html",
  "entity_relationship":    "/models/entity-relationship.html",
  "api_overview":           "/api/overview.html",
  "api_conventions":        "/api/conventions.html",
  "getting_started":        "/guides/getting-started.html",
  "coding_standards":       "/guides/coding-standards.html",
  "git_workflow":           "/guides/git-workflow.html",
  "caching":                "/solutions/caching.html",
  "authentication":         "/solutions/authentication.html",
  "error_handling":         "/solutions/error-handling.html",
  "changelog":              "/changelog/index.html"
}
```

---

### 文档维护触发规则 (For AI Agents)

当你在开发过程中做出以下变更时，**必须**同步更新对应文档：

| 变更类型 | 需更新的文档 |
|:---|:---|
| 新增/修改数据模型字段 | `models/overview.md` + `models/entity-relationship.md` |
| 新增/修改 API 端点 | `api/overview.md` + 相关模型文档 |
| 变更技术栈或依赖 | `architecture/tech-stack.md` |
| 变更部署方式 | `architecture/deployment.md` |
| 变更认证/缓存/错误处理策略 | 对应 `solutions/` 文档 |
| 任何架构级变更 | `architecture/overview.md` + 所有关联文档 |
