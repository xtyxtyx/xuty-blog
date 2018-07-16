---
title: 画张流程图：mermaidjs + markdown混搭测试
layout: post.pug
date: '2018-07-16T21:08:22+08:00'
draft: false
autodoc: true
---
> [mermaidjs文档](https://mermaidjs.github.io/flowchart.html)

```graph
graph TB
  src[./src]
  build[./build]
  drafts[移除草稿]
  conv_time[调整时间格式]
  markdown[转markdown为html]
  autotoc[解析html 生成目录]
  collections[集合]
  permalinks
  pug
  layouts
  
  src --> drafts
  drafts --> conv_time
  conv_time --> markdown
  markdown --> autotoc
  autotoc --> collections
  collections --> permalinks
  permalinks --> pug
  pug --> layouts
  layouts --> build
```
