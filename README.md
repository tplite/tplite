# tplite
The micro javascript template engine in just a few lines of code.
> compressed in 354 byte without gzip.  
> cache the compile template in function array.

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

# Issue
there's one known issue: 
can not using "'" in html template.

# Demo 

please see result in "index.html"

