<li class="todo {{todo.completed?'completed':''}} {{todo.editing?'editing':''}}">
   <div class="view">
    <input class="toggle" type="checkbox" {{todo.completed ? 'checked="checked"':''}} onclick="{{ toggleTodo(todo) }}">
    <label ondblclick="{{ editTodo(todo) }}">{{ todo.title }}</label>
    <button class="destroy" onclick="{{ removeTodo(todo) }}"></button>
   </div>
   <input name="todoeditbox" class="edit" type="text" onblur="{{ doneEdit(todo) }}" onkeyup="{{ editKeyUp(todo) }}">
</li>
