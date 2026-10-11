---
title: 学之思考试系统 · 接口自动化测试
summary: 独立设计并实现「用例层 – 接口层 – 造数层 – 基础层」四层架构的接口自动化测试框架，覆盖管理端 6 大模块 21 个接口、沉淀 35 条用例，用例通过率与接口覆盖率均达 100%。
description: 以开源考试系统「学之思」管理端为被测对象，基于 Java + RestAssured + TestNG 构建接口自动化测试工程，实现测试数据全链路自造、执行后零残留，并配套 Allure 报告与 Jenkins 持续集成。
status: completed
period: '2026.07 – 2026.09'
role: 独立开发
order: 1
featured: true
tech:
  - Java 8
  - Maven
  - TestNG
  - RestAssured
  - Hamcrest
  - Allure
  - Jenkins
  - MySQL
highlights:
  - value: '21 / 21'
    label: 接口覆盖率 100%
  - value: '35'
    label: 用例数（失败 0）
  - value: '0'
    label: 数据残留（SQL 对账）
  - value: '6'
    label: 类可复现缺陷
links:
  - label: GitHub
    href: https://github.com/liu66547/xzs-api-test
    icon: github
  - label: Gitee
    href: https://gitee.com/liu66547/xzs-api-test
    icon: gitee
screenshots:
  - src: /projects/allure-report.jpg
    alt: Allure 测试报告总览页，35 条用例全部通过，通过率 100%
    caption: Allure Overview —— 35 条用例、100% 通过率，右侧是跨 20 次构建的趋势图。Executor 显示 Jenkins，说明这是 CI 自动执行的结果而不是本地手动跑的。
    group: 测试报告

  - src: /projects/allure-behaviors.jpg
    alt: Allure Behaviors 页，用例按业务模块分层组织并标注通过数量
    caption: Behaviors 视图 —— 用例按「任务 / 学科 / 登录 / 试卷 / 题目」五个业务模块分层，每层标注通过数。这样失败时能直接定位到具体业务模块，而不是在一堆用例名里翻找。
    group: 测试报告

  - src: /projects/jenkins-dashboard.jpg
    alt: 'Jenkins 项目主页，显示 Allure 历史趋势图与第 14 到第 20 次构建的历史'
    caption: 'Jenkins 流水线 —— Allure 历史趋势 + 构建记录。可以看到第 17、18 次构建红色（失败），随后第 19、20 次恢复绿色，说明失败告警和修复闭环是真实跑通的。'
    group: 持续集成

  - src: /projects/jenkins-email-alerts.png
    alt: Jenkins 构建失败与恢复的邮件通知记录
    caption: '邮件告警 —— 第 17 次构建 Failure 发出告警，第 19 次恢复后发出 Fixed 通知（状态未变化时不打扰）。这是 Jenkinsfile 里通知逻辑的实际效果。'
    group: 持续集成

  - src: /projects/project-structure.jpg
    alt: IDE 中的项目目录结构，展示四层分层的包组织
    caption: 四层架构在代码里的样子 —— api / common / data / test 四个包职责分离。接口层一个类对应一个模块，接口变更只需改这里，用例层零感知。
    group: 代码结构
---

## 项目背景

**被测系统**：学之思开源考试系统（xzs）—— 基于 Spring Boot 的在线考试系统，含管理端与学生端。

**测试范围**：管理端 REST API，6 个模块、21 个接口 —— 登录 / 登出、学科、题目、任务、试卷、答卷。

**要解决的问题**：接口自动化最常见的失败模式不是"跑不起来"，而是**跑绿了但什么都没测到**。数据依赖环境预置、断言写死期望值、执行完留下一地脏数据 —— 这样的用例越多，可信度反而越低。

所以这个项目的目标不是"把 21 个接口跑一遍"，而是**建立一套让绿灯可信的机制**。

> **核心成果**：环境依赖 0（测试数据由用例现场自造，clone 后可直接运行），数据残留 0（全套执行后 `zz_%` 前缀 SQL 对账为空）。

## 技术栈

| 类别 | 选型 |
| --- | --- |
| 语言 / 构建 | Java 8 / Maven |
| 测试框架 | TestNG |
| 接口调用 | RestAssured |
| 断言 | Hamcrest |
| 测试报告 | Allure 2 + Surefire |
| 持续集成 | Jenkins（Declarative Pipeline） |
| 版本管理 | Git（GitHub / Gitee 双托管） |

## 架构设计

**四层分层，职责单一：**

| 分层 | 核心类 | 职责 |
| --- | --- | --- |
| 用例层 | `XxxTest` | 测试意图：造数 → 调用 → 断言 → 清理注册 |
| 接口层 | `XxxApi` | HTTP 封装：路径 / 参数 / 请求发送 |
| 造数层 | `CreateData` | 数据工厂：`subject → question → paper → task` 逐级组合 |
| 基础层 | `RequestUtil` / `SessionManager` / `CleanupRegistry` | 会话管理、请求公共处理、栈式清理、登录态前置 |

```text
xzs-api-test/
├── pom.xml
├── testng.xml                     # 测试套件（按类并行）
├── Jenkinsfile                    # Jenkins 流水线定义
└── src/test/
    ├── resources/
    │   ├── config.properties      # base.uri、admin 账号密码
    │   └── allure.properties
    └── java/com/xzs/
        ├── api/                   # 接口封装层，一个类对应一个模块
        │   ├── LoginApi / SubjectApi / QuestionApi
        │   └── TaskApi / PaperApi / ExamPaperAnswerApi
        ├── common/
        │   ├── ConfigReader       # 读取配置文件
        │   ├── SessionManager     # 登录态管理（ThreadLocal 存 JSESSIONID）
        │   ├── RequestUtil        # 请求公共处理
        │   └── CleanupRegistry    # 清理注册表（栈式逆序清理）
        ├── data/
        │   └── CreateData         # 测试数据工厂：造学科 / 题目 / 试卷 / 任务
        └── test/                  # 测试用例
            ├── BaseTest / PreLoginInBaseTest
            ├── LoginTest / LogoutTest
            ├── SubjectTest / QuestionTest
            └── TaskTest / PaperTest
```

**四个关键设计决策：**

1. **接口层与用例层解耦** —— 接口变更只需修改 `Api` 类，用例零感知。这是"框架"和"一堆脚本"的分界线。

2. **`CleanupRegistry` 栈式清理** —— 按"造数即注册"顺序入栈，`@AfterMethod / @AfterClass` 逆序执行。
   天然满足"下游先删、上游后删"的依赖顺序：**把规则内化进数据结构，而不是要求每个人记住规则**。

3. **造数链自给自足** —— `CreateData` 支持 `subject → question → paper → task` 逐级组合，
   已消除对任何环境预置数据的依赖。例如 task 用例现场自造"学科 → 题目 → 试卷 → 任务"全链。

4. **参数化环境** —— `base.uri` 通过 `-Dbase.uri=` 注入，本地 / 测试 / 预发一键切换，一套用例多环境执行。

## 接口覆盖矩阵（21 / 21）

| 模块 | 接口数 | 覆盖 | 重点场景 |
| --- | --- | --- | --- |
| 登录 / 登出 | 2 | ✅ | 会话保持、登录态前置 |
| 学科 subject | 5 | ✅ | 增删改查、分页过滤、删除可见性 |
| 题目 question | 4 | ✅ | 题型分支与校验差异、分页过滤、编辑字段可变性 |
| 任务 task | 4 | ✅ | 分页过滤、引用 + 派生结构、换试卷编辑 |
| 试卷 exam/paper | 5 | ✅ | 嵌套组卷（`titleItems → questionItems`）、任务选卷查询 |
| 答卷 examPaperAnswer | 1 | ✅（结构级） | 连通性 + 空集契约 |
| **合计** | **21** | **100%** | — |

> 答卷模块为结构级覆盖：答卷数据由学生端"考试提交"流程产生，管理端无造数通道。
> 后续可扩展学生端"开考 → 交卷 → 成绩"全流程用例。

## 测试设计原则

这部分是本项目真正的产出 —— 规范写进了框架机制，而不是停在文档里。

- **过滤验证黄金法则**：每个过滤条件必须给出"阳性（该来的来了）+ 阴性（不该来的没来）"双侧证据。
  只验证一侧的用例，本质上什么都没证明。

- **契约型 vs 记录型断言**：主键唯一查询断言"恰好一条"（契约型）；对系统数据现状（如答卷表为空）
  采用记录型断言锁定现状 —— 现状变化即产生告警，而不是假装它是契约。

- **同通道对照**：删除 / 编辑前后的对照必须走同一查询通道、同一参数口径，避免口径差异导致假绿。

- **禁止条件断言**：断言不允许藏在不被验证的 `if` 条件里 —— 前提破坏时用例会静默通过。

- **禁裸字面量**：断言中的期望值必须来自变量或本用例刚造的数据，杜绝与环境数据巧合耦合。

- **数据治理规范**：测试数据统一 `zz_` 前缀 + 时间戳保证唯一；
  执行后以 SQL 对账（`zz_%` 且 `deleted=0` 应为空）验收清理效果。

## 缺陷与系统级发现

> 全部发现均经可复现实验确认，请求 / 响应、后端异常堆栈、SQL 日志已留存证据。

### 缺陷候选（可复现）

| # | 描述 | 证据 |
| --- | --- | --- |
| 1 | 编辑不存在的资源，错误处理三极不一致：学科编辑静默返回"成功"；试卷编辑直接 NPE 500；无明确业务错误码 | 实测 + 后端堆栈 |
| 2 | 引用完整性校验缺失，异常延迟到"使用点"以 500 崩溃：任务引用不存在的试卷、试卷引用不存在的题目 / 学科等 | 4 组堆栈（如 `savePaperFromVM:105`、`levelBySubjectId:47` NPE） |
| 3 | 关键枚举 / 值域零校验：`questionType=999`、`gradeLevel=999` 等非法值静默入库 | 实测 |
| 4 | 同类字段空值校验不一致：多选题 `items` 为空 → 500 兜底；单选题 `items` 为空 → 接受 | 对照实测 |
| 5 | 删除后文本内容表（`t_text_content`）残留孤儿数据 | SQL 实证 |
| 6 | 错误信息质量三级并存：字段级精准 501 / 框架级 500 / 静默成功 —— 同一系统三张脸 | 全程采集 |

### 系统级一致性观察

1. **"已删过滤"三层不统一**：分页查询过滤已删；按 id 查询（`select`）不过滤已删；联表读取不过滤已删
   （软删试卷仍可被任务引用并读回）。学科 / 题目 / 任务 / 试卷四模块均复现。
2. **请求 / 响应共用 DTO**：响应中的只读派生字段（如任务 `paperItems.name`、`frameTextContentId`）
   在契约上表现为"可填"，实际写入被忽略。
3. **主键查询 SQL 不带 `deleted` 过滤**（`selectByPrimaryKey` 系列）。

### 设计特性确认（经实验验明为正身，避免误报）

发现不等于缺陷。以下是我**验证后排除**的项 —— 先把它们排除掉，才能让真正的缺陷报告有分量：

- **引用 + 派生结构家族**：`paperItems` / `questionItems` 中唯一有效字段为 `id`，其余字段读时联表派生；
- **可变性图谱**：question 的 `questionType` / `gradeLevel` 不可改（静默忽略），`title` / `subjectId` / `correct` 可改；
  paper 全字段可改（含换学科并重算 level、换题）；task 可换试卷；
- **写时类型宽容**：score 传数字 / 字符串均可；
- **软删数据可被引用**：如题目可引用软删学科。

### 值得肯定的设计

如实记录系统做得好的地方，也是测试报告的一部分：

- **501 字段级校验文案精确到字段路径**（如 `titleItems[0].questionItems[0].score : 不能为空`）—— 错误信息标杆；
- **事务兜底**：编辑中途异常自动回滚，不留半截脏数据；
- **分页输出结构全站统一**（MyBatis 分页插件），空集形状一致。

## 如何运行

**前置条件**：JDK 8+、Maven 3.x、本地已启动的 xzs 服务（默认 `http://localhost:8000`）及 MySQL。

```bash
# 全量执行（默认 base.uri = http://localhost:8000）
mvn clean test

# 指定被测环境
mvn clean test -Dbase.uri=http://test.example.com:8000

# 单模块执行
mvn test -Dtest=TaskTest

# 查看 Allure 报告
allure serve target/allure-results
```

**数据对账**（执行后应全部为 0 行）：

```sql
SELECT id FROM t_subject    WHERE name  LIKE 'zz_%' AND deleted = 0;
SELECT id FROM t_question   WHERE title LIKE 'zz_%' AND deleted = 0;
SELECT id FROM t_exam_paper WHERE name  LIKE 'zz_%' AND deleted = 0;
SELECT id FROM t_task_exam  WHERE title LIKE 'zz_%' AND deleted = 0;
```

## 持续集成与测试报告

**Jenkins Declarative Pipeline**（仓库根目录 `Jenkinsfile`）：

- **参数化构建**：`BASE_URI` 下拉多环境选择（本地 / 测试 / 预发），一套用例多环境执行；
- **触发策略**：SCM 轮询（每小时）+ 夜间定时构建（每日）；
- **构建与测试**：`mvn clean test -Dbase.uri=${BASE_URI}`；
- **报告归档**：JUnit 结果（Surefire XML）与 Allure 报告自动发布；
  Allure 报告同时打包为构建工件（`allure-report.zip`）可直接下载；
- **通知**：构建失败发送告警邮件；由失败恢复正常时发送恢复通知（状态未变化不打扰）。

> **最近构建**：#20 全绿 —— 35 条用例 0 失败，Allure Report 与 Tests 结果页均已归档。

**Allure 报告**：按 Epic / Feature / Story 分层组织，标注 Severity。

## 已知限制与后续规划

1. **答卷模块为结构级覆盖** —— 管理端无造数通道，后续扩展学生端"开考 → 交卷 → 成绩"全流程用例；
2. **CI 运行形态** —— 当前 Jenkins 与被测服务均为本地 / 内网环境，后续规划将被测服务容器化
   （Docker Compose），实现任意环境一键全链路回归；
3. **后续方向** —— 业务流联动用例（一条流程串联多接口）、被测服务日志自动关联到测试报告。

## 项目声明

本项目为**个人独立项目**，全部架构设计、编码实现、用例执行、缺陷发现与文档撰写均由本人独立完成，无其他协作成员。

关于 AI 工具的使用：本文档依据作者在测试过程中沉淀的缺陷发现与复盘记录整理成文，部分行文经 AI 工具辅助润色；
**测试代码、缺陷定位、实验数据、缺陷证据与结论均来源于本人的实际测试过程。**
