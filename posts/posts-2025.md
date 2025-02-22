---
permalink: /posts/2025.html
layout: page
title: 2025 posts
---
# 2025 posts
<div class="category-list">
    {% for post in site.categories.post %}
        {% capture year %}{{post.date | date: "%Y"}}{% endcapture %}
        {% if year == "2025" %}
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
        <a href="/posts/2024">&lt; 2024</a>
        <a class="disabled">2026 &gt;</a>
    </div>
    <script src="category.js"></script>
</div>