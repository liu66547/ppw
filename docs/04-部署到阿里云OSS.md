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

### 准备 AccessKey（安全做法）

**不要用主账号的 AccessKey。** 建一个只能访问这个 Bucket 的子账号：

1. 打开 https://ram.console.aliyun.com/users → **创建用户**
2. 登录名填 `oss-uploader`，勾选 **OpenAPI 调用访问**
3. 创建后**立刻保存 AccessKey ID 和 Secret**（只显示一次）
4. 回到用户列表 → 点该用户 → **权限管理** → 新增授权
   - 选择 **自定义策略** → 新建策略，粘贴下面的内容（把 Bucket 名换成你的）：

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

### 上传

下载 [ossbrowser](https://help.aliyun.com/zh/oss/developer-reference/ossbrowser)（图形化工具），
用上面那对子账号 AccessKey 登录，进入 `hk-len-ppw`，把压缩包解压后的**全部内容**拖进去。

**上传后的目录结构应该是**（注意：不要把 `dist` 这一层传上去）：

```
hk-len-ppw/
├── index.html
├── 404.html
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── resume.pdf
├── _astro/                  ← CSS 与字体
├── projects/
│   ├── allure-report.jpg
│   ├── allure-behaviors.jpg
│   ├── jenkins-dashboard.jpg
│   ├── jenkins-email-alerts.png
│   ├── project-structure.jpg
│   ├── xzs-api-test/index.html
│   └── bilibili-ui-test/index.html
```

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
> 在域名管理或 Bucket 配置里把 TLS 最低版本设为 **TLS 1.2**，关掉老旧的 TLS 1.0/1.1。

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

内容改动后重新部署只需三步：

```bash
# 1. 本地构建
cd D:\dsWrokplace\front
npm run build

# 2. 打包
#    （或直接把 dist 目录内容拖进 ossbrowser）
Compress-Archive -Path 'dist\*' -DestinationPath 'oss-upload.zip' -Force

# 3. 用 ossbrowser 上传，覆盖同名文件
```

> 💡 只改了文字（`src/data/` 或 `src/content/`）时，也可以只上传变化的文件，
> 但**全量覆盖最省心** —— 总大小才 1.26 MB，几秒钟的事。

---

## 十、备案以后怎么办（可选升级）

香港节点已经够用，但如果你想让国内访问**更快**，可以走这条路：

1. 备案完成后（需要先买一台国内服务器来申请备案服务码）
2. 新建一个**内地地域**的 Bucket
3. 把文件同样上传一份
4. 把域名从香港 Bucket 解绑，改绑到内地 Bucket

**网站代码、构建产物一行都不用改** —— 只是换了个存储位置。

> 也可以在香港 Bucket 前面挂阿里云 CDN，但 CDN 加速国内同样要求域名已备案。

---

## 十一、故障排查

| 现象 | 原因 | 处理 |
| --- | --- | --- |
| 访问域名下载文件而不是显示网页 | 域名没开静态网站托管 | 开启静态网站托管并设默认首页 |
| 首页正常，项目详情页 404 | 「子目录首页」没勾 | 静态页面设置里勾上 |
| 域名访问返回 XML 错误页 | CNAME 没配或没生效 | `nslookup len666.top` 看解析结果 |
| 图片/样式加载不出来 | 文件没传全或路径层级错了 | 检查 `_astro/` 目录是否在 Bucket 根下 |
| 提示证书错误 | HTTPS 证书未部署 | 域名管理里申请并部署免费证书 |
| 改了内容但页面没变 | 浏览器/CDN 缓存 | `Ctrl + F5` 强制刷新 |
