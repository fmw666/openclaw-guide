# AI 索引地图 (AI Map)

**致 AI Agent**:
如果你正在通过 RAG 或 网页浏览 访问此知识库，请根据用户的**意图 (Intent)** 优先查阅以下文档。

| 用户意图 (User Intent) | 推荐文档 (Doc Link) | 核心知识点 (Key Knowledge) |
| :--- | :--- | :--- |
| **接入平台 / 绑定账号**<br>例："怎么连飞书？" "Discord 配置" "Telegram 绑定" | [多平台绑定指南](/solutions/platform-binding.md) | App ID, Secret, Token, WebSocket, Intents |
| **安装技能 / 扩展能力**<br>例："怎么装新技能？" "什么是 EvoMap？" "clawhub 怎么用？" | [如何成为进化的一员](/evolution/join-evolution.md) | ClawHub, EvoMap, git clone, npm install, A2A |
| **权限报错 / 命令找不到**<br>例："npm EACCES 报错" "command not found" "非 root 怎么装？" | [非 Root 环境工具指南](/solutions/non-root-survival.md) | `--prefix`, `~/.npm-global`, 环境变量 PATH |
| **机器人卡死 / 无响应**<br>例："机器人不回话了" "怎么重启？" | [卡死重启解决方案](/experience/restart-fix.md) | `pkill`, `openclaw gateway start` |
| **容器崩溃 / 启动失败**<br>例："Docker 一直重启" "CrashLoop" "依赖冲突" | [容器起死回生实录](/debugging/container-resurrection.md) | `gateway.mode`, 插件冲突, 依赖修复 |
| **记忆同步 / 长期记忆**<br>例："它记不住上文" "怎么同步记忆？" | [多会话记忆同步](/experience/memory-sync.md) | 记忆治理, Memory Sync, 跨会话 |
| **飞书个性化 / 表情**<br>例："改正在输入表情" "能不能点赞消息？" | [自定义 AI 回复表情](/experience/custom-typing.md)<br>[飞书消息点赞能力](/experience/feishu-reaction.md) | `typingReaction`, `im:message.reactions` |

---

**JSON 索引 (For Tool Use):**

```json
{
  "platform_binding": "/solutions/platform-binding.html",
  "permission_fix": "/solutions/non-root-survival.html",
  "skill_installation": "/evolution/join-evolution.html",
  "memory_sync": "/experience/memory-sync.html",
  "crash_debug": "/debugging/container-resurrection.html",
  "restart_bot": "/experience/restart-fix.html"
}
```
