---
permalink: /posts/2021.html
layout: page
title: 2021 posts
---
# 2021 posts
<div class="category-list">
    {% for post in site.categories.post %}
        {% capture year %}{{post.date | date: "%Y"}}{% endcapture %}
        {% if year == "2021" %}
            <div class="category-post">
                <div class="category-thumbnail">
                    <a href="{{post.permalink}}"><img src="/img/thumb/{{post.thumb}}-thumb.png"></a>
                </div>
                <div class="category-info">
                    <a href="{{post.permalink}}"><h2 class="category-title">{{post.title}}</h2></a>
                    <p class="category-description">{{post.description}}</p>
                    <small class="category-date">{{ post.date | date: "%b %-d, %Y" }}</small>
                </div>
            </div>
        {% endif %}
    {% endfor %}
    <div class="page-selector">
        <a class="disabled">&lt; 2020</a>
        <a href="/posts/2022">2022 &gt;</a>
    </div>
    <script src="category.js"></script>
</div>