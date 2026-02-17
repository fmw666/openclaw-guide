# OpenClaw 节点“小范哥”完全修复实录

**目标节点**：`203.0.113.10` (GCP / User: exampleuser)
**故障现象**：群聊不回复，节点离线。
**修复时间**：2026-02-17

---

## 第一阶段：诊断与启动修复 (Boot Loop)

### 1. 现象确认

通过 `nodes status` 发现节点列表为空。尝试 SSH 登录并检查 Docker 状态：

```bash
ssh -i /home/node/.openclaw/gcp_key exampleuser@203.0.113.10 "docker ps -a"
```

**结果**：容器 `openclaw-openclaw-gateway-1` 状态为 `Restarting`（无限重启）。

### 2. 查看崩溃日志

```bash
docker logs openclaw-openclaw-gateway-1 --tail 20
```

**报错**：`Gateway start blocked: set gateway.mode=local (current: unset)`
**原因**：新版 OpenClaw 安全机制要求显式声明运行模式，旧容器缺少此配置。

### 3. 修复方案 (环境变量法)

直接修改启动命令，注入环境变量，这是最稳妥的方法。

**修复命令**：

```bash
# 停止并删除旧容器
docker rm -f openclaw-openclaw-gateway-1

# 使用环境变量 OPENCLAW_GATEWAY_MODE=local 启动
docker run -d \
  --name openclaw-openclaw-gateway-1 \
  --restart unless-stopped \
  -e OPENCLAW_GATEWAY_MODE=local \
  -v /home/exampleuser/.openclaw:/home/node/.openclaw \
  -p 3000:3000 \
  openclaw:local
```

---

## 第二阶段：大脑移植 (模型与鉴权配置)

### 1. 现象

容器启动成功 (`Up`)，但日志显示模型加载为 `anthropic`，且报错 `No API key found`。
**原因**：未配置默认模型，且 Anthropic Key 缺失。

### 2. 资源搜索

在宿主机搜索遗留的 API Key：

```bash
grep -r "AIza" /home/exampleuser/.openclaw 2>/dev/null
```

**结果**：找到 Google Gemini Key。

### 3. 修复方案

再次重建容器，强制指定模型环境变量，防止它回退到默认的 Anthropic。

**修复命令**：

```bash
docker rm -f openclaw-openclaw-gateway-1

docker run -d \
  --name openclaw-openclaw-gateway-1 \
  --restart unless-stopped \
  -e OPENCLAW_GATEWAY_MODE=local \
  -e OPENCLAW_AGENT_MODEL=google/gemini-3-pro-preview \
  -v /home/exampleuser/.openclaw:/home/node/.openclaw \
  -p 3000:3000 \
  openclaw:local
```

---

## 第三阶段：感官修复 (飞书插件与 JSON 语法)

### 1. 现象

日志显示 `feishu` 插件并未启动，或启动失败。检查配置文件 `openclaw.json` 发现：
1.  `"enabled": false`（插件被禁用）。
2.  缺少 `appId` 和 `appSecret`。

### 2. 修复方案 (容器内 Node.js 写入)

为了保证 JSON 格式绝对正确，**不使用 Shell 文本处理工具**（容易产生换行符错误），而是利用容器内的 Node.js 进行文件写入。

**修复命令**：

```bash
docker exec openclaw-openclaw-gateway-1 node -e '
const fs = require("fs");
const config = {
  "agents": {
    "defaults": {
      "model": { "primary": "google/gemini-3-pro-preview" },
      "workspace": "/home/node/.openclaw/workspace",
      "compaction": { "mode": "safeguard" },
      "maxConcurrent": 4
    }
  },
  "messages": { "ackReactionScope": "group-mentions" },
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "<FEISHU_APP_ID_REDACTED>",
      "appSecret": "<FEISHU_APP_SECRET_REDACTED>",
      "requireMention": false
    }
  },
  "gateway": { "mode": "local" },
  "plugins": {
    "entries": { "feishu": { "enabled": true } }
  }
};
fs.writeFileSync("/home/node/.openclaw/openclaw.json", JSON.stringify(config, null, 2));
'
docker restart openclaw-openclaw-gateway-1
```

---

## 第四阶段：能量接通 (Auth Profile 结构修正)

### 1. 现象

飞书连接成功，但回复时报错：`Error: No API key found for provider "google"`。

### 2. 问题排查

检查 `auth-profiles.json`，发现 JSON 结构与当前版本不匹配（使用了旧版或简化版结构）。

### 3. 最终修复

参考标准环境的正确结构，重写 `auth-profiles.json`。

**修复命令**：

```bash
docker exec openclaw-openclaw-gateway-1 node -e '
const fs = require("fs");
const path = "/home/node/.openclaw/agents/main/agent/auth-profiles.json";
// 确保目录存在
const dir = require("path").dirname(path);
if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }); }

// 构造符合版本要求的配置对象
const auth = {
  "version": 1,
  "profiles": {
    "google:default": {
      "type": "api_key",
      "provider": "google",
      "key": "<GOOGLE_API_KEY_REDACTED>"
    }
  }
};
fs.writeFileSync(path, JSON.stringify(auth, null, 2));
'
docker restart openclaw-openclaw-gateway-1
```

---

## 经验总结 (Lessons Learned)

1.  **启动模式**：OpenClaw 必须指定 `OPENCLAW_GATEWAY_MODE=local` 才能在无配置情况下启动。
2.  **文件写入**：在远程 Shell 中修改 JSON 配置文件极其容易出错。**最佳实践是使用 `docker exec ... node -e ...`**，利用代码逻辑生成文件。
3.  **配置层级**：`auth-profiles.json` 的结构随版本变化，必须严格对比当前运行版本的规范（`google:default` 扁平键名 vs 嵌套）。
4.  **模型指定**：环境变量 `OPENCLAW_AGENT_MODEL` 优先级高于配置文件，是修复模型错乱的“强制手段”。
