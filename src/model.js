export default function(actions) {
  const { click$ } = actions;
  const state$ = click$
    .map(() => 1)
    .scan((count, i) => count + i)
    .startWith(0);
  return state$;
}
