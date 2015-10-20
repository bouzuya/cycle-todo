import { Rx } from '@cycle/core';

export default function(actions) {
  const { addTodo$, clearCompleted$, toggleCompleted$, destroyTodo$ } = actions;
  const actions$ = Rx.Observable
    .merge(
      addTodo$
      .map(({ title }) => (todos) => {
        const completed = false;
        const id = todos.length + 1;
        const todo = { title, id, completed };
        return todos.concat([todo]);
      }),
      clearCompleted$
      .map(() => (todos) => {
        return todos.filter(i => !i.completed);
      }),
      destroyTodo$
      .map(({ id }) => (todos) => {
        return todos.filter(i => i.id !== id)
      }),
      toggleCompleted$
      .map(({ id, completed }) => (todos) => {
        const todo = todos.filter((i) => i.id === id)[0];
        todo.completed = completed;
        return todos;
      })
    );
  const state = [];
  const state$ = Rx.Observable
    .just(state)
    .merge(actions$)
    .scan((todos, action) => action(todos))
    .map(todos => ({ todos }))
  return state$;
}
