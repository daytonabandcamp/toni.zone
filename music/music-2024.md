---
permalink: /music/2024.html
layout: page
title: 2024 music
---
# 2024 music
<div class="note">
    <strong>note:</strong> the music section of the site only constitutes music important and recent enough for me to have <em>posted about</em> on the site. if you want to see a much, much more complete collection of my music, perhaps you're looking for my <a href="https://daytona.bandcamp.com">bandcamp page?</a>
</div>
<div class="category-list">
    {% for post in site.categories.music %}
        {% capture year %}{{post.date | date: "%Y"}}{% endcapture %}
        {% if year == "2024" %}
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
        <a href="/music/2023">&lt; 2023</a>
        <a class="disabled">2025 &gt;</a>
    </div>
    <script src="category.js"></script>
</div>