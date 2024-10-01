---
permalink: /search.html
layout: page
title: search
---
<script src="js/lunr.js"></script>
<script>
    var posts = [
        {% for post in site.posts %}
        {
            "id": "{{post.permalink | slice: 1,999}}",
            "title": "{{post.title | downcase}}",
            "body": "{{post.title}} {{post.description}}",
            "description": "{{post.description}}"
        }{% unless forloop.last %},{% endunless %}
        {% endfor %}
    ];
    var idx = lunr(function() {
        this.ref('title');
        this.field('body');
        posts.forEach(function(post) {
            this.add(post)
        },this);
    });
    var results = document.getElementById("content");
    const searchTerm = location.search.substring(3).replaceAll("%20"," ").replaceAll("%27","'");
    query = idx.search(searchTerm);
    console.log(query);
    console.log(posts);
    results.innerHTML += `<h1 class="article-title">${query.length} result${query.length==1?"":"s"} found for "${searchTerm}!"</h1>`;
    query.forEach((result) => {
        var post = {};
        for (var i = 0; i < posts.length; i++) {
            if (posts[i].title == result.ref) {
                post = posts[i];
                break;
            }
        }
        results.innerHTML += `<div class="search-result"><h2 style="margin: 0;"><a href="${post.id}">${post.title}</a></h2><small style="margin: 0;">${post.id}</small><br><p style="margin: 0.5em 0 0 0;">${post.description}</p></div>`
    })
</script>
