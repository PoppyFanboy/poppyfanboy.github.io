---
title: learn
layout: blank-page
permalink: /learn/
---

<div>
    {% assign sortedCategories = "" | split: "" %}
    {% comment %}
        Posts are sorted by their dates by default.
    {% endcomment %}
    {% for post in site.categories.Learn %}
        {% assign currentCategoryName = post.categories[1] %}

        {% assign sortedCategoriesNames = sortedCategories | map: "name" %}
        {% if sortedCategoriesNames contains currentCategoryName %}
            {% continue %}
        {% endif %}

        {% for category in site.learn-categories %}
            {% if category.name == currentCategoryName %}
                {% assign categoryObject = category %}
            {% endif %}
        {% endfor %}

        {% assign sortedCategories = sortedCategories | push: categoryObject %}
    {% endfor %}

    {% for mainCategory in sortedCategories %}
        <ul class="posts-list">
            <div class="category-header">
                <h3 class="category-header-name">{{ mainCategory.name }}</h3>
                <a class="category-header-link" href="{{ mainCategory.url }}">Перейти к категории</a>
            </div>

            {% assign posts = site.categories[mainCategory.name] %}
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
                <span class="skipped-posts-count" id="{{ categoryNameNoSpaces | append: "-skipped-count" }}">(Пропущено {{ postsLeft }} постов. <span class="text-button" id="{{ categoryNameNoSpaces | append: "-show-skipped" }}">Посмотреть все посты.</span>)</span>
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
