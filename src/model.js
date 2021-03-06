import Rx from 'rx';

export default function(actions) {
  const {
    addTodo$,
    clearCompleted$,
    destroyTodo$,
    loadStorage$,
    toggleAll$,
    toggleCompleted$
  } = actions;
  const actions$ = Rx.Observable
    .merge(
      addTodo$
      .map(({ title }) => todos => {
        const completed = false;
        const id = todos.reduce(((max, i) => max < i.id ? i.id : max), 0) + 1;
        const todo = { title, id, completed };
        return todos.concat([todo]);
      }),
      clearCompleted$
      .map(() => todos => {
        return todos.filter(i => !i.completed);
      }),
      destroyTodo$
      .map(({ id }) => todos => {
        return todos.filter(i => i.id !== id)
      }),
      loadStorage$
      .map(json => _ => {
        return JSON.parse(json);
      }),
      toggleAll$
      .map(checked => todos => {
        return todos.map(({ id, title, completed }) => {
          return { id, title, completed: checked };
        });
      }),
      toggleCompleted$
      .map(({ id, completed }) => todos => {
        const todo = todos.filter(i => i.id === id)[0];
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
    .share();
  return state$;
}
