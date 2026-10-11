import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 项目集合
 * ─────────────────────────────────────────────────────────────
 * 加一个新项目 = 在 src/content/projects/ 下新建一个 .md 文件。
 * 文件名就是网址：xzs-api-test.md  →  /projects/xzs-api-test
 * 不需要改任何代码，首页会自动多出一张卡片。
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    /** 项目名称 */
    title: z.string(),
    /** 一句话概括，显示在卡片上 */
    summary: z.string(),
    /** 卡片和详情页顶部的简介（可以比 summary 长一点） */
    description: z.string(),

    /** 项目状态：'completed' 已完成 | 'in-progress' 进行中 */
    status: z.enum(['completed', 'in-progress']).default('completed'),
    statusNote: z.string().optional(),

    /**
     * 时间范围。先按你确认的真实时间填，字符串格式随意但建议统一：
     * '2026.07 – 2026.09'
     */
    period: z.string(),

    /** 你的角色 */
    role: z.string().default('独立开发'),

    /** 技术栈标签，显示成一排小徽章 */
    tech: z.array(z.string()).default([]),

    /** 卡片上最亮眼的 3-4 个数字 */
    highlights: z
      .array(
        z.object({
          // 写 0 或 '0' 都可以，这里统一转成字符串，避免 YAML 把数字解析成 number 导致校验失败
          value: z.union([z.string(), z.number()]).transform(String),
          label: z.string(),
        }),
      )
      .default([]),

    /** 仓库 / 在线预览链接 */
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.string().url(),
          icon: z.enum(['github', 'gitee', 'external', 'report', 'video']).default('external'),
        }),
      )
      .default([]),

    /** 排序权重，数字越小越靠前 */
    order: z.number().default(99),

    /** 是否在首页展示 */
    featured: z.boolean().default(true),

    /**
     * 项目截图 —— 这是最有说服力的部分，强烈建议放。
     *
     * 图片放在 public/projects/ 目录下，src 写以 / 开头的绝对路径：
     *   src: '/projects/allure-report.png'
     *
     * group 用来给截图分组，同一组的会显示成一个小标题下的连续图集。
     * 建议分组：'测试报告' / '持续集成' / '缺陷证据' / '代码结构'
     */
    screenshots: z
      .array(
        z.object({
          src: z.string(),
          /** 图片说明（必填）—— 无人值守的截图对面试官没有价值 */
          alt: z.string(),
          /** 图注，显示在图片下方，可以写"这张图说明了什么" */
          caption: z.string().optional(),
          group: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = { projects };
