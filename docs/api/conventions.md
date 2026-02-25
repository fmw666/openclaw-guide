---
title: API 设计规范
tags: ['api', 'conventions']
---

# API 设计规范

> 本文档定义 YOUR_PROJECT_NAME 的 API 设计准则，确保所有端点风格一致。

## RESTful 规范

### URL 设计

- 使用名词复数表示资源：`/users`, `/orders`
- 使用嵌套表示从属关系：`/users/:id/orders`
- URL 使用 kebab-case：`/order-items`
- 避免动词（除非是非 CRUD 操作）：`/users/:id/activate`

### HTTP 方法

| 方法 | 语义 | 幂等 | 示例 |
|:-----|:-----|:-----|:-----|
| `GET` | 查询资源 | 是 | `GET /users` |
| `POST` | 创建资源 | 否 | `POST /users` |
| `PUT` | 全量更新 | 是 | `PUT /users/:id` |
| `PATCH` | 部分更新 | 是 | `PATCH /users/:id` |
| `DELETE` | 删除资源 | 是 | `DELETE /users/:id` |

### 状态码使用

| 状态码 | 含义 | 使用场景 |
|:-------|:-----|:---------|
| `200` | OK | 查询/更新成功 |
| `201` | Created | 创建成功 |
| `204` | No Content | 删除成功 |
| `400` | Bad Request | 请求参数校验失败 |
| `401` | Unauthorized | 未认证 |
| `403` | Forbidden | 无权限 |
| `404` | Not Found | 资源不存在 |
| `409` | Conflict | 资源冲突（如重复创建） |
| `422` | Unprocessable | 业务逻辑校验失败 |
| `500` | Internal Error | 服务器内部错误 |

## 分页规范

Query 参数：

```
GET /users?page=1&per_page=20&sort=created_at&order=desc
```

响应中包含 `meta`：

```json
{
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 256,
    "total_pages": 13
  }
}
```

## 版本策略

- URL Path 方式：`/v1/users`, `/v2/users`
- 新版本发布时保持旧版本至少 6 个月的兼容期
- Breaking changes 必须升级大版本号

## 关联文档

- [API 总览](/api/overview) — 具体端点列表
- [错误处理规范](/solutions/error-handling) — 错误码与异常处理
