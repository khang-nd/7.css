#!/usr/bin/env node
const dedent = require("dedent");
const ejs = require("ejs");
const fs = require("fs");
const glob = require("glob");
const hljs = require("highlight.js");
const mkdirp = require("mkdirp");
const path = require("path");
const postcss = require("postcss");
const plugins = [
  require("cssnano"),
  require("autoprefixer"),
  require("postcss-import"),
  require("postcss-nested"),
  require("postcss-calc"),
  require("postcss-base64")({
    root: process.cwd() + "/gui",
    extensions: [".png", ".svg", ".gif"],
  }),
];

const { homepage, version } = require("./package.json");

const parser = postcss(plugins);

const parserWithPrefix = postcss([
  ...plugins,
  require("postcss-prefix-selector")({
    prefix: ".win7",
    transform: (prefix, selector, prefixed) => {
      if (["body", ".surface"].includes(selector)) return selector + prefix;
      if (":root" === selector) return prefix;
      return prefixed;
    },
  }),
]);

async function buildCSS(usePrefix) {
  const input =
    `/*! 7.css v${version} - ${homepage} */\n` +
    fs.readFileSync("gui/index.scss");

  const targetFile = usePrefix ? "dist/7.scoped.css" : "dist/7.css";

  const result = await (usePrefix ? parserWithPrefix : parser).process(input, {
    from: "gui/index.scss",
    to: targetFile,
    map: { inline: false },
  });

  mkdirp.sync("dist");
  fs.writeFileSync(targetFile, result.css);
  fs.writeFileSync(targetFile + ".map", result.map.toString());
}

function buildComponents() {
  fs.readdir("gui", async (err, files) => {
    const targetFolder = "dist/gui";
    const variablesFile = "_variables.scss";

    const fileResults = files
      .filter((file) => file.startsWith("_") && file !== variablesFile)
      .map((file) => ({
        name: file.slice(1),
        content:
          fs.readFileSync("gui/" + variablesFile) +
          fs.readFileSync("gui/" + file),
      }));

    const parsedResults = fileResults.map(async (file) => {
      const target = targetFolder + "/" + file.name.replace("scss", "css");
      return {
        target,
        parsed: await parser.process(file.content, {
          from: "gui/" + file.name,
          to: target,
          map: { inline: false },
        }),
      };
    });

    mkdirp.sync(targetFolder);
    const results = await Promise.all(parsedResults);
    results.forEach((result) =>
      fs.writeFile(result.target, result.parsed.css, () => {})
    );
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
    const escaped = hljs.highlight("html", dedented.replace(magicBrackets, ""));

    return `<div class="example">
      <div class="raw">${inline}</div>
      <details class="code">
        <summary>Show code</summary>
        <pre><code>${escaped.value}</code></pre>
        <button class="copy">Copy Code</button>
      </details>
    </div>`;
  }

  glob(
    "docs/*",
    { ignore: ["docs/components", "docs/sections", "docs/*.ejs"] },
    (err, files) => {
      if (!err) {
        files.forEach((srcFile) =>
          fs.copyFileSync(srcFile, path.join("dist", path.basename(srcFile)))
        );
      } else throw "error globbing dist directory.";
    }
  );
  fs.writeFileSync(
    path.join(__dirname, "/dist/index.html"),
    ejs.render(
      template,
      { getNewId, getCurrentId, meta, example },
      { views: [path.resolve(__dirname, "./docs")] }
    )
  );
}

async function build(mode) {
  try {
    await buildCSS();
    buildDocs();

    if (mode === "production") {
      buildCSS(true);
      buildComponents();
    }
  } catch (err) {
    console.error(err);
  }
}
module.exports = build;

build("production");
