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

export default function(state$) {
  const vtree$ = state$.map(({ count, title, todos }) => {
    return h('div', [
      h('input.title', { value: '' }),
      renderTodos(todos)
    ]);
  });
  const responses = {
    DOM: vtree$
  };
  return responses;
}
