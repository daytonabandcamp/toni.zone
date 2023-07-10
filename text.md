---
layout: toni-page
title: "Text"
permalink: /blogs/text/
---
{%- if site.posts.size > 0 -%}
<p style="height: 2px;"></p>
{%- for post in site.categories.text limit:10 -%}
    {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
    <b><a class="post-link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></b><br>
    (posted to <b>{{post.categories}}</b> on {{ post.date | date: date_format }})
    <br><br>
        {%- if site.show_excerpts -%}
        {{ post.excerpt }}
        {%- endif -%}
    {%- endfor -%}
{%- endif -%}
<br>
<a href="/blogs/text/2023/">see all text posts from 2023</a>
<br><a href="/blogs/text/archive/">text archive</a>