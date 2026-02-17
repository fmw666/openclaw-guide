---
title: Telegram 机器人与表情包 (Reactions)
description: 如何在 OpenClaw 中为 Telegram 机器人实现多表情动画效果。
platforms: ['Telegram']
author: '范茂伟'
head:
  - - meta
    - name: keywords
      content: telegram, bot, reaction, animation, openclaw
---

# Telegram 机器人与表情包 (Reactions)

::: tip 场景
你希望 OpenClaw 机器人能在 Telegram 群聊中像人类一样发送 Emoji Reaction（表情回应）。
但你发现 Telegram Bot API 对机器人有特殊限制：**单条消息只能保留 1 个 Reaction**。
本文将介绍如何利用这一特性，实现**多表情动画**效果。
:::

## 机器人 vs 人类用户的区别

在 Telegram 中，人类用户（尤其是 Premium 用户）和机器人对于 Reactions 的支持存在显著差异：

| 特性 | 人类用户 (Premium) | 机器人 (Bot) |
| :--- | :--- | :--- |
| **最大同时表情数** | 最多 3 个 (如 👍 🔥 🎉) | **仅 1 个** (新的会覆盖旧的) |
| **动画效果** | 无 | 可通过快速切换表情实现状态机动画 |
| **自定义表情** | 支持 | 不支持 (除非 Bot 是贴纸包拥有者?) |

## 🎭 动画效果原理

既然机器人只能保留 1 个活跃表情，我们可以利用这一点来传达**状态变化**或**情感递进**。

当机器人需要表达复杂情感时，不是一次性堆叠表情，而是**按顺序发送**一组表情。用户端会看到表情在消息右下角快速变化，形成动画。

**示例场景：**
- **思考中**：`⏳` (沙漏) -> `🔄` (加载) -> `✅` (完成)
- **处理请求**：`👀` (已阅) -> `🤔` (思考) -> `💡` (有想法)
- **庆祝**：`🎉` (拉炮) -> `🥳` (庆祝脸) -> `🍾` (香槟)

最终保留的是序列中的**最后一个表情**。

## 🛠️ 实现代码 (Node.js)

以下是一个封装好的函数，用于在 OpenClaw 技能中实现多表情动画。

```javascript
const https = require("https");

/**
 * 为 Telegram 消息添加表情动画
 * @param {string} token - Bot Token
 * @param {string} chatId - 目标群组 ID
 * @param {string} messageId - 目标消息 ID
 * @param {string[]} emojis - 表情数组，如 ["👀", "🤔", "✅"]
 */
async function addReactionsAnimated(token, chatId, messageId, emojis) {
  const DELAY_MS = 800; // 动画间隔，建议 500-1000ms

  for (const emoji of emojis) {
    await setReaction(token, chatId, messageId, emoji);
    // 如果还有下一个表情，等待一段时间
    if (emojis.indexOf(emoji) < emojis.length - 1) {
      await new Promise(r => setTimeout(r, DELAY_MS));
    }
  }
}

async function setReaction(token, chatId, messageId, emoji) {
  const postData = JSON.stringify({
    chat_id: chatId,
    message_id: messageId,
    reaction: [{ type: "emoji", emoji: emoji }] // 每次只发一个
  });

  const options = {
    hostname: 'api.telegram.org',
    path: `/bot${token}/setMessageReaction`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      // 处理响应...
    });
    req.write(postData);
    req.end();
  });
}
```

## 📦 OpenClaw 技能集成

你可以将此逻辑封装为一个 OpenClaw Skill，例如 `telegram-reaction`。

### 技能目录结构
```
skills/telegram-reaction/
├── index.js    # 上述代码逻辑
└── SKILL.md    # 技能描述
```

### 使用方法
在对话中或通过 CLI 调用：

```bash
# 发送一组表情动画
node skills/telegram-reaction/index.js <chat_id> <message_id> "👀" "🤔" "✅"
```

## ⚠️ 注意事项

1.  **频率限制**：不要设置过短的间隔（<500ms），否则可能触发 Telegram API 的 `429 Too Many Requests`。
2.  **表情兼容性**：仅支持 Telegram 标准表情集（如 👍 👎 ❤️ 🔥 🎉 👏 😁 🤔 🤯 😱 🤬 😢 🤮 💩 🙏）。某些群组可能禁用了特定表情。
3.  **群组权限**：Bot 必须有权在群组中发送消息和表情。
