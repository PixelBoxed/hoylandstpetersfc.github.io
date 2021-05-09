---
layout: page
back: false
title: "Archive"
---

<ul class="list">

{% assign games = site.data.games%}

{% for game in games reversed %}

{% assign gameUrl = game.number | append: ".html" %}

{% if forloop.first %}
{% assign gameUrl = "/gamecard/index.html" %}
{% endif %}

<li class="list-item">
    <a href="{{ gameUrl }}">Gamecard {{ game.number }}</a> - 
        From {{ game.from | date_to_long_string }} 
        to {{ game.to | date_to_long_string | default: "current" }}
</li>

{% endfor %}

</ul>