#!/usr/bin/env node
const dedent = require("dedent");
const ejs = require("ejs");
const fs = require("fs");
const glob = require("glob");
const hljs = require("highlight.js");
const mkdirp = require("mkdirp");
const path = require("path");
const postcss = require("postcss");

const { homepage, version } = require("./package.json");

const postcssParser = postcss()
  .use(require("postcss-import"))
  .use(require("postcss-nested"))
  .use(require("postcss-css-variables"))
  .use(require("postcss-calc"))
  .use(require("postcss-copy")({ dest: "dist", template: "[name].[ext]" }))
  .use(require("cssnano"));

function buildCSS() {
  const input =
    `/*! 7.css v${version} - ${homepage} */\n` +
    fs.readFileSync("gui/index.scss");

  return postcssParser
    .process(input, {
      from: "gui/index.scss",
      to: "dist/7.css",
      map: { inline: false },
    })
    .then((result) => {
      mkdirp.sync("dist");
      fs.writeFileSync("dist/7.css", result.css);
      fs.writeFileSync("dist/7.css.map", result.map.toString());
    });
}

function buildDocs() {
  let id = 0;
  function getNewId() {
    return ++id;
  }
  function getCurrentId() {
    return id;
  }

  const template = fs.readFileSync("docs/index.html.ejs", "utf-8");
  const meta = {
    title: "7.css",
    description:
      "A design system for building faithful recreations of the Windows 7 UI.",
    image:
      "https://raw.githubusercontent.com/khang-nd/7.css/main/docs/window.png",
  };

  function example(code) {
    const magicBrackets = /\[\[(.*)\]\]/g;
    const dedented = dedent(code);
    const inline = dedented.replace(magicBrackets, "$1");
    const escaped = hljs.highlight("html", dedented.replace(magicBrackets, ""))
      .value;

    return `<div class="example">
      <div class="raw">${inline}</div>
      <details>
        <summary>Show code</summary>
        <pre><code>${escaped}</code></pre>
        <button class="copy">Copy Code</button>
      </details>
    </div>`;
  }

  glob("docs/*", (err, files) => {
    if (!err) {
      files.forEach((srcFile) =>
        fs.copyFileSync(srcFile, path.join("dist", path.basename(srcFile)))
      );
    } else throw "error globbing dist directory.";
  });
  fs.writeFileSync(
    path.join(__dirname, "/dist/index.html"),
    ejs.render(template, { getNewId, getCurrentId, meta, example })
  );
}

function build() {
  buildCSS()
    .then(buildDocs)
    .catch((err) => console.log(err));
}
module.exports = build;

build();
