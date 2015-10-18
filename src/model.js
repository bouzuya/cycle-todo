import { Rx } from '@cycle/core';

export default function(actions) {
  const { click$, changeTitle$, addTodo$ } = actions;
  const count$ = click$
    .map(() => 1)
    .scan((count, i) => count + i)
    .startWith(0);
  const title$ = changeTitle$
    .startWith(null);
  const todos$ = addTodo$
    .startWith([])
    .scan((todos, title) => {
      const todo = { title };
      return todos.concat([todo]);
    });
  const state$ = Rx.Observable
    .combineLatest(
      count$, title$, todos$,
      (count, title, todos) => {
        return { count, title, todos };
      }
    );
  return state$;
}
