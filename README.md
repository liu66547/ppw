# 个人求职网站 · 刘德啉

2027 届自动化测试工程师的个人网站。展示接口自动化测试与 UI 自动化测试项目的
架构设计、测试方法论与缺陷发现证据链。

**技术栈**：Astro 5 + TypeScript + Tailwind CSS 4 → 输出纯静态站点

---

## 快速开始

### 方式一：双击脚本（推荐新手）

双击 `preview.ps1`，会自动装依赖、启动服务并打开浏览器。

### 方式二：命令行

```bash
npm install      # 首次运行，安装依赖
npm run dev      # 启动预览 → http://localhost:4321
```

其他命令：

```bash
npm run build    # 构建静态站点到 dist/
npm run preview  # 预览构建产物
npm run check    # 类型检查
```

---

## 怎么改内容

**所有文字都在 `src/` 下面，你不需要懂编程也能改。**

### 改个人信息（姓名、岗位、联系方式、核心数据）

打开 `src/data/profile.ts`，里面每个字段都有中文注释。

### 改技能与测试方法论

打开 `src/data/skills.ts`。

> ⚠️ 熟练度只有三档：`skill`（熟练）/ `familiar`（熟悉）/ `know`（了解）。
> 这个口径必须和简历一致 —— 网站写得比简历夸张，面试官一对比就减分。
> 每一项都有 `evidence` 字段说明「用它在哪个项目里做过什么」，这个比关键词列表有用得多。

### 加一个新项目

1. 在 `src/content/projects/` 下新建一个 `.md` 文件
2. 文件名就是网址，例如 `my-new-project.md` → `/projects/my-new-project`
3. 复制现有文件的开头部分（`---` 之间的 frontmatter），改成你的内容
4. 保存 —— **首页会自动多出一张卡片，不用改任何代码**

### 改配色 / 字体 / 圆角

打开 `src/styles/global.css`，改最上面 `@theme` 区块里的颜色变量，全站自动跟着变。

### 换简历 PDF

把新的 PDF 放进 `public/` 目录，然后改 `src/data/profile.ts` 里的
`contact.resumeFile` 指向新文件名（注意文件名要和实际文件完全一致）。

---

## 目录说明

```
src/
├── content/projects/   ★ 项目内容（每个项目一个 .md）
├── data/               ★ 个人信息、技能、方法论
├── styles/global.css   ★ 设计系统（配色、字体）
├── components/           页面区块（一般不用改）
├── layouts/              页面框架
└── pages/                路由
docs/                     项目文档
public/                   静态资源（简历 PDF、图标）
```

★ = 改内容主要动这些地方。

---

## 部署

推送到 GitHub 后，Vercel 会自动构建部署。详见 `docs/01-项目进度与环境说明.md`。

部署前记得把这三处的站点地址改成真实域名：

1. `astro.config.mjs` 的 `SITE_URL`
2. `src/data/profile.ts` 的 `site.url`
3. `public/robots.txt` 的 Sitemap 地址

---

## 文档

- `docs/00-方向确认书.md` —— 网站定位、栏目结构、技术选型理由
- `docs/01-项目进度与环境说明.md` —— 进度、环境限制、部署清单、决策记录
