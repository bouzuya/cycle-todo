import { Rx } from '@cycle/core';

export default function(actions) {
  const { click$, changeTitle$ } = actions;
  const count$ = click$
    .map(() => 1)
    .scan((count, i) => count + i)
    .startWith(0);
  const title$ = changeTitle$
    .startWith(null);
  const state$ = Rx.Observable
    .combineLatest(
      count$, title$,
      (count, title) => {
        return { count, title };
      }
    );
  return state$;
}
