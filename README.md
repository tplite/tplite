# tplite
The micro javascript template engine in just a few lines of code.
> compressed in 415 byte without gzip.  
> cache the compile template in function array.  
> can run in both client and server side.  

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
can not using ' in html template.

# Usage

create new instance

    var template = new tplite.Template()

compile template into function

    var compile = template("<h1>{{title}}</h1>")

render the compile template by using callback

    var stringbuffer = new tplite.StringBuffer()
    compile({title: 'Title !!!'}, stringbuffer)
    console.log(stringbuffer.toString())

    // render template and write to document
    compile({title: 'Title !!!'}, function(s){document.write(s);})

# Demo 

please see result in "index.html"

# Feature

run in server side. and work with requirejs.

