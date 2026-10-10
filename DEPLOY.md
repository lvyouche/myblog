---
name: Deploy Blog to GitHub Pages
description: 将纯 HTML/CSS 博客部署到 GitHub Pages
---

# 部署步骤

## 1. 初始化 Git 仓库
```bash
cd "C:\Users\Lvyouche\Desktop\x tech\blog"
git init
git add .
git commit -m "Initial blog layout"
```

## 2. 创建 GitHub 仓库（发布到 gh 后执行）
```bash
gh repo create myblog --public --source=. --remote=origin --push
```

## 3. 启用 GitHub Pages
```bash
gh pages enable --source ./ --branch main
```

## 4. 访问博客
部署完成后，博客地址为：
https://lvyouche.github.io/myblog

---

## 后续更新
```bash
cd "C:\Users\Lvyouche\Desktop\x tech\blog"
git add .
git commit -m "更新内容"
git push
```
GitHub Pages 会自动重新构建并部署。
