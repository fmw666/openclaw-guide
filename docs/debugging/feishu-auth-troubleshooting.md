# OpenClaw 诊疗室：飞书机器人鉴权失败 (Error 400) 深度剖析

**诊断医师:** OpenClaw Doctor
**就诊时间:** 2026-02-17
**病例编号:** CASE-20260217-400

## 📋 患者主诉 (Symptoms)

机器人服务 (`OpenClaw Gateway`) 运行看似正常，能够接收用户消息并回复，但在后台日志中持续监测到 "400 Bad Request" 报错，且无法正确识别发送者的飞书昵称（显示为 `ou_xxxx`）。

**临床表现 (Logs):**
```log
[ERROR] feishu: failed to resolve sender name for ou_94bec5a96dd5980abc1d792a4768d50f
AxiosError: Request failed with status code 400
{
  "code": 41050,
  "msg": "no user authority error",
  "error": { ... }
}
```

## 🩺 诊断分析 (Diagnosis)

### 1. 凭证检测 (Credential Check)
*   **检测项**: App ID / App Secret
*   **测试**: 使用 `curl` 调用 `auth/v3/tenant_access_token`。
*   **结果**: ✅ **阴性 (正常)**。凭证有效，可获取 Token。

### 2. 权限扫描 (Permission Scan)
*   **检测项**: 应用权限范围 (Scopes)
*   **分析**: 错误码 `41050` 明确指向 "用户权限缺失"。OpenClaw 尝试调用 `contact.user.base` 接口获取用户昵称时被飞书网关拦截。
*   **结果**: ❌ **阳性 (异常)**。缺失关键权限 `contact:user.base:readonly`。

**病理结论**: 
机器人拥有“发消息”的权限，但缺乏“看通讯录”的权限。导致它能说话，但在这个“群聊世界”里是个脸盲，认不出谁是谁。

## 💊 治疗方案 (Prescription)

请管理员立即执行以下手术：

### 第一步：补充权限 (Add Scopes)
1.  登录 [飞书开放平台](https://open.feishu.cn/app)。
2.  进入应用 > **权限管理**。
3.  搜索并添加以下权限：
    *   `contact:user.base:readonly` (获取用户基本信息)
    *   `contact:user.employee_id:readonly` (通过用户 ID 获取信息)

### 第二步：发布版本 (Release)
> ⚠️ **高危提醒**：仅添加权限不发布，治疗无效！

1.  进入 **版本管理与发布**。
2.  点击 **创建版本**。
3.  勾选新增的权限，保存并 **申请发布**。

## 🩺 复查 (Follow-up)

操作完成后，无需重启服务。等待 1-2 分钟（缓存刷新），在群内发送任意消息。

**预期康复指标**:
1.  日志中不再出现 `41050` 错误。
2.  日志中 `sender` 字段正确显示为用户昵称（如 "范茂伟"）而非 ID。

---
**医嘱**: 权限管理是飞书应用的免疫系统，缺一不可。建议定期进行 `openclaw doctor` 体检。
