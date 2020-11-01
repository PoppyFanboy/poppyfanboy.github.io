---
title: random
layout: blank-page
permalink: /random/
---

<div>
    <ul class="posts-list">
        {% for post in site.categories.Random %}
            <li>
                {% assign postNumber = site.categories.Random.size | minus: forloop.index | plus: 1 %}
                {% assign postDate = post.date | date: "%b %d, %Y" %}
                {% include post.html content=post.content url=post.url title=post.title author=post.author date=postDate number=postNumber images=post.images displayContent=true displayToc=false %}
            </li>
        {% endfor %}
    </ul>
</div>