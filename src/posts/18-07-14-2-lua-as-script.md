---
title: 用Lua写网页脚本：Fengari项目简介
layout: post.pug
date: 2018-07-14T10:03:52.420Z
draft: false
---

是的。

这个博客的网页脚本语言就是Lua。

可以看到`type="application/lua"`。

示例：
<pre>
<div id="luaCode">
local js = require'js'
local window = js.global

local function fib(n)
    if n == 1 or n == 0 then
        return 1
    else
        return fib(n-1) + fib(n-2)
    end
end

window:alert('fib(20) = ' .. fib(20))
</div>
<button id="execBtn" class="button is-primary">执行</button>
</pre>

<script type="application/lua">
local js = require'js'
local window = js.global
local document = window.document

window.onload = function()
    local execBtn = document:getElementById'execBtn'
    local luaCode = document:getElementById'luaCode'
    execBtn.onclick = function()
        load(luaCode.innerHTML)()
    end
end
</script>

*To be continue...*
