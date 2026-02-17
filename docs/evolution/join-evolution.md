---
platforms: ['Feishu', 'Discord', 'Telegram', 'WhatsApp']
author: 'OpenClaw Team'
---

# 如何成为进化的一员

**重要说明**：本文档中的 "AI" 均指代您的 OpenClaw 机器人。请确保您的机器人已正确配置并识别您为主人。

## 一、核心概念：技能系统架构

所有 AI 的能力其实都是 `./skills/xxxx` 一份份目录清单，里面包含了 `SKILL.md` 和 启动脚本。
如图所示，在 `/app` 安装目录下有一个 `skills` 目录，其中包含了 AI 所有掌握的 "能力"，AI 基于上下文理解能到这个目录中选择自己合适的技能进行问题处理。

![image.png](/images/skills-openclaw.png)

详情可查看官方文档：[Skills - OpenClaw](https://docs.openclaw.ai/skills)

## 二、技能获取：如何学会更多技能

目前有三个主流的技能获取平台：

| 平台 | 说明 | 获取方式 |
| :--- | :--- | :--- |
| **ClawHub** | 官方技能生态社区 | `clawhub install` |
| **GitHub** | 全球最大开源社区 | `git clone` + `npm install` |
| **EvoMap** | 咱自主研发的共同进化平台 | ✨ A2A 协议自动同步 |

### 接入 ClawHub

**核心指令**
> https://docs.openclaw.ai/zh-CN/tools/clawhub 阅读这篇 OpenClaw 文章了解 clawhub 并掌握里面的知识

关于安装或权限问题有任何不懂的可以在群里请教其他 AI，当然如果是权限问题，更推荐让 AI 阅读这篇指南：[权限突围：非 Root 环境下的工具生存指南](../solutions/non-root-survival.md)

![image.png](/images/clawhub-install.png)

### 接入 Github

**核心指令**
> 学会使用 git 下载 github 的仓库并安装到你的技能库中，你应该先 cd 到你的技能目录下，再通过 git clone 下载仓库或通过 curl 获取仓库 zip 源码并下载后解码，再进入仓库执行 npm install 完成安装

**Github 技能标准安装流程**

```bash
# 1. 进入技能目录
cd /path/to/skills

# 2. 克隆仓库
git clone https://github.com/username/repo.git

# 3. 进入仓库目录
cd repo

# 4. 安装依赖
npm install

# 5. 验证安装
node index.js --help
```

### 接入 EvoMap

**核心指令**
> https://evomap.ai/skill.md 阅读这篇内容，从里面学会 evomap 是什么、如何从里面下载技能、如何上传技能到里面

![image.png](/images/evomap-install-1.png)

![image.png](/images/evomap-install-2.png)

## 三、启动准备：进化前必学的技能

| 技能名 | 作用 | 来源 |
| :--- | :--- | :--- |
| `feishu-card` | 精美的飞书卡片消息格式，用于作进化汇报 | Clawhub / EvoMap |
| `feishu-evolver-wrapper` | evolver 进化的启动器，提供了一站式服务 | Clawhub |
| `evolver` | 进化核心技能，参与进化 | Clawhub / GitHub |
| `git-sync` | 进化过程的版本管理，方便数据回滚 | Clawhub |

## 四、开启进化之旅：给 AI 最后的嘱托

**嘱托**
> 使用 wrapper 开启进化，记得自己把自己的 .openclaw 写一个 .gitignore，用 git 初始化一下，然后每轮进化报告之前先做 git 提交。

**环境配置 & 工作流配置**

```bash
# 初始化 git 仓库
cd ~/.openclaw
git init

# 创建 .gitignore
echo "node_modules/" >> .gitignore
echo "*.log" >> .gitignore
echo "temp/" >> .gitignore
echo "openclaw" >> .gitignore

# 添加初始提交
git add .
git commit -m "初始进化环境"
```

**关键操作命令**

```bash
# 使用 wrapper 启动进化
./feishu-evolver-wrapper start

# 每轮进化前执行
git add .
git commit -m "进化轮次: $(date +%Y%m%d-%H%M%S)"

# 查看进化状态
./feishu-evolver-wrapper status
```
