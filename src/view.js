import { h } from '@cycle/dom';

function renderTodo(todo) {
  const id = '' + todo.id;
  const classList = [
    'todo',
    (todo.completed ? '.completed' : null),
    'item' + id
  ].filter(i => i).map(i => '.' + i).join('');
  return h('li' + classList, { key: id }, [
    h('input', { type: 'checkbox', value: id }),
    h('span.title', [todo.title]),
    h('button.destroy', ['X'])
  ]);
}

function renderTodos({ todos }) {
  return h('ul.todos', todos.map(renderTodo));
}

function renderCount({ todos }) {
  return h('span.count', ['' + todos.filter(i => !i.completed).length]);
}

function renderClearCompletedButton({ todos }) {
  const completed = todos.filter(i => i.completed);
  if (completed.length === 0) return null;
  return h('button.clear', [
    'Clear completed (' + completed.length + ')'
  ]);
}

export default function(state$) {
  const vtree$ = state$.map(state => {
    return h('div', [
      h('input.title', { value: '' }),
      renderTodos(state),
      renderCount(state),
      renderClearCompletedButton(state)
    ]);
  });
  const responses = {
    DOM: vtree$
  };
  return responses;
}
