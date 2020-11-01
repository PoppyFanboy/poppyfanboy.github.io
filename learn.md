---
title: learn
layout: blank-page
permalink: /learn/
---

<div>
    {% for mainCategory in site.learn-categories %}
        <ul class="posts-list">
            <a href="{{ mainCategory.url }}"><h3>{{ mainCategory.name }}</h3></a>
            {% for category in site.categories %}
                {% if category[0] == mainCategory.name %}
                    {% assign posts = category[1] %}
                {% endif %}
            {% endfor %}

            {% assign count = 0 %}
            {% for post in posts %}
                <li>
                    {% assign postDate = post.date | date: "%b %d, %Y" %}
                    {% assign postNumber = posts.size | minus: count %}
                    {% include post.html content=post.content url=post.url title=post.title author=post.author date=postDate number=postNumber images=post.images displayContent=false categoryUrl=mainCategory.url displayToc=true %}
                </li>
                {% assign count = count | plus: 1 %}

                {% if count == 2 %}
                    {% break %}
                {% endif %}
            {% endfor %}

            {% assign postsLeft = posts.size | minus: count %}
            {% if postsLeft > 0 %}
                <span class="skipped-posts-count">(Пропущено {{ postsLeft }} постов. <a href="{{ mainCategory.url }}">Посмотреть все посты.</a>)</span>
            {% endif %}
            <br><br>
        </ul>
    {% endfor %}
</div>
