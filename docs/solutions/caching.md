---
title: 缓存方案
tags: ['solutions', 'caching', 'redis']
---

# 缓存方案

> 本文档描述 YOUR_PROJECT_NAME 的缓存层级设计、失效策略与 Redis 使用规范。

## 缓存层级

```
Request → [L1: In-Memory] → [L2: Redis] → [L3: Database]
              (进程内)         (分布式)       (持久化)
```

| 层级 | 实现 | TTL | 适用场景 |
|:-----|:-----|:----|:---------|
| L1 | Node.js LRU Cache | 30s~60s | 极高频不变数据（配置项） |
| L2 | Redis | 5min~24h | 用户会话、业务数据缓存 |
| L3 | PostgreSQL | 永久 | 数据源 |

## Redis Key 命名规范

```
{project}:{module}:{entity}:{id}:{field?}
```

示例：
```
myapp:user:profile:550e8400       # 用户画像
myapp:auth:session:abc123         # 会话信息
myapp:config:feature-flags        # 功能开关
myapp:cache:query:hash(params)    # 查询缓存
```

## 失效策略

| 策略 | 说明 | 适用场景 |
|:-----|:-----|:---------|
| **TTL 过期** | 设置过期时间自动删除 | 通用缓存 |
| **主动失效** | 数据变更时删除/更新缓存 | 写入频繁的业务数据 |
| **旁路缓存** (Cache-Aside) | 读时回填，写时删除 | 读多写少场景 |
| **写穿缓存** (Write-Through) | 同步更新缓存和数据库 | 强一致性场景 |

## 常用模式

### Cache-Aside (推荐默认方案)

```
读取:  cache.get(key) → 命中则返回
       未命中 → db.query() → cache.set(key, data, ttl) → 返回

写入:  db.update(data) → cache.del(key)
```

### 缓存穿透防护

- 对不存在的 key 缓存空值（短 TTL）
- 使用布隆过滤器前置校验

### 缓存雪崩防护

- TTL 添加随机偏移量
- 热点 key 永不过期 + 异步刷新

## 关联文档

- [系统架构总览](/architecture/overview) — 缓存层在架构中的位置
- [技术栈说明](/architecture/tech-stack) — Redis 版本与配置
