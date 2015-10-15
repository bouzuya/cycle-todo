import { h } from '@cycle/dom';

export default function(state$) {
  const vtree$ = state$.map((count) => {
    return h('p', [
      'count:',
      h('span.count', '' + count)
    ]);
  });
  const responses = {
    DOM: vtree$
  };
  return responses;
}
