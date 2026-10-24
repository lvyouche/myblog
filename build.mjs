// Build the blog as a single self-contained HTML file: the JS bundle and the
// stylesheet are inlined, so the page can be served from GitHub Pages or any
// static host with no second request. Mirrors plasma-ui's scripts/build-page.mjs.
import { build } from "esbuild";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

// plasma-ui lives outside this package, so esbuild would otherwise resolve
// "react" from plasma-ui-ref/node_modules — a second React copy — and crash
// at runtime. Pin every react import to this package's copy.
const here = (p) => path.resolve(p).replace(/\\/g, "/");

const out = await build({
  entryPoints: ["src/main.tsx"],
  alias: {
    react: here("node_modules/react"),
    "react-dom": here("node_modules/react-dom"),
  },
  bundle: true,
  minify: true,
  write: false,
  format: "iife",
  jsx: "automatic",
  target: "es2020",
  define: { "process.env.NODE_ENV": '"production"' },
});

// A literal </script> inside the bundle would close the tag carrying it.
const js = out.outputFiles[0].text.replace(/<\/script/gi, "<\\/script");
const css = readFileSync("src/style.css", "utf8");

const html = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="lvyouche 的个人博客：思考、学习历程与项目实践">
<title>lvyouche 的个人博客</title>
<style>${css}</style>
</head>
<body>
<div id="root"></div>
<script>${js}</script>
</body>
</html>`;

writeFileSync("index.html", html);
console.log(`index.html  ${(html.length / 1024).toFixed(0)} KB`);
