import { h } from '@cycle/dom';

function renderTodo(todo) {
  const value = '' + todo.id;
  return h('li.todo', [
    h('input', { type: 'checkbox', value: todo.id }),
    h('span.title', [todo.title])
  ]);
}

function renderTodos(todos) {
  return h('ul.todos', todos.map(renderTodo));
}

function renderCount(todos) {
  return h('span.count', ['' + todos.filter(i => !i.completed).length]);
}

export default function(state$) {
  const vtree$ = state$.map(({ count, title, todos }) => {
    return h('div', [
      h('input.title', { value: '' }),
      renderTodos(todos),
      renderCount(todos)
    ]);
  });
  const responses = {
    DOM: vtree$
  };
  return responses;
}
