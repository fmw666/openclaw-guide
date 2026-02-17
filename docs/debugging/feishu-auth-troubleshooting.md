# 飞书机器人鉴权故障深度排查实录

**日期**：2026-02-17
**状态**：已解决 (Resolved)
**关键词**：OpenClaw, Feishu Auth, Error 400, no user authority, contact:user.base

## 一、 问题背景 (The Incident)

用户反馈 OpenClaw 机器人在飞书群聊中可以正常回复，但在日志中观察到报错，且对机器人身份/昵称的解析似乎存在问题。

**关键症状：**
1.  **功能层面**：机器人能收发消息（基本通信正常）。
2.  **日志层面**：后台频繁出现 `AxiosError: Request failed with status code 400`。
3.  **错误详情**：
    ```
    code: 41050
    msg: 'no user authority error'
    feishu: failed to resolve sender name for ou_xxxx...
    ```

## 二、 诊断过程 (Diagnosis)

### 步骤 1：凭证有效性验证 (Credential Validation)

首先怀疑是 App ID 或 Secret 错误。为了验证这一点，我们绕过 OpenClaw，直接使用 `curl` 模拟飞书 API 请求。

**执行命令：**
```bash
curl -X POST -H "Content-Type: application/json" \
     -d '{"app_id":"<FEISHU_APP_ID_REDACTED>","app_secret":"<FEISHU_APP_SECRET_REDACTED>"}' \
     https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal
```

**诊断结果：**
```json
{"code":0,"expire":6888,"msg":"ok","tenant_access_token":"t-g1042..."}
```
✅ **结论**：凭证本身是有效的，可以成功获取 Token。问题不在密钥错误。

### 步骤 2：日志深度审计 (Log Audit)

既然凭证没错，为什么还会报错？我们深入挖掘了 OpenClaw 的运行日志。

**执行命令：**
```bash
# 查看 OpenClaw 实时日志（如果是 docker 环境）
tail -n 50 /tmp/openclaw/openclaw-2026-02-17.log
```

**关键发现：**
日志中明确指出了错误的触发点：
> `feishu: failed to resolve sender name for ou_94bec5a96dd5980abc1d792a4768d50f: AxiosError: Request failed with status code 400`

**根因锁定：**
OpenClaw 在收到消息后，会尝试调用飞书接口（如 `contact/v3/users`）去查询发送者的昵称，以便在日志或 Prompt 中正确称呼用户。
报错 `41050 (no user authority)` 意味着 **应用缺少读取通讯录/用户信息的权限**。

## 三、 解决方案 (Resolution)

### 修复步骤

1.  **登录飞书开放平台**：
    访问 [飞书开发者后台](https://open.feishu.cn/app)，进入对应应用。

2.  **添加权限**：
    在左侧菜单点击 **“权限管理”**，搜索并批量添加以下权限：
    *   `contact:user.base:readonly`（获取用户基本信息，如头像、昵称）
    *   `contact:user.employee_id:readonly`（通过 user_id 获取用户信息）

3.  **发布版本（关键！）**：
    修改权限后，必须前往 **“版本管理与发布”**，创建一个新版本并发布。**未发布前，新权限不会生效。**

### 验证修复

无需重启 OpenClaw。发布版本后，等待约 1-5 分钟（飞书缓存刷新），再次在群里发送消息。
观察日志：
*   **预期**：`failed to resolve sender name` 错误消失。
*   **预期**：日志中能正确显示 `sender: 范茂伟` 而不仅仅是 `sender: ou_xxxx`。

## 四、 经验总结 (Lessons Learned)

1.  **报错不一定等于不可用**：有时候 API 报错（如 400）只是某个非核心功能（如获取昵称）失败，不影响核心业务（收发消息）。
2.  **鉴权是分层的**：
    *   层级 1：**App ID/Secret** -> 决定你能否连接飞书（Token）。
    *   层级 2：**Scope (权限)** -> 决定拿着 Token 能干什么（发消息、读文档、看通讯录）。
3.  **验证工具链**：
    *   `curl` 是验证凭证最快的方式。
    *   `tail -f` 日志是定位逻辑错误的根本手段。
