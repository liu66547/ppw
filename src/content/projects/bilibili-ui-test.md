---
title: B 站 Web 端 · UI 自动化测试
summary: 基于 Selenium + TestNG 搭建 Page Object 分层框架，把「元素定位」和「用例意图」彻底拆开；用多定位符兜底 + 显式等待应对动态渲染，覆盖首页加载、关键词搜索、用户 Tab 与空结果态等核心流程，全量 3 条用例 100% 通过。
description: 以 B 站 Web 端为被测对象构建 UI 自动化工程。BasePage 统一封装「CSS 优先、XPath 兜底」的多定位符查找与显式等待，页面类只描述元素与行为，用例层只描述断言；失败自动截图接入 Allure，执行记录可从 TestNG 报告复核。
status: completed
period: '2026.09 – 2026.10'
role: 独立开发
order: 2
featured: true
tech:
  - Java
  - Selenium WebDriver
  - TestNG
  - Page Object
  - Allure
highlights:
  - value: 3 / 3
    label: 全量用例通过
  - value: 0
    label: 失败 / 跳过
  - value: 10.7s
    label: 全量执行耗时
  - value: 2 层
    label: 定位兜底策略
links:
  - label: GitHub
    href: https://github.com/liu66547
    icon: github
verdict:
  headline: 页面改版时只需要改定位层，用例层一行不动。
  points:
    - <strong>定位与断言彻底解耦</strong>：BasePage 收口所有元素查找，页面类只声明「有什么元素、能做什么」，用例层只写业务断言
    - <strong>多定位符兜底</strong>：CSS 优先、XPath 兜底，每一轮轮询都从第一个定位符重试，单个定位符失效不会拖垮整条等待
    - <strong>零 sleep</strong>：所有等待都走显式条件（元素可见 / 可点击 / URL 变化 / 新窗口句柄出现），不做固定时长硬等
    - <strong>结果可复核</strong>：失败自动截图接入 Allure，`testFailureIgnore=false` 保证「通过率」这个数字不被掩盖
evidence:
  - label: 执行结果
    detail: 全量 3 条用例、0 失败、0 跳过，耗时 10.7 秒（TestNG / Surefire 报告，见下方截图）
  - label: 框架分层
    detail: core（BasePage / BaseTest / DriverFactory / AllureListener）+ pages（页面对象）+ tests（用例）
  - label: 定位策略
    detail: BasePage#find 的多定位符轮询与异常重写，见「架构设计 · 元素查找」
  - label: 配置化
    detail: 浏览器 / 超时 / 测试数据全部走 config.properties，可用 -Dkey=value 临时覆盖
screenshots:
  - src: /projects/bilibili-testng-summary.png
    alt: TestNG 执行摘要：3 条用例全部通过，0 失败 0 跳过，总耗时约 10 秒
    caption: 全量执行摘要 —— 3 passed / 0 failed / 0 skipped，逐条用例耗时可见（首页 1.3s、搜索 2.5s、空结果态 3.4s）
    group: 执行结果
  - src: /projects/bilibili-testng-report.png
    alt: TestNG 报告总览页，显示 3 methods, 3 passed
    caption: TestNG 报告总览：单个 suite、3 个方法全部通过
    group: 执行结果
---

## 项目背景

**被测系统**：B 站 Web 端（动态渲染的现代前端应用，且搜索结果会在新窗口打开）。

**要解决的问题**：UI 自动化最容易烂在两件事上 ——

1. **页面改版就全崩**：定位写死在用例里，页面一改，所有用例一起红；
2. **动态渲染带来的假失败**：元素还没渲染就去点，报错但其实是等待策略没写对。

所以这个项目的重点不在"覆盖多少条用例"，而在**把定位与用例解耦**、**把等待做成框架能力**，
让用例数量增长时不会同时带来维护成本的增长。

## 技术栈

| 类别 | 选型 | 说明 |
| --- | --- | --- |
| 语言 / 运行时 | Java 21 | `maven.compiler.release=21`，用 `release` 而非 `source/target`，会同时校验 API 可用性 |
| 浏览器驱动 | Selenium WebDriver 4.51 | 官方 Java 封装，含 Selenium Manager |
| 驱动匹配 | WebDriverManager 6.4 | 按浏览器版本自动匹配 driver，双保险 |
| 测试框架 | TestNG 7.12 | 套件、分组、监听器、`testng.xml` 指挥中心 |
| 设计模式 | Page Object | 定位与用例解耦的核心手段 |
| 测试报告 | Allure 2.35 + allure-maven | 依赖版本刻意与本机 Allure CLI 2.46 对齐，保证结果目录能被直接渲染 |
| 构建 | Maven + Surefire 3.5 | `testFailureIgnore=false`，红叉不被掩盖 |
| 日志 | SLF4J 2.0 | 门面 + 简单实现，后续可换 logback 而不动业务代码 |

## 架构设计

三层结构，职责边界很清楚：

```text
src/test/java/com/autotest
├── common/ConfigReader         # 配置读取：-D 参数 > config.properties > 代码默认值
├── core/
│   ├── DriverFactory           # 驱动创建 / 销毁、窗口与超时设置
│   ├── BasePage                # 元素查找、显式等待、新窗口切换、计数
│   ├── BaseTest                # @BeforeMethod 建驱动 / @AfterMethod 必关驱动
│   └── AllureListener          # 失败自动截图并附到 Allure 报告
├── pages/
│   ├── BilibiliHomePage        # 首页：打开、搜索、是否加载完成
│   └── BilibiliSearchPage      # 搜索页：Tab 切换、空结果态、用户卡片计数
└── tests/
    ├── HomeTest
    ├── SearchTest
    └── SearchNegativeTest
```

### 元素查找：多定位符兜底

`BasePage#find(By...)` 是整个框架最核心的一段，它同时解决四个问题：

1. **CSS 优先、XPath 兜底** —— 每次轮询都从第一个定位符重新试，不记住"上次是谁失败的"，
   因为页面是动态的，某个定位符可能这一轮没渲染出来、下一轮就有了；
2. **过滤不可见元素** —— 遍历结果找第一个 `isDisplayed()` 的，而不是直接取 `get(0)`：
   DOM 里可能有隐藏的同名节点（模板、占位），第一个不一定可见；
3. **单个定位符出错不影响整体** —— 按定位符 catch `InvalidSelector / NoSuchElement / StaleElement`，
   继续试下一个，这才叫兜底；
4. **超时信息可读** —— 重写 `TimeoutException`，把这次依次尝试过的定位符全部打印出来，
   否则 lambda 条件下只会看到一串 lambda 地址，根本不知道是哪个定位符挂了。

### 等待策略

全项目**没有一处固定 sleep**，等待全部是显式条件：

- 元素可见 / 可点击 —— `visibilityOfElementLocated`、`elementToBeClickable`
- URL 变化 —— 用户 Tab 点击后轮询 `getCurrentUrl().contains("/upuser")`
- 新窗口出现 —— 搜索会在新窗口打开结果页，先记下句柄集合，再等"多出来的那个句柄"出现

等待上限由 `explicit.timeout=15` 秒统一控制，改配置不改代码。

### 用例隔离

`BaseTest` 用 `@BeforeMethod` 建驱动、`@AfterMethod(alwaysRun = true)` 关驱动 ——
每条用例一个干净浏览器会话，且**失败时也一定会关闭**，避免残留进程拖垮后续用例。

## 用例覆盖

当前 3 条核心用例，覆盖「页面能打开 → 核心交互能用 → 异常输入有正确反馈」这条主干：

| 用例 | 验证点 | 耗时 |
| --- | --- | --- |
| `homePageShouldLoad` | 首页「番剧」频道入口可见，且 URL 落在 bilibili.com 域内 | 1.34s |
| `searchShouldLoadSearchPage` | 首页输入关键词回车 → 自动切到搜索结果新窗口 → 结果页 Tab 栏渲染完成 | 2.46s |
| `searchShouldShowEmptyStateForUserTab` | 用乱码关键词搜索 → 切到「用户」Tab → URL 含 `/upuser`、出现空状态提示、**用户卡片数为 0** | 3.37s |

第三条是阴性用例：它验证的不是"能搜到"，而是**搜不到的时候界面给了正确的反馈**。
阳性用例证明功能可用，阴性用例才证明"没结果"和"坏了"是两件不同的事。

## 执行结果

最近一次全量执行（2026-10-30）：

```text
Tests run: 3, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 10.69 s
```

Allure 侧同步产出 3 条 `passed` 结果，失败截图机制在这个前提下保持待命 ——
它只有在真的失败时才会留下现场，所以成功跑批时报告里是干净的。

## 设计取舍

- **为什么用例范围限定在免登录流程**：B 站登录有风控（滑块 + 设备校验），
  把登录写进用例会让整个套件的稳定性依赖第三方风控策略，
  所以主流程刻意避开登录，换取"任何时候跑都能过"。
- **为什么 Allure 停在 2.x**：本机 Allure CLI 是 2.46，Allure 3 换了报告生成架构，
  2.x 的结果目录不能被 3.x 直接渲染 —— 依赖版本要和本机工具链对齐，而不是和官网最新对齐。
- **为什么并行度先设为串行**：并行会放大 driver 共享、截图、窗口句柄互相干扰的问题，
  等用例本身稳定后再开并行才有意义。

## 项目声明

本项目为**个人独立项目**：框架设计、编码实现、用例编写与执行验证均由本人独立完成。
被测站点为公开的 B 站 Web 端，仅用于个人技术练习，不涉及任何非公开接口或数据。
