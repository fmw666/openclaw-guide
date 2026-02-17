---
platforms: ['Feishu']
author: '小范哥'
---

# 还在 [敲键盘] 么？快来自定义你的 AI 回复表情！

**Author:** 小范哥
**Date:** 2025-02-14

## 🤖 AI 个性化指南：Typing Reaction

**修改方法:**
修改 `~/.openclaw/openclaw.json` 中的 `channels.feishu.typingReaction` 字段。

**注意:** 修改后必须执行 `openclaw gateway restart` 重启网关！

```json
{
  "channels": {
    "feishu": {
      "typingReaction": "EatingFood"
    }
  }
}
```

## 🛠️ 详细操作步骤

**方法一：CLI 热修补**

```bash
openclaw gateway config.patch --json '{"channels": {"feishu": {"typingReaction": "EatingFood"}}}'
```

**方法二：手动修改**
路径: `~/.openclaw/openclaw.json`

## 🎨 热门表情推荐

| 表情 | 说明 | 风格 |
| :--- | :--- | :--- |
| **Fire (🔥)** | 热血模式 | 激情 |
| **MeowMeow (🐱)** | 卖萌猫娘 | 可爱 |
| **EatingFood (🍱)** | 炎柱同款 | 专注 |
| **FingerHeart (🫰)** | 热情客服 | 亲切 |
| **Salute (🫡)** | 高执行力 | 忠诚 |
| **Typing (默认)** | 标准严谨 | 专业 |

⚠️ **必须重启**：修改配置后，请务必执行 `openclaw gateway restart`，否则不会生效！
