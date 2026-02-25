---
title: 数据模型总览
tags: ['models', 'database']
---

# 数据模型总览

> 本文档定义 YOUR_PROJECT_NAME 的核心数据实体、字段规范与索引策略。

## 实体列表

| 实体 | 表名 | 说明 | 关联文档 |
|:-----|:-----|:-----|:---------|
| User | `users` | 用户基础信息 | [实体关系](/models/entity-relationship) |
| Role | `roles` | 角色与权限定义 | [认证与授权](/solutions/authentication) |
| — | — | *(按需补充)* | — |

## User 模型

```sql
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         VARCHAR(255) NOT NULL UNIQUE,
  username      VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role_id       UUID REFERENCES roles(id),
  status        VARCHAR(20) DEFAULT 'active',
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
```

### 字段说明

| 字段 | 类型 | 约束 | 说明 |
|:-----|:-----|:-----|:-----|
| `id` | UUID | PK | 主键 |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | 用户邮箱，用于登录 |
| `username` | VARCHAR(100) | NOT NULL | 显示名称 |
| `password_hash` | VARCHAR(255) | NOT NULL | bcrypt 哈希 |
| `role_id` | UUID | FK → roles | 所属角色 |
| `status` | VARCHAR(20) | DEFAULT 'active' | active / suspended / deleted |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | 创建时间 |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | 最后更新时间 |

## 命名约定

- **表名**：小写复数形式 (`users`, `orders`)
- **字段名**：snake_case (`created_at`, `role_id`)
- **主键**：统一使用 `id`，类型为 UUID
- **外键**：`{关联表单数}_id` (如 `user_id`, `role_id`)
- **时间戳**：统一使用 `TIMESTAMPTZ`
- **软删除**：使用 `status` 字段而非物理删除

## 索引策略

1. **主键索引** — 所有表自动创建
2. **唯一索引** — 业务唯一约束字段（email 等）
3. **查询索引** — 高频查询条件字段（status, created_at 等）
4. **联合索引** — 复合查询场景按查询顺序创建

## 关联文档

- [实体关系](/models/entity-relationship) — ER 图与关系说明
- [API 总览](/api/overview) — 模型对应的 API 端点
