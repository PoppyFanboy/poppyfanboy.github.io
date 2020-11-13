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
        {% include posts-list.html mainCategory = mainCategory visiblePostsMaxCount = 2 hidePosts = true %}
    {% endfor %}

    <script>
        document.querySelectorAll('[id$=-show-skipped]').forEach(showSkippedButton => {
            const categoryName = showSkippedButton.id.match(/^(.*)-show-skipped$/)[1];
            showSkippedButton.addEventListener("click", () => {
                const hiddenPosts = document.querySelectorAll(`.hidden-post.${categoryName}`);
                hiddenPosts.forEach(post => post.style.display = "list-item");
                document.getElementById(`${categoryName}-skipped-count`).style.display = 'none';
            });
        });
    </script>

    <script src="../assets/js/post-focus-button.js"></script>
</div>
