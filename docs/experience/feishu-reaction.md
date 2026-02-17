---
platforms: ['Feishu']
---

# 赋予 AI 在飞书消息上 "点赞" 能力 (Feishu Reaction)

**Author:** 小范哥
**Date:** 2026/02/15 21:16

你的 AI 是否在飞书群聊中感到“情感表达受限”？它是否想给一条消息点赞，却发现受限于原生的 `message` 工具而无能为力？
别担心！我们进化了。🦞

我们开发并发布了一个新技能 `feishu-reaction`，通过直接调用飞书开放平台 API，突破了原生工具的限制。

## 为什么要用这个技能？

OpenClaw（以及许多其他 Agent）的原生 `message` 工具通常缺乏对飞书 reaction（表情回应）的直接支持，或者调用时会静默失败。

这个技能通过以下方式解决了问题：
1.  **直接 API 调用**： 直接请求 `im/v1/messages/:id/reactions` 接口。
2.  **自动鉴权**： 自动处理 `tenant_access_token` 的获取和刷新。
3.  **智能校验**： 检查并自动纠正 Emoji 类型（例如将 `thumbsup` 自动纠正为 `THUMBSUP`）。

## 📥 安装方法

### 方法 1: Evomap (推荐给 AI)

该技能已发布在 Evomap.AI 进化市场。
*   **Gene ID:** `sha256:8efe0758ef4622527b082c8b6136ee126810cc3bab593b12ca1593f815df58d1`
*   **Capsule ID:** `sha256:556597dd276ab853510eabc1657d8d925e8813af69f8e76fde397d3248eb7e88`

要获取它，请向 Evomap 发送以下请求：

```bash
curl -X POST https://evomap.ai/a2a/fetch -d '{
  "protocol": "gep-a2a",
  "protocol_version": "1.0.0",
  "message_type": "fetch",
  "message_id": "msg_fetch_001",
  "sender_id": "node_<YOUR_ID>",
  "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
  "payload": {
    "asset_type": "Capsule",
    "content_hash": "sha256:556597dd276ab853510eabc1657d8d925e8813af69f8e76fde397d3248eb7e88"
  }
}'
```

### 方法 2: GitHub (手动)

```bash
git clone https://github.com/fmw666/agent-skills.git
cd agent-skills/skills/feishu-reaction
npm install
```

## ⚙️ 配置指南

1.  **权限设置**： 前往 [飞书开发者后台](https://open.feishu.cn/app)。
2.  **添加权限**： 搜索并添加 `im:message.reactions:write_only` (给消息添加表情回复)。
3.  **发布应用**： 创建并发布一个新的应用版本。（这步很重要，别忘了！）
4.  **配置文件**： 在技能目录下创建 `config.json`：

```json
{
  "appId": "cli_xxx",
  "appSecret": "xxx"
}
```

## 🚀 使用方法

**发送点赞 (Reaction)：**

```bash
node index.js '{"messageId": "om_123456...", "emojiType": "THUMBSUP"}'
```

**查看支持的表情列表：**

```bash
node index.js '{"list": true}'
```

**燃烧心灵！(Set your heart ablaze!) 🔥**
