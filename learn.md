---
title: learn
layout: blank-page
permalink: /learn/
---

<div>
    {% for mainCategory in site.learn-categories %}
        <ul class="posts-list">
            <div class="category-header">
                <h3 class="category-header-name">{{ mainCategory.name }}</h3>
                <a class="category-header-link" href="{{ mainCategory.url }}">Перейти к категории</a>
            </div>
            {% for category in site.categories %}
                {% if category[0] == mainCategory.name %}
                    {% assign posts = category[1] %}
                {% endif %}
            {% endfor %}

            {% assign categoryNameNoSpaces = mainCategory.name | replace: " ", "" %}
            {% assign count = 0 %}
            {% for post in posts %}
                {% if count >= 2 %}
                    <li class="hidden-post {{ categoryNameNoSpaces }}">
                {% else %}
                    <li>
                {% endif %}
                    {% assign postDate = post.date | date: "%b %d, %Y" %}
                    {% assign postNumber = posts.size | minus: count %}
                    {% include post.html content=post.content url=post.url title=post.title author=post.author date=postDate number=postNumber images=post.images displayContent=false categoryUrl=mainCategory.url displayToc=true %}
                </li>
                {% assign count = count | plus: 1 %}
            {% endfor %}

            {% assign postsLeft = posts.size | minus: 2 %}
            {% if postsLeft > 0 %}
                <span class="skipped-posts-count" id="{{ categoryNameNoSpaces | append: "-skipped-count" }}">(Пропущено {{ postsLeft }} постов. <span class="show-skipped-posts-button" id="{{ categoryNameNoSpaces | append: "-show-skipped" }}">Посмотреть все посты.</span>)</span>
                <script>
                    document.getElementById("{{ categoryNameNoSpaces | append: "-show-skipped" }}").addEventListener("click", function() {
                        const hiddenPosts = document.querySelectorAll(".hidden-post.{{ categoryNameNoSpaces }}");
                        hiddenPosts.forEach(post => post.style.display = "list-item");
                        document.getElementById("{{ categoryNameNoSpaces | append: "-skipped-count" }}").style.display = "none";
                    });
                </script>
            {% endif %}
            <br><br>
        </ul>
    {% endfor %}
</div>
