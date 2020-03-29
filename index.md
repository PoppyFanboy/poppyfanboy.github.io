---
layout: blank
title: home
---

сюда лучше просто не смотреть

<img src = "assets/images/1.png" style = "margin-left: 0px; margin-right: 0px; width:600px; height:auto; image-rendering: crisp-edges;">

&gt; это же уровень восьмого класса в школке 

&gt; зачем переписывать учебник, ты же можешь просто читать и запоминать

&gt; ты не знал этого, да

&gt; просто зачем

<h1>posts</h1>
<ul>
    {% for post in site.posts %}
        <li>
            <a href="{{ post.url }}">{{ post.title }}</a>
        </li>
    {% endfor %}
</ul>
