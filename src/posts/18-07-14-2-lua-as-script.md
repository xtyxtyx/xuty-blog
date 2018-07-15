---
title: 这博客的脚本语言是Lua？！：Fengari项目简介
date: 2018-07-14T10:03:52.420Z
layout: post.pug
draft: false
---

是的。

这个博客的脚本语言是Lua。

随处可见`type="application/lua"`。

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