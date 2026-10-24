import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { PlasmaProvider, Plasma } from "@cruxgarden/plasma-ui";

/* Custom mood tuned to the blog's indigo palette:
   deep night base -> steel blue mid -> indigo accent */
const blogMood = {
  colors: ["#060913", "#123a4a", "#4f46e5"],
  blend: 48,
  spring: { stiffness: 150, damping: 15 },
};

const POSTS = [
  {
    date: "2026-10-10",
    tag: "记录",
    title: "欢迎第一篇博文",
    excerpt:
      "这是我的第一篇文章，记录搭建个人博客的过程。从零开始配置开发环境，选择技术栈，最终部署到 GitHub Pages。",
  },
  {
    date: "2026-10-09",
    tag: "技术",
    title: "标题示例",
    excerpt: "这是一篇示例文章，展示博客的排版风格。包含标题、正文、标签等元素的美化设计。",
  },
  {
    date: "2026-10-08",
    tag: "思考",
    title: "技术学习的意义",
    excerpt: "在快速变化的技术世界里，什么才是真正值得投入时间去学习的东西？",
  },
];

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function App() {
  /* If WebGL2 is unavailable, add a class so CSS can paint a gradient
     backdrop; plasma already falls back to frosted panels internally. */
  const [noWebgl, setNoWebgl] = useState(false);
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      if (!c.getContext("webgl2")) {
        setNoWebgl(true);
        document.body.classList.add("no-webgl");
      }
    } catch {
      setNoWebgl(true);
      document.body.classList.add("no-webgl");
    }
  }, []);

  return (
    <PlasmaProvider
      mood={blogMood}
      theme="dark"
      frost={0.45}
      blend={48}
      radius={22}
      elevation={0.4}
      maxSurfaces={9}
      shimmerSpeed={0.8}
      freezeOnScroll
    >
      <div className="page">
        {/* ---- top bar ---- */}
        <Plasma as="header" lean={false} fuse={false} padding={0}>
          <div className="bar-inner">
            <p className="wordmark">blog</p>
            <nav className="topnav" aria-label="站内导航">
              <a href="#about">关于</a>
              <a href="#posts">文章</a>
              <a href="#contact">联系</a>
            </nav>
          </div>
        </Plasma>

        {/* ---- hero ---- */}
        <Plasma className="hero" lean={6} fuse={false} padding={0}>
          <div className="avatar">L</div>
          <h1>lvyouche</h1>
          <p className="tagline">开发者 · 思考者 · 记录者</p>
          <div className="hero-links">
            <a
              href="https://github.com/lvyouche"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
            >
              <GithubIcon /> GitHub
            </a>
            <a href="mailto:bdqxzyq@gmail.com" className="social-btn">
              <MailIcon /> 邮件
            </a>
          </div>
        </Plasma>

        {/* ---- about ---- */}
        <section id="about" className="section about">
          <h2>关于我</h2>
          <Plasma className="plate" lean={false} padding={0}>
            <p>
              👋 你好！我是 <strong>lvyouche</strong>，一个热爱技术与文字的人。
            </p>
            <p>
              这个博客记录我的思考、学习历程和项目实践。我相信写作是最好的学习方式，而代码是改变世界的工具。
            </p>
          </Plasma>
        </section>

        {/* ---- posts ---- */}
        <section id="posts" className="section posts-section">
          <h2>最新文章</h2>
          <div className="posts">
            {POSTS.map((p) => (
              <Plasma key={p.title} className="post plate" lean={false} padding={0}>
                <div className="post-meta">
                  <span className="post-date">{p.date}</span>
                  <span className="post-tag">{p.tag}</span>
                </div>
                <h3>
                  <a href="#">{p.title}</a>
                </h3>
                <p className="excerpt">{p.excerpt}</p>
                <a href="#" className="read-more">
                  阅读全文 →
                </a>
              </Plasma>
            ))}
          </div>
        </section>

        {/* ---- contact ---- */}
        <section id="contact" className="section contact">
          <h2>联系我</h2>
          <Plasma className="plate" lean={false} padding={0}>
            <p>
              📧 邮箱：<a href="mailto:bdqxzyq@gmail.com">bdqxzyq@gmail.com</a>
            </p>
            <p>
              🐙 GitHub：<a href="https://github.com/lvyouche" target="_blank" rel="noreferrer">
                @lvyouche
              </a>
            </p>
          </Plasma>
        </section>

        <footer className="site-footer">
          © 2026 lvyouche · 使用 GitHub Pages 托管 · 界面基于 Plasma UI
        </footer>
      </div>
    </PlasmaProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
