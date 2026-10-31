# 个人主页 · GitHub Pages 单页简历

纯 HTML / CSS / JavaScript，零依赖、零构建步骤。推送到 GitHub 即刻上线，永久免费，免备案。

## 目录结构

```
.
├── index.html              # 全部内容都在这一个文件里，主要改它
├── assets/
│   ├── css/style.css       # 样式（配色变量在文件顶部）
│   ├── js/main.js          # 主题切换 / 移动端菜单 / 滚动动画
│   ├── img/
│   │   ├── avatar.svg      # 头像占位图，换成你的照片
│   │   └── favicon.svg     # 浏览器标签图标
│   └── files/
│       └── resume.pdf      # （待放）简历 PDF
└── .nojekyll               # 告诉 GitHub 跳过 Jekyll 构建，加快上线
```

## 本地预览

```bash
python -m http.server 8000
# 浏览器打开 http://localhost:8000
```

改完刷新即可看到效果，不需要编译。

## 上线步骤（约 3 分钟）

### 1. 新建仓库

在 GitHub 新建仓库，**仓库名必须严格是** `你的用户名.github.io`（小写），例如用户名是 `zhangsan` 就建 `zhangsan.github.io`。

> 仓库名决定了网址。只有这种命名方式才能拿到 `xxx.github.io` 的根域名。

### 2. 推送代码

```bash
git init
git add .
git commit -m "feat: 个人主页上线"
git branch -M main
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
git push -u origin main
```

### 3. 开启 Pages

进入仓库 **Settings → Pages**，在 Build and deployment 下：

- **Source** 选 `Deploy from a branch`
- **Branch** 选 `main`，目录选 `/ (root)`
- 点 Save

等 1—2 分钟，访问 `https://你的用户名.github.io` 就能看到。

> 首次部署慢是正常的，最长可能需要 10 分钟。之后每次 push 通常 30 秒内生效。
> 顺手勾选 **Enforce HTTPS**，免费拿到 HTTPS 证书。

## 需要替换的内容

全文搜索 `[` 即可定位所有待改项（`index.html` 里用方括号包裹的都是占位）。清单：

| 位置 | 改什么 |
| --- | --- |
| `<title>`、`og:*` | 名字、简介、站点地址 |
| Hero 区 | 姓名、职位、自我介绍、城市、公司、语言 |
| 社交链接 | GitHub / X / LinkedIn 用户名、邮箱 |
| 关于我 | 三段正文 |
| 数据统计 | 五个数字改成真实的 |
| 技能栈 | 删掉没用过的，补充你自己的 |
| 经历 | 时间、公司、三条成果描述 |
| 项目 | 3—6 个，链接指向真实仓库 |
| 页脚 | 版权署名 |

### 换头像

把自己的照片裁成正方形，命名为 `avatar.jpg` 放进 `assets/img/`，然后改 `index.html` 里：

```html
<img class="avatar" src="assets/img/avatar.jpg" alt="你的名字">
```

建议尺寸 400×400 以上，压缩到 100KB 以内。

### 放简历 PDF

PDF 放进 `assets/files/resume.pdf`，HTML 里的「下载简历」按钮就已经指向它了，无需改代码。
另外本页已写好了打印样式 —— 在浏览器里 `Ctrl + P` 可以直接把这一页另存为 PDF，效果同样干净。

### 换 favicon

编辑 `assets/img/favicon.svg`，把里面的 `N` 换成你名字的首字母。

## 自定义域名（可选）

1. 到域名服务商处加一条 DNS 记录：`CNAME  www  →  你的用户名.github.io`
2. 仓库根目录建一个 `CNAME` 文件，内容只有一行，写你的域名，例如 `www.example.com`
3. Settings → Pages → Custom domain 里填上同一个域名，勾选 Enforce HTTPS

**注意**：填了自定义域名后，**不要删掉 CNAME 文件**，否则每次 push 域名设置都会被重置。

## 改配色

打开 `assets/css/style.css`，最顶部的 `:root` 块就是全部变量：

```css
--accent: #4f46e5;   /* 主色，按钮和强调文字 */
--accent-2: #06b6d4; /* 副色，渐变和点缀 */
--radius: 14px;      /* 圆角大小 */
--maxw: 960px;       /* 内容最大宽度 */
```

`[data-theme="dark"]` 块是深色模式的对应值，一起改才协调。

## 特性说明

- 深浅双主题，默认跟随系统，手动切换后记住选择
- 手机适配，窄屏自动折叠为菜单
- 支持 `Ctrl + P` 导出成一页干净的 PDF 简历
- 图标全部内联 SVG，无第三方 CDN、无 Google Fonts，国内访问也快
- 尊重系统的「减少动态效果」偏好设置

## 常见问题

**页面 404** —— 检查三件事：仓库名是否是 `用户名.github.io`、Pages 里分支是否选了 `main`、根目录是否真的有 `index.html`。

**改了没生效** —— GitHub Pages 有缓存，可以强制刷新（`Ctrl + Shift + R`）或等几分钟。也确认一下 `main` 分支确实 push 上去了。

**想用 gh-pages 分支** —— 如果你不想让源码和站点混在一起，可以把 Source 改成 `gh-pages` 分支。但对个人主页来说直接在 `main` 上最简单。

**在国内访问慢** —— GitHub Pages 在国内有时会限速。介意的话可以考虑 Cloudflare Pages（同样免费，支持绑定 GitHub 仓库自动部署）。
