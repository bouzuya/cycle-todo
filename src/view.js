import { h } from '@cycle/dom';

export default function(state$) {
  const vtree$ = state$.map(({ count, title }) => {
    return h('div', [
      h('input.title'),
      h('p', [
        'count:',
        h('span.count', '' + count)
      ])
    ]);
  });
  const responses = {
    DOM: vtree$
  };
  return responses;
}
