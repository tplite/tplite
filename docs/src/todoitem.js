import { Component } from 'tplite';
import todoItemView from './todoitem.tpl';

export const ENTER_KEY = 13;
export const ESC_KEY = 27;

const todoItem = new Component(todoItemView, {
  toggleTodo(todo) {
    todo.completed = !todo.completed
    this.state.parent.setState()
  },
  editTodo(todo) {
    todo.editing = true
    this.state.parent.setState()
  },
  removeTodo: function (todo) {
    var parent = this.state.parent;
    var todos = parent.state.todos;
    todos.some(function (t) {
      if (todo === t) {
        todos.splice(todos.indexOf(t), 1);
      }
    })
    parent.setState({ todos: todos })
  },
  doneEdit(todo, e) {
    if (!todo.editing) {
      return
    }
    todo.editing = false;
    var enteredText = e.target.value && e.target.value.trim();
    if (enteredText) {
      todo.title = enteredText
    }else {
      this.trigger('removeTodo', todo)
    }
    this.state.parent.setState()
  },
  editKeyUp(todo, e) {
    if (e.which === ENTER_KEY) {
      this.trigger('doneEdit', todo, e)
    }else if (e.which === ESC_KEY) {
      e.target.value = todo.title
      this.trigger('doneEdit', todo, e)
    }
  }
})

export default todoItem;
