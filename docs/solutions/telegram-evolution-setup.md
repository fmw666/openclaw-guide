---
title: Telegram Bot 进化引擎配置指南
description: 如何将 OpenClaw 的自我进化能力扩展到 Telegram 平台，并配置群组权限。
platforms: ['Telegram']
author: '小范哥'
head:
  - - meta
    - name: keywords
      content: telegram, evolver, bot father, group privacy, openclaw
---

# Telegram Bot 进化引擎配置指南

本文档记录了如何将 `feishu-evolver-wrapper` 改造为支持 Telegram，并解决群组消息读取权限问题的完整流程。

## 一、 架构升级：从 Feishu 到 Telegram

为了让 OpenClaw 的进化引擎（Evolver）能够通过 Telegram 进行汇报和交互，我们需要进行以下适配：

### 1.1 技能适配
我们将原有的 `feishu-evolver-wrapper` 进行了改造（或替换），引入了 `telegram-helper.js`。
这个 Helper 模块负责与 Telegram Bot API 进行通信，替代了原有的飞书 API 调用。

### 1.2 环境变量配置
在 `skills/feishu-evolver-wrapper/.env` 中，我们需要配置以下关键参数：

```bash
# Telegram Bot Token (从 @BotFather 获取)
TELEGRAM_BOT_TOKEN=123456789:ABCDefGHIjkLmnOPqrstUVwxyz

# 默认汇报目标 (你的 Telegram User ID 或 Group ID)
TELEGRAM_CHAT_ID=987654321

# 进化策略 (保持默认即可)
EVOLVE_STRATEGY=balanced
```

## 二、 网关配置 (Gateway Config)

仅仅配置技能是不够的，OpenClaw 的主网关（Gateway）也需要知道这个 Bot 的存在，以便正确路由消息。

修改 `~/.openclaw/openclaw.json`：

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "YOUR_BOT_TOKEN_HERE", // 必须与 .env 中一致
      "dmPolicy": "pairing",
      "groups": {
        "*": {
          "requireMention": true // 群聊中必须 @Bot 才会响应
        }
      },
      "groupPolicy": "open", // 关键！设置为 open 允许 Bot 响应任何新加入的群组
      "streamMode": "partial"
    }
  }
}
```

**注意：** 修改配置后，必须执行 `openclaw gateway restart` 重启网关。

## 三、 解决群组“失聪”问题 (Group Privacy)

### 3.1 现象
将 Bot 拉入 Telegram 群组后，即使配置了 `open` 策略，Bot 对 `@BotName` 的提及依然毫无反应。通过 API 查询 `getMe` 发现 `"can_read_all_group_messages": false`。

### 3.2 原因
Telegram Bot 默认开启 **Group Privacy** 模式。在此模式下，Bot 无法读取群内的普通消息，甚至可能漏掉提及消息。

### 3.3 解决方案 (必做)
必须联系 Telegram 的官方管理 Bot —— **@BotFather** 进行设置：

1.  私聊 **@BotFather**。
2.  发送指令 `/setprivacy`。
3.  选择你的 Bot (`@your_bot_name`)。
4.  点击 **Disable**。
5.  BotFather 回复 `Success! The new status is: DISABLED` 即为成功。

**生效技巧：**
设置完成后，如果 Bot 依然没反应，尝试将其 **踢出群组并重新拉入**，以强制刷新权限缓存。

## 四、 验证与启动

1.  **启动进化循环**：
    ```bash
    node skills/feishu-evolver-wrapper/index.js
    ```

2.  **群组测试**：
    在 Telegram 群组中发送：
    `@your_bot_name /id`

    如果 Bot 回复了群组 ID（如 `-100123456789`），说明双向通信已完全打通！🚀
