---
title: 认证与授权
tags: ['solutions', 'authentication', 'security']
---

# 认证与授权

> 本文档描述 YOUR_PROJECT_NAME 的身份认证流程与权限控制模型。

## 认证流程 (JWT)

```
Client                          Server
  │                               │
  │──── POST /login ─────────────▶│
  │     { email, password }       │
  │                               │── 校验凭证
  │                               │── 生成 Token Pair
  │◀── { access_token,           │
  │      refresh_token } ─────────│
  │                               │
  │──── GET /api (Bearer token) ──▶│
  │                               │── 校验 access_token
  │◀── { data } ──────────────────│
  │                               │
  │──── POST /refresh ───────────▶│  (access_token 过期时)
  │     { refresh_token }         │
  │◀── { new_access_token } ──────│
```

## Token 规范

| 属性 | Access Token | Refresh Token |
|:-----|:-------------|:--------------|
| 有效期 | 15 分钟 | 7 天 |
| 存储位置 | 内存 / httpOnly cookie | httpOnly cookie |
| Payload | `{ sub, role, iat, exp }` | `{ sub, jti, iat, exp }` |
| 刷新 | 不可刷新 | 可换取新 access_token |
| 吊销 | 依赖过期 | Redis 黑名单 |

## 权限模型 (RBAC)

```
User ──N:1──▶ Role ──N:M──▶ Permission
```

| 角色 | 权限 | 说明 |
|:-----|:-----|:-----|
| `admin` | `*` | 全部权限 |
| `editor` | `read`, `write` | 内容管理 |
| `viewer` | `read` | 只读访问 |

## 中间件实现

```
Request → [Auth Middleware] → [RBAC Middleware] → Controller
              │                    │
              ├─ 校验 Token         ├─ 校验角色/权限
              └─ 注入 req.user     └─ 403 或放行
```

## 安全注意事项

- 密码存储使用 bcrypt（cost factor >= 12）
- Token 签名使用 RS256（生产）或 HS256（开发）
- Refresh token 支持一次性使用（rotation）
- 登录失败锁定（5 次失败后锁定 15 分钟）

## 关联文档

- [API 总览](/api/overview) — 各接口的认证要求
- [数据模型](/models/overview) — User / Role 模型定义
- [错误处理规范](/solutions/error-handling) — 认证相关错误码
