---
title: 变更日志
tags: ['changelog']
---

# 变更日志

> 记录文档站点与项目的重大变更。格式遵循 [Keep a Changelog](https://keepachangelog.com/)。

## [Unreleased]

### Added
- 初始化文档站点模板
- 架构设计文档（总览、技术栈、部署）
- 数据模型文档（模型总览、实体关系）
- API 文档（总览、设计规范）
- 开发指南（快速开始、编码规范、Git 工作流）
- 技术方案文档（缓存、认证、错误处理）
- AI 索引系统（ai-map、llms.txt、sitemap）
- skill.md — AI Agent 集成指南

---

## 变更记录规范

每次文档更新请遵循以下格式：

```markdown
## [YYYY-MM-DD]

### Added
- 新增的文档或章节

### Changed
- 修改的内容

### Deprecated
- 计划废弃的内容

### Removed
- 已移除的内容

### Fixed
- 修正的错误
```

### AI Agent 自动维护

当 AI Agent 修改文档时，必须在本文件顶部 `[Unreleased]` 区域添加对应的变更记录。
