---
title: 快速开始
tags: ['guides', 'onboarding']
---

# 快速开始

> 从零搭建 YOUR_PROJECT_NAME 本地开发环境。

## 前置要求

| 工具 | 版本 | 安装 |
|:-----|:-----|:-----|
| Node.js | >= 20.x | [nodejs.org](https://nodejs.org/) |
| PostgreSQL | >= 15 | [postgresql.org](https://www.postgresql.org/) |
| Redis | >= 7.x | [redis.io](https://redis.io/) |
| Git | >= 2.40 | [git-scm.com](https://git-scm.com/) |
| Docker | >= 24 (可选) | [docker.com](https://www.docker.com/) |

## 安装步骤

### 1. 克隆仓库

```bash
git clone https://github.com/YOUR_ORG/YOUR_REPO.git
cd YOUR_REPO
```

### 2. 安装依赖

```bash
npm install
# 或
pnpm install
```

### 3. 环境配置

```bash
cp .env.example .env
```

编辑 `.env`，填入本地数据库连接信息：

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/your_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-development-secret
```

### 4. 初始化数据库

```bash
npm run db:migrate
npm run db:seed    # 可选：填充测试数据
```

### 5. 启动开发服务

```bash
npm run dev
```

服务将在 `http://localhost:3000` 启动。

## Docker 快速启动（可选）

```bash
docker compose up -d
```

将自动启动 App + PostgreSQL + Redis。

## 常见问题

| 问题 | 解决方案 |
|:-----|:---------|
| 端口被占用 | 修改 `.env` 中的 `PORT` |
| 数据库连接失败 | 检查 PostgreSQL 是否运行、连接串是否正确 |
| 依赖安装报错 | 删除 `node_modules` 和 lockfile 后重试 |

## 下一步

- [编码规范](/guides/coding-standards) — 了解代码风格要求
- [Git 工作流](/guides/git-workflow) — 了解分支与提交规范
- [系统架构总览](/architecture/overview) — 理解项目整体设计
