# 部署到阿里云 OSS（香港节点）

> 为什么不用 Vercel：`*.vercel.app` 域名在中国大陆被阻断 ——
> 关掉加速器访问会直接 `ERR_CONNECTION_TIMED_OUT`。目标受众在国内，必须换。
>
> 为什么选香港节点：内地节点**必须 ICP 备案**（而备案还要先买国内服务器）；
> 香港节点**无需备案**，国内访问延迟远低于美国，且不会被墙。

---

## 一、当前状态核对

| 项 | 状态 |
| --- | --- |
| OSS Bucket | ✅ 已创建：`hk-len-ppw` |
| 地域 | ✅ 中国香港 |
| 存储类型 | ✅ 标准存储 |
| 读写权限 | ✅ 公共读 |
| 静态网站托管 | ⏳ 待开启 |
| 自定义域名绑定 | ⏳ 待配置 |
| HTTPS 证书 | ⏳ 待配置 |

---

## 二、Step 1：开启静态网站托管

OSS 控制台 → 进入 `hk-len-ppw` → 左侧 **数据管理** → **静态页面** → 点 **设置**

| 配置项 | 填什么 |
| --- | --- |
| 默认首页 | `index.html` |
| 默认 404 页 | `404.html` |
| 子目录首页 | **勾选开通** |

> ⚠️ **「子目录首页」必须勾**。
> 本站的网址是目录形式（`/projects/xzs-api-test/`），
> 不开这项时 OSS 找不到 `/projects/xzs-api-test/index.html`，详情页会 404。

---

## 三、Step 2：上传文件

**不需要安装任何工具。** OSS 控制台自带上传功能，
而且[官方文档](https://www.alibabacloud.com/help/zh/oss/how-to-upload-directories-to-and-download-directories-from-oss)明确说明：
**上传时直接把文件夹拖拽到上传区域，会保留文件夹结构。**

### 操作步骤

1. 进入 `hk-len-ppw` → 左侧 **文件管理** → **文件列表**
2. 点 **上传文件**，弹出上传面板
3. **先解压 `oss-upload.zip`**，然后按下面拖进去：

   | 内容 | 怎么传 |
   | --- | --- |
   | `index.html` / `404.html` / `favicon.svg` / `robots.txt` / `sitemap.xml` / `resume.pdf` | 全选后直接拖进上传区域 |
   | `_astro` 文件夹 | **直接拖进去**（结构会保留） |
   | `projects` 文件夹 | **直接拖进去** |

4. 点 **上传文件**，等待完成

> ⚠️ **最关键的一点**：`index.html` 必须在 Bucket **根目录**下。
>
> 如果你把整个 `dist` 文件夹拖进去了，Bucket 里会多出 `dist/` 这一层。
> 处理办法：进去把里面的内容全选 → 用「复制」或「移动」放到根目录 → 删掉空的 `dist`。

### 上传后的结构应该是

```
hk-len-ppw/
├── index.html              ← 必须在这一层
├── 404.html
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── resume.pdf
├── _astro/                 ← CSS 与字体
│   ├── index.xxx.css
│   └── *.woff2
└── projects/
    ├── allure-report.jpg
    ├── allure-behaviors.jpg
    ├── jenkins-dashboard.jpg
    ├── jenkins-email-alerts.png
    ├── project-structure.jpg
    ├── xzs-api-test/index.html
    └── bilibili-ui-test/index.html
```

### 关于 AccessKey —— 现在不需要

**控制台上传用的是你的登录态，不需要 AccessKey。**

只有以后想用命令行工具（ossutil）做自动化部署时才需要。那时再按最小权限原则创建：

<details>
<summary>可选：创建最小权限的 RAM 子账号（仅 ossutil 自动化部署时需要）</summary>

**不要用主账号的 AccessKey。**

1. 打开 https://ram.console.aliyun.com/users → **创建用户**
2. 登录名填 `oss-uploader`，勾选 **OpenAPI 调用访问**
3. 创建后**立刻保存 AccessKey ID 和 Secret**（只显示一次）
4. 回到用户列表 → 点该用户 → **权限管理** → 新增授权
   - 选择 **自定义策略** → 新建策略，粘贴下面的内容（Bucket 名按实际改）：

```json
{
  "Version": "1",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["oss:PutObject", "oss:GetObject", "oss:ListObjects"],
      "Resource": [
        "acs:oss:*:*:hk-len-ppw",
        "acs:oss:*:*:hk-len-ppw/*"
      ]
    }
  ]
}
```

> 这个策略只允许上传和读取，**即使密钥泄露也无法删库**。
>
> 之后可以用 ossutil 一条命令全量覆盖上传：
> ```bash
> ossutil cp -r dist/ oss://hk-len-ppw/ --update
> ```

</details>

---

## 四、Step 3：绑定域名 `len666.top`

Bucket → **Bucket 配置** → **域名管理** → **绑定域名**

1. 输入 `len666.top`
2. 域名就在同一个阿里云账号下，可直接绑定，**不需要 TXT 验证**
3. 记下页面显示的 **CNAME 目标域名**（形如 `hk-len-ppw.oss-cn-hongkong.aliyuncs.com`）

---

## 五、Step 4：配置 CNAME 解析

打开 https://dns.console.aliyun.com → `len666.top` → 解析设置

**先检查并删除**之前为 Vercel 加的记录（例如 A 记录指向 `76.76.21.21`）。
> ⚠️ 同一主机记录下 **CNAME 与 A 记录不能共存**，不删干净会配置失败。

然后添加：

| 记录类型 | 主机记录 | 记录值 | TTL |
| --- | --- | --- | --- |
| CNAME | `@` | 以 OSS 控制台显示的为准 | 10 分钟 |

DNS 生效几分钟到几小时。

---

## 六、Step 5：配置 HTTPS

Bucket → 域名管理 → 找到 `len666.top` → **证书托管** / **开启 HTTPS**

1. 选择 **免费证书**（阿里云提供免费 DV 证书）
2. 申请并部署，等待签发（几分钟到几十分钟）
3. 部署完成后，建议开启 **强制 HTTPS 跳转**

> 顺便处理之前看到的「允许的 TLS 版本：未设置，全部允许」——
> 把 TLS 最低版本设为 **TLS 1.2**，关掉老旧的 TLS 1.0/1.1。

---

## 七、Step 6：验证清单

用**手机 4G（关掉 WiFi）**逐项检查：

- [ ] `https://len666.top` 能打开，地址栏显示锁头（HTTPS 正常）
- [ ] 首屏姓名、联系方式卡片正常显示
- [ ] 点「在线预览简历」能弹出 PDF
- [ ] 点「下载简历 PDF」能下载
- [ ] 点进两个项目详情页都正常（**这条专门验证「子目录首页」是否生效**）
- [ ] 点项目截图能放大
- [ ] 随便输个错地址（如 `https://len666.top/abc`）能显示自定义 404 页
- [ ] **记录首页加载耗时**

---

## 八、成本控制（重要）

OSS 按量计费，本站仅 1.26 MB，正常访问**一个月花费不到 1 元**。
但**必须防两件事**：

### 1. 防盗链（防止别人盗用你的图片刷流量）

Bucket → **数据安全** → **防盗链** → 添加 Referer 白名单：

```
https://len666.top
https://*.len666.top
```

勾选「不允许空 Referer」。

### 2. 设置流量封顶告警

阿里云 → **费用与成本** → **预算管理** → 新建预算，设一个月度上限（如 10 元），
超限时短信告警。

> 恶意刷流量的极端情况下，OSS 可能产生高额费用。设了封顶告警能第一时间知道。

---

## 九、以后怎么更新网站

内容改动后重新部署：

```bash
cd D:\dsWrokplace\front
npm run build
```

然后打开 OSS 控制台 → 文件列表 → 上传文件 → **把 `dist` 里的内容拖进去覆盖**。

> 💡 全量覆盖最省心 —— 总共才 1.26 MB，几秒钟的事。
> 只改了某个文件也可以只传那一个。

---

## 十、备案以后怎么办（可选升级）

香港节点已经够用，但如果你想让国内访问**更快**：

1. 备案完成后（需要先买一台国内服务器来申请备案服务码）
2. 新建一个**内地地域**的 Bucket
3. 把文件同样上传一份
4. 把域名从香港 Bucket 解绑，改绑到内地 Bucket

**网站代码、构建产物一行都不用改** —— 只是换了存储位置。

> 也可以在香港 Bucket 前面挂阿里云 CDN，但 CDN 加速国内同样要求域名已备案。

---

## 十一、故障排查

| 现象 | 原因 | 处理 |
| --- | --- | --- |
| 访问域名下载文件而不是显示网页 | 域名没开静态网站托管 | 开启静态网站托管并设默认首页 |
| 首页正常，项目详情页 404 | 「子目录首页」没勾 | 静态页面设置里勾上 |
| 访问显示一串 XML 错误 | CNAME 没配或没生效 | `nslookup len666.top` 看解析结果 |
| 图片/样式加载不出来 | 文件没传全，或多了 `dist/` 一层 | 确认 `_astro/` 在 Bucket 根目录下 |
| 提示证书错误 | HTTPS 证书未部署 | 域名管理里申请并部署免费证书 |
| 改了内容但页面没变 | 浏览器缓存 | `Ctrl + F5` 强制刷新 |

---

## 附：官方文档链接

- [控制台快速入门（创建 Bucket、上传文件）](https://www.alibabacloud.com/help/zh/oss/user-guide/console-quick-start)
- [怎样上传下载文件夹](https://www.alibabacloud.com/help/zh/oss/how-to-upload-directories-to-and-download-directories-from-oss)
- [通过自定义域名访问 OSS](https://www.alibabacloud.com/help/zh/oss/user-guide/access-buckets-via-custom-domain-names)
- [托管静态网站](https://www.alibabacloud.com/help/zh/oss/user-guide/hosting-static-websites)
