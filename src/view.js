import { h } from '@cycle/dom';

function renderTodo(todo) {
  return h('li.todo', [todo.title]);
}

function renderTodos(todos) {
  return h('ul.todos', todos.map(renderTodo));
}

export default function(state$) {
  const vtree$ = state$.map(({ count, title, todos }) => {
    return h('div', [
      h('input.title', { value: '' }),
      h('p', [
        'count:',
        h('span.count', '' + count)
      ]),
      renderTodos(todos)
    ]);
  });
  const responses = {
    DOM: vtree$
  };
  return responses;
}
