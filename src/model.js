import { Rx } from '@cycle/core';

export default function(actions) {
  const { addTodo$, toggleCompleted$ } = actions;
  const actions$ = Rx.Observable
    .merge(
      addTodo$
      .map((title) => {
        return (todos) => {
          const completed = false;
          const id = todos.length + 1;
          const todo = { title, id, completed };
          return todos.concat([todo]);
        };
      }),
      toggleCompleted$
      .map(({ id, completed }) => {
        return (todos) => {
          const todo = todos.filter((i) => i.id === id)[0];
          todo.completed = completed;
          return todos;
        };
      })
    );
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
