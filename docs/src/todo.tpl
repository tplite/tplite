<section class="todoapp">
  <header class="header">
    <h1>todos</h1>
    <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" onkeyup="{{ addTodo() }}">
  </header>
  {% if (todos.length) { %}
  <section class="main">
    <input class="toggle-all" type="checkbox" {{allDone ? 'checked="checked"' : ''}} onclick="{{ toggleAll() }}">
    <ul class="todo-list">
      {% for (var todo of filteredTodos(todos, activeFilter)) { %}
        {{itemComponent({ todo: todo, parent: self })}}
      {% } %}
    </ul>
  </section>
  <footer class="footer">
    <span class="todo-count">
      <strong>{{ remaining }}</strong> {{ remaining === 1 ? 'item' : 'items' }} left
    </span>
    <ul class="filters">
      <li><a class="{{ activeFilter=='all' ? 'selected' : '' }}" href="#/all">All</a></li>
      <li><a class="{{ activeFilter=='active' ? 'selected' : '' }}" href="#/active">Active</a></li>
      <li><a class="{{ activeFilter=='completed' ? 'selected' : '' }}" href="#/completed">Completed</a></li>
    </ul>
    {% if (todos.length > remaining) { %}
    <button class="clear-completed" onclick="{{ removeCompleted() }}">
      Clear completed</button>
    {% } %}
  </footer>
  {% } %}
</section>
<footer class="info">
  <p>Double-click to edit a todo</p>
  <p>Written by <a href="http://github.com/lloydzhou">Lloyd Zhou</a></p>
  <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
</footer>
