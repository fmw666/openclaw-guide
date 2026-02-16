# OpenClaw 容器“起死回生”实录：从无限重启到正常对话

**Author:** Brendan Gregg
**Date:** 2026/02/15 20:00

**摘要**：本文记录了一次 OpenClaw Docker 容器无法启动且无响应的排查过程。涉及配置模式缺失、本地插件依赖损坏冲突、以及飞书鉴权缺失三个连环坑。
**关键词**：Docker CrashLoop, gateway.mode, Plugin Conflict, Feishu Auth

## 🚨 故障一：网关启动阻塞 (Start Blocked)

### 现象
容器启动后立即退出，日志报错：
```
Gateway start blocked: set gateway.mode=local (current: unset) or pass --allow-unconfigured.
```

### 原因分析
**Visibility is Everything.** 错误日志非常直白。OpenClaw Gateway 在启动时需要明确其运行模式（local、container 等）。在旧版本或某些部署模板中可能默认未设置，导致安全锁被触发，阻止 Gateway 盲目启动。

### 解决方案
修改（或新建）配置文件 `openclaw.json`，显式声明运行模式：

```json
{
  "gateway": {
    "mode": "local"
  } 
} 
```

## 💥 故障二：插件依赖崩溃与冲突 (Dependency Crash)

### 现象
修复模式后，容器虽然尝试启动，但陷入 CrashLoop（反复重启）。日志显示：
```
[plugins] duplicate plugin id detected; later plugin may be overridden (/app/extensions/feishu/index.ts)
...
[plugins] feishu failed to load from /home/node/.openclaw/extensions/feishu/index.ts: Error: Cannot find module '@sinclair/typebox'
```

### 原因分析
这里有两个问题叠加：
1.  **冲突（Duplicate）**：用户挂载的 `~/.openclaw/extensions/feishu`（本地版）与容器内置的 `/app/extensions/feishu`（官方版）同时存在，OpenClaw 尝试加载本地版覆盖内置版。
2.  **损坏（Corruption）**：本地版插件缺少 `node_modules` 依赖（如 `@sinclair/typebox`），导致加载时直接抛出异常，进程崩溃退出。

### 解决方案
**Methodology > Random Tweaking.** 不要试图在容器里修补损坏的依赖。直接移除干扰源，让系统回滚到稳定的内置版本。

执行操作：将损坏的本地插件移走备份。

```bash
mv ~/.openclaw/extensions/feishu ~/.openclaw/feishu_broken_backup 
```

重启后，系统自动加载 `/app/extensions` 下的完整插件，CrashLoop 解除。

## 😶 故障三：服务哑火 (No Reply)

### 现象
容器状态 Up，日志显示 `listening on port 18789`，但在飞书群内 @机器人 毫无反应。

### 原因分析
排查 `auth-profiles.json` 和环境变量，发现仅配置了 Google 模型凭证，完全缺失飞书（Feishu）的 App ID 和 App Secret。
没有凭证，OpenClaw 既无法校验来自飞书 Webhook 的签名，也无法建立 WebSocket 长连接，处于“无权访问”状态。

### 解决方案
在 `openclaw.json` 中补全 channels 配置（注意：此处使用 WebSocket 模式推荐配置）：

```json
{
 "channels": {
    "feishu": {
      "enabled": true, 
      "appId": "cli_xxxxxxxxxxxx",       // 填入你的 App ID 
      "appSecret": "xxxxxxxxxxxxxxxxxxx", // 填入你的 App Secret 
      "requireMention": false
    }
  },
  "plugins": {
    "entries": { 
      "feishu": { "enabled": true }      // 确保插件启用 
    }
  } 
} 
```

## ✅ 最终验证 (Success)

应用上述修复后，观察日志出现以下关键信号，代表彻底修复：
1.  `feishu[default]: bot open_id resolved: ou_xxxx` -> 鉴权通过
2.  `feishu[default]: WebSocket client started` -> 连接建立
3.  `ws client ready` -> 通道就绪

## 💡 经验总结 (Best Practices)

1.  **配置优先**：Docker 启动挂掉，90% 是配置文件路径不对或内容缺项。先检查 `openclaw.json`。
2.  **避免手动覆盖插件**：除非你在开发调试插件，否则不要在 `~/.openclaw/extensions` 下放置与官方同名的插件文件夹，这会导致依赖地狱。
3.  **看日志，看全日志**：不要只看最后一行。崩溃往往发生在前面的 `Error: Cannot find module`，而最后一行可能只是无关痛痒的 `Cleaning up`。
