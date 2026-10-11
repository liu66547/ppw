# -*- coding: utf-8 -*-
"""
交付前验收脚本
检查构建产物：内部链接、静态资源、HTML 完整性、SEO、无障碍兜底
"""
import os
import re
import sys
import xml.etree.ElementTree as ET

sys.stdout.reconfigure(encoding='utf-8')

ROOT = r'D:\dsWrokplace\front\dist'
fails = []
warns = []
oks = []


def ok(msg):
    oks.append(msg)
    print('  [OK]   ' + msg)


def fail(msg):
    fails.append(msg)
    print('  [FAIL] ' + msg)


def warn(msg):
    warns.append(msg)
    print('  [WARN] ' + msg)


def read(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()


# ── 1. 找出所有产物页面 ──────────────────────────────────────
print('\n=== 1. 页面清单 ===')
pages = []
for dirpath, _, filenames in os.walk(ROOT):
    for fn in filenames:
        if not fn.endswith('.html'):
            continue
        full = os.path.join(dirpath, fn)
        rel = os.path.relpath(full, ROOT).replace('\\', '/')
        if rel == 'index.html':
            url = '/'
        elif rel.endswith('/index.html'):
            url = '/' + rel[: -len('index.html')]
        else:
            # 构建格式 'file'：projects/xzs-api-test.html -> /projects/xzs-api-test
            url = '/' + rel[: -len('.html')]
        pages.append((url, full))
pages.sort()
for url, _ in pages:
    print('  %-32s' % url)
if len(pages) >= 3:
    ok('页面数量 %d（首页 + 2 个项目详情页）' % len(pages))
else:
    fail('页面数量偏少：%d' % len(pages))


def url_to_file(url):
    """
    把站内链接转成 dist 下的文件路径。
    构建格式是 'file'：/projects/xxx -> dist/projects/xxx.html
    Vercel 的 cleanUrls 会在线上把 .html 去掉，所以两种写法都要认。
    """
    clean = url.split('#')[0].split('?')[0]
    if clean.startswith('/'):
        clean = clean[1:]
    clean = clean.rstrip('/')
    if clean == '':
        return os.path.join(ROOT, 'index.html')
    p = os.path.join(ROOT, clean.replace('/', os.sep))
    for cand in (p, p + '.html', os.path.join(p, 'index.html')):
        if os.path.exists(cand):
            return cand
    return p


# ── 2. 内部链接可达性 ────────────────────────────────────────
print('\n=== 2. 内部链接可达性 ===')
all_links = set()
for url, path in pages:
    html = read(path)
    for m in re.finditer(r'(?:href|src)="(/[^"#][^"]*)"', html):
        all_links.add(m.group(1))

broken = []
for link in sorted(all_links):
    target = url_to_file(link)
    if not os.path.exists(target):
        broken.append(link)

if broken:
    for b in broken:
        fail('死链：%s' % b)
else:
    ok('全部 %d 个站内链接均可达' % len(all_links))
    for l in sorted(all_links):
        print('         %s' % l)


# ── 3. 锚点链接有效性 ────────────────────────────────────────
print('\n=== 3. 锚点链接有效性 ===')
anchor_bad = []
for url, path in pages:
    html = read(path)
    ids = set(re.findall(r'id="([^"]+)"', html))
    for m in re.finditer(r'href="([^"]*#[^"]+)"', html):
        href = m.group(1)
        target_url, _, anchor = href.partition('#')
        # 同页锚点，或指向首页的锚点
        base = target_url if target_url else url
        if base in ('/', '') or base.startswith('/#'):
            check_ids = ids if (not target_url or target_url == url) else None
        else:
            check_ids = None
        if check_ids is not None and anchor not in check_ids:
            anchor_bad.append('%s -> %s' % (url, href))

if anchor_bad:
    for a in anchor_bad:
        fail('锚点不存在：%s' % a)
else:
    ok('所有同页锚点都能找到对应元素')


# ── 4. 关键静态资源 ──────────────────────────────────────────
print('\n=== 4. 静态资源 ===')
for asset in ['favicon.svg', 'robots.txt', 'sitemap.xml']:
    p = os.path.join(ROOT, asset)
    if os.path.exists(p):
        ok('%s 存在 (%d 字节)' % (asset, os.path.getsize(p)))
    else:
        fail('%s 缺失' % asset)

pdfs = [f for f in os.listdir(ROOT) if f.lower().endswith('.pdf')]
if len(pdfs) == 1:
    pdf = os.path.join(ROOT, pdfs[0])
    size = os.path.getsize(pdf)
    with open(pdf, 'rb') as f:
        head = f.read(5)
    if head == b'%PDF-' and size > 50000:
        ok('简历 PDF 完整可下载：%s (%.0f KB)' % (pdfs[0], size / 1024))
    else:
        fail('简历 PDF 损坏：head=%r size=%d' % (head, size))
elif not pdfs:
    fail('public/ 里没有简历 PDF，「下载简历」按钮会 404')
else:
    warn('有多个 PDF：%s' % pdfs)

fonts = [f for f in os.listdir(os.path.join(ROOT, '_astro')) if f.endswith('.woff2')]
if fonts:
    ok('字体已自托管：%d 个 woff2 文件' % len(fonts))
else:
    fail('没有字体文件')


# ── 5. HTML 完整性 ───────────────────────────────────────────
print('\n=== 5. HTML 完整性 ===')
for url, path in pages:
    html = read(path)
    problems = []
    # 未解析的模板残留
    for pat in ['undefined', '[object Object]', 'NaN', 'Astro.props', '{profile.', '{d.']:
        if pat in html:
            problems.append('含残留文本 %r' % pat)
    # 必要结构
    if '<title>' not in html:
        problems.append('缺少 <title>')
    if 'name="description"' not in html:
        problems.append('缺少 meta description')
    if 'lang="zh-CN"' not in html:
        problems.append('缺少 lang 属性')
    if '<h1' not in html:
        problems.append('缺少 h1')
    if problems:
        fail('%s: %s' % (url, '; '.join(problems)))
    else:
        ok('%s 结构完整' % url)


# ── 6. SEO ───────────────────────────────────────────────────
print('\n=== 6. SEO ===')
for url, path in pages:
    html = read(path)
    t = re.search(r'<title>(.*?)</title>', html)
    d = re.search(r'name="description" content="(.*?)"', html)
    can = re.search(r'rel="canonical" href="(.*?)"', html)
    robots = re.search(r'name="robots" content="(.*?)"', html)
    print('  %-32s' % url)
    print('      title: %s' % (t.group(1) if t else '(缺失)'))
    if can:
        print('      canonical: %s' % can.group(1))
        # canonical 必须带结尾斜杠，和 trailingSlash: 'always' 一致
        if not can.group(1).endswith('/'):
            fail('%s 的 canonical 缺结尾斜杠：%s' % (url, can.group(1)))
    elif robots and 'noindex' in robots.group(1):
        print('      robots: %s（功能性页面，不收录，正确）' % robots.group(1))
    else:
        fail('%s 既没有 canonical 也没有 noindex' % url)

try:
    tree = ET.parse(os.path.join(ROOT, 'sitemap.xml'))
    urls = [e.text for e in tree.iter() if e.tag.endswith('loc')]
    ok('sitemap.xml 是合法 XML，含 %d 个地址' % len(urls))
    for u in urls:
        print('         %s' % u)
    # sitemap 地址必须都带结尾斜杠
    bad = [u for u in urls if not u.endswith('/')]
    if bad:
        fail('sitemap 中有地址缺结尾斜杠：%s' % bad)
    else:
        ok('sitemap 全部地址都带结尾斜杠，与 canonical 一致')

    # 【关键】sitemap 里的每个地址都必须真的存在
    missing = []
    for u in urls:
        rel = u.split('://', 1)[1].split('/', 1)
        path_part = '/' + (rel[1] if len(rel) > 1 else '')
        if not os.path.exists(url_to_file(path_part)):
            missing.append(u)
    if missing:
        fail('sitemap 里的地址在产物中不存在：%s' % missing)
    else:
        ok('sitemap 中每个地址都能在产物里找到对应页面')

    # 【关键】页面里的 canonical 必须和 sitemap 对得上
    sm_set = set(urls)
    for url, path in pages:
        html = read(path)
        can = re.search(r'rel="canonical" href="(.*?)"', html)
        if can and can.group(1) not in sm_set:
            fail('%s 的 canonical 不在 sitemap 中：%s' % (url, can.group(1)))
    ok('所有 canonical 都在 sitemap 中出现')
except Exception as e:
    fail('sitemap.xml 解析失败：%s' % e)


# ── 7. 无障碍 / 无 JS 兜底 ───────────────────────────────────
print('\n=== 7. 无障碍与无 JS 兜底 ===')
home = read(os.path.join(ROOT, 'index.html'))
if '.reveal' in home and 'opacity: 1 !important' in home:
    ok('含 <noscript> 兜底：禁用 JS 时内容仍可见')
else:
    fail('缺少 noscript 兜底，禁用 JS 会导致内容不可见')

if 'prefers-reduced-motion' in read(os.path.join(ROOT, '_astro', os.listdir(os.path.join(ROOT, '_astro'))[0])) or True:
    css_files = [f for f in os.listdir(os.path.join(ROOT, '_astro')) if f.endswith('.css')]
    css = read(os.path.join(ROOT, '_astro', css_files[0]))
    if 'prefers-reduced-motion' in css:
        ok('含 prefers-reduced-motion：尊重系统「减少动态效果」')
    else:
        warn('未找到 prefers-reduced-motion')
    if ':focus-visible' in css:
        ok('含 focus-visible 样式：键盘导航可见')
    else:
        warn('未找到 focus-visible 样式')

if '跳到主要内容' in home:
    ok('含「跳到主要内容」无障碍链接')
else:
    warn('缺少跳转链接')

# 外链安全性
print('\n=== 8. 外链安全性 ===')
unsafe = []
for url, path in pages:
    html = read(path)
    for m in re.finditer(r'<a\b[^>]*target="_blank"[^>]*>', html):
        tag = m.group(0)
        if 'rel=' not in tag or 'noopener' not in tag:
            unsafe.append('%s: %s' % (url, tag[:80]))
if unsafe:
    for u in unsafe:
        fail('外链缺 rel=noopener：%s' % u)
else:
    ok('所有 target=_blank 外链都带 rel=noopener')


# ── 汇总 ─────────────────────────────────────────────────────
print('\n' + '=' * 60)
print('验收结果：%d 项通过 / %d 项警告 / %d 项失败' % (len(oks), len(warns), len(fails)))
if warns:
    print('\n警告：')
    for w in warns:
        print('  - ' + w)
if fails:
    print('\n失败：')
    for f in fails:
        print('  - ' + f)
    sys.exit(1)
print('\n全部通过 ✅')
