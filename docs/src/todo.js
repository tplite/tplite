import tplite from 'tplite';
import todoStorage from './store';
import todoView from './todo.tpl';
import todoItem, {ENTER_KEY, ESC_KEY} from './todoitem';

window.tplite = tplite

const todo = new tplite.Component(todoView, {
  onMount() {
    var self = this;
    window.addEventListener('hashchange', function () {
      self.setState({activeFilter: location.hash.substr(2)})
    }, false);
  },
  shouldUpdate: function () {
    this.state.remaining = this.state.todos.filter(function (t) {
      return !t.completed
    }).length;
    this.state.allDone = this.state.remaining === 0;
    todoStorage.save(this.state.todos);
    return true
  },
  addTodo: function (e) {
    if (e.which === ENTER_KEY) {
      var value = e.target.value && e.target.value.trim();
      if (!value) {
        return;
      }
      var todos = this.state.todos;
      todos.push({ title: value, completed: false });
      this.setState({ todos: todos });
      e.target.value = '';
    }
  },
  toggleAll(e) {
    var todos = this.state.todos;
    todos.forEach(function (t) {
      t.completed = e.target.checked;
    });
    this.setState({ todos: todos })
    return true
  },
  removeCompleted(e) {
    this.setState({todos: this.state.todos.filter(function (t) {
        return !t.completed;
      })});
  }
}, {
  todos: todoStorage.fetch(),
  remaining: 0,
  activeFilter: location.hash.substr(2) || 'all',
  filteredTodos: function (todos, filter) {
    return todos.filter(function (t) {
      return filter == 'all' ? true : filter == 'active' ? !t.completed : t.completed;
    })
  },
  itemComponent: todoItem,
}).mount(document.getElementById('root'));

