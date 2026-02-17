---
platforms: ['Feishu', 'Discord', 'Telegram', 'WhatsApp']
---

# OpenClaw 多平台绑定指南

本指南将协助您完成 OpenClaw 与飞书 (Feishu)、Discord、WhatsApp 及 Telegram 的集成配置。

> **前置条件**：确保您已安装 OpenClaw Gateway 并完成基础初始化。

## 1. 飞书 (Feishu) 集成

飞书机器人采用 WebSocket 长连接模式，无需公网 IP 即可接收消息。

### 1.1 创建企业自建应用

1.  登录 [飞书开放平台](https://open.feishu.cn/app)。
2.  点击 **创建企业自建应用**，填写应用名称（建议：`OpenClaw Bot`）及描述。
3.  创建成功后，在 **凭证与基础信息** 页面获取 **App ID** 和 **App Secret**。

### 1.2 配置应用权限

进入 **权限管理**，批量添加以下核心权限：

*   **消息与群组**：`im:message`, `im:chat`, `im:resource`
*   **文档与知识库**：`docx:document:readonly`, `wiki:wiki:readonly`

### 1.3 启用机器人能力

1.  前往 **应用能力** > **机器人**，开启机器人功能。
2.  前往 **事件订阅**：
    *   **配置方式**：选择 **使用 OpenClaw 的 WebSocket 长连接**（推荐）。
    *   **添加事件**：搜索并添加 `im.message.receive_v1` (接收消息)。

### 1.4 发布应用

前往 **版本管理与发布**，创建新版本并申请发布。待管理员审核通过后，应用即可生效。

### 1.5 配置 OpenClaw

在 OpenClaw 配置文件 (`config.json`) 中添加以下内容：

```json
{
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "cli_a1b2c3d4e5", 
      "appSecret": "your_app_secret_here",
      "verificationToken": "", // WebSocket 模式下可选
      "encryptKey": ""         // 若未开启加密可留空
    }
  }
}
```

---

## 2. Discord 集成

### 2.1 创建 Discord Application

1.  访问 [Discord Developer Portal](https://discord.com/developers/applications)。
2.  点击 **New Application** 创建应用。
3.  进入 **Bot** 选项卡，点击 **Add Bot**。
4.  **保存 Token**：点击 **Reset Token** 获取并复制 Bot Token。
5.  **开启 Intents**：在 "Privileged Gateway Intents" 区域，开启 **Message Content Intent**。

### 2.2 邀请 Bot 至服务器

1.  进入 **OAuth2** > **URL Generator**。
2.  **Scopes**：勾选 `bot`。
3.  **Bot Permissions**：勾选 `Read Messages/View Channels`, `Send Messages`, `Embed Links`, `Attach Files`。
4.  复制底部的 URL，在浏览器中打开并选择要加入的服务器。

### 2.3 配置 OpenClaw

```json
{
  "channels": {
    "discord": {
      "enabled": true,
      "token": "your_discord_bot_token_here"
    }
  }
}
```

---

## 3. WhatsApp 集成

OpenClaw 通过模拟 WhatsApp Web 协议连接，支持个人号或商业号。

### 3.1 准备工作

*   准备一个手机设备，已登录 WhatsApp 账号。
*   建议使用专用账号以避免消息混淆。

### 3.2 配置 OpenClaw

配置允许互动的手机号白名单（推荐）：

```json
{
  "channels": {
    "whatsapp": {
      "enabled": true,
      "dmPolicy": "allowlist", 
      "allowFrom": ["1234567890"] // 格式：纯数字手机号，含国家代码
    }
  }
}
```

### 3.3 扫码登录

1.  启动 OpenClaw Gateway。
2.  执行命令：`openclaw channels login`。
3.  终端将显示二维码。
4.  打开手机 WhatsApp > **设置** > **已连接的设备** > **连接设备**，扫描终端二维码。

---

## 4. Telegram 集成

### 4.1 创建 Telegram Bot

1.  在 Telegram 中搜索 **@BotFather** 并开始对话。
2.  发送指令 `/newbot`。
3.  按提示输入 Bot 名称（Display Name）和用户名（Username，需以 `bot` 结尾）。
4.  获取 **HTTP API Token**。

### 4.2 配置 OpenClaw

建议开启配对模式 (`pairing`) 以增强安全性：

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "123456789:AbCdefGhIjkLmnOpQrStUvWxYz",
      "dmPolicy": "pairing"
    }
  }
}
```

### 4.3 绑定验证

1.  启动 OpenClaw。
2.  向您的 Bot 发送任意消息。
3.  Bot 将回复一个 **配对码 (Pairing Code)**。
4.  在 OpenClaw 终端执行：`openclaw pairing approve telegram <配对码>`。
