# tplite
The micro javascript template engine in just a few lines of code

# Syntax

In short, statements must be included between percent signs and expressions must be placed between brackets.

## Variables and expressions

variables or expressions will be replaced

      <h1>
        {{title}}
      </h1>
      <b>{{ encodeURIComponent(title)}}</b>

## Conditional and Loops

      <!-- just using plain javascript code, example for conditional and loops -->
      {% if (messages) { %}
        {% messages.forEach(function(message){ %}
          <p>{{message}}</p>
        {% })%}
        <!-- loops in another way -->
        {% for (var i in messages){ %}
          <p>{{messages[i]}}</p>
        {% }%}
      {% } %}

## Set Variables

      <!-- set Variables and display it -->
      {% var testval = 'set var in template.' %}{{ testval }}

## Demo 

please see result in "index.html"

