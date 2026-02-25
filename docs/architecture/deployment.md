---
title: 部署架构
tags: ['architecture', 'deployment', 'devops']
---

# 部署架构

> 本文描述 YOUR_PROJECT_NAME 的部署拓扑、环境配置与 CI/CD 流程。

## 环境列表

| 环境 | 用途 | 域名 | 分支 |
|:-----|:-----|:-----|:-----|
| Development | 本地开发 | `localhost` | `feature/*` |
| Staging | 集成测试 | `staging.example.com` | `develop` |
| Production | 生产环境 | `app.example.com` | `main` |

## 部署拓扑

```
                    ┌──────────┐
                    │  CDN     │
                    └────┬─────┘
                         │
                    ┌────▼─────┐
                    │  Nginx   │
                    │  (LB)    │
                    └────┬─────┘
                  ┌──────┼──────┐
              ┌───▼──┐ ┌▼────┐ ┌▼────┐
              │ App  │ │ App │ │ App │
              │  #1  │ │  #2 │ │  #3 │
              └──┬───┘ └──┬──┘ └──┬──┘
                 └────┬───┘──────┘
              ┌───────▼───────┐
              │  PostgreSQL   │
              │  + Redis      │
              └───────────────┘
```

## CI/CD 流程

```
Push → Lint & Test → Build Image → Push Registry → Deploy → Health Check
```

1. **代码推送** — 触发 GitHub Actions Workflow
2. **质量检查** — lint + unit test + type check
3. **构建镜像** — Docker multi-stage build
4. **推送仓库** — 推送至 Container Registry
5. **部署上线** — 滚动更新到目标环境
6. **健康检查** — 自动验证服务可用性

## 环境变量

| 变量名 | 说明 | 示例 |
|:-------|:-----|:-----|
| `DATABASE_URL` | PostgreSQL 连接串 | `postgresql://user:pass@host:5432/db` |
| `REDIS_URL` | Redis 连接串 | `redis://host:6379` |
| `JWT_SECRET` | JWT 签名密钥 | `(见密钥管理)` |
| `NODE_ENV` | 运行环境 | `production` |

## 关联文档

- [系统架构总览](/architecture/overview) — 整体架构
- [技术栈说明](/architecture/tech-stack) — 使用的具体技术
