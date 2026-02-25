---
title: 实体关系
tags: ['models', 'database', 'er-diagram']
---

# 实体关系 (ER Diagram)

> 本文档描述 YOUR_PROJECT_NAME 核心实体之间的关系、外键约束与级联策略。

## ER 图

```
┌──────────┐       1:N       ┌──────────┐
│  roles   │────────────────▶│  users   │
│          │                 │          │
│ id (PK)  │                 │ id (PK)  │
│ name     │                 │ role_id  │──FK
│ perms    │                 │ email    │
└──────────┘                 └────┬─────┘
                                  │ 1:N
                                  │
                             ┌────▼─────┐
                             │ sessions │
                             │          │
                             │ id (PK)  │
                             │ user_id  │──FK
                             │ token    │
                             └──────────┘
```

## 关系定义

| 关系 | 类型 | 外键 | 级联策略 | 说明 |
|:-----|:-----|:-----|:---------|:-----|
| Role → Users | 1:N | `users.role_id` | SET NULL | 角色删除时用户角色置空 |
| User → Sessions | 1:N | `sessions.user_id` | CASCADE | 用户删除时级联删除会话 |

## 级联策略规范

| 场景 | 策略 | 适用 |
|:-----|:-----|:-----|
| 主记录删除，子记录无意义 | `CASCADE` | sessions, logs |
| 主记录删除，子记录需保留 | `SET NULL` | user → role |
| 主记录删除，需阻止 | `RESTRICT` | 有关联订单的用户 |

## 关联文档

- [模型总览](/models/overview) — 各实体字段定义
- [API 总览](/api/overview) — 数据模型对应的接口
