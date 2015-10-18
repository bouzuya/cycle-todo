import { Rx } from '@cycle/core';

export default function(actions) {
  const { addTodo$ } = actions;
  const actions$ = addTodo$
    .map((title) => {
      return (todos) => {
        const completed = false;
        const id = todos.length + 1;
        const todo = { title, id, completed };
        return todos.concat([todo]);
      };
    });
  const state = [];
  const state$ = Rx.Observable
    .just(state)
    .merge(actions$)
    .scan((todos, action) => {
      return action(todos);
    })
    .map((todos) => {
      return { todos };
    });
  return state$;
}
