---
permalink: /gamez.html
layout: page
title: gamez
---
# toni.zone arcade
also known as **gamez!** harken back to the days of online demos, addiction that wasn't taken advantage of by corporate hiveminds, and wondrous worlds created by 20-somethings in their bedroom as you walk into the slowly growing toni.zone arcade, one of the last emerging bastions of free online browser games optimized for computer users in existence. no obtrusive ads, no microtransactions, and no money down! all games are *able* to be played in mobile browsers, but they are best experienced on mouse and keyboard! **more coming soon!**
<div class="category-list">
    {% for post in site.categories.gamez %}
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
    {% endfor %}
    <script src="category.js"></script>
</div>