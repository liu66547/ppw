/**
 * 专业技能与测试方法论
 *
 * ─────────────────────────────────────────────────────────────
 * ⚠️ 措辞纪律（很重要，别乱改）：
 *   level 只能是 'skill' | 'familiar' | 'know' 三档，对应简历口径的「熟练 / 熟悉 / 了解」。
 *   网站上写得比简历夸张，面试官一对比就减分。宁可保守，被追问时答得上来。
 * ─────────────────────────────────────────────────────────────
 *
 * 卡片是「三段式」结构，和参考站的做法一致：
 *   ① 图标 + 分组名      —— 视觉锚点，一眼区分是哪个领域
 *   ② summary 一句话      —— 这个领域我能做到什么
 *   ③ items 技能明细      —— 具体能力 + 在哪用过（evidence）
 *   ④ tags 底部能力标签行 —— 扫一眼就抓住的关键词
 */

export type SkillLevel = 'skill' | 'familiar' | 'know';

export const levelLabel: Record<SkillLevel, string> = {
  skill: '熟练',
  familiar: '熟悉',
  know: '了解',
};

export const skillGroups = [
  {
    id: 'api',
    name: '接口自动化测试',
    core: true, // core = 主打能力，卡片用强调边框
    summary: '能独立设计并搭建可维护的接口自动化框架，而不是写一堆脚本',
    tags: ['RestAssured', 'TestNG', 'Hamcrest', 'HTTP', '会话管理', '断言体系'],
    items: [
      {
        name: 'RestAssured + TestNG + Hamcrest',
        level: 'skill' as SkillLevel,
        evidence: '独立设计并搭建四层架构接口自动化框架，覆盖 21 个接口、35 条用例',
      },
      {
        name: 'HTTP 协议与 RESTful 接口测试',
        level: 'familiar' as SkillLevel,
        evidence: '熟悉状态码语义、请求/响应结构、会话管理（ThreadLocal 隔离实践）',
      },
      {
        name: '测试数据治理与断言体系设计',
        level: 'familiar' as SkillLevel,
        evidence: '制定双侧证据、契约型/记录型断言规范，从机制上防止用例假绿',
      },
    ],
  },
  {
    id: 'ui',
    name: 'UI 自动化测试',
    core: true,
    summary: '让 UI 用例在页面改版后不用重写，而不是靠加 sleep 硬扛',
    tags: ['Selenium', 'Page Object', 'XPath / CSS', '显式等待', '失败截图'],
    items: [
      {
        name: 'Selenium WebDriver',
        level: 'familiar' as SkillLevel,
        evidence: '基于 Selenium + TestNG 搭建 Page Object 分层框架，实现用例与页面元素解耦',
      },
      {
        name: '元素定位（XPath / CSS）与显式等待',
        level: 'familiar' as SkillLevel,
        evidence: '针对动态渲染与登录风控，采用「显式等待 + CSS 优先 XPath 兜底」策略',
      },
      {
        name: 'Page Object 设计模式',
        level: 'familiar' as SkillLevel,
        evidence: 'BasePage 统一封装元素定位、显式等待与常用操作，页面改版仅需维护定位层',
      },
    ],
  },
  {
    id: 'engineering',
    name: '测试工程化',
    core: true,
    summary: '能独立把测试接进 CI，让结果自动产出、失败自动告警',
    tags: ['Maven', 'Git', 'Jenkins', 'Allure', 'Linux', 'CI/CD'],
    items: [
      {
        name: 'Maven / Git',
        level: 'familiar' as SkillLevel,
        evidence: '多模块依赖管理、参数化构建；Git 分支与仓库管理（GitHub / Gitee 双托管）',
      },
      {
        name: 'Jenkins（Declarative Pipeline）',
        level: 'familiar' as SkillLevel,
        evidence: '独立搭建 CI 流水线：参数化多环境构建、定时回归、报告归档、失败邮件告警',
      },
      {
        name: 'Allure 测试报告',
        level: 'familiar' as SkillLevel,
        evidence: '按 Epic / Feature / Story 分层组织，标注 Severity；失败自动截图接入报告',
      },
      {
        name: 'Linux 常用命令',
        level: 'familiar' as SkillLevel,
        evidence: '可完成服务状态排查与环境验证',
      },
    ],
  },
  {
    id: 'test-design',
    name: '测试设计与流程',
    core: true,
    summary: '能判断"测到位了没有"，而不是只报告"跑通了"',
    tags: ['等价类', '边界值', '场景法', '接口分层设计', '缺陷跟踪', '缺陷定位'],
    items: [
      {
        name: '用例设计方法',
        level: 'skill' as SkillLevel,
        evidence: '等价类、边界值、场景法；接口分层测试设计',
      },
      {
        name: '缺陷管理与跟踪流程',
        level: 'familiar' as SkillLevel,
        evidence: '熟悉禅道用例管理与缺陷跟踪流程，产出可复现证据链',
      },
      {
        name: '缺陷定位（黑盒 + 白盒辅助）',
        level: 'familiar' as SkillLevel,
        evidence: '结合后端日志、异常堆栈与表结构辅助定位，发现 6 类可复现缺陷',
      },
    ],
  },
  {
    id: 'database',
    name: '数据库与缓存',
    core: false,
    summary: '能自己写查询验证数据，并用执行计划看性能',
    tags: ['MySQL', 'SQL', 'EXPLAIN', '事务', '索引', 'Redis'],
    items: [
      {
        name: 'MySQL（Navicat）',
        level: 'skill' as SkillLevel,
        evidence: 'SQL 编写、多表关联查询、执行后数据对账验证',
      },
      {
        name: 'EXPLAIN 执行计划分析',
        level: 'familiar' as SkillLevel,
        evidence: '理解事务与索引原理，可通过执行计划分析查询性能',
      },
      {
        name: 'Redis',
        level: 'know' as SkillLevel,
        evidence: '了解常用数据类型与缓存应用场景',
      },
    ],
  },
  {
    id: 'language',
    name: '编程语言',
    core: false,
    summary: 'Java 为主力，能独立开发测试框架与工具类',
    tags: ['Java', '面向对象', '多线程', 'ThreadLocal', 'Python'],
    items: [
      {
        name: 'Java',
        level: 'skill' as SkillLevel,
        evidence: '主力语言；面向对象编程，可独立开发测试框架与工具类',
      },
      {
        name: '多线程基础',
        level: 'familiar' as SkillLevel,
        evidence: '熟悉线程安全与 ThreadLocal（已用于框架会话隔离实践）',
      },
      {
        name: 'Python',
        level: 'know' as SkillLevel,
        evidence: '熟悉基础语法，可编写脚本辅助测试',
      },
    ],
  },
  {
    id: 'tools',
    name: '测试工具',
    core: false,
    summary: '接口调试、抓包分析与性能测试的日常工具',
    tags: ['Postman', 'Fiddler', 'JMeter', '禅道'],
    items: [
      {
        name: 'Postman',
        level: 'skill' as SkillLevel,
        evidence: '接口调试与集合管理',
      },
      {
        name: 'Fiddler',
        level: 'familiar' as SkillLevel,
        evidence: '抓包分析请求 / 响应',
      },
      {
        name: 'JMeter',
        level: 'know' as SkillLevel,
        evidence: '了解基础使用',
      },
    ],
  },
  {
    id: 'backend',
    name: '后端与网络',
    core: false,
    summary: '能读后端源码辅助定位缺陷，理解请求在链路上怎么走',
    tags: ['Spring Boot', 'MyBatis', 'IoC / AOP', 'TCP/IP', 'AI 工具'],
    items: [
      {
        name: 'Spring / Spring Boot / MyBatis',
        level: 'know' as SkillLevel,
        evidence: '了解 IoC / AOP 设计思想，可通过阅读后端源码辅助定位缺陷',
      },
      {
        name: 'TCP/IP 基础网络协议',
        level: 'know' as SkillLevel,
        evidence: '了解基础网络协议原理',
      },
      {
        name: 'AI 工程能力',
        level: 'familiar' as SkillLevel,
        evidence: '熟练运用大模型工具辅助用例设计、缺陷日志分析与文档整理；了解大模型应用测试要点',
      },
    ],
  },
] as const;

/**
 * 测试方法论 —— 六条核心实践
 *
 * 这是区别于其他候选人的核心资产，所以每一条都对应项目里的真实实践，
 * 不是空话。这些内容原本在首页有一个独立板块，现在收进项目详情页的
 * 「测试设计原则」一节（那里有完整的上下文）。留在这里供后续复用。
 */
export const principles = [
  {
    id: 'dual-evidence',
    title: '过滤验证双侧证据',
    summary: '每个过滤条件都要给出阳性 + 阴性两侧证据',
    detail:
      '阳性：该来的确实来了；阴性：不该来的确实没来。只验证一侧的用例，本质上什么都没证明。',
  },
  {
    id: 'assertion-type',
    title: '契约型 vs 记录型断言',
    summary: '分清楚"断言契约"和"锁定现状"',
    detail:
      '主键唯一查询断言"恰好一条"，这是契约；对系统数据现状（如答卷表为空）采用记录型断言锁定现状，' +
      '现状一旦变化立即告警——而不是假装它是契约。',
  },
  {
    id: 'no-conditional-assert',
    title: '禁条件断言 · 禁裸字面量',
    summary: '断言不许藏在 if 里，期望值不许写死',
    detail:
      '断言藏在不被验证的 if 条件里，前提一破坏用例就静默通过；断言中的期望值必须来自变量或本用例刚造的数据，' +
      '杜绝与环境数据巧合耦合产生的假绿。',
  },
  {
    id: 'data-governance',
    title: '数据自造 · 对账零残留',
    summary: '测试数据现场造，执行后 SQL 对账验收',
    detail:
      '统一 zz_ 前缀 + 时间戳保证唯一，栈式清理按"造数即注册、逆序清理"内化依赖顺序；' +
      '执行后以 SQL 对账（zz_% 且 deleted=0 应为空）验收清理效果，不依赖环境预置数据，clone 即可运行。',
  },
  {
    id: 'same-channel',
    title: '同通道对照',
    summary: '删除 / 编辑前后的对照必须走同一查询通道',
    detail:
      '同一参数口径、同一接口，避免口径差异导致的假绿——看起来验证了，其实比较的是两个不同的东西。',
  },
  {
    id: 'qualitative',
    title: '异常定性分级',
    summary: '发现不等于缺陷，先分清是什么',
    detail:
      '对异常完成定性分级：缺陷候选 / 系统级一致性观察 / 设计特性确认。' +
      '先把"经实验验明为正身"的设计特性排除掉，避免误报消耗团队信任。',
  },
] as const;
