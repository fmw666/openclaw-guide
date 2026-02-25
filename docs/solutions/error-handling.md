---
title: 错误处理规范
tags: ['solutions', 'error-handling']
---

# 错误处理规范

> 本文档定义 YOUR_PROJECT_NAME 的错误码体系、全局异常处理与日志记录规范。

## 错误码体系

### 编码规则

```
XXYYYY
│ │
│ └── 4位序号
└──── 2位模块码
```

| 模块码 | 模块 | 示例 |
|:-------|:-----|:-----|
| `10` | 通用 | `100001` 参数校验失败 |
| `20` | 用户/认证 | `200001` 用户不存在 |
| `30` | 业务模块 A | `300001` ... |
| `40` | 业务模块 B | `400001` ... |

### 通用错误码

| 错误码 | HTTP Status | 说明 |
|:-------|:------------|:-----|
| `100001` | 400 | 请求参数校验失败 |
| `100002` | 404 | 资源不存在 |
| `100003` | 409 | 资源冲突 |
| `100004` | 500 | 服务器内部错误 |
| `200001` | 401 | 未认证 |
| `200002` | 401 | Token 已过期 |
| `200003` | 403 | 权限不足 |
| `200004` | 404 | 用户不存在 |

## 全局异常处理

```
业务代码抛出 AppError
        │
        ▼
全局 Error Middleware 捕获
        │
        ├── AppError → 返回结构化错误响应
        ├── ValidationError → 400 + 字段错误列表
        └── Unknown Error → 500 + 记录日志 + 隐藏细节
```

### 错误响应格式

```json
{
  "code": 200002,
  "message": "Token expired",
  "errors": [],
  "request_id": "req_abc123"
}
```

## 日志规范

| 级别 | 使用场景 | 示例 |
|:-----|:---------|:-----|
| `ERROR` | 需要立即关注的异常 | 数据库连接失败 |
| `WARN` | 可恢复的异常情况 | 第三方 API 超时重试 |
| `INFO` | 关键业务事件 | 用户登录、订单创建 |
| `DEBUG` | 调试信息 | SQL 查询、缓存命中 |

### 日志格式

```json
{
  "level": "ERROR",
  "timestamp": "2026-01-01T00:00:00Z",
  "request_id": "req_abc123",
  "module": "auth",
  "message": "Token verification failed",
  "error": { "name": "JsonWebTokenError", "message": "invalid signature" },
  "context": { "user_id": "..." }
}
```

## 关联文档

- [API 设计规范](/api/conventions) — HTTP 状态码使用规范
- [认证与授权](/solutions/authentication) — 认证相关错误处理
