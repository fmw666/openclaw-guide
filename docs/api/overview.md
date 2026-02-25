---
title: API 总览
tags: ['api', 'backend']
---

# API 总览

> 本文档列出 YOUR_PROJECT_NAME 的所有 API 端点、请求格式与响应结构。

## Base URL

```
Production:  https://api.example.com/v1
Staging:     https://api-staging.example.com/v1
Development: http://localhost:3000/v1
```

## 认证方式

所有需要认证的接口须在请求头携带 Bearer Token：

```
Authorization: Bearer <access_token>
```

详见 → [认证与授权](/solutions/authentication)

## 端点列表

### 用户模块 (`/users`)

| 方法 | 路径 | 说明 | 认证 |
|:-----|:-----|:-----|:-----|
| `POST` | `/users/register` | 用户注册 | 否 |
| `POST` | `/users/login` | 用户登录 | 否 |
| `GET` | `/users/me` | 获取当前用户信息 | 是 |
| `PUT` | `/users/me` | 更新当前用户信息 | 是 |
| `DELETE` | `/users/:id` | 删除用户 | 管理员 |

### 示例请求/响应

**POST /users/register**

Request:
```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "securepassword"
}
```

Response (201):
```json
{
  "code": 0,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "username": "johndoe",
    "status": "active",
    "created_at": "2026-01-01T00:00:00Z"
  }
}
```

## 通用响应格式

```json
{
  "code": 0,
  "message": "success",
  "data": { ... },
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 100
  }
}
```

## 错误响应格式

```json
{
  "code": 40001,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Invalid email format" }
  ]
}
```

详见 → [错误处理规范](/solutions/error-handling)

## 关联文档

- [API 设计规范](/api/conventions) — RESTful 规范与版本策略
- [数据模型](/models/overview) — 接口返回的数据结构定义
- [认证与授权](/solutions/authentication) — Token 获取与刷新流程
