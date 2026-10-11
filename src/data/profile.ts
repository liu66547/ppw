/**
 * 个人信息与站点配置 —— 你要改的绝大多数文字都在这个文件里。
 * 改完保存，页面会自动刷新。
 *
 * 定位：这是「个人资料页」，不是求职落地页。
 * 所以不写"正在寻找 xx 岗位"这类时效性文案 —— 简历会换版本，网站长期复用。
 */

export const profile = {
  /** 姓名 */
  name: '刘德啉',
  /** 姓名英文/拼音（用于 <title> 和页脚） */
  nameEn: 'Liu Delin',

  /** 身份标签 */
  title: '自动化测试工程师',

  /** 一句话概述（首屏最重要的一句） */
  tagline: '能独立搭建接口 / UI 自动化测试框架，用工程化手段让测试结果可信。',

  /** 自我介绍（2-3 句，别写长） */
  intro:
    '软件工程本科在读（2027 届），目前大四。以 Java 为主力语言，独立完成接口自动化测试工程与 UI 自动化测试工程：' +
    '从分层架构设计、测试数据治理到 CI 流水线，全链路自己动手。' +
    '我关心的不只是"用例跑通"，而是"这个绿灯可不可信"。',

  /** 所在地 —— 显示在首屏和页脚 */
  location: {
    city: '深圳',
    district: '南山',
    /** 完整写法，用在一句话里 */
    full: '深圳南山',
  },

  /** 联系方式 */
  contact: {
    email: '2746167445@qq.com',
    github: 'https://github.com/liu66547',
    githubHandle: 'liu66547',
    gitee: 'https://gitee.com/liu66547',
    giteeHandle: 'liu66547',
    /** 简历 PDF 放在 public/ 目录下，这里写文件名即可 */
    resumeFile: '/刘德啉-自动化测试-简历.pdf',
  },

  /** 教育背景 */
  education: {
    school: '广州工商学院',
    major: '软件工程',
    degree: '本科',
    start: '2024.09',
    end: '2027.06',
    /** 当前年级，显示在首屏那行小字里 */
    year: '大四在读',
    note: '2027 届',
  },

  /**
   * 接口自动化项目的实测数据
   * 展示位置：项目板块的抬头（不是首屏 —— 数据属于项目）
   * 改数字前请确保是真的，面试官会问，而且你 README 里有对应记录。
   */
  stats: [
    { value: '21', suffix: '个', label: '接口全覆盖', note: '管理端 6 大模块' },
    { value: '35', suffix: '条', label: '自动化用例', note: '失败 0 条' },
    { value: '100', suffix: '%', label: '通过率 / 覆盖率', note: '接口与用例双 100%' },
    { value: '0', suffix: '', label: '数据残留', note: 'SQL 对账验证' },
  ],
} as const;

/**
 * 技术栈 —— 首屏下方的横向标签墙
 * 只放"我真的用过"的，别堆关键词。面试官会挑着问。
 */
export const techStack = {
  groups: [
    {
      label: '语言',
      items: ['Java', 'Python', 'SQL'],
    },
    {
      label: '接口测试',
      items: ['RestAssured', 'TestNG', 'Hamcrest', 'Postman'],
    },
    {
      label: 'UI 测试',
      items: ['Selenium WebDriver', 'Page Object', 'XPath / CSS'],
    },
    {
      label: '工程化',
      items: ['Maven', 'Git', 'Jenkins', 'Allure', 'Linux'],
    },
    {
      label: '数据与工具',
      items: ['MySQL', 'Navicat', 'Fiddler', 'JMeter', '禅道'],
    },
  ],
  /** 顺带一提的那些（了解层级，不单独占位） */
  also: ['Spring Boot', 'MyBatis', 'Redis', 'TCP/IP'],
} as const;

/**
 * 个人优势 —— 首屏下方「我为什么值得看」的四个理由
 *
 * ⚠️ 写法纪律：
 *   每条都必须能指向具体证据（项目里的某个设计 / 某个数字 / 某段代码）。
 *   空泛的"学习能力强""抗压能力好"在这里是负分。
 */
export const advantages = [
  {
    id: 'framework',
    title: '能独立搭框架，不是只会写脚本',
    summary: '从零设计四层架构，不是照着教程改',
    detail:
      '用例层 / 接口层 / 造数层 / 基础层职责分离，接口变更只需改 Api 类、用例零感知 —— ' +
      '这是「框架」和「一堆脚本」的分界线。',
  },
  {
    id: 'test-thinking',
    title: '关心绿灯可不可信，而不只是跑通',
    summary: '把「怎么防止用例假绿」写进了框架机制',
    detail:
      '双侧证据、契约型 vs 记录型断言、禁条件断言、禁裸字面量 —— ' +
      '这些规范不是停在文档里，而是变成了框架的硬约束。',
  },
  {
    id: 'data-governance',
    title: '测试数据自己造、自己清、自己能对账',
    summary: '执行后 SQL 对账验证零残留',
    detail:
      'zz_ 前缀 + 时间戳保证唯一，造数即注册、逆序清理内化依赖顺序；' +
      'clone 下来就能跑，不依赖任何环境预置数据。',
  },
  {
    id: 'defect-depth',
    title: '发现的不是「报错了」，是「为什么错」',
    summary: '能结合堆栈、日志、表结构定位到代码行',
    detail:
      '6 类可复现缺陷全部留存完整证据链（请求响应 + 后端堆栈 + SQL 实证）；' +
      '并且会先排除「经实验验明为正身」的设计特性，避免误报消耗团队信任。',
  },
] as const;

/** 站点级配置 */
export const site = {
  /** 部署后请把 astro.config.mjs 里的 SITE_URL 一起改掉 */
  url: 'https://len666.top',
  /** 浏览器标签页标题后缀 */
  titleSuffix: '刘德啉 · 自动化测试工程师',
  description:
    '刘德啉的个人资料页 —— 自动化测试工程师。展示接口自动化测试与 UI 自动化测试项目的架构设计、测试方法论与缺陷发现证据链。',
} as const;
