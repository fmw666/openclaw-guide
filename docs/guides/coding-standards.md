---
title: 编码规范
tags: ['guides', 'conventions']
---

# 编码规范

> 本文档定义 YOUR_PROJECT_NAME 的代码风格、命名约定与目录结构规范。

## 目录结构

```
src/
├── controllers/     # 路由处理器（薄层，仅负责请求/响应）
├── services/        # 业务逻辑层
├── models/          # 数据模型定义
├── middlewares/     # Express/Koa 中间件
├── utils/           # 通用工具函数
├── config/          # 配置文件
├── types/           # TypeScript 类型定义
└── tests/           # 测试文件
    ├── unit/
    └── integration/
```

## 命名约定

| 类别 | 风格 | 示例 |
|:-----|:-----|:-----|
| 文件名 | kebab-case | `user-service.ts` |
| 类名 | PascalCase | `UserService` |
| 函数/变量 | camelCase | `getUserById` |
| 常量 | UPPER_SNAKE | `MAX_RETRY_COUNT` |
| 数据库表 | snake_case 复数 | `user_roles` |
| 数据库字段 | snake_case | `created_at` |
| API 路径 | kebab-case | `/user-profiles` |
| 环境变量 | UPPER_SNAKE | `DATABASE_URL` |

## 代码风格

- 使用 ESLint + Prettier 统一格式
- 缩进：2 空格
- 引号：单引号（JS/TS）
- 分号：始终添加
- 最大行宽：100 字符
- 文件末尾空行：保留

## 注释规范

- **不写**显而易见的注释
- **必须写**：复杂业务逻辑的"为什么"、非直觉的技术决策、公共 API 的 JSDoc
- TODO 格式：`// TODO(author): description`

## 错误处理

- 所有 async 函数使用 try-catch 或统一错误中间件
- 不吞没错误：捕获后必须记录日志或重新抛出
- 详见 → [错误处理规范](/solutions/error-handling)

## 关联文档

- [Git 工作流](/guides/git-workflow) — 提交与分支规范
- [API 设计规范](/api/conventions) — 接口层规范
