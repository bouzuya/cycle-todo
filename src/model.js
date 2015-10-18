import { Rx } from '@cycle/core';

export default function(actions) {
  const { addTodo$ } = actions;
  const todos$ = addTodo$
    .startWith([])
    .scan((todos, title) => {
      const todo = { title };
      return todos.concat([todo]);
    });
  const state$ = Rx.Observable
    .combineLatest(
      todos$,
      (todos) => {
        return { todos };
      }
    );
  return state$;
}
